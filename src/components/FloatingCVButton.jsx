import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cvLink } from "../constants";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import Button from "./Button";

const FloatingCVButton = () => {
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

        // Add subtle floating animation - more subtle and faster
        gsap.to(".cv-animated-div", {
            y: "+=10",
            duration: 2.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1,
        });
    }, []);

    return (
        <div className="cv-animated-div fixed bottom-15 right-9
                        sm:bottom-8 sm:right-8
                        md:bottom-15 md:right-10
                        z-50">
            <a href={cvLink} className="group" target="_blank"
                rel="noopener noreferrer">
                <img
                    src="/images/cv_button.png"
                    alt="CV"
                    className="   w-12 h-12        
                    sm:w-14 sm:h-14   
                    md:w-16 md:h-16 
                    transition duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:invert"
                />
            </a>
        </div>

    );
};

export default FloatingCVButton;