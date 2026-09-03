import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useMotionPreference } from "../context/MotionPreference";

// Elements that trigger the ring's hover-grow state, and elements the ring
// gets pulled toward (see releaseMagnetic/updateMagnetic below). Ported
// from camosdigital's CircleCursor.tsx — same two selectors there.
const HOVER_SELECTOR = "a, button, [data-cursor]";
const MAGNETIC_SELECTOR = "[data-magnetic]";
const HOVER_CAPABLE_QUERY = "(hover: hover) and (pointer: fine)";

const RING_SIZE = 38;
const HOVER_SIZE = 64;
const HOVER_SCALE = HOVER_SIZE / RING_SIZE; // ≈ 1.684

const RING_LERP = 0.16;
const DOT_FOLLOW_S = 0.1;
const HOVER_TWEEN_S = 0.35;
const PRESS_TWEEN_S = 0.15;
const FADE_TWEEN_S = 0.2;

const MAGNETIC_PULL_X = 0.28;
const MAGNETIC_PULL_Y = 0.4;

// Ticker parks itself once ring movement stays below this for SETTLE_MS —
// no point paying a rAF tick once the ring has visibly caught up.
const SETTLE_EPS_PX = 0.01;
const SETTLE_MS = 2000;

const RING_SHADOW_IDLE = "inset 0 0 0 1px rgba(217, 236, 255, 0.55)";
const RING_SHADOW_HOVER = "inset 0 0 0 1px rgba(217, 236, 255, 0.95)";
const RING_BG_IDLE = "rgba(217, 236, 255, 0)";
const RING_BG_HOVER = "rgba(217, 236, 255, 0.08)";

/**
 * Two-element custom cursor: a near-instant 6px dot and a lerped 38px ring,
 * both mix-blend-difference (so they read against any background — dark
 * canvas, glass panel, or the black hole). Ported from camosdigital's
 * CircleCursor.tsx onto this project's tokens.
 *
 * Only mounts on fine-pointer, hover-capable devices, and only while the
 * site's own reduce-motion toggle is off (the reference gated this purely
 * on the OS prefers-reduced-motion media query; here it also reacts to the
 * in-page toggle in NavBar, since that's the one the user actually
 * controls — see MotionPreference). Touch and reduced-motion visitors
 * never render or pay for the dot/ring elements at all.
 */
