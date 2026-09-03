import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import HandwritingText from "../components/HandwritingText";
import { words } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";

const Hero = () => {
    useGSAP(() => {
        gsap.fromTo(
            ".hero-text h1",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
        );
    });

    return (
        <section id="hero" className="relative overflow-hidden">
            <div className="absolute top-0 left-0 z-10">
                <img src="/images/bg.png" alt="" />
            </div>

            <div className="hero-layout">
                {/* LEFT: Hero Content */}
                <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
                    <div className="flex flex-col gap-7">
                        <div className="hero-text">
                            <h1>
                                Convirtiendo
                                <span className="slide">
                                    <span className="wrapper">
                                        {words.map((word, index) => (
                                            <span
                                                key={index}
                                                className="flex items-center md:gap-3 gap-1 pb-2"
                                            >
                                                <img
                                                    src={word.imgPath}
                                                    alt="person"
                                                    className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                                                />
                                                <span>{word.text}</span>
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </h1>
                            <h1>en proyectos reales</h1>
                            <h1>que dan resultados</h1>
                        </div>

                        {/* The handwriting accent lives on the greeting, not
                            the headline — a short phrase keeps the SVG run
                            legible at this width; the full sentence would
                            have to shrink too far to still read as cursive. */}
                        <div className="w-full max-w-full space-y-1 overflow-hidden sm:space-y-0">
                            <p className="w-full max-w-full text-xs leading-relaxed text-white-50 sm:text-sm md:text-xl relative z-10 pointer-events-none">
                                <HandwritingText text="¡Hola! Soy Camilo un ingeniero de software Colombiano" height="clamp(1.75em, 7vw, 2.5em)" />
                            </p>
                            <p className="w-full max-w-full text-xs leading-relaxed text-white-50 sm:text-sm md:text-xl relative z-10 pointer-events-none">
                                <HandwritingText text="Apasionado por la creación de experiencias digitales" height="clamp(1.75em, 7vw, 2.5em)" />
                            </p>
                        </div>


                        <Button
                            text="Mira mi trabajo"
                            className="md:w-80 md:h-16 w-60 h-12"
                            id="counter"
                        />


                    </div>
                </header>

                {/* RIGHT: 3D Model or Visual */}
                <figure>
                    <div className="hero-3d-layout">
                        <HeroExperience />
                    </div>
                </figure>
            </div>

            <AnimatedCounter />
        </section>
    );
};

export default Hero;