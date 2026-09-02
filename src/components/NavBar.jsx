import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { navLinks } from "../constants";
import { useMotionPreference } from "../context/MotionPreference";

const NavBar = () => {
    // track if the user has scrolled down the page
    const [scrolled, setScrolled] = useState(false);
    // track whether the mobile nav overlay is open
    const [menuOpen, setMenuOpen] = useState(false);
    const { reducedMotion, setReducedMotion } = useMotionPreference();

    const overlayRef = useRef(null);
    const linkRefs = useRef([]);
    const firstLinkRef = useRef(null);

    useEffect(() => {
        // create an event listener for when the user scrolls
        const handleScroll = () => {
            // check if the user has scrolled down at least 10px
            // if so, set the state to true
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        // add the event listener to the window
        window.addEventListener("scroll", handleScroll);

        // cleanup the event listener when the component is unmounted
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // While the mobile nav is open: lock body scroll, let Escape close it,
    // and move keyboard focus into the overlay.
    useEffect(() => {
        if (!menuOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        firstLinkRef.current?.focus();

        const handleKeyDown = (e) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [menuOpen]);

    // One authored motion moment: the glass overlay fades/blurs in, then its
    // links rise into place with a short stagger. Reverses on close.
    useGSAP(() => {
        if (!overlayRef.current) return;

        const tl = gsap.timeline();

        if (menuOpen) {
            tl.set(overlayRef.current, { pointerEvents: "auto" })
                .fromTo(
                    overlayRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.45, ease: "power2.out" }
                )
                .fromTo(
                    linkRefs.current,
                    { y: 24, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "expo.out" },
                    "-=0.25"
                );
        } else {
            tl.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    if (overlayRef.current) overlayRef.current.style.pointerEvents = "none";
                },
            });
        }
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
            <div className="inner">
                <a href="#hero" className="logo">
                    <div className="flex items-center gap-2">
                        <img src="/images/logo_8ball.png" alt="logo" className="h-15 w-auto" />
                        <p>| 8ctal</p>
                    </div>
                </a>

                <nav className="desktop">
                    <ul>
                        {navLinks.map(({ link, name }) => (
                            <li key={name} className="group">
                                <a href={link}>
                                    <span>{name}</span>
                                    <span className="underline" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-3">
                    <a href="#contact" className="contact-btn group hidden lg:flex">
                        <div className="inner">
                            <span>Contáctame</span>
                        </div>
                    </a>

                    <button
                        type="button"
                        className="motion-toggle glass-panel"
                        aria-pressed={reducedMotion}
                        aria-label={reducedMotion ? "Activar animaciones" : "Reducir animaciones"}
                        title={reducedMotion ? "Animaciones reducidas" : "Animaciones activas"}
                        onClick={() => setReducedMotion((prev) => !prev)}
                    >
                        {reducedMotion ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <line x1="4" y1="12" x2="20" y2="12" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 12 8 12 10 6 14 18 16 12 21 12" />
                            </svg>
                        )}
                    </button>

                    <button
                        type="button"
                        className="nav-toggle glass-panel"
                        aria-expanded={menuOpen}
                        aria-controls="mobile-nav"
                        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        {menuOpen ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile nav overlay: a full-screen glass panel, hidden until opened. */}
            <div
                id="mobile-nav"
                ref={overlayRef}
                className="mobile-nav-overlay glass-panel-strong opacity-0 pointer-events-none lg:hidden"
                aria-hidden={!menuOpen}
            >
                <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-5">
                    {navLinks.map(({ link, name }, index) => (
                        <a
                            key={name}
                            href={link}
                            className="mobile-nav-link"
                            ref={(el) => {
                                linkRefs.current[index] = el;
                                if (index === 0) firstLinkRef.current = el;
                            }}
                            onClick={closeMenu}
                        >
                            {name}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="mobile-nav-link text-white"
                        ref={(el) => (linkRefs.current[navLinks.length] = el)}
                        onClick={closeMenu}
                    >
                        Contáctame
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;