const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const { reducedMotion } = useMotionPreference();

    const [hoverCapable, setHoverCapable] = useState(
        () => typeof window !== "undefined" && window.matchMedia(HOVER_CAPABLE_QUERY).matches
    );

    useEffect(() => {
        const mql = window.matchMedia(HOVER_CAPABLE_QUERY);
        const onChange = () => setHoverCapable(mql.matches);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    const active = hoverCapable && !reducedMotion;

    useGSAP(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!active || !dot || !ring) return undefined;

        const root = document.documentElement;
        root.classList.add("has-custom-cursor");

        // Base centering — a CSS translate(-50%,-50%) would be clobbered by
        // gsap's x/y transforms, so bake it in as xPercent/yPercent once.
        gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

        const dotX = gsap.quickTo(dot, "x", { duration: DOT_FOLLOW_S, ease: "power2.out" });
        const dotY = gsap.quickTo(dot, "y", { duration: DOT_FOLLOW_S, ease: "power2.out" });

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        let hasPointerAppeared = false;
        let isVisible = false;
        let isHovering = false;
        let isTicking = false;
        let lastUnsettledAt = 0;
        let magneticEl = null;

        /* ── ring trail ticker (parked while settled) ─────────── */

        const tick = () => {
            const dx = mouseX - ringX;
            const dy = mouseY - ringY;
            ringX += dx * RING_LERP;
            ringY += dy * RING_LERP;
            gsap.set(ring, { x: ringX, y: ringY });

            const now = performance.now();
            if (Math.abs(dx) >= SETTLE_EPS_PX || Math.abs(dy) >= SETTLE_EPS_PX) {
                lastUnsettledAt = now;
            } else if (now - lastUnsettledAt > SETTLE_MS) {
                stopTicker();
            }
        };

        const startTicker = () => {
            if (isTicking) return;
            isTicking = true;
            lastUnsettledAt = performance.now();
            gsap.ticker.add(tick);
        };

        const stopTicker = () => {
            if (!isTicking) return;
            isTicking = false;
            gsap.ticker.remove(tick);
        };

        /* ── visibility ────────────────────────────────────────── */

        const setVisible = (next) => {
            if (isVisible === next) return;
            isVisible = next;
            gsap.to([dot, ring], { autoAlpha: next ? 1 : 0, duration: FADE_TWEEN_S });
        };

        /* ── hover grow ────────────────────────────────────────── */

        const setHovering = (next) => {
            if (isHovering === next) return;
            isHovering = next;
            gsap.to(ring, {
                scale: next ? HOVER_SCALE : 1,
                boxShadow: next ? RING_SHADOW_HOVER : RING_SHADOW_IDLE,
                backgroundColor: next ? RING_BG_HOVER : RING_BG_IDLE,
                duration: HOVER_TWEEN_S,
                ease: "expo.out",
            });
        };

        /* ── magnetic pull ─────────────────────────────────────── */

        const releaseMagnetic = () => {
            if (!magneticEl) return;
            gsap.to(magneticEl, { x: 0, y: 0, duration: 0.55, ease: "expo.out" });
            magneticEl = null;
        };

        const updateMagnetic = (e, target) => {
            const next = target?.closest(MAGNETIC_SELECTOR) ?? null;
            if (next !== magneticEl) {
                releaseMagnetic();
                magneticEl = next;
            }
            if (!magneticEl) return;

            // Measure the element's untranslated center so the pull doesn't
            // feed back into itself as the element moves.
            const rect = magneticEl.getBoundingClientRect();
            const currentX = Number(gsap.getProperty(magneticEl, "x"));
            const currentY = Number(gsap.getProperty(magneticEl, "y"));
            const relX = e.clientX - (rect.left + rect.width / 2 - currentX);
            const relY = e.clientY - (rect.top + rect.height / 2 - currentY);
            gsap.to(magneticEl, {
                x: relX * MAGNETIC_PULL_X,
                y: relY * MAGNETIC_PULL_Y,
                duration: 0.4,
                ease: "power3.out",
            });
        };

        /* ── listeners ─────────────────────────────────────────── */

        const onPointerMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!hasPointerAppeared) {
                hasPointerAppeared = true;
                ringX = mouseX;
                ringY = mouseY;
                gsap.set(dot, { x: mouseX, y: mouseY });
                gsap.set(ring, { x: ringX, y: ringY });
            }

            setVisible(true);
            dotX(mouseX);
            dotY(mouseY);
            startTicker();
            updateMagnetic(e, e.target instanceof Element ? e.target : null);
        };

        const onPointerOver = (e) => {
            const target = e.target instanceof Element ? e.target : null;
            setHovering(Boolean(target?.closest(HOVER_SELECTOR)));
        };

        const onPointerDown = () => {
            gsap.to(dot, { scale: 0.6, duration: PRESS_TWEEN_S, ease: "power2.out" });
        };

        const onPointerUp = () => {
            gsap.to(dot, { scale: 1, duration: PRESS_TWEEN_S, ease: "power2.out" });
        };

        const onDocumentLeave = () => {
            setVisible(false);
            setHovering(false);
            releaseMagnetic();
        };

        document.addEventListener("pointermove", onPointerMove, { passive: true });
        document.addEventListener("pointerover", onPointerOver, { passive: true });
        document.addEventListener("pointerdown", onPointerDown, { passive: true });
        document.addEventListener("pointerup", onPointerUp, { passive: true });
        root.addEventListener("mouseleave", onDocumentLeave);

        return () => {
            document.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerover", onPointerOver);
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("pointerup", onPointerUp);
            root.removeEventListener("mouseleave", onDocumentLeave);
            stopTicker();
            root.classList.remove("has-custom-cursor");
        };
    }, [active]);

    if (!active) return null;

    return (
        <>
            <div
                ref={ringRef}
                aria-hidden="true"
                className="pointer-events-none invisible fixed left-0 top-0 z-[300] h-[38px] w-[38px] rounded-full opacity-0 mix-blend-difference will-change-transform shadow-[inset_0_0_0_1px_rgba(217,236,255,0.55)]"
            />
            <div
                ref={dotRef}
                aria-hidden="true"
                className="pointer-events-none invisible fixed left-0 top-0 z-[300] size-1.5 rounded-full bg-white-50 opacity-0 mix-blend-difference will-change-transform"
            />
        </>
    );
};

export default CustomCursor;
