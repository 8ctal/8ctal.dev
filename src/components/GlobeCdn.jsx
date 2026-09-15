// Ported from ref_components/globe_cdn.tsx (21st.dev community component,
// itself `npx shadcn add "https://21st.dev/r/shuding/cobe-globe-cdn"`), with
// the TS types dropped and one deliberate cut from the reference: its
// floating "req/s" traffic counters and marker-region labels, both laid out
// with the experimental CSS Anchor Positioning API (`position-anchor`,
// `anchor()`) that has no fallback in browsers that don't support it yet —
// those elements would just stack unpositioned in the top-left corner
// there. More importantly, invented request-per-second numbers next to a
// contact form would read as a fabricated metric about this site's own
// infrastructure, which it isn't. What's left is the globe itself: the
// same drag-to-spin canvas with the same marker/arc *data* still feeding
// cobe's own rendering (the dots and arcs drawn on the sphere itself,
// which is plain canvas, not CSS anchor positioning).
import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

const defaultMarkers = [
    { id: "cdn-iad", location: [38.95, -77.45] },
    { id: "cdn-sfo", location: [37.62, -122.38] },
    { id: "cdn-cdg", location: [49.01, 2.55] },
    { id: "cdn-hnd", location: [35.55, 139.78] },
    { id: "cdn-syd", location: [-33.95, 151.18] },
    { id: "cdn-gru", location: [-23.43, -46.47] },
    { id: "cdn-sin", location: [1.36, 103.99] },
    { id: "cdn-arn", location: [59.65, 17.93] },
    { id: "cdn-dub", location: [53.43, -6.25] },
    { id: "cdn-bom", location: [19.09, 72.87] },
];

const defaultArcs = [
    { id: "cdn-arc-1", from: [38.95, -77.45], to: [49.01, 2.55] },
    { id: "cdn-arc-2", from: [37.62, -122.38], to: [35.55, 139.78] },
    { id: "cdn-arc-3", from: [49.01, 2.55], to: [1.36, 103.99] },
    { id: "cdn-arc-4", from: [38.95, -77.45], to: [-23.43, -46.47] },
    { id: "cdn-arc-5", from: [35.55, 139.78], to: [-33.95, 151.18] },
    { id: "cdn-arc-6", from: [49.01, 2.55], to: [19.09, 72.87] },
];

export function GlobeCdn({ markers = defaultMarkers, arcs = defaultArcs, className = "", speed = 0.003 }) {
    const canvasRef = useRef(null);
    const pointerInteracting = useRef(null);
    const dragOffset = useRef({ phi: 0, theta: 0 });
    const phiOffsetRef = useRef(0);
    const thetaOffsetRef = useRef(0);
    const isPausedRef = useRef(false);

    const handlePointerDown = useCallback((e) => {
        pointerInteracting.current = { x: e.clientX, y: e.clientY };
        if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        isPausedRef.current = true;
    }, []);

    const handlePointerUp = useCallback(() => {
        if (pointerInteracting.current !== null) {
            phiOffsetRef.current += dragOffset.current.phi;
            thetaOffsetRef.current += dragOffset.current.theta;
            dragOffset.current = { phi: 0, theta: 0 };
        }
        pointerInteracting.current = null;
        if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        isPausedRef.current = false;
    }, []);

    useEffect(() => {
        const handlePointerMove = (e) => {
            if (pointerInteracting.current !== null) {
                dragOffset.current = {
                    phi: (e.clientX - pointerInteracting.current.x) / 300,
                    theta: (e.clientY - pointerInteracting.current.y) / 1000,
                };
            }
        };
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("pointerup", handlePointerUp, { passive: true });
        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [handlePointerUp]);

    useEffect(() => {
        if (!canvasRef.current) return undefined;
        const canvas = canvasRef.current;
        let globe = null;
        let animationId;
        let phi = 0;

        function init() {
            const width = canvas.offsetWidth;
            if (width === 0 || globe) return;

            globe = createGlobe(canvas, {
                devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
                width,
                height: width,
                phi: 0,
                theta: 0.2,
                dark: 1,
                diffuse: 1.2,
                mapSamples: 16000,
                mapBrightness: 6,
                // Signal-white markers/arcs on a near-black globe — the same
                // Liquid Glass palette (DESIGN.md § Colors) as the rest of
                // the site's floating chrome, not the reference's light,
                // high-contrast "CDN dashboard" look.
                baseColor: [0.08, 0.09, 0.11],
                markerColor: [0.85, 0.93, 1],
                glowColor: [0.24, 0.27, 0.32],
                markerElevation: 0.02,
                markers: markers.map((m) => ({ location: m.location, size: 0.05 })),
                arcs: arcs.map((a) => ({ from: a.from, to: a.to })),
                arcColor: [0.38, 0.66, 1],
                arcWidth: 0.6,
                arcHeight: 0.25,
                opacity: 0.85,
            });

            // cobe has no internal render loop — the caller drives it by
            // calling .update() every frame with the next phi/theta.
            function animate() {
                if (!isPausedRef.current) phi += speed;
                globe.update({
                    phi: phi + phiOffsetRef.current + dragOffset.current.phi,
                    theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
                });
                animationId = requestAnimationFrame(animate);
            }
            animate();
            setTimeout(() => canvas && (canvas.style.opacity = "1"));
        }

        if (canvas.offsetWidth > 0) {
            init();
        } else {
            const ro = new ResizeObserver((entries) => {
                if (entries[0]?.contentRect.width > 0) {
                    ro.disconnect();
                    init();
                }
            });
            ro.observe(canvas);
        }

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
            if (globe) globe.destroy();
        };
    }, [markers, arcs, speed]);

    return (
        <div className={`relative aspect-square select-none ${className}`}>
            <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                style={{
                    width: "100%",
                    height: "100%",
                    cursor: "grab",
                    opacity: 0,
                    transition: "opacity 1.2s ease",
                    touchAction: "none",
                }}
            />
        </div>
    );
}

export default GlobeCdn;
