import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import TimelineLogo from "../components/TimelineLogo";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    useGSAP(() => {
        // Each timeline entry rises in from the left and fades in as it
        // scrolls into view — one authored moment per entry, nothing else.
        gsap.utils.toArray(".timeline-card").forEach((card) => {
            gsap.from(card, {
                xPercent: -8,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                },
            });
        });

    }, []);

    return (
        <section
            id="experience"
            className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
        >
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader
                    title="Experiencia Profesional"
                    sub="Mi trayectoria a lo largo de los años"
                />
                <div className="mt-32 relative">
                    <div className="relative z-50 xl:space-y-20 space-y-10">
                        <div className="timeline-wrapper">
                            <div className="gradient-line w-1 h-full" />
                        </div>

                        {expCards.map((card) => (
                            <div
                                key={`${card.company}-${card.title}`}
                                className="exp-card-wrapper"
                            >
                                <div className="timeline-card relative z-20 pl-16 md:pl-24">
                                    <div className="flex items-start gap-4 md:gap-5 mb-6">
                                        <div className="timeline-logo glass-panel">
                                            <TimelineLogo
                                                src={card.logoPath}
                                                alt={`Logo de ${card.company}`}
                                                fallbackText={card.company}
                                            />
                                        </div>
                                        <div>
                                            <h1 className="font-semibold text-2xl md:text-3xl">
                                                {card.title}
                                            </h1>
                                            <p className="text-white-50 mt-1">{card.company}</p>
                                            {(card.employmentType || card.location) && (
                                                <p className="text-blue-50 text-sm mt-1">
                                                    {[card.employmentType, card.location]
                                                        .filter(Boolean)
                                                        .join(" · ")}
                                                </p>
                                            )}
                                            <p className="text-blue-50 text-sm mt-1">
                                                {card.date}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="exp-card glass-panel">
                                        <p className="text-white-50 text-base md:text-lg leading-relaxed">
                                            {card.summary}
                                        </p>

                                        {card.stack?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-6">
                                                {card.stack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="bg-black-200 text-white-50 text-xs px-3 py-1 rounded-full border border-blue-50/20"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
