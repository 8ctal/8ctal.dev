/**
 * Minimal stand-in for shadcn/ui's `cn` (clsx + tailwind-merge) — this
 * project has neither dependency, and every ref_components port that
 * imports `@/lib/utils` only ever uses `cn` to join a fixed className with
 * an optional override, never to resolve conflicting Tailwind utilities
 * against each other. Plain filtering + joining covers that.
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default cn;
