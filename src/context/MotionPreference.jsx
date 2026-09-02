import { createContext, useContext, useEffect, useState } from "react";
import gsap from "gsap";

const STORAGE_KEY = "8ctal:reduced-motion";
const MotionPreferenceContext = createContext(null);

function getInitialPreference() {
    if (typeof window === "undefined") return false;
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored !== null) return stored === "true";
    } catch {
        // localStorage unavailable (private browsing, etc.) — fall through
        // to the OS-level preference below.
    }
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/**
 * Site-wide "reduce animations" toggle, defaulting to the OS preference but
 * user-overridable and persisted. Two mechanisms cover the whole site's
 * motion without touching every component:
 * - `gsap.globalTimeline.timeScale(50)` fast-forwards every GSAP tween and
 *   ScrollTrigger-triggered entrance (none of them use scroll-scrubbed
 *   progress, so this is safe — see index.css's ".reduce-motion" comment).
 * - The ".reduce-motion" class (index.css) collapses plain CSS
 *   transitions/keyframe animations to ~0.
 * framer-motion (CardStack) reads neither, since it drives its own clock —
 * components using it should also read `reducedMotion` from this context.
 */
export const MotionPreferenceProvider = ({ children }) => {
    const [reducedMotion, setReducedMotion] = useState(getInitialPreference);

    useEffect(() => {
        document.documentElement.classList.toggle("reduce-motion", reducedMotion);
        gsap.globalTimeline.timeScale(reducedMotion ? 50 : 1);
        try {
            window.localStorage.setItem(STORAGE_KEY, String(reducedMotion));
        } catch {
            // ignore — the toggle still works for this page load
        }
    }, [reducedMotion]);

    return (
        <MotionPreferenceContext.Provider value={{ reducedMotion, setReducedMotion }}>
            {children}
        </MotionPreferenceContext.Provider>
    );
};

export const useMotionPreference = () => {
    const ctx = useContext(MotionPreferenceContext);
    if (!ctx) {
        throw new Error("useMotionPreference must be used within MotionPreferenceProvider");
    }
    return ctx;
};
