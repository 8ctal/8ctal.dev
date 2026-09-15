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
// Mobile used to get this same scene too, just at reduced steps/resolution
// — but even cut down, a phone GPU is still doing a per-pixel raymarch
// every frame, which is what read as "un poco de lag" (the user's words):
// tuning it down further only makes it cheaper, not free, since it's still
// the same shader. ref_components/optimized_black_hole (a real second
// render path built for exactly this) turned out to be gated behind a paid
// 21st.dev account this project doesn't have — confirmed via both a direct
// fetch and the CLI, both refused with "Marketplace membership required"
// even once authenticated. Rather than keep paying a WebGL cost on every
// phone that opens this site, mobile now gets a plain static image of the
// same scene instead (a screenshot of this exact shader, mid-render,
// downsized and re-encoded — see public/images/hero-blackhole-mobile.jpg)
// — zero GPU context, zero per-frame cost, same visual at a glance.
const MOBILE_IMAGE_SRC = "/images/hero-blackhole-mobile.jpg";

const HeroExperience = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    // Neither scene was ever unmounted on scroll before, so its render loop
    // (and GPU context) stayed alive forever — starving other WebGL/WebGPU
    // contexts created later in the page. Dispose the renderer while the
    // hero is off-screen and recreate it on return; BlackHoleHeroSection
    // also pauses its own render loop via IntersectionObserver, but that
    // still leaves the GL context (and its render targets) allocated, so
    // this unmount is what actually frees the GPU memory. The image path
    // below never allocates a GL context in the first place, so it has
    // nothing to free — isVisible only gates mounting the real 3D scene.
    const [containerRef, isVisible] = useInView();

    if (isMobile) {
        return (
            <div className="relative h-full w-full overflow-hidden bg-black">
                <img
                    src={MOBILE_IMAGE_SRC}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                />
            </div>
        );
    }

    return (
        <div ref={containerRef} className="w-full h-full">
            {/* No steps/resolution/maxDpr override anymore — those existed
                only to cut quality for the mobile case, which no longer
                renders this at all, so the component's own (desktop-tuned)
                defaults apply unconditionally here. */}
            {isVisible && <BlackHoleHeroSection />}
        </div>
    );
};

export default HeroExperience;
