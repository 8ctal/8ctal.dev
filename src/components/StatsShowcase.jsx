import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { Award, Rocket, Sparkles, Users } from "lucide-react";

import { counterItems } from "../constants";
import { DisplayCard } from "./DisplayCards";

gsap.registerPlugin(ScrollTrigger);

// One icon per stat, matched by a keyword in its label rather than by
// position — counterItems is content data (constants/index.js), and
// guessing by array index would silently point at the wrong icon the next
// time someone reorders or edits that list.
const iconFor = (label) => {
    const lower = label.toLowerCase();
    if (lower.includes("experiencia")) return Sparkles;
    if (lower.includes("proyecto")) return Rocket;
    if (lower.includes("cliente")) return Users;
    if (lower.includes("certificacion")) return Award;
    return Sparkles;
};

// Offsets grow with index so later cards fan out further behind the front
// one — a generalised version of the reference's fixed 3-card stack
// (translate-x-0/16/32, translate-y-0/10/20), just at a smaller scale: at
// the reference's own magnitude this overflowed a phone screen (the fan
// spread wider than a 375–430px viewport), which read as the stack not
// being centered — it was, the cards were just spilling past the visible
// edge. These have to stay literal, complete class names (not built from a
// template string): Tailwind's build-time scanner matches class names as
// they appear verbatim in source, so a computed string like
// `translate-x-${n}` never produces the utility it names — nothing in the
// compiled CSS would actually move the card. Same reasoning for
// ROW_OFFSETS and Z_INDEX_CLASSES below.
const STACK_OFFSETS = [
    "translate-x-0 translate-y-0",
    "translate-x-4 translate-y-3",
    "translate-x-8 translate-y-6",
    "translate-x-12 translate-y-9",
];

// Paints the rotated-to-front card on top regardless of its original DOM
// position (see `frontIndex` below — rotating which item reads as "front"
// doesn't reorder the rendered array, so natural DOM paint order can't be
// relied on to put the right one on top anymore). Literal classes for the
// same Tailwind-scanning reason as the offsets above.
const Z_INDEX_CLASSES = ["z-0", "z-10", "z-20", "z-30"];

// The settled, side-by-side layout each card animates *into* after the
// stack has had a moment to read as a stack — still built from translate
// offsets on cards that all share the same grid cell (`[grid-area:stack]`,
// unchanged), rather than switching to a real flex/grid row: grid-column
// placement can't be transitioned smoothly, translate can. `md:`-prefixed
// only — 4 real rows this wide don't fit a phone screen at any legible
// card size, so mobile stays a stack (which still has its own reveal;
// nothing there depends on the horizontal settle).
const ROW_OFFSETS = [
    "md:-translate-x-[27rem] md:translate-y-0",
    "md:-translate-x-[9rem] md:translate-y-0",
    "md:translate-x-[9rem] md:translate-y-0",
    "md:translate-x-[27rem] md:translate-y-0",
];

/**
 * The Hero's stat counters, relocated into their own section right after
 * it and re-skinned with the ref_components/display_cards stack. Two
 * phases, per feedback on the first pass (which only ever showed the
 * stack): the cards enter fanned out like a hand of cards, then — once
 * that's had a beat to register — settle side by side into a plain
 * horizontal row. That settle only ever happens on desktop/tablet (see
 * ROW_OFFSETS, `md:`-scoped) — 4 real rows this wide don't fit a phone
 * screen at any legible card size, so on mobile the cards stay a stack
 * permanently; tapping any of them there (see `frontIndex`/`advance`)
 * rotates the next one to the front, looping forever — mobile's stand-in
 * for the hover a desktop stack would use instead, and the only way to
 * ever reach whichever card started out buried two or three deep. See
 * DisplayCards.jsx for why they're built from its DisplayCard primitive
 * directly rather than through the generic <DisplayCards> wrapper.
 *
 * The counting-up animation itself is unchanged from the old
 * AnimatedCounter.jsx: GSAP tweens each number's innerText from 0 to its
 * real value, gated on `#counter` scrolling to the middle of the viewport.
 */
