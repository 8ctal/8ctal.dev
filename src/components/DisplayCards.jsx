// Ported from ref_components/display_cards/display_cards.tsx (21st.dev
// community component, itself `npx shadcn add "https://21st.dev/r/Codehagen/display-cards"`).
// Two changes from the reference, both needed since this project has
// neither shadcn/ui nor its default theme:
// - `cn` comes from this project's own src/lib/cn.js instead of the shadcn
//   `@/lib/utils` alias.
// - The reference styles each card with shadcn's theme tokens (`bg-muted`,
//   `text-muted-foreground`, `border`/`outline-border`, `bg-background`),
//   none of which exist here. Swapped for this project's own Liquid Glass
//   material instead: the `.glass-panel` class (see index.css / DESIGN.md
//   § Elevation & Depth) for the background/border/blur, `text-blue-50` for
//   the muted footer line, and literal black for the edge-fade mask —
//   otherwise every card would render with an unstyled transparent
//   background and an invisible border. The stack/skew/grayscale-until-hover
//   mechanics themselves are unchanged.
import { Sparkles } from "lucide-react";

import { cn } from "../lib/cn";

export function DisplayCard({
    className,
    icon = <Sparkles className="size-4 text-blue-300" />,
    title = "Featured",
    description = "Discover amazing content",
    date = "Just now",
    iconClassName = "text-blue-500",
    titleClassName = "text-blue-500",
    // Not part of the reference: lets a caller (StatsShowcase) grab the
    // rendered card's own DOM node directly, instead of needing an extra
    // wrapper div just to hang a ref on — see that file for why.
    cardRef,
    // Also not part of the reference: overrides the fixed h-36/w-[22rem]
    // size. StatsShowcase needs a smaller card so 4 of them fit in a
    // horizontal row without overflowing a normal laptop screen — the
    // reference's fixed 22rem width was only ever tuned for its own
    // 3-card demo stack, never for laying cards out side by side.
    sizeClassName = "h-36 w-[22rem]",
    // Also not part of the reference: the constant 8° skew is what makes a
    // *stacked* card read as having depth, but StatsShowcase's settled row
    // (cards side by side, no longer overlapping) just looked crooked with
    // it still applied — this lets that caller turn it off once settled
    // instead of fighting the reference's class with a conflicting one of
    // equal specificity.
    skewed = true,
    // Also not part of the reference: forwarded so a caller can make a card
    // interactive (StatsShowcase uses this on mobile, where there's no
    // hover to reveal a card buried in the stack — tapping it has to do
    // that job instead).
    onClick,
}) {
    const interactive = Boolean(onClick);

    return (
        <div
            ref={cardRef}
            role={interactive ? "button" : undefined}
            tabIndex={interactive ? 0 : undefined}
            onClick={onClick}
            onKeyDown={
                interactive
                    ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              onClick(e);
                          }
                      }
                    : undefined
            }
            className={cn(
                "glass-panel relative flex select-none flex-col justify-between rounded-xl px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-black after:to-transparent after:content-[''] hover:border-white/20 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
                skewed && "-skew-y-[8deg]",
                sizeClassName,
                className
            )}
        >
            <div>
                <span className={cn("relative inline-block rounded-full bg-blue-800 p-1", iconClassName)}>
                    {icon}
                </span>
                <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
            </div>
            <p className="whitespace-nowrap text-lg text-white-50">{description}</p>
            <p className="text-blue-50">{date}</p>
        </div>
    );
}

export default function DisplayCards({ cards }) {
    const defaultCards = [
        {
            className:
                "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:outline-white/15 before:rounded-xl before:h-[100%] before:content-[''] before:bg-black/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            className:
                "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:outline-white/15 before:rounded-xl before:h-[100%] before:content-[''] before:bg-black/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
        },
    ];

    const displayCards = cards || defaultCards;

    return (
        <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
            {displayCards.map((cardProps, index) => (
                <DisplayCard key={index} {...cardProps} />
            ))}
        </div>
    );
}
