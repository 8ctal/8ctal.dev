import { useEffect, useRef } from "react";
import { createRenderer } from "./black_hole/renderer";

/**
 * The hero's WebGPU centerpiece: a raymarched black hole (gravitational
 * lensing + a Doppler-shifted accretion disk), ported from vercel-labs/vgpu
 * (MIT). Drag/touch orbits the camera. Mount this only after confirming
 * `navigator.gpu` exists — see HeroExperience.jsx, which falls back to the
 * three.js desk scene otherwise.
 */
const BlackHoleCanvas = ({ onError }) => {
    const canvasRef = useRef(null);
    // Keep the latest callback without making it a mount/unmount dependency
    // — the renderer shouldn't tear down and reinitialize just because the
    // parent re-rendered with a new inline function.
    const onErrorRef = useRef(onError);
    onErrorRef.current = onError;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const renderer = createRenderer({ canvas });
        // The adapter can still be denied even when navigator.gpu exists
        // (driver/device quirks); surface that so the caller can fall back
        // instead of leaving a blank canvas.
        renderer.ready?.catch((error) => onErrorRef.current?.(error));

        return () => renderer.dispose();
    }, []);

    return (
        <div className="relative h-full w-full overflow-hidden">
            <canvas ref={canvasRef} className="block h-full w-full touch-none" />
        </div>
    );
};

export default BlackHoleCanvas;
