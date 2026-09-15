import { useMediaQuery } from "react-responsive";

import BlackHoleHeroSection from "./BlackHoleHeroSection";
import useInView from "../../../hooks/useInView";

// Previously this branched on WebGPU support and hardware class: a
// WebGPU-only raymarched black hole (BlackHoleCanvas.jsx/black_hole/) on
// capable desktops, and a completely different three.js desk scene
// (HeroFallbackScene.jsx) everywhere else — which meant every phone and
// tablet, and every browser without WebGPU, never saw the black hole at
// all. BlackHoleHeroSection is a plain-WebGL2/WebGL1 port (see its own file
// header) that runs anywhere a <canvas> does, so it replaces both branches:
// one visual, on every device, at the cost of the old version's
// drag-to-orbit interactivity (the camera here holds still; only the gas
// moves) — a deliberate trade from the redesign brief, not an oversight.
// BlackHoleCanvas.jsx, black_hole/, and HeroFallbackScene.jsx (plus the
// three.js desk model/particles/lights it alone used) are left in the repo
// unused rather than deleted, in case any of that is wanted again.
const HeroExperience = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    // Neither scene was ever unmounted on scroll before, so its render loop
    // (and GPU context) stayed alive forever — starving other WebGL/WebGPU
    // contexts created later in the page. Dispose the renderer while the
    // hero is off-screen and recreate it on return; BlackHoleHeroSection
    // also pauses its own render loop via IntersectionObserver, but that
    // still leaves the GL context (and its render targets) allocated, so
    // this unmount is what actually frees the GPU memory.
    const [containerRef, isVisible] = useInView();

    return (
        <div ref={containerRef} className="w-full h-full">
            {isVisible && (
                <BlackHoleHeroSection
                    // Mobile GPUs foot the same per-pixel raymarch cost as
                    // desktop ones for a shader like this — fewer steps and
                    // a lower render scale is what actually keeps it smooth
                    // there, not a different scene. 300/0.7 (the component's
                    // own defaults) is comfortably desktop-only otherwise.
                    steps={isMobile ? 170 : 300}
                    resolution={isMobile ? 0.55 : 0.7}
                    maxDpr={isMobile ? 1.5 : 1.75}
                />
            )}
        </div>
    );
};

export default HeroExperience;
