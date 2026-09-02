import * as React from "react";
// Imported as `Motion` (capitalized): this project's ESLint config has no
// JSX-usage detection for member-expression tags like `motion.div`, so a
// lowercase import reads as unused even though it's referenced in the JSX
// below.
import { motion as Motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

function wrapIndex(n, len) {
    if (len <= 0) return 0;
    return ((n % len) + len) % len;
}

/** Minimal signed offset from active index to i, with wrapping (for loop behavior). */
function signedOffset(i, active, len, loop) {
    const raw = i - active;
    if (!loop || len <= 1) return raw;

    // consider wrapped alternative
    const alt = raw > 0 ? raw - len : raw + len;
    return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

/**
 * A fanned, draggable stack of cards (3D tilt + spring physics), one active
 * card at a time. Ported from a reference component into this project's
 * stack (plain JSX, no Next.js) and restyled onto the Liquid Glass tokens —
 * see DESIGN.md § Material for the rim/shadow language used here.
 */
export function CardStack({
    items,
    initialIndex = 0,
    maxVisible = 7,

    cardWidth = 520,
    cardHeight = 320,

    overlap = 0.48,
    spreadDeg = 48,

    perspectivePx = 1100,
    depthPx = 140,
    tiltXDeg = 12,

    activeLiftPx = 22,
    activeScale = 1.03,
    inactiveScale = 0.94,

    springStiffness = 280,
    springDamping = 28,

    loop = true,
    autoAdvance = false,
    intervalMs = 2800,
    pauseOnHover = true,

    showDots = true,
    className,

    onChangeIndex,
    renderCard,

    // The site's own reduce-motion toggle (see MotionPreference context).
    // framer-motion only reads the OS media query on its own, so combine it
    // with whatever the caller passes here.
    forceReducedMotion = false,
}) {
    const systemReduceMotion = useReducedMotion();
    const reduceMotion = systemReduceMotion || forceReducedMotion;
    const len = items.length;

    const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len));
    const [hovering, setHovering] = React.useState(false);

    // Responsive fan: scale the whole stack down to fit the stage's actual
    // width instead of a fixed breakpoint, so a 520px card doesn't overflow
    // a 375px phone. 1.15x leaves room to see the neighbor cards' edges.
    const stageRef = React.useRef(null);
    const [containerWidth, setContainerWidth] = React.useState(0);

    React.useEffect(() => {
        const el = stageRef.current;
        if (!el || typeof ResizeObserver === "undefined") return undefined;
        const observer = new ResizeObserver((entries) => {
            const width = entries[0]?.contentRect.width;
            if (width) setContainerWidth(width);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const fanScale = containerWidth > 0 ? Math.min(1, containerWidth / (cardWidth * 1.15)) : 1;
    const scaledCardWidth = Math.round(cardWidth * fanScale);
    const scaledCardHeight = Math.round(cardHeight * fanScale);

    // keep active in bounds if items change
    React.useEffect(() => {
        setActive((a) => wrapIndex(a, len));
    }, [len]);

    React.useEffect(() => {
        if (!len) return;
        onChangeIndex?.(active, items[active]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    const maxOffset = Math.max(0, Math.floor(maxVisible / 2));

    const cardSpacing = Math.max(10, Math.round(scaledCardWidth * (1 - overlap)));
    const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

    const canGoPrev = loop || active > 0;
    const canGoNext = loop || active < len - 1;

    const prev = React.useCallback(() => {
        if (!len) return;
        if (!canGoPrev) return;
        setActive((a) => wrapIndex(a - 1, len));
    }, [canGoPrev, len]);

    const next = React.useCallback(() => {
        if (!len) return;
        if (!canGoNext) return;
        setActive((a) => wrapIndex(a + 1, len));
    }, [canGoNext, len]);

    // keyboard navigation (when container focused)
    const onKeyDown = (e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    };

    // autoplay
    React.useEffect(() => {
        if (!autoAdvance) return;
        if (reduceMotion) return;
        if (!len) return;
        if (pauseOnHover && hovering) return;

        const id = window.setInterval(
            () => {
                if (loop || active < len - 1) next();
            },
            Math.max(700, intervalMs)
        );

        return () => window.clearInterval(id);
    }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, loop, active, next]);

    if (!len) return null;

    const activeItem = items[active];

    return (
        <div
            className={cn("w-full", className)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {/* Stage */}
            <div
                ref={stageRef}
                className="relative w-full"
                style={{ height: Math.max(280, scaledCardHeight + 80) }}
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                {/* background wash / spotlight (unique feel) */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full bg-white-50/5 blur-3xl"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[76%] rounded-full bg-black/40 blur-3xl"
                    aria-hidden="true"
                />

                <div
                    className="absolute inset-0 flex items-end justify-center"
                    style={{ perspective: `${perspectivePx}px` }}
                >
                    <AnimatePresence initial={false}>
                        {items.map((item, i) => {
                            const off = signedOffset(i, active, len, loop);
                            const abs = Math.abs(off);
                            const visible = abs <= maxOffset;

                            // hide far-away cards cleanly
                            if (!visible) return null;

                            // fan geometry
                            const rotateZ = off * stepDeg;
                            const x = off * cardSpacing;
                            const y = abs * 10; // subtle arc-down feel
                            const z = -abs * depthPx;

                            const isActive = off === 0;

                            const scale = isActive ? activeScale : inactiveScale;
                            const lift = isActive ? -activeLiftPx : 0;

                            const rotateX = isActive ? 0 : tiltXDeg;

                            const zIndex = 100 - abs;

                            // drag only on the active card
                            const dragProps = isActive
                                ? {
                                      drag: "x",
                                      dragConstraints: { left: 0, right: 0 },
                                      dragElastic: 0.18,
                                      onDragEnd: (_e, info) => {
                                          if (reduceMotion) return;
                                          const travel = info.offset.x;
                                          const v = info.velocity.x;
                                          const threshold = Math.min(160, scaledCardWidth * 0.22);

                                          if (travel > threshold || v > 650) prev();
                                          else if (travel < -threshold || v < -650) next();
                                      },
                                  }
                                : {};

                            return (
                                <Motion.div
                                    key={item.id}
                                    className={cn(
                                        "glass-edge absolute bottom-0 rounded-2xl overflow-hidden",
                                        "will-change-transform select-none",
                                        isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
                                    )}
                                    style={{
                                        width: scaledCardWidth,
                                        height: scaledCardHeight,
                                        zIndex,
                                        transformStyle: "preserve-3d",
                                    }}
                                    initial={
                                        reduceMotion
                                            ? false
                                            : { opacity: 0, y: y + 40, x, rotateZ, rotateX, scale }
                                    }
                                    animate={{ opacity: 1, x, y: y + lift, rotateZ, rotateX, scale }}
                                    transition={{
                                        type: "spring",
                                        stiffness: springStiffness,
                                        damping: springDamping,
                                    }}
                                    onClick={() => {
                                        if (isActive && item.href) {
                                            window.open(item.href, "_blank", "noopener,noreferrer");
                                            return;
                                        }
                                        setActive(i);
                                    }}
                                    {...dragProps}
                                >
                                    <div
                                        className="h-full w-full"
                                        style={{
                                            transform: `translateZ(${z}px)`,
                                            transformStyle: "preserve-3d",
                                        }}
                                    >
                                        {renderCard ? (
                                            renderCard(item, { active: isActive })
                                        ) : (
                                            <DefaultFanCard item={item} />
                                        )}
                                    </div>
                                </Motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Dots navigation centered at bottom */}
            {showDots ? (
                <div className="mt-6 flex items-center justify-center gap-3">
                    <div className="flex items-center gap-2">
                        {items.map((it, idx) => {
                            const on = idx === active;
                            return (
                                <button
                                    key={it.id}
                                    type="button"
                                    onClick={() => setActive(idx)}
                                    className={cn(
                                        "h-2 w-2 rounded-full transition",
                                        on ? "bg-white-50" : "bg-white-50/30 hover:bg-white-50/50"
                                    )}
                                    aria-label={`Ir a ${it.title}`}
                                />
                            );
                        })}
                    </div>
                    {activeItem.href ? (
                        <a
                            href={activeItem.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-50 hover:text-white-50 transition-colors"
                            aria-label="Abrir enlace"
                        >
                            <SquareArrowOutUpRight className="h-4 w-4" />
                        </a>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

function DefaultFanCard({ item }) {
    return (
        <div className="relative h-full w-full">
            <div className="absolute inset-0">
                {item.imageSrc ? (
                    <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        draggable={false}
                        loading="eager"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-black-200 text-sm text-blue-50">
                        Sin imagen
                    </div>
                )}
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-end p-5">
                <div className="truncate text-lg font-semibold text-white">{item.title}</div>
                {item.description ? (
                    <div className="mt-1 line-clamp-2 text-sm text-white/80">{item.description}</div>
                ) : null}
            </div>
        </div>
    );
}

export default CardStack;
