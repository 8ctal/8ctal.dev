import { useEffect, useRef, useState } from "react";
import { parse as parseFont } from "opentype.js";

import { useMotionPreference } from "../context/MotionPreference";

/**
 * Text that writes itself, then inks in. Ported from a 21st.dev reference
 * component (ref_components/handwriting.tsx) used for the Hero's "que dan
 * resultados" accent, adapted to this project:
 * - opentype.js is a real dependency (`pnpm add opentype.js`) instead of the
 *   reference's CDN <script> tag, and the font is self-hosted at
 *   /fonts/ShadowsIntoLight.ttf (the reference's own default font, Google
 *   Fonts, OFL) instead of fetched from raw.githubusercontent.com at
 *   runtime — the reference's own doc-comment says to self-host for
 *   production. Deliberately a plain static TTF, not a variable font: an
 *   earlier attempt self-hosting Caveat required flattening its variable
 *   font to a static instance with `fontTools.varLib.instancer` first
 *   (Google Fonts ships no static Caveat build), and that specific
 *   instancer output made opentype.js emit a literal "NaN" coordinate in
 *   a couple of glyphs' path data — which the SVG parser then silently
 *   truncated the rest of that glyph's rendering at, dropping visible
 *   ink. A font that was never run through an instancer sidesteps that
 *   failure mode entirely.
 * - Reads this site's MotionPreference toggle (see src/context/MotionPreference.jsx):
 *   with reduced motion on, the word appears fully inked immediately instead
 *   of animating the stroke.
 *
 * Three things make this behave like handwriting rather than like a fade:
 *
 * 1. The font is parsed from its raw TTF and the glyphs converted to paths. A
 *    web font renders as filled shapes with no outline, so there is nothing
 *    to stroke and nothing to animate — the conversion is what makes a pen
 *    stroke possible at all.
 *
 * 2. Every contour is its own <path>. An SVG dash pattern RESTARTS at each
 *    subpath, so a single path holding the whole word cannot be drawn
 *    progressively: one long dash just makes each letter fully present or
 *    fully absent. Splitting them and staggering the delays is what
 *    produces a pen crossing the word left to right.
 *
 * 3. The weight comes from a filled copy of each glyph underneath, faded in
 *    as the stroke finishes. The fill for a glyph must stay a single path: a
 *    counter — the hole in an "e" or an "a" — is a separate contour, and it
 *    only reads as a hole when the fill rule sees it together with that
 *    glyph's outer contour. This is done per *glyph* (`font.getPaths`,
 *    plural) rather than as one path for the whole word (the reference's
 *    own approach, via `font.getPath(text, …)`, which returns everything
 *    pre-merged into a single Path): keeping each glyph's fill independent
 *    means one glyph's outline data can never corrupt a sibling's — which
 *    is exactly what surfaced the NaN bug described above, since building
 *    one Path per glyph is what let comparing each glyph's own reported
 *    bounding box against what actually painted pin down which specific
 *    glyphs were affected, rather than losing that per-glyph resolution in
 *    one merged path covering the whole word.
 *
 * If the font fails to load, the component renders the text as an ordinary
 * <span> — it degrades to plain text rather than to nothing.
 *
 * Colour comes from `currentColor`, so `className="text-white-50"` styles it.
 */

const DEFAULT_FONT_URL = "/fonts/ShadowsIntoLight.ttf";
const EM = 100; // arbitrary: the viewBox normalises whatever we pick

// One fetch and one parse per font URL, shared by every instance on the page.
const fontCache = new Map();

function loadFont(url) {
    let pending = fontCache.get(url);
    if (!pending) {
        pending = fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`Font request failed: ${res.status}`);
                return res.arrayBuffer();
            })
            .then((buffer) => parseFont(buffer));
        fontCache.set(url, pending);
    }
    return pending;
}