const StatsShowcase = () => {
    const counterRef = useRef(null);
    const countersRef = useRef([]);
    const [settled, setSettled] = useState(false);
    // Which counterItems index currently sits at the front of the stack —
    // mobile only, in effect (the row settle overrides positioning at md:,
    // so rotating this becomes a no-op there). Starts at `last` to match
    // the stack's original, un-rotated look (see cardClassName).
    const [frontIndex, setFrontIndex] = useState(counterItems.length - 1);
    const advance = () => setFrontIndex((current) => (current + 1) % counterItems.length);

    useGSAP(() => {
        countersRef.current.forEach((card, index) => {
            const numberElement = card?.querySelector(".counter-number");
            if (!numberElement) return;
            const item = counterItems[index];

            gsap.set(numberElement, { innerText: "0" });

            gsap.to(numberElement, {
                innerText: item.value,
                duration: 2.5,
                ease: "power2.out",
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: "#counter",
                    start: "top center",
                },
                onComplete: () => {
                    numberElement.textContent = `${item.value}${item.suffix}`;
                },
            });
        });

        // The stack -> row settle: one shared trigger (not per-card, unlike
        // the counters above) since it's a single moment for the whole
        // group, timed to fire once the fanned stack has been on screen
        // long enough to actually read as a stack first.
        ScrollTrigger.create({
            trigger: "#counter",
            start: "top center",
            once: true,
            onEnter: () => {
                gsap.delayedCall(1.1, () => setSettled(true));
            },
        });
    }, []);

    const last = counterItems.length - 1;

    const cardClassName = (index) => {
        // How many rotation steps this card sits behind whichever one is
        // currently front — 0 for the front card itself, up to `last` for
        // the one buried deepest. Mapped to a *slot* (not used to reindex
        // the rendered array — countersRef/the counting-up effect above
        // both depend on stable index-to-DOM identity) so the existing
        // STACK_OFFSETS/Z_INDEX_CLASSES tables, tuned around "slot `last`
        // is the fully visible front card", still apply after any number
        // of taps.
        const distanceFromFront = (index - frontIndex + counterItems.length) % counterItems.length;
        const slot = last - distanceFromFront;
        const isFront = distanceFromFront === 0;

        return [
            "[grid-area:stack] transition-transform duration-[900ms] ease-out cursor-pointer",
            STACK_OFFSETS[slot],
            Z_INDEX_CLASSES[slot],
            settled && ROW_OFFSETS[Math.min(index, ROW_OFFSETS.length - 1)],
            // DisplayCard's own `after:` edge-fade (see DisplayCards.jsx) is
            // sized to mask a card into the ones stacked *behind* it — at
            // 20rem wide it's actually wider than these cards, so once
            // they're side by side (desktop, once settled) with nothing
            // behind them to fade into, it just bled over each card's own
            // right border, cutting it off. `md:`-scoped, not unconditional:
            // mobile never leaves the stacked layout, so it still needs
            // this mask there regardless of `settled`.
            settled && "md:grayscale-0 md:scale-100 md:after:hidden",
            !isFront &&
                [
                    "before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:bg-black/50 before:outline-1 before:outline-white/15 before:content-[''] before:transition-opacity before:duration-700 grayscale-[100%] hover:grayscale-0 hover:before:opacity-0",
                    settled && "md:before:hidden",
                ],
            isFront ? "hover:translate-y-2" : "hover:-translate-y-8",
        ]
            .flat()
            .filter(Boolean)
            .join(" ");
    };

    return (
        <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
            <div className="mx-auto grid [grid-template-areas:'stack'] place-items-center py-10">
                {counterItems.map((item, index) => {
                    const Icon = iconFor(item.label);
                    return (
                        <DisplayCard
                            key={item.label}
                            cardRef={(el) => el && (countersRef.current[index] = el)}
                            className={cardClassName(index)}
                            sizeClassName="h-28 w-64 md:h-32 md:w-64"
                            icon={<Icon className="size-4 text-blue-300" />}
                            titleClassName="text-white-50"
                            title={
                                <span className="counter-number text-4xl font-bold">
                                    0{item.suffix}
                                </span>
                            }
                            description={item.label}
                            date=""
                            skewed={!settled}
                            onClick={advance}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default StatsShowcase;
