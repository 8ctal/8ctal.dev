import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { socialImgs } from "../constants";

// The closing marquee + centered CTA + status/socials/copyright row is
// adapted from ref_components (hirael's Contact.tsx, the "last part" of
// that reference the brief pointed at) — the CTA itself stays on this
// site's existing .cta-button/.glass-panel material rather than the
// reference's own button or ref_components/liquid_metal_button (see the
// liquid-metal decision: it repaints the button as an opaque WebGL shader
// with no transparency at all, which breaks the Liquid Glass rule that
// every button shares the same material — DESIGN.md § Components ›
// Buttons). The 3D pool-ball model that used to sit in Contact.jsx's right
// column is now ref_components/globe_cdn (see Contact.jsx / GlobeCdn.jsx);
// nothing 3D lived in Footer.jsx itself before this.
const Marquee = ({ text }) => {
    const trackRef = useRef(null);

    useGSAP(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;
        gsap.to(trackRef.current, {
            xPercent: -50,
            duration: 40,
            ease: "none",
            repeat: -1,
        });
    }, []);

    return (
        <div className="flex overflow-hidden" aria-hidden="true">
            <div ref={trackRef} className="flex w-max shrink-0">
                {Array.from({ length: 2 }).map((_, group) => (
                    <div key={group} className="flex shrink-0">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <span
                                key={i}
                                className="whitespace-nowrap px-6 text-3xl md:text-5xl font-semibold uppercase italic tracking-tight text-white-50/80"
                            >
                                {text} <span className="text-blue-50">&bull;</span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="relative overflow-hidden pt-16 pb-8 md:pt-20 md:pb-10">
            <Marquee text="Construyendo experiencias digitales" />

            <div className="footer md:px-20 px-5 mt-14 md:mt-16">
                <div className="footer-container">
                    <div className="flex flex-col justify-center gap-3 items-center md:items-start">
                        <span className="flex items-center gap-2.5 text-sm text-blue-50">
                            <span className="relative flex size-2.5">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
                                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
                            </span>
                            Disponible para nuevos proyectos
                        </span>
                        <a href="#contact" className="glass-panel group inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-white-50 transition-colors duration-300 hover:text-white">
                            Contáctame
                            <img
                                src="/images/arrow-right.svg"
                                alt=""
                                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </a>
                    </div>

                    <div className="socials">
                        {socialImgs.map((socialImg, index) => (
                            <div key={index} className="icon glass-panel">
                                <a href={socialImg.link} target="_blank" rel="noopener noreferrer">
                                    <img src={socialImg.imgPath} alt="social icon" loading="lazy" />
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col justify-center">
                        <p className="text-center md:text-end">
                            © {new Date().getFullYear()} 8ctal development. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
