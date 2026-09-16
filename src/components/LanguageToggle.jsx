import { useLanguage } from "../context/Language";

/**
 * Minimalist ES/EN switch — a single glass pill, both language codes always
 * visible, the active one full-opacity and the other dimmed. One click
 * flips it; there's no dropdown or third state, so a toggle reads faster
 * than a menu would for a binary choice. The aria-label/title stay
 * bilingual and constant (not pulled from `t`) since this is the one
 * control that has to stay legible in whichever language it's about to
 * switch away from.
 */
const LanguageToggle = ({ className = "" }) => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            type="button"
            className={`lang-toggle glass-panel ${className}`}
            onClick={toggleLanguage}
            aria-label="Cambiar idioma / Switch language"
            title="Cambiar idioma / Switch language"
        >
            <span className={language === "es" ? "lang-toggle-active" : ""}>ES</span>
            <span className="lang-toggle-divider" aria-hidden="true">/</span>
            <span className={language === "en" ? "lang-toggle-active" : ""}>EN</span>
        </button>
    );
};

export default LanguageToggle;
