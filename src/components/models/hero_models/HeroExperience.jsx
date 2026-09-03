import { useState, lazy, Suspense } from "react";
import { useMediaQuery } from "react-responsive";

import BlackHoleCanvas from "./BlackHoleCanvas";
import useInView from "../../../hooks/useInView";

// react-three-fiber/drei/three only ship to browsers that actually take
// this branch (no WebGPU, or the adapter got denied) — see
// HeroFallbackScene.jsx.
const HeroFallbackScene = lazy(() => import("./HeroFallbackScene"));

const supportsWebGPU = () =>
    typeof navigator !== "undefined" && Boolean(navigator.gpu);

// The black hole raymarches a full-screen shader *and* runs a 4-pass bloom
// (bright-pass + 4 blurs + composite) every frame — see black_hole/pipeline.ts.
// That's too fill-rate-heavy for mobile GPUs regardless of WebGPU support,
// which some Android Chrome builds do have. Rather than a device-model
// allowlist, this checks for the hardware class the cost actually scales
// with: a coarse (touch) pointer at phone/tablet width. Desktops keep the
// full black hole; phones and tablets always get the three.js fallback
// scene below, same as browsers with no WebGPU at all.
const isLowPowerGpuClass = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(pointer: coarse)").matches &&
    window.matchMedia?.("(max-width: 1024px)").matches;

const HeroExperience = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

    // The black hole is a WebGPU shader (see black_hole/). Browsers without
    // WebGPU (older Safari, several mobiles) fall back to the three.js desk
    // scene below instead of showing a blank canvas — same if the adapter
    // gets denied after the fact (onError), and same on any low-power-GPU
    // touch device even when it does support WebGPU (see isLowPowerGpuClass).
    const [useBlackHole, setUseBlackHole] = useState(
        () => supportsWebGPU() && !isLowPowerGpuClass()
    );

    // Neither scene ever unmounted on scroll, so its render loop (and GPU
    // context) stayed alive forever — with the black hole's continuous
    // raymarch+bloom pipeline, that starved other WebGL contexts created
    // later in the page (they'd immediately fire "Context Lost"). Dispose
    // the renderer while the hero is off-screen and recreate it on return.
    const [containerRef, isVisible] = useInView();

    return (
        <div ref={containerRef} className="w-full h-full">
            {isVisible &&
                (useBlackHole ? (
                    <BlackHoleCanvas onError={() => setUseBlackHole(false)} />
                ) : (
                    <Suspense fallback={null}>
                        <HeroFallbackScene isMobile={isMobile} isTablet={isTablet} />
                    </Suspense>
                ))}
        </div>
    );
};

export default HeroExperience;
