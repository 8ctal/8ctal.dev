import { useEffect, useState } from "react";
// Imported as `Motion` (capitalized): this project's ESLint config has no
// JSX-usage detection for member-expression tags like `motion.div`, so a
// lowercase import reads as unused even though it's referenced in the JSX
// below (see CardStack.jsx's own copy of this same note).
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";

import GlowCard from "./GlowCard";
import SkillsToggle from "./SkillsToggle";
import { useLanguage } from "../context/Language";

// Stack mechanics (3 visible slots, the front card sliding out on advance,
// a fresh one entering at the back) ported from
// ref_components/animated_card/animated_card.tsx, in place of the previous
// CSS grid — content per card (logo/title/issuer, description, date +
// credential ID, skills toggle, verify link) is this project's own, and
// each card still gets the Liquid Glass GlowCard treatment (DESIGN.md names
// GlowCard as the certifications card component; only the layout around it
// changes here, not the material).
const POSITION_STYLES = [
    { scale: 1, y: 12 },
    { scale: 0.95, y: -16 },
    { scale: 0.9, y: -44 },
];

// A horizontal slide with rotate (the whole deck reading as moving left on
// advance, right on retreat) used to live here — replacing an earlier
// vertical drop that read as "pésima" (the user's word). That slide turned
// out to have the same problem in a different shape: on a small mobile
// screen, x-travel + rotation + this stack's own y-position all changing
// at once read as too much simultaneous motion — "extraña" (the user's
// word this time). What's left is purely vertical, matching the stack's
// own resting look (POSITION_STYLES only ever moves cards along y): the
// entering card comes from further back than the stack's own back slot,
// the exiting one continues past it, and neither rotates or moves in x —
// same motion regardless of advancing or retreating, so there's no longer
// a "forward" vs "backward" version of it to keep track of.
const EXIT_ANIM = { x: 0, y: -90, opacity: 0, scale: 0.82, zIndex: 10 };
const ENTER_ANIM = { x: 0, y: -90, opacity: 0, scale: 0.82 };
const CARD_TRANSITION = { type: "spring", duration: 0.55, bounce: 0.15 };

const CertificationCardContent = ({ cert }) => {
    const { t } = useLanguage();

    return (
        // solid: at the stack's normal ~5-10% opaque glass, the card behind
        // (only 12-44px off in y, i.e. mostly directly underneath) stayed
        // faintly readable straight through the front one — see index.css's
        // .card--solid for the fuller explanation.
        <GlowCard card={cert} index={0} showStars={false} solid>
            <div className="flex h-full flex-col">
                <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white-50 p-2">
                        <img
                            src={cert.imgPath}
                            alt={cert.title}
                            className="h-full w-full object-contain"
                            loading="lazy"
                        />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
                        <p className="text-blue-50 text-sm">{cert.issuer}</p>
                    </div>
                </div>

                <div className="mb-6 flex-grow">
                    <p className="text-white-50 text-base leading-relaxed">{cert.description}</p>
                </div>

                <div className="mb-6">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-50">{cert.date}</span>
                        {cert.credentialId && (
                            <span className="text-blue-50 font-mono">ID: {cert.credentialId}</span>
                        )}
                    </div>
                </div>

                <div className="mb-6">
                    <SkillsToggle skills={cert.skills} label={t.certifications.skillsLabel} />
                </div>

                <div className="relative z-10 mt-auto">
                    <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-panel group pointer-events-auto relative z-20 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white-50 transition-colors duration-300 hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {t.certifications.verify}
                        <svg
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
    );
};

// Below this drag distance (or velocity), a swipe snaps back to the stack
// instead of committing to a page change — same idea as CardStack.jsx's own
// drag threshold, just a fixed value here rather than one derived from a
// configurable card width.
const DRAG_COMMIT_DISTANCE = 90;
const DRAG_COMMIT_VELOCITY = 500;

