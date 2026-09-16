import { useEffect, useId, useRef, useState } from "react";
import { motion as Motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import CertificationCard from "./CertificationCard";
import { useLanguage } from "../context/Language";
import { useOutsideClick } from "../hooks/useOutsideClick";

// Ported from ref_components/expandable_gallery/expandable_gallery.tsx for
// the desktop certifications view — collapsed, it's a small scattered pile
// of teaser cards (a preview, not the whole list); expanded, it's a full
// grid using all the screen width instead of a single-card carousel.
// Differences from the reference:
// - Teasers and grid items are this project's own CertificationCard
//   (compact/full) instead of a plain photo, and get the Liquid Glass
//   GlowCard material instead of shadcn tokens — dropped `bg-muted`/
//   `border-background`/etc. entirely rather than mapping them to
//   equivalents, since GlowCard already supplies its own background,
//   border and shadow.
// - `motion/react` → `framer-motion` (same library under its older package
//   name, already this project's dependency).
// - Next.js `<Image>` → plain `<img>`; shadcn `<Button>` and
//   `@hugeicons/react` → this project's own glass-panel button styling and
//   lucide-react, matching every other ported component's buttons.
// - No layoutId shared-element morph between a teaser and its grid card:
//   the reference's photos render identical content in both states (just
//   position/size change), but a teaser here is deliberately a *smaller
//   subset* of the full card's content — animating that content change via
//   layoutId reads as a jump-cut, not a morph. The container itself still
//   uses `layout` for a smooth pile→grid reflow, and grid cards fade/scale
//   in the same way the reference's own non-primary photos already do.
const PILE_LAYOUT = [
    { rotate: -8, x: -78, y: 6, zIndex: 10 },
    { rotate: 2, x: 0, y: -12, zIndex: 20 },
    { rotate: 9, x: 78, y: 4, zIndex: 15 },
];

const transition = { type: "spring", stiffness: 160, damping: 18, mass: 1 };

const CertificationGallery = ({ items }) => {
    const { t } = useLanguage();
    const [isExpanded, setIsExpanded] = useState(false);
    const layoutGroupId = useId();
    const containerRef = useRef(null);

    useOutsideClick(containerRef, () => setIsExpanded(false));

    useEffect(() => {
        if (!isExpanded) return undefined;
        const onKeyDown = (e) => {
            if (e.key === "Escape") setIsExpanded(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isExpanded]);

    // Keep the pile in bounds when the (possibly filtered) list shrinks
    // below what's currently shown expanded.
    useEffect(() => {
        if (!items.length) setIsExpanded(false);
    }, [items.length]);

    if (!items.length) return null;

    const pileItems = items.slice(0, PILE_LAYOUT.length);

    return (
        <LayoutGroup id={layoutGroupId}>
            <div ref={containerRef} className="w-full">
                <AnimatePresence>
                    {isExpanded && (
                        <Motion.button
                            key="cert-gallery-back"
                            type="button"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            onClick={() => setIsExpanded(false)}
                            className="glass-panel mb-6 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white-50 transition-colors duration-300 hover:text-white"
                        >
                            <ArrowLeft className="size-4" />
                            {t.certifications.goBack}
                        </Motion.button>
                    )}
                </AnimatePresence>

                <Motion.div layout transition={transition} className={isExpanded ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" : "relative flex h-72 w-full items-center justify-center"}>
                    {isExpanded
                        ? items.map((cert) => (
                              <Motion.div
                                  key={cert.link}
                                  layout
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={transition}
                              >
                                  <CertificationCard cert={cert} />
                              </Motion.div>
                          ))
                        : pileItems.map((cert, index) => {
                              const pos = PILE_LAYOUT[index];
                              return (
                                  <Motion.div
                                      key={cert.link}
                                      layout
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1, rotate: pos.rotate, x: pos.x, y: pos.y, zIndex: pos.zIndex }}
                                      whileHover={{ scale: 1.05, y: pos.y - 10, rotate: pos.rotate * 0.8, zIndex: 50 }}
                                      transition={transition}
                                      className="absolute w-64 cursor-pointer"
                                      onClick={() => setIsExpanded(true)}
                                  >
                                      <CertificationCard cert={cert} compact />
                                  </Motion.div>
                              );
                          })}
                </Motion.div>

                <AnimatePresence>
                    {!isExpanded && (
                        <Motion.div
                            key="cert-gallery-cta"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mt-4 flex justify-center"
                        >
                            <button
                                type="button"
                                onClick={() => setIsExpanded(true)}
                                className="glass-panel group flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white-50 transition-colors duration-300 hover:text-white"
                            >
                                {t.certifications.explore}
                                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </Motion.div>
                    )}
                </AnimatePresence>
            </div>
        </LayoutGroup>
    );
};

export default CertificationGallery;
