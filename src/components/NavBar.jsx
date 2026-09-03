import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion as Motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";

import { navLinks } from "../constants";
import { useMotionPreference } from "../context/MotionPreference";

// The desktop pill collapses to a small logo-only circle once the page has
// scrolled past this point, and only re-expands once the user has scrolled
// back up past EXPAND_SCROLL_THRESHOLD worth — a small deadband so a single
// stray wheel tick doesn't flicker it open and shut. Ported from
// ref_components/navigation_menu/navigation_menu.tsx's AnimatedNavFramer.
const COLLAPSE_AFTER_Y = 150;
const EXPAND_SCROLL_THRESHOLD = 80;

const pillVariants = {
    expanded: {
        width: "auto",
        transition: {
            type: "spring",
            damping: 22,
            stiffness: 280,
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
    collapsed: {
        width: "3rem",
        transition: {
            type: "spring",
            damping: 22,
            stiffness: 280,
            when: "afterChildren",
            staggerChildren: 0.03,
            staggerDirection: -1,
        },
    },
};

const linkVariants = {
    expanded: { opacity: 1, x: 0, transition: { type: "spring", damping: 16 } },
    collapsed: { opacity: 0, x: -10, transition: { duration: 0.15 } },
};

// The desktop nav links, rebuilt as a framer-motion pill that collapses to a
// logo-only circle on scroll-down and re-expands on scroll-up (see
// ref_components/navigation_menu/). Kept as its own component so its
// framer-motion scroll listener doesn't re-run on every NavBar re-render.
const DesktopNavPill = () => {
    const [expanded, setExpanded] = useState(true);
    const { scrollY } = useScroll();
    const lastY = useRef(0);
    const collapsedAtY = useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = lastY.current;

        if (expanded && latest > previous && latest > COLLAPSE_AFTER_Y) {
            setExpanded(false);
            collapsedAtY.current = latest;
        } else if (!expanded) {
            // Keep tracking the deepest point reached while collapsed —
            // ported from the reference (ref_components/navigation_menu/),
            // whose original version only ever set this once, at the
            // moment of collapsing. That meant scrolling further down
            // afterward, then back up, measured "how far up" against that
            // stale first collapse point instead of wherever the user
            // actually turned around — on a page this tall, that made the
            // pill nearly impossible to bring back without scrolling
            // almost all the way to the top again.
            if (latest > collapsedAtY.current) collapsedAtY.current = latest;
            if (latest < previous && collapsedAtY.current - latest > EXPAND_SCROLL_THRESHOLD) {
                setExpanded(true);
            }
        }

        lastY.current = latest;
    });

    return (
        <Motion.nav
            initial={false}
            animate={expanded ? "expanded" : "collapsed"}
            variants={pillVariants}
            whileHover={!expanded ? { scale: 1.06 } : undefined}
            whileTap={!expanded ? { scale: 0.94 } : undefined}
            onClick={() => {
                if (!expanded) setExpanded(true);
            }}
            // Liquid Glass base material (see index.css) plus a subtle
            // procedural refraction filter, layered on only here per the
            // brief to keep it out of the sitewide .glass-panel treatment.
            // Responsive hide/show lives on the .nav-pill-center wrapper
            // (NavBar.jsx) that centers this on the header, not here.
            className={`nav-pill glass-panel glass-liquid flex ${!expanded ? "cursor-pointer" : ""}`}
        >
            <Motion.ul className={!expanded ? "pointer-events-none" : undefined}>
                {navLinks.map(({ link, name }) => (
                    <Motion.li key={name} variants={linkVariants} className="group">
                        <a href={link} onClick={(e) => e.stopPropagation()}>
                            <span>{name}</span>
                            <span className="underline" />
                        </a>
                    </Motion.li>
                ))}
            </Motion.ul>

            {!expanded && (
                // A generic menu glyph, not the 8ctal mark — the logo/wordmark
                // already sits permanently to the left of this pill, so
                // repeating it here just to fill the collapsed circle read as
                // redundant. This icon is only ever a "there's a menu here"
                // affordance; scrolling up re-expands the pill on its own.
                <div className="nav-pill-mark text-white-50" aria-hidden="true">
                    <Menu className="h-5 w-5" strokeWidth={1.75} />
                </div>
            )}
        </Motion.nav>
    );
};

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
            {/* Liquid Glass refraction filter for the desktop nav pill only
                (see .glass-liquid in index.css). Procedural feTurbulence +
                feDisplacementMap, not a copy of ref_components/liquid_glass.tsx's
                baked webp map — that one is shaped for its own toggle icons. */}
            <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
                <defs>
                    <filter id="nav-liquid-glass" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.008 0.012"
                            numOctaves="2"
                            seed="7"
                            result="noise"
                        />
                        <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="softNoise"
                            scale="8"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>

            <div className="inner">
                <a href="#hero" className="logo">
                    <div className="flex items-center gap-2">
                        <img src="/images/logo_8ball.png" alt="logo" className="h-15 w-auto" />
                        <p>| 8ctal</p>
                    </div>
                </a>

                {/* Centered on the header itself, not "between the logo and
                    the action buttons" — those two flank it at very
                    different widths, so leaving the pill as a plain third
                    flex child (space-between) visibly pulled it off-center
                    toward whichever side was narrower. Taking it out of
                    flow and centering it against .inner directly fixes
                    that regardless of how wide the logo or the button
                    group are, and regardless of the pill's own
                    expanded/collapsed width. */}
                <div className="nav-pill-center">
                    <DesktopNavPill />
                </div>

                <div className="flex items-center gap-3">
                    <a href="#contact" className="contact-btn group hidden lg:flex">
                        <div className="inner glass-panel">
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
                        aria-label="Abrir menú"
                        // Opens only — the overlay carries its own close
                        // button now, so this never needs to double as one
                        // (and never risks showing two X icons at once).
                        onClick={() => setMenuOpen(true)}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile nav overlay: portalled straight to <body>, not left as a
                descendant of this header. A transformed/blurred/filtered
                ancestor becomes the containing block for a `fixed` child —
                that's what trapped the earlier version inside the header's
                own height, with no reliable way to reach the close button.
                Portalling out removes the whole bug class regardless of
                whatever styling `.navbar` picks up later (camosdigital's
                Nav.tsx hit the same thing and fixed it the same way). */}
            {createPortal(
                    <div
                        id="mobile-nav"
                        ref={overlayRef}
                        inert={!menuOpen}
                        className="mobile-nav-overlay glass-panel-strong opacity-0 pointer-events-none lg:hidden"
                        role="dialog"
                        aria-modal="true"
                        aria-hidden={!menuOpen}
                        aria-label="Navegación"
                    >
                        <button
                            type="button"
                            className="nav-toggle glass-panel absolute top-5 right-5"
                            aria-label="Cerrar menú"
                            onClick={closeMenu}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

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
                    </div>,
                    document.body
                )}
        </header>
    );
}

export default NavBar;
