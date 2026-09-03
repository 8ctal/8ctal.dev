import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cvLink } from "../constants";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import Button from "./Button";
import { useMotionPreference } from "../context/MotionPreference";

const FloatingCVButton = () => {
    const { reducedMotion } = useMotionPreference();

    useGSAP(() => {
        // Animate the floating button in - faster and more intuitive
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
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                    trigger: ".cv-animated-div",
                    start: "top 60%", // cuando el top del botón entra en el bottom del viewport
                    toggleActions: "play none none none", // anima solo una vez
                },


            }
        );
    }, []);

    // Kept in its own useGSAP, gated on reducedMotion, rather than in the
    // effect above: the site-wide reduce-motion toggle works by fast-
    // forwarding gsap.globalTimeline (see MotionPreference.jsx) — fine for
    // the one-shot entrance above, but an *infinite* yoyo tween sped up
    // 50x never finishes, it just oscillates 50x faster forever, which is
    // what made this button vibrate up and down rapidly once the toggle
    // was on. Not creating the loop at all when reducedMotion is true (and
    // letting useGSAP's context revert kill it the moment the toggle
    // flips on) is what actually honors "reduced motion" here.
    useGSAP(() => {
        if (reducedMotion) return;

        gsap.to(".cv-animated-div", {
            y: "+=10",
            duration: 2.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1,
        });
    }, [reducedMotion]);

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