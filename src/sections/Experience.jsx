import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion as Motion, useScroll, useTransform } from "framer-motion";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import TimelineLogo from "../components/TimelineLogo";
import SkillsToggle from "../components/SkillsToggle";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef(null);
    const listRef = useRef(null);
    // A ref, not useState: useTransform's array-range form ([0,1] -> [0,
    // lineHeight]) captures its output range once and doesn't reliably
    // pick up a plain number that changes later via React state (this was
    // silently keeping the fill permanently stuck at height 0 — the state
    // update from the measurement effect below was never actually reaching
    // the transform). Reading a ref inside the transform's mapper function
    // instead always sees the current measured height, no matter when it
    // last changed.
    const lineHeightRef = useRef(0);

    // Measures the full height of the card list so the scroll-linked line
    // fill below has a concrete pixel target to animate toward — ported
    // from ref_components/timeline/timeline.tsx's own ref+height pattern.
    useEffect(() => {
        const measure = () => {
            if (listRef.current) lineHeightRef.current = listRef.current.getBoundingClientRect().height;
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    // The neon gradient line (the site's one sanctioned "spark" — see
    // DESIGN.md's "Regla de la Chispa Única") now fills in as the user
    // scrolls through the whole timeline, instead of sitting fully drawn
    // from the start.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 75%", "end 60%"],
    });
    const fillHeight = useTransform(scrollYProgress, (progress) => progress * lineHeightRef.current);
    const fillOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

    useGSAP(() => {
        // Each timeline entry still rises in from the left and fades in as
        // it scrolls into view — one authored moment per entry, on top of
        // the shared line fill above (which tracks the whole section's
        // scroll progress, not any single card).
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
            ref={sectionRef}
            className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
        >
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader
                    title="Experiencia Profesional"
                    sub="Mi trayectoria a lo largo de los años"
                />
                <div className="mt-32 relative">
                    <div className="relative z-50 xl:space-y-20 space-y-10" ref={listRef}>
                        <div className="timeline-wrapper">
                            <div className="gradient-track absolute inset-0" />
                            <Motion.div
                                className="gradient-line absolute top-0 left-0 w-full"
                                style={{ height: fillHeight, opacity: fillOpacity }}
                            />
                        </div>

                        {expCards.map((card) => (
                            <div
                                key={`${card.company}-${card.title}`}
                                className="exp-card-wrapper"
                            >
                                {/* Sticky on desktop — pinned in place while this
                                    entry's content scrolls past, ported from
                                    ref_components/timeline/timeline.tsx's own
                                    sticky year-label column (that reference hides
                                    its column's text below md and shows a plain
                                    inline title instead; ours skips that split and
                                    just turns sticky off below md, since our meta
                                    block carries more than a single "2024" — a
                                    pinned header that size would eat too much of a
                                    small screen). Shares the .timeline-card class
                                    with the content column below so both get the
                                    same GSAP entrance. */}
                                <div className="timeline-card relative z-20 pl-16 md:pl-24 md:sticky md:top-40 md:w-80 lg:w-96 md:shrink-0">
                                    <div className="flex items-start gap-4 md:gap-5">
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
                                </div>

                                <div className="timeline-card relative z-20 pl-16 md:pl-0 md:flex-1 mt-6 md:mt-0">
                                    <div className="exp-card glass-panel">
                                        <p className="text-white-50 text-base md:text-lg leading-relaxed">
                                            {card.summary}
                                        </p>

                                        {/* Optional gallery — inert until an entry in
                                            constants/index.js's expCards sets `images`. */}
                                        {card.images?.length > 0 && (
                                            <div className="grid grid-cols-2 gap-3 mt-6">
                                                {card.images.map((src) => (
                                                    <img
                                                        key={src}
                                                        src={src}
                                                        alt=""
                                                        loading="lazy"
                                                        className="w-full h-32 md:h-40 object-cover rounded-lg"
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {card.stack?.length > 0 && (
                                            <div className="mt-6">
                                                <SkillsToggle skills={card.stack} label="stack" />
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
