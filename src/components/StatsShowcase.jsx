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
// ROW_OFFSETS/LIFTED_OFFSETS below.
const STACK_OFFSETS = [
    "translate-x-0 translate-y-0",
    "translate-x-4 translate-y-3",
    "translate-x-8 translate-y-6",
    "translate-x-12 translate-y-9",
];

// What a card switches to when tapped (mobile's stand-in for hover — a
// phone has no hover to reveal a card buried in the stack, so a tap swaps
// its offset to this instead of STACK_OFFSETS). Same x as its stacked
// position, lifted well clear on y so it reads on top of its neighbors once
// paired with the z-20 in cardClassName below.
const LIFTED_OFFSETS = [
    "translate-x-0 -translate-y-10",
    "translate-x-4 -translate-y-10",
    "translate-x-8 -translate-y-10",
    "translate-x-12 -translate-y-10",
];

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
 * permanently; tapping one there (see `liftedIndex`) is mobile's stand-in
 * for the hover a desktop stack uses to reveal a card buried behind the
 * front one. See DisplayCards.jsx for why they're built from its
 * DisplayCard primitive directly rather than through the generic
 * <DisplayCards> wrapper.
 *
 * The counting-up animation itself is unchanged from the old
 * AnimatedCounter.jsx: GSAP tweens each number's innerText from 0 to its
 * real value, gated on `#counter` scrolling to the middle of the viewport.
 */
const StatsShowcase = () => {
    const counterRef = useRef(null);
    const countersRef = useRef([]);
    const [settled, setSettled] = useState(false);
    // Which card a tap has brought to the front — mobile only, in effect
    // (see cardClassName: the row settle overrides positioning at md: and
    // desktop already reveals every card via hover, so this is a no-op
    // there). Toggles off on a second tap of the same card.
    const [liftedIndex, setLiftedIndex] = useState(null);

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
    const toggleLifted = (index) => setLiftedIndex((current) => (current === index ? null : index));

    const cardClassName = (index) => {
        const isLast = index === last;
        const isLifted = liftedIndex === index;
        const offsets = isLifted ? LIFTED_OFFSETS : STACK_OFFSETS;

        return [
            "[grid-area:stack] transition-transform duration-[900ms] ease-out cursor-pointer",
            offsets[Math.min(index, offsets.length - 1)],
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
            !isLast &&
                [
                    "before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:bg-black/50 before:outline-1 before:outline-white/15 before:content-[''] before:transition-opacity before:duration-700 grayscale-[100%] hover:grayscale-0 hover:before:opacity-0",
                    settled && "md:before:hidden",
                ],
            isLast ? "hover:translate-y-2" : "hover:-translate-y-8",
            // The tapped card, front and center regardless of z-order:
            // grayscale/overlay off like a hover would do, plus a z-index
            // bump since DOM order alone would otherwise still paint it
            // under whichever card comes after it.
            isLifted && "z-20 grayscale-0 before:opacity-0",
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
                            onClick={() => toggleLifted(index)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default StatsShowcase;
