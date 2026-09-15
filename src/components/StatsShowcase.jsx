import { useRef } from "react";
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

/**
 * The Hero's stat counters, relocated into their own section right after
 * it and re-skinned with the ref_components/display_cards stack (a hand of
 * cards, grayed out and fanned behind the front one, each un-graying and
 * lifting on its own hover) instead of the previous plain 4-up grid — see
 * DisplayCards.jsx for why they're built from its DisplayCard primitive
 * directly rather than through the generic <DisplayCards> wrapper.
 *
 * The actual counting-up animation is unchanged from the old
 * AnimatedCounter.jsx: GSAP tweens each number's innerText from 0 to its
 * real value, gated on `#counter` scrolling to the middle of the viewport.
 */
const StatsShowcase = () => {
    const counterRef = useRef(null);
    const countersRef = useRef([]);

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
    }, []);

    // Offsets grow with index so later cards fan out further behind the
    // front one — a generalised version of the reference's fixed 3-card
    // stack (translate-x-0/16/32, translate-y-0/10/20). These have to stay
    // literal, complete class names (not built from a template string):
    // Tailwind's build-time scanner matches class names as they appear
    // verbatim in source, so a computed string like
    // `translate-x-${n}` never produces the utility it names — nothing
    // in the compiled CSS would actually move the card.
    const OFFSET_CLASSES = [
        "",
        "translate-x-16 translate-y-10",
        "translate-x-32 translate-y-20",
        "translate-x-48 translate-y-28",
    ];
    const last = counterItems.length - 1;
    const stackClassName = (index) =>
        [
            "[grid-area:stack]",
            OFFSET_CLASSES[Math.min(index, OFFSET_CLASSES.length - 1)],
            index === last ? "hover:translate-y-2" : "hover:-translate-y-8",
            index !== last &&
                "before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-xl before:bg-black/50 before:outline-1 before:outline-white/15 before:content-[''] before:transition-opacity before:duration-700 grayscale-[100%] hover:grayscale-0 hover:before:opacity-0",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
            <div className="mx-auto grid [grid-template-areas:'stack'] place-items-center py-10">
                {counterItems.map((item, index) => {
                    const Icon = iconFor(item.label);
                    return (
                        <DisplayCard
                            key={item.label}
                            cardRef={(el) => el && (countersRef.current[index] = el)}
                            className={stackClassName(index)}
                            icon={<Icon className="size-4 text-blue-300" />}
                            titleClassName="text-white-50"
                            title={
                                <span className="counter-number text-4xl font-bold">
                                    0{item.suffix}
                                </span>
                            }
                            description={item.label}
                            date=""
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default StatsShowcase;
