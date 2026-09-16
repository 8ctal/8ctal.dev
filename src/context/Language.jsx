import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
    abilities as abilitiesRaw,
    certifications as certificationsRaw,
    counterItems as counterItemsRaw,
    cvLink as cvLinkRaw,
    expCards as expCardsRaw,
    navLinks as navLinksRaw,
    projects as projectsRaw,
    techStackIcons as techStackIconsRaw,
    words as wordsRaw,
} from "../constants";
import { blogPosts as blogPostsRaw } from "../constants/blog";
import { ui } from "../constants/ui";

const STORAGE_KEY = "8ctal:language";
const LanguageContext = createContext(null);

function getInitialLanguage() {
    if (typeof window === "undefined") return "es";
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === "es" || stored === "en") return stored;
    } catch {
        // localStorage unavailable (private browsing, etc.) — fall through
        // to the browser's own language preference below.
    }
    return navigator.language?.toLowerCase().startsWith("en") ? "en" : "es";
}

// Every bilingual entry in constants/index.js and constants/blog.js carries
// its shared, language-independent fields alongside an `es`/`en`
// sub-object — this flattens the active language's half onto the rest, so
// components read plain fields (`project.subtitle`, not
// `project.es.subtitle`) without needing to know the data is bilingual at
// all.
const localize = (entry, language) => {
    const { es, en, ...shared } = entry;
    return { ...shared, ...(language === "en" ? en : es) };
};

const localizeList = (list, language) => list.map((entry) => localize(entry, language));

/**
 * Site-wide English/Spanish toggle. Spanish is the historical default (see
 * CLAUDE.md — this is a Colombian developer's Spanish-language portfolio);
 * a first-time visitor whose browser is set to English gets English
 * automatically, the same way MotionPreference.jsx reads the OS
 * reduced-motion query, but an explicit choice always wins from then on and
 * is persisted the same way.
 */
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(getInitialLanguage);

    useEffect(() => {
        document.documentElement.lang = language;
        try {
            window.localStorage.setItem(STORAGE_KEY, language);
        } catch {
            // ignore — the toggle still works for this page load
        }
    }, [language]);

    const toggleLanguage = () => setLanguage((current) => (current === "es" ? "en" : "es"));

    const value = useMemo(() => {
        const blogPosts = localizeList(blogPostsRaw, language);
        // timeZone: "UTC" — dateISO ("2026-03-01") is a plain calendar date,
        // not a specific instant. Formatting it in the visitor's local zone
        // instead would shift it backward a day for anyone west of UTC
        // (parsed as UTC midnight, which is still the previous day across
        // most of the Americas), occasionally rendering the wrong month.
        const dateFormatter = new Intl.DateTimeFormat(language === "en" ? "en-US" : "es-ES", {
            month: "long",
            year: "numeric",
            timeZone: "UTC",
        });

        return {
            language,
            setLanguage,
            toggleLanguage,
            t: ui[language],
            cvLink: cvLinkRaw[language],
            navLinks: localizeList(navLinksRaw, language),
            words: localizeList(wordsRaw, language),
            counterItems: localizeList(counterItemsRaw, language),
            abilities: localizeList(abilitiesRaw, language),
            techStackIcons: localizeList(techStackIconsRaw, language),
            expCards: localizeList(expCardsRaw, language),
            certifications: localizeList(certificationsRaw, language),
            projects: localizeList(projectsRaw, language),
            blogPosts,
            getBlogPost: (slug) => blogPosts.find((post) => post.slug === slug),
            // Blog posts store only `dateISO` (see constants/blog.js) so the
            // displayed date is always formatted in whichever language is
            // active, instead of a second hardcoded string that could drift
            // out of sync with it.
            formatDate: (dateISO) => dateFormatter.format(new Date(dateISO)),
        };
    }, [language]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return ctx;
};
