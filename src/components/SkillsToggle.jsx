import { useState } from "react";

import { useLanguage } from "../context/Language";

/**
 * Collapsed-by-default skill/stack chip list behind a "Ver skills" toggle —
 * shared by Certifications and the Experience timeline, so the chip wall
 * doesn't compete with the summary/description text for attention by
 * default. Chips themselves are unchanged (same bg-black-200/text-white-50/
 * rounded-full look used everywhere else in the site). `label` is the
 * already-localized noun the caller passes in (e.g. "stack" or
 * t.certifications.skillsLabel) — only the "Show"/"Hide" verb wrapping it
 * is translated here.
 */
const SkillsToggle = ({ skills, label = "habilidades" }) => {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);

    if (!skills?.length) return null;

    return (
        <div>
            <button
                type="button"
                className="skills-toggle"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
            >
                <span>{open ? t.skills.hide(label) : t.skills.show(label)}</span>
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`skills-toggle-chevron ${open ? "rotate-180" : ""}`}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            <div className={`skills-toggle-panel ${open ? "open" : ""}`}>
                <div className="flex flex-wrap gap-2 pt-3">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="bg-black-200 text-white-50 text-xs px-3 py-1 rounded-full border border-blue-50/20"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsToggle;
