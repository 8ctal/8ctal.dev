import { useMemo, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

import { useLanguage } from "../context/Language";
import TitleHeader from "../components/TitleHeader";
import CertificationScrollStack from "../components/CertificationScrollStack";
import CertificationGallery from "../components/CertificationGallery";

gsap.registerPlugin(ScrollTrigger);

const ALL_TECH = "all";

const Certifications = () => {
    const { certifications, t } = useLanguage();
    // Same breakpoint CardStack.jsx and CertificationCard's callers use
    // elsewhere for this split — below it, ref_components/
    // scrollable_card_stack (a vertical, scroll/swipe-driven deck); at or
    // above it, ref_components/expandable_gallery (a scattered preview
    // that expands into a full-width grid), since it makes better use of
    // the extra screen space than a single-card carousel would.
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const [activeTech, setActiveTech] = useState(ALL_TECH);

    // A flat, deduplicated list of every technology tag across all certs —
    // this is what the filter row is built from, so adding a cert with a
    // new tag (constants/index.js) is the only thing needed to grow it.
    const technologies = useMemo(() => {
        const set = new Set();
        certifications.forEach((cert) => cert.technologies?.forEach((tech) => set.add(tech)));
        return Array.from(set).sort();
    }, [certifications]);

    const filtered = useMemo(() => {
        if (activeTech === ALL_TECH) return certifications;
        return certifications.filter((cert) => cert.technologies?.includes(activeTech));
    }, [certifications, activeTech]);

    useGSAP(() => {
        gsap.fromTo(
            "#certifications .cert-stack",
            { yPercent: 15, opacity: 0 },
            {
                yPercent: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#certifications .cert-stack",
                    start: "top 85%",
                },
            }
        );
    }, []);

    return (
        <section
            id="certifications"
            className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
        >
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader
                    title={t.certifications.title}
                    sub={t.certifications.sub}
                />

                {/* Only worth showing once there's more than one tag to
                    choose between — with today's handful of certs "All" vs
                    one other tag isn't a real choice yet, but this grows on
                    its own as more certifications (and tags) get added. */}
                {technologies.length > 1 && (
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveTech(ALL_TECH)}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
                                activeTech === ALL_TECH
                                    ? "glass-panel text-white"
                                    : "text-blue-50 hover:text-white-50"
                            }`}
                        >
                            {t.certifications.filterAll}
                        </button>
                        {technologies.map((tech) => (
                            <button
                                key={tech}
                                type="button"
                                onClick={() => setActiveTech(tech)}
                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
                                    activeTech === tech
                                        ? "glass-panel text-white"
                                        : "text-blue-50 hover:text-white-50"
                                }`}
                            >
                                {tech}
                            </button>
                        ))}
                    </div>
                )}

                <div className="cert-stack mt-16">
                    {isMobile ? (
                        <CertificationScrollStack items={filtered} />
                    ) : (
                        <CertificationGallery items={filtered} />
                    )}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
