// Ported from ref_components/social_links/social_links.tsx (21st.dev
// community component, `npx shadcn add "https://21st.dev/r/serafimcloud/social-links"`).
// Changes from the reference:
// - `cn` from this project's src/lib/cn.js instead of the shadcn `@/lib/utils`
//   alias.
// - Each item is a real `<a href>` (target/rel for an external link) instead
//   of a bare `<div>` — the reference is a pure hover toy with no navigation
//   at all; the footer needs these to actually go somewhere.
// - `social.label` (added to constants/index.js's socialImgs) is what's
//   shown as the clickable text, not `social.name` — that field had drifted
//   from what several entries actually link to (see the comment there) and
//   nothing rendered it as user-facing text until now.
// - The pop-up is a real brand mark (SocialIcon.jsx) driven by `social.icon`
//   instead of the reference's arbitrary `social.image` — the reference
//   ships no icon artwork of its own to begin with (see SocialIcon.jsx).
// - The reference's whole gimmick is hover-triggered, which never fires on
//   a touchscreen — see `hoverCapable` below for how a touch visitor gets a
//   plain, always-visible icon+label instead of one that can only ever be
//   revealed by a mouse it doesn't have.
import { useEffect, useState } from "react";
// Imported as `Motion` (capitalized): this project's ESLint config has no
// JSX-usage detection for member-expression tags like `motion.div`, so a
// lowercase import reads as unused even though it's referenced in the JSX
// below (see CardStack.jsx's own copy of this same note).
import { motion as Motion, AnimatePresence } from "framer-motion";

import { cn } from "../lib/cn";
import SocialIcon from "./SocialIcon";

// Same query CustomCursor.jsx gates on: true only for a real mouse, false
// for touch (and for a mouse+touch hybrid device in its touch mode).
const HOVER_CAPABLE_QUERY = "(hover: hover) and (pointer: fine)";

export function SocialLinks({ socials, className, ...props }) {
    const [hoveredSocial, setHoveredSocial] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [hoverCapable, setHoverCapable] = useState(
        () => typeof window !== "undefined" && window.matchMedia(HOVER_CAPABLE_QUERY).matches
    );

    const animation = {
        scale: clicked ? [1, 1.3, 1] : 1,
        transition: { duration: 0.3 },
    };

    useEffect(() => {
        const handleClick = () => {
            setClicked(true);
            setTimeout(() => {
                setClicked(false);
            }, 200);
        };
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    useEffect(() => {
        const mql = window.matchMedia(HOVER_CAPABLE_QUERY);
        const onChange = () => setHoverCapable(mql.matches);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    // Touch has no hover to reveal the pop-up icon with, so there's nothing
    // to gate there — every icon is just always on, stacked in normal flow
    // above its label instead of absolutely positioned over it (nothing
    // triggers it into place on top of the text the way a hover would).
    if (!hoverCapable) {
        return (
            <div className={cn("flex items-center justify-center gap-6", className)} {...props}>
                {socials.map((social) => (
                    <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={social.label}
                        className="flex flex-col items-center gap-1.5"
                    >
                        <SocialIcon name={social.icon} className="size-6" />
                        <span className="text-xs font-medium text-white-50">{social.label}</span>
                    </a>
                ))}
            </div>
        );
    }

    return (
        <div className={cn("flex items-center justify-center gap-0", className)} {...props}>
            {socials.map((social, index) => (
                <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        "relative cursor-pointer px-5 py-2 transition-opacity duration-200",
                        hoveredSocial && hoveredSocial !== social.label ? "opacity-50" : "opacity-100"
                    )}
                    key={index}
                    onMouseEnter={() => {
                        setHoveredSocial(social.label);
                        setRotation(Math.random() * 20 - 10);
                    }}
                    onMouseLeave={() => setHoveredSocial(null)}
                    onClick={() => setClicked(true)}
                >
                    <span className="block text-lg font-medium text-white-50">{social.label}</span>
                    <AnimatePresence>
                        {hoveredSocial === social.label && (
                            <Motion.div
                                className="absolute bottom-0 left-0 right-0 flex h-full w-full items-center justify-center"
                                animate={animation}
                            >
                                <Motion.div
                                    key={social.label}
                                    initial={{ y: -40, rotate: rotation, opacity: 0, filter: "blur(2px)" }}
                                    animate={{ y: -50, opacity: 1, filter: "blur(0px)" }}
                                    exit={{ y: -40, opacity: 0, filter: "blur(2px)" }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <SocialIcon name={social.icon} className="size-16" />
                                </Motion.div>
                            </Motion.div>
                        )}
                    </AnimatePresence>
                </a>
            ))}
        </div>
    );
}

export default SocialLinks;
