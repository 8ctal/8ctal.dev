import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { certifications } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
    useGSAP(() => {
        // Animate certification cards as they come into view (simplified)
        gsap.utils.toArray(".certification-card").forEach((card) => {
            gsap.from(card, {
                yPercent: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                },
            });
        });

        // Removed individual skill badge animations for better performance
    }, []);

    return (
        <section
            id="certifications"
            className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
        >
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader
                    title="Certificaciones"
                    sub="🏆 Credenciales que validan mi experiencia"
                />
                
                <div className="mt-32">
                    <div className="grid-3-cols gap-8">
                        {certifications.map((cert, index) => (
                            <div key={cert.credentialId} className="certification-card">
                                <GlowCard card={cert} showStars={false}>
                                    <div className="flex flex-col h-full">
                                        {/* Header with logo and title */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-16 h-16 rounded-lg bg-white-50 flex items-center justify-center p-2">
                                                <img 
                                                    src={cert.imgPath} 
                                                    alt={cert.title}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-xl text-white">
                                                    {cert.title}
                                                </h3>
                                                <p className="text-blue-50 text-sm">
                                                    {cert.issuer}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="mb-6 flex-grow">
                                            <p className="text-white-50 text-base leading-relaxed">
                                                {cert.description}
                                            </p>
                                        </div>

                                        {/* Date and Credential ID */}
                                        <div className="mb-6">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-blue-50">
                                                    🗓️ {cert.date}
                                                </span>
                                                <span className="text-blue-50 font-mono">
                                                    ID: {cert.credentialId}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Skills */}
                                        <div className="mb-6">
                                            <p className="text-blue-50 text-sm font-medium mb-3">
                                                Habilidades certificadas:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {cert.skills.map((skill, skillIndex) => (
                                                    <span
                                                        key={skillIndex}
                                                        className="bg-black-200 text-white-50 text-xs px-3 py-1 rounded-full border border-blue-50/20"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Verify button */}
                                        <div className="mt-auto relative z-10">
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-white-50 transition-colors duration-300 group pointer-events-auto relative z-20"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Verificar certificación
                                                <svg 
                                                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </GlowCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
