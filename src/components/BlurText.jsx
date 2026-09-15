import { useEffect, useMemo, useRef, useState } from "react";

import { useMotionPreference } from "../context/MotionPreference";

/**
 * Adapted from ref_components/blur_text_animation/blur-text-animation.tsx
 * (21st.dev community component) for use as a section-title reveal instead
 * of its original full-page, auto-looping demo:
 * - The reference always rendered inside its own `min-h-screen bg-black
 *   flex items-center justify-center` wrapper and looped forever (animate
 *   in, hold, animate out, repeat) — dropped both, since this is meant to
 *   drop into TitleHeader inline and a section title re-blurring itself
 *   forever would be distracting rather than a one-time accent.
 * - Triggers once, the first time the text scrolls into view (a plain
 *   one-shot IntersectionObserver, not this project's useInView hook,
 *   which toggles both ways — a title re-blurring every time you scroll
 *   past it and back is exactly the loop being avoided above).
 * - Reads this site's MotionPreference toggle: with reduced motion on, the
 *   text is simply present, no blur/opacity animation at all.
 * - The per-word timing/blur/scale randomization is otherwise unchanged
 *   from the reference.
 */
const BlurText = (props) => {
    const { text, className = "" } = props;
    // Destructured separately, as a plain `const` rather than inline in the
    // parameter list: this project's ESLint config only ignores unused
    // *variables* starting with an uppercase letter (eslint.config.js's
    // `varsIgnorePattern`, no matching `argsIgnorePattern`), and `Tag` is
    // only ever referenced as a JSX tag name below — which plain
    // `no-unused-vars` doesn't detect as a real reference when it comes
    // from a parameter-destructure. As a body-level const it reads as an
    // ordinary (if presently unused-by-name) variable instead of an unused
    // function argument, which is exactly what the ignore pattern expects.
    const Tag = props.as || "span";
    const { reducedMotion } = useMotionPreference();
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    const words = useMemo(() => {
        const splitWords = text.split(" ");
        const totalWords = splitWords.length;

        return splitWords.map((word, index) => {
            const progress = index / totalWords;
            const exponentialDelay = Math.pow(progress, 0.8) * 0.5;
            const baseDelay = index * 0.06;
            const microVariation = (Math.random() - 0.5) * 0.05;

            return {
                text: word,
                duration: 2.2 + Math.cos(index * 0.3) * 0.3,
                delay: baseDelay + exponentialDelay + microVariation,
                blur: 12 + Math.floor(Math.random() * 8),
                scale: 0.9 + Math.sin(index * 0.2) * 0.05,
            };
        });
    }, [text]);

    useEffect(() => {
        if (reducedMotion) {
            setIsVisible(true);
            return undefined;
        }

        const el = containerRef.current;
        if (!el || typeof IntersectionObserver === "undefined") {
            setIsVisible(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [reducedMotion]);

    return (
        <Tag ref={containerRef} className={className}>
            {words.map((word, index) => (
                <span
                    key={index}
                    className="inline-block transition-all"
                    style={{
                        transitionDuration: reducedMotion ? "0s" : `${word.duration}s`,
                        transitionDelay: reducedMotion ? "0s" : `${word.delay}s`,
                        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        filter: isVisible ? "blur(0px) brightness(1)" : `blur(${word.blur}px) brightness(0.6)`,
                        transform: isVisible
                            ? "translateY(0) scale(1) rotateX(0deg)"
                            : `translateY(20px) scale(${word.scale}) rotateX(-15deg)`,
                        marginRight: "0.35em",
                        willChange: "filter, transform, opacity",
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                        opacity: isVisible ? 1 : 0,
                    }}
                >
                    {word.text}
                </span>
            ))}
        </Tag>
    );
};

export default BlurText;
