import { useState } from "react";

// Turns "COPOWER ENERGY SOLUTIONS" into "CE", "8ctal · Freelance" into "8F", etc.
const getInitials = (text = "") =>
    text
        .split(/[\s·]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();

/**
 * Renders a company/brand logo inside the experience timeline's glass
 * marker. Falls back to a monogram when no logo is provided yet, or when
 * the image fails to load, instead of showing a broken image icon.
 */
const TimelineLogo = ({ src, alt, fallbackText }) => {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return (
            <div className="timeline-logo-fallback" aria-hidden={!alt}>
                {getInitials(fallbackText)}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setFailed(true)}
        />
    );
};

export default TimelineLogo;
