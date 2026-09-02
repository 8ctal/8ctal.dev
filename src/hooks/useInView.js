import { useState, useEffect, useRef } from "react";

/**
 * Tracks whether the returned ref's element is on screen. Used to gate
 * live WebGL/WebGPU canvases so they dispose (stop their render loop,
 * release the GPU context) while scrolled out of view instead of running
 * — and competing for GPU resources — forever. See HeroExperience.jsx for
 * why this matters: an always-on canvas starved other pages' WebGL
 * contexts, which surfaced as "Context Lost" on the very next one created.
 */
export function useInView({ initialInView = true, threshold = 0 } = {}) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(initialInView);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === "undefined") return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, isInView];
}

export default useInView;
