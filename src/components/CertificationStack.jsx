import { useState } from "react";
// Imported as `Motion` (capitalized): this project's ESLint config has no
// JSX-usage detection for member-expression tags like `motion.div`, so a
// lowercase import reads as unused even though it's referenced in the JSX
// below (see CardStack.jsx's own copy of this same note).
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import GlowCard from "./GlowCard";
import SkillsToggle from "./SkillsToggle";

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

const EXIT_FORWARD = { y: 340, scale: 1, zIndex: 10 };
const EXIT_BACKWARD = { y: -220, scale: 0.85, zIndex: 10, opacity: 0 };
const ENTER_FORWARD = { y: -44, scale: 0.9 };
const ENTER_BACKWARD = { y: 340, scale: 1 };

const CertificationCardContent = ({ cert }) => (
    <GlowCard card={cert} index={0} showStars={false}>
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
                    <span className="text-blue-50 font-mono">ID: {cert.credentialId}</span>
                </div>
            </div>

            <div className="mb-6">
                <SkillsToggle skills={cert.skills} label="habilidades certificadas" />
            </div>

            <div className="relative z-10 mt-auto">
                <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-panel group pointer-events-auto relative z-20 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white-50 transition-colors duration-300 hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                >
                    Verificar certificación
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

const StackedCard = ({ cert, slot, exitDirection }) => {
    const { scale, y } = POSITION_STYLES[slot] ?? POSITION_STYLES[POSITION_STYLES.length - 1];
    const zIndex = POSITION_STYLES.length - slot;
    const exitAnim = slot === 0 ? (exitDirection === "back" ? EXIT_BACKWARD : EXIT_FORWARD) : undefined;
    const initialAnim =
        slot === POSITION_STYLES.length - 1
            ? exitDirection === "back"
                ? ENTER_BACKWARD
                : ENTER_FORWARD
            : undefined;

    return (
        <Motion.div
            key={cert.credentialId}
            initial={initialAnim}
            animate={{ y, scale, opacity: 1 }}
            exit={exitAnim}
            transition={{ type: "spring", duration: 1, bounce: 0 }}
            style={{ zIndex, left: "50%", x: "-50%", bottom: 0 }}
            className="absolute w-[min(90vw,26rem)]"
        >
            <CertificationCardContent cert={cert} />
        </Motion.div>
    );
};

const CertificationStack = ({ items }) => {
    const [order, setOrder] = useState(items);
    const [exitDirection, setExitDirection] = useState("forward");

    if (!items?.length) return null;

    const advance = () => {
        setExitDirection("forward");
        setOrder((current) => [...current.slice(1), current[0]]);
    };

    const retreat = () => {
        setExitDirection("back");
        setOrder((current) => [current[current.length - 1], ...current.slice(0, -1)]);
    };

    const visible = order.slice(0, POSITION_STYLES.length);

    return (
        <div className="flex w-full flex-col items-center">
            <div className="relative h-[30rem] w-full sm:h-[34rem]">
                <AnimatePresence initial={false}>
                    {visible.map((cert, slot) => (
                        <StackedCard key={cert.credentialId} cert={cert} slot={slot} exitDirection={exitDirection} />
                    ))}
                </AnimatePresence>
            </div>

            {items.length > 1 && (
                <div className="mt-8 flex items-center gap-4">
                    <button
                        type="button"
                        onClick={retreat}
                        aria-label="Certificación anterior"
                        className="glass-panel flex size-11 items-center justify-center rounded-full text-white-50 transition-colors duration-300 hover:text-white"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={advance}
                        aria-label="Siguiente certificación"
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