const HandwritingText = ({
    text,
    fontUrl = DEFAULT_FONT_URL,
    duration = 1.5,
    delay = 0.05,
    strokeWidth = 1.6,
    fill = true,
    height = "1.15em",
    className,
}) => {
    const { reducedMotion } = useMotionPreference();
    const [font, setFont] = useState(null);
    const [geom, setGeom] = useState(null);
    const [drawn, setDrawn] = useState(false);
    const [lengths, setLengths] = useState([]);
    const pathRefs = useRef([]);

    useEffect(() => {
        let cancelled = false;
        loadFont(fontUrl)
            .then((f) => {
                if (!cancelled) setFont(f);
            })
            .catch(() => {
                /* falls back to plain text below */
            });
        return () => {
            cancelled = true;
        };
    }, [fontUrl]);

    useEffect(() => {
        if (!font || !text) return;

        // One Path per glyph (already positioned along the baseline via the
        // font's normal advance widths) — see the doc-comment above for why
        // this, rather than font.getPath's single whole-string Path, is
        // what's fed to both the fill and the stroke below.
        const glyphPaths = font.getPaths(text, 0, EM, EM);
        const pad = EM * 0.12; // room for the stroke and any descenders

        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        const glyphs = [];

        glyphPaths.forEach((glyphPath) => {
            const full = glyphPath.toPathData(2);
            if (!full) return; // a space, or any glyph with no ink

            const box = glyphPath.getBoundingBox();
            minX = Math.min(minX, box.x1);
            minY = Math.min(minY, box.y1);
            maxX = Math.max(maxX, box.x2);
            maxY = Math.max(maxY, box.y2);

            glyphs.push({
                full,
                // Split on the moveto that opens each contour, keeping the M
                // with its segment — e.g. an "e" becomes [outer ring, hole].
                contours: full.split(/(?=M)/).filter((d) => d.trim().length > 1),
            });
        });

        if (!glyphs.length) return;

        setGeom({
            glyphs,
            x: minX - pad,
            y: minY - pad,
            w: maxX - minX + pad * 2,
            h: maxY - minY + pad * 2,
        });
        setDrawn(false);
        setLengths([]);
    }, [font, text]);

    const contourCount = geom ? geom.glyphs.reduce((n, g) => n + g.contours.length, 0) : 0;

    useEffect(() => {
        if (!geom) return undefined;
        setLengths(
            pathRefs.current.slice(0, contourCount).map((el) => (el ? el.getTotalLength() : 0))
        );

        if (reducedMotion) {
            setDrawn(true);
            return undefined;
        }

        // Two frames: the first commits the full-length offsets with no
        // transition, the second enables it and moves to zero. Both in one
        // commit leaves nothing to animate.
        const id = requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)));
        return () => cancelAnimationFrame(id);
    }, [geom, contourCount, reducedMotion]);

    // Before the font resolves — and if it never does — the text is still readable.
    if (!geom) {
        return <span className={className}>{text}</span>;
    }

    const count = Math.max(1, contourCount);
    let contourIndex = -1;

    return (
        <svg
            key={text}
            viewBox={`${geom.x} ${geom.y} ${geom.w} ${geom.h}`}
            role="img"
            aria-label={text}
            className={["inline-block", className].filter(Boolean).join(" ")}
            style={{
                height,
                width: `calc(${height} * ${(geom.w / geom.h).toFixed(4)})`,
                overflow: "visible",
            }}
        >
            {geom.glyphs.map((glyph, gi) => (
                <g key={gi}>
                    {fill && (
                        <path
                            d={glyph.full}
                            fill="currentColor"
                            stroke="none"
                            style={{
                                opacity: drawn ? 1 : 0,
                                transition:
                                    drawn && !reducedMotion
                                        ? `opacity 0.45s ease-out ${(delay + duration * 0.72).toFixed(3)}s`
                                        : "none",
                            }}
                        />
                    )}
                    {glyph.contours.map((d, ci) => {
                        contourIndex += 1;
                        const i = contourIndex;
                        const length = lengths[i] || 0;
                        // Contours overlap slightly so the stroke reads as one
                        // continuous movement rather than as letters
                        // switching on in turn.
                        const each = (duration / count) * 2.4;
                        const start = delay + (i / count) * duration;
                        return (
                            <path
                                key={ci}
                                ref={(el) => {
                                    pathRefs.current[i] = el;
                                }}
                                d={d}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={strokeWidth}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                    strokeDasharray: length || 1,
                                    strokeDashoffset: drawn ? 0 : length || 1,
                                    transition:
                                        drawn && !reducedMotion
                                            ? `stroke-dashoffset ${each.toFixed(3)}s ease-out ${start.toFixed(3)}s`
                                            : "none",
                                }}
                            />
                        );
                    })}
                </g>
            ))}
        </svg>
    );
};

export default HandwritingText;