const StackedCard = ({ cert, slot, onSelect, onAdvance, onRetreat, onDragStart }) => {
    const { scale, y } = POSITION_STYLES[slot] ?? POSITION_STYLES[POSITION_STYLES.length - 1];
    const zIndex = POSITION_STYLES.length - slot;
    const exitAnim = slot === 0 ? EXIT_ANIM : undefined;
    const initialAnim = slot === POSITION_STYLES.length - 1 ? ENTER_ANIM : undefined;
    const isFront = slot === 0;

    return (
        // The centering (left: 50% + a -50% shift) has to live on a plain,
        // un-animated wrapper: framer-motion owns the whole `transform`
        // property once `x`/`y`/etc are animated props, so a static "-50%"
        // baked into that same x would fight the slide-in/out offset
        // instead of composing with it.
        <div className="absolute bottom-0 left-1/2 w-[min(90vw,26rem)] -translate-x-1/2" style={{ zIndex }}>
            <Motion.div
                key={cert.link}
                initial={initialAnim}
                animate={{ x: 0, y, scale, opacity: 1, rotate: 0 }}
                exit={exitAnim}
                transition={CARD_TRANSITION}
                // Slots behind the front one are the "next cert" affordance
                // on mobile, where the prev/next buttons are hidden —
                // tapping the peeking card brings it to the front, same as
                // pressing "next" enough times to reach it.
                onClick={slot > 0 ? () => onSelect(slot) : undefined}
                className={slot > 0 ? "cursor-pointer" : isFront ? "cursor-grab active:cursor-grabbing" : ""}
                // The front card can also be swiped — the buttons are
                // desktop-only and tapping only ever goes forward (to
                // whichever card is peeking), so without this a mobile
                // visitor who'd scrolled forward through the whole stack had
                // no way to come back to an earlier one except cycling all
                // the way around again.
                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragStart={isFront ? onDragStart : undefined}
                onDragEnd={
                    isFront
                        ? (_e, info) => {
                              if (info.offset.x < -DRAG_COMMIT_DISTANCE || info.velocity.x < -DRAG_COMMIT_VELOCITY) {
                                  onAdvance();
                              } else if (info.offset.x > DRAG_COMMIT_DISTANCE || info.velocity.x > DRAG_COMMIT_VELOCITY) {
                                  onRetreat();
                              }
                          }
                        : undefined
                }
            >
                <CertificationCardContent cert={cert} />
            </Motion.div>
        </div>
    );
};

const CertificationStack = ({ items }) => {
    const { t } = useLanguage();
    const [order, setOrder] = useState(items);

    // `items` is a fresh, re-localized array every time the language toggles
    // (see useLanguage()) — useState's initial value only seeds `order` on
    // mount, so without this the stack would keep showing whichever
    // language was active on first render, stuck in its own rotated order,
    // while every other string on the page updates immediately. Resetting
    // to the new `items` order (rather than trying to preserve the current
    // rotation) is fine here: a language switch is a deliberate, rare
    // action, not something that should fight to preserve "which card was
    // front" across it.
    useEffect(() => {
        setOrder(items);
    }, [items]);

    // Shown once, over the front card, until the visitor's first real
    // interaction with the stack — on mobile the prev/next buttons are
    // hidden and tapping a peeking card only gets you one step at a time,
    // so dragging is the only way to actually get through all of them; this
    // is what tells a mobile visitor that's possible at all.
    const [hasInteracted, setHasInteracted] = useState(false);
    const dismissHint = () => setHasInteracted(true);

    if (!items?.length) return null;

    const advance = () => {
        dismissHint();
        setOrder((current) => [...current.slice(1), current[0]]);
    };

    const retreat = () => {
        dismissHint();
        setOrder((current) => [current[current.length - 1], ...current.slice(0, -1)]);
    };

    // Tapping a peeking card (slot 1 or 2) jumps straight to it, instead of
    // only ever being able to advance one step at a time.
    const advanceTo = (slot) => {
        dismissHint();
        setOrder((current) => [...current.slice(slot), ...current.slice(0, slot)]);
    };

    const visible = order.slice(0, POSITION_STYLES.length);

    return (
        <div className="flex w-full flex-col items-center">
            <div className="relative h-[30rem] w-full sm:h-[34rem]">
                <AnimatePresence initial={false}>
                    {visible.map((cert, slot) => (
                        <StackedCard
                            key={cert.link}
                            cert={cert}
                            slot={slot}
                            onSelect={advanceTo}
                            onAdvance={advance}
                            onRetreat={retreat}
                            onDragStart={dismissHint}
                        />
                    ))}
                </AnimatePresence>

                {!hasInteracted && items.length > 1 && (
                    <div
                        className="swipe-hint pointer-events-none absolute inset-x-0 bottom-6 z-40 flex items-center justify-center gap-2 md:hidden"
                        aria-hidden="true"
                    >
                        <div className="glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-blue-50">
                            <MoveHorizontal className="swipe-hint-icon size-4" />
                            <span className="text-xs">{t.certifications.swipeHint}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Buttons stay for desktop, but disappear on mobile — there,
                tapping the peeking card itself (see StackedCard) is how you
                advance, so the row would otherwise duplicate that. */}
            {items.length > 1 && (
                <div className="mt-8 hidden items-center gap-4 md:flex">
                    <button
                        type="button"
                        onClick={retreat}
                        aria-label={t.certifications.previous}
                        className="glass-panel flex size-11 items-center justify-center rounded-full text-white-50 transition-colors duration-300 hover:text-white"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={advance}
                        aria-label={t.certifications.next}
                        className="glass-panel flex size-11 items-center justify-center rounded-full text-white-50 transition-colors duration-300 hover:text-white"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CertificationStack;
