import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Button from "../components/Button";
import HandwritingText from "../components/HandwritingText";
import { useLanguage } from "../context/Language";
import HeroExperience from "../components/models/hero_models/HeroExperience";

const Hero = () => {
    const { words, t } = useLanguage();

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
                                {t.hero.titlePrefix}
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
                            <h1>{t.hero.titleLine1}</h1>
                            <h1>{t.hero.titleLine2}</h1>
                        </div>

                        {/* The handwriting accent lives on the greeting, not
                            the headline — a short phrase keeps the SVG run
                            legible at this width; the full sentence would
                            have to shrink too far to still read as cursive. */}
                        <div className="w-full max-w-full space-y-1 overflow-hidden sm:space-y-0">
                            <p className="w-full max-w-full text-xs leading-relaxed text-white-50 sm:text-sm md:text-xl relative z-10 pointer-events-none">
                                <HandwritingText
                                    text={t.hero.greeting1}
                                    height="clamp(1.75em, 7vw, 2.5em)"
                                    duration={2.6}
                                />
                            </p>
                            <p className="w-full max-w-full text-xs leading-relaxed text-white-50 sm:text-sm md:text-xl relative z-10 pointer-events-none">
                                {/* Starts once the first line is mostly written,
                                    so the two lines read as written one after
                                    the other rather than scribbled at once. */}
                                <HandwritingText
                                    text={t.hero.greeting2}
                                    height="clamp(1.75em, 7vw, 2.5em)"
                                    duration={2.4}
                                    delay={1.6}
                                />
                            </p>
                        </div>


                        <Button
                            text={t.hero.cta}
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
        </section>
    );
};

export default Hero;