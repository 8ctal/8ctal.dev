import GlowCard from "./GlowCard";
import SkillsToggle from "./SkillsToggle";
import { useLanguage } from "../context/Language";

/**
 * The full-detail certification card — logo/title/issuer, description,
 * date + credential ID, skills toggle, verify link — shared by
 * CertificationScrollStack.jsx (mobile) and CertificationGallery.jsx
 * (desktop) so both ports of their respective ref_components keep
 * identical card content and only differ in how they lay multiple cards
 * out. `compact` renders just the logo/title/issuer header, used for
 * CertificationGallery's collapsed pile preview, where there isn't room
 * (or need) for the rest.
 *
 * Still gets the Liquid Glass GlowCard treatment (DESIGN.md names GlowCard
 * as the certifications card component) — `solid` (see index.css's
 * .card--solid) since these are meant to sit stacked or tightly packed,
 * where the lighter default glass would show the card behind through the
 * front one.
 */
const CertificationCard = ({ cert, compact = false }) => {
    const { t } = useLanguage();

    return (
        <GlowCard card={cert} index={0} showStars={false} solid>
            <div className="flex h-full flex-col">
                <div className={compact ? "flex items-center gap-4" : "mb-6 flex items-center gap-4"}>
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white-50 p-2">
                        <img
                            src={cert.imgPath}
                            alt={cert.title}
                            className="h-full w-full object-contain"
                            loading="lazy"
                        />
                    </div>
                    <div className="min-w-0">
                        <h3 className="truncate text-xl font-semibold text-white">{cert.title}</h3>
                        <p className="text-blue-50 text-sm">{cert.issuer}</p>
                    </div>
                </div>

                {!compact && (
                    <>
                        <div className="mb-6 flex-grow">
                            <p className="text-white-50 text-base leading-relaxed">{cert.description}</p>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-blue-50">{cert.date}</span>
                                {cert.credentialId && (
                                    <span className="text-blue-50 font-mono">ID: {cert.credentialId}</span>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <SkillsToggle skills={cert.skills} label={t.certifications.skillsLabel} />
                        </div>

                        <div className="relative z-10 mt-auto">
                            <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-panel group pointer-events-auto relative z-20 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white-50 transition-colors duration-300 hover:text-white"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {t.certifications.verify}
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
                    </>
                )}
            </div>
        </GlowCard>
    );
};

export default CertificationCard;
