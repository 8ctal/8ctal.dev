import { useEffect } from "react";

/**
 * Calls `handler` on any pointerdown outside `ref`'s element — used by
 * CertificationGallery.jsx to collapse the expanded grid back to the pile
 * when a visitor clicks/taps elsewhere on the page. `pointerdown` (not
 * `click`) so it fires before a drag or text selection that started inside
 * the element and ended outside it would otherwise be misread as an
 * outside click.
 */
export function useOutsideClick(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            const el = ref.current;
            if (!el || el.contains(event.target)) return;
            handler(event);
        };

        document.addEventListener("pointerdown", listener);
        return () => document.removeEventListener("pointerdown", listener);
    }, [ref, handler]);
}

export default useOutsideClick;
