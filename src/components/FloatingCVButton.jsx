import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cvLink } from "../constants";
import { useMotionPreference } from "../context/MotionPreference";

const FloatingCVButton = () => {
    const { reducedMotion } = useMotionPreference();

    useGSAP(() => {
        // Animate the floating button in shortly after mount. This used to
        // be gated on a ScrollTrigger ("top 60%" of the viewport) instead of
        // a plain delay, but the trigger element is `position: fixed` — its
        // bounding rect never moves as the page scrolls, so ScrollTrigger's
        // start position (computed from that rect plus whatever the scroll
        // offset was when it last measured) kept landing on a target that
        // receded by the same amount as any scrolling towards it. In
        // practice the entrance either never played at all, or played at an
        // inconsistent moment depending on incidental refreshes — a fixed,
        // always-on-screen button doesn't need a scroll position to gate on
        // anyway, so it now just animates in once, shortly after the page
        // is ready.
        //
        // Ease is `back.out`, not `elastic.out`: both overshoot past the
        // final value, but elastic keeps oscillating back and forth several
        // times before settling, while back.out overshoots once and eases
        // straight in from there. At the site's normal speed that
        // oscillation reads as a nice bouncy entrance either way, but the
        // reduce-motion toggle runs every GSAP tween at 50x
        // (gsap.globalTimeline.timeScale — see MotionPreference.jsx), which
        // compresses elastic's several back-and-forth cycles into a rapid
        // flicker that read as the button jittering up and down rather than
        // popping in. back.out's single overshoot survives being sped up
        // the same way the rest of the site's animations do.
        gsap.fromTo(
            ".cv-animated-div",
            {
                y: 20,
                autoAlpha: 0,
                scale: 0.95,
            },
            {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 1.5,
                delay: 1,
                ease: "back.out(1.7)",
            }
        );
    }, []);

    // Kept in its own useGSAP, gated on reducedMotion, rather than in the
    // effect above: the site-wide reduce-motion toggle works by fast-
    // forwarding gsap.globalTimeline (see MotionPreference.jsx) — fine for
    // the one-shot entrance above, but an *infinite* yoyo tween sped up
    // 50x never finishes, it just oscillates 50x faster forever, which is
    // what made this button vibrate up and down rapidly once the toggle
    // was on. Not creating the loop at all when reducedMotion is true kills
    // it — but only if the *previous* run (from when reducedMotion was
    // still false) actually gets reverted first. `revertOnUpdate: true` is
    // what makes that happen: by default useGSAP only reverts its
    // gsap.context() on final unmount, not between re-runs triggered by a
    // dependency change, so without it toggling reduced motion mid-session
    // (as opposed to loading the page with it already on) left the already-
    // running loop alive underneath the early `return` below.
    useGSAP(
        () => {
            if (reducedMotion) return;

            gsap.to(".cv-animated-div", {
                y: "+=10",
                duration: 2.5,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: 1,
            });
        },
        { dependencies: [reducedMotion], revertOnUpdate: true }
    );

    return (
        <div className="cv-animated-div fixed bottom-15 right-9
                        sm:bottom-8 sm:right-8
                        md:bottom-15 md:right-10
                        z-50">
            <a
                href={cvLink}
                className="cv-btn glass-panel group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Descargar CV"
                title="Descargar CV"
            >
                <img
                    src="/images/cv_button.png"
                    alt=""
                    className="w-7 h-7 sm:w-8 sm:h-8 transition duration-300 group-hover:rotate-12 group-hover:scale-110"
                />
            </a>
        </div>

    );
};

export default FloatingCVButton;