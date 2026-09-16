import { useCallback, useEffect, useRef, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { MoveVertical } from "lucide-react";

import CertificationCard from "./CertificationCard";
import { useLanguage } from "../context/Language";
import { useMotionPreference } from "../context/MotionPreference";

// Ported from ref_components/scrollable_card_stack/scrollable_card_stack.tsx
// for the mobile certifications view (per the design brief: this reference
// specifically, on mobile). Differences from the reference:
// - Cards are this project's own CertificationCard (logo/title/issuer,
//   description, date+ID, skills toggle, verify link) instead of a
//   photo+avatar+handle, and get the Liquid Glass GlowCard material
//   instead of shadcn's bg-background/border tokens — nothing here draws
//   its own background/border, GlowCard already does.
// - The reference's `scrollY` motion value is set in several places but
//   never actually read by anything (getCardTransform works off
//   `currentIndex` alone) — dropped rather than ported as dead state.
// - No per-card `filter: blur()` for passed cards: the reference applies a
//   2px blur to cards that are *also* set to opacity: 0, so it's paying a
//   real (if small) paint cost for a blur nobody can see. Skipped.
// - Depth cue is pure scale + y-offset + opacity, no perspective/rotateX —
//   already how the reference itself does it, which is exactly why it's
//   the right choice for mobile (see CardStack.jsx's own note on why 3D
//   transforms are expensive to composite on weaker GPUs).
const FRAME_OFFSET = -22;
const FRAMES_VISIBLE = 3;
const SCALE_FACTOR = 0.06;
const MIN_SCALE = 0.7;
const SCROLL_THRESHOLD = 20;
const TOUCH_SCROLL_THRESHOLD = 60;
const MIN_ADVANCE_INTERVAL_MS = 350;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function getCardTransform(index, currentIndex, total, reduceMotion) {
    const offsetIndex = index - currentIndex;
    const isPast = currentIndex > index;

    const opacity = isPast ? 0 : 1;
    const scale = reduceMotion ? 1 : clamp(1 - offsetIndex * SCALE_FACTOR, MIN_SCALE, 1.2);
    const y = reduceMotion ? 0 : clamp(offsetIndex * FRAME_OFFSET, FRAME_OFFSET * FRAMES_VISIBLE, Infinity);
    const zIndex = total - index;

    return { opacity, scale, y, zIndex };
}

const CertificationScrollStack = ({ items }) => {
    const { t } = useLanguage();
    const { reducedMotion: siteReducedMotion } = useMotionPreference();
    const systemReduceMotion = useReducedMotion();
    const reduceMotion = systemReduceMotion || siteReducedMotion;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);
    const containerRef = useRef(null);
    const lastAdvanceAt = useRef(0);
    const isAdvancingRef = useRef(false);

    const total = items.length;
    const maxIndex = total - 1;

    // Keep the active card in bounds when the (possibly filtered) item list
    // changes size — e.g. switching the technology filter to one with fewer
    // certs than the current index.
    useEffect(() => {
        setCurrentIndex((i) => clamp(i, 0, Math.max(0, maxIndex)));
    }, [maxIndex]);

    const goTo = useCallback(
        (index) => {
            const now = Date.now();
            if (isAdvancingRef.current || now - lastAdvanceAt.current < MIN_ADVANCE_INTERVAL_MS) return;
            const next = clamp(index, 0, maxIndex);
            if (next === currentIndex) return;
            lastAdvanceAt.current = now;
            isAdvancingRef.current = true;
            setHasInteracted(true);
            setCurrentIndex(next);
            window.setTimeout(() => {
                isAdvancingRef.current = false;
            }, MIN_ADVANCE_INTERVAL_MS);
        },
        [currentIndex, maxIndex]
    );

    const step = useCallback((direction) => goTo(currentIndex + direction), [currentIndex, goTo]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return undefined;

        const onWheel = (e) => {
            if (Math.abs(e.deltaY) < SCROLL_THRESHOLD) return;
            e.preventDefault();
            step(e.deltaY > 0 ? 1 : -1);
        };
        container.addEventListener("wheel", onWheel, { passive: false });
        return () => container.removeEventListener("wheel", onWheel);
    }, [step]);

    const touchStartY = useRef(0);
    const touchMoved = useRef(false);

    const onTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
        touchMoved.current = false;
    };
    const onTouchMove = (e) => {
        const deltaY = touchStartY.current - e.touches[0].clientY;
        if (!touchMoved.current && Math.abs(deltaY) > TOUCH_SCROLL_THRESHOLD) {
            touchMoved.current = true;
            step(deltaY > 0 ? 1 : -1);
        }
    };

    const onKeyDown = (e) => {
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
        } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
        }
    };

    if (!total) return null;

    return (
        <div className="flex w-full flex-col items-center">
            <div
                ref={containerRef}
                role="application"
                aria-roledescription="carousel"
                aria-label={t.certifications.region}
                tabIndex={0}
                onKeyDown={onKeyDown}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                className="relative h-[26rem] w-full"
                style={{ touchAction: "none" }}
            >
                {items.map((cert, index) => {
                    const offsetIndex = index - currentIndex;
                    // Unlike the reference (which renders every item
                    // unconditionally — fine for its own handful of demo
                    // cards, not fine for a list this is explicitly meant
                    // to grow), cap what actually mounts: one card behind
                    // (so it still gets to fade out instead of vanishing)
                    // through FRAMES_VISIBLE ahead. Anything further is
                    // stacked at the exact same clamped position anyway
                    // (see getCardTransform's y/scale clamps), fully
                    // opaque and fully mounted, just hidden behind the
                    // frontmost of that pile — paying full GlowCard
                    // render/paint cost for content nobody can see, which
                    // is the same mistake this whole rework exists to fix.
                    if (offsetIndex < -1 || offsetIndex > FRAMES_VISIBLE) return null;

                    const transform = getCardTransform(index, currentIndex, total, reduceMotion);
                    const isActive = index === currentIndex;

                    return (
                        <Motion.div
                            key={cert.link}
                            initial={false}
                            animate={{ opacity: transform.opacity, scale: transform.scale, y: transform.y }}
                            transition={
                                reduceMotion
                                    ? { duration: 0 }
                                    : { type: "spring", stiffness: 260, damping: 24, mass: 0.6 }
                            }
                            aria-hidden={!isActive}
                            className="absolute left-1/2 top-1/2 w-[min(88vw,24rem)] -translate-x-1/2 -translate-y-1/2"
                            style={{ zIndex: transform.zIndex, pointerEvents: isActive ? "auto" : "none" }}
                        >
                            <CertificationCard cert={cert} />
                        </Motion.div>
                    );
                })}

                {!hasInteracted && total > 1 && (
                    <div
                        className="swipe-hint pointer-events-none absolute inset-x-0 bottom-2 z-40 flex items-center justify-center gap-2"
                        aria-hidden="true"
                    >
                        <div className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-blue-50">
                            <MoveVertical className="swipe-hint-icon size-4" />
                            <span className="text-xs">{t.certifications.swipeHint}</span>
                        </div>
                    </div>
                )}
            </div>

            {total > 1 && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2" role="tablist">
                    {items.map((cert, index) => (
                        <button
                            key={cert.link}
                            type="button"
                            role="tab"
                            aria-selected={index === currentIndex}
                            aria-label={t.cardStack.goTo(cert.title)}
                            onClick={() => goTo(index)}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                index === currentIndex ? "scale-125 bg-white-50" : "bg-white-50/30"
                            }`}
                        />
                    ))}
                </div>
            )}

            <div aria-live="polite" className="sr-only">
                {items[currentIndex]?.title}
            </div>
        </div>
    );
};

export default CertificationScrollStack;
