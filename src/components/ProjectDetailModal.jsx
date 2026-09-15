import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * A floating detail page for one project: dims/blurs the rest of the site
 * behind it and shows a video or gif (when the project has one) instead of
 * just the static screenshot, plus the fuller description, tech stack, and
 * a link out to the live project. Opened from a click on the active card in
 * either CardStack or PhoneCarousel (see ShowcaseSection.jsx).
 *
 * Portalled to <body>, with the same close/focus/scroll-lock conventions as
 * NavBar's mobile overlay: Escape closes it, a click on the backdrop closes
 * it, body scroll is locked while it's open, and it renders even when
 * `project` is null so it can always fade out rather than vanish — the
 * caller just never gets there before `project` is first set.
 */
const ProjectDetailModal = ({ project, onClose }) => {
    const closeButtonRef = useRef(null);
    const isOpen = Boolean(project);

    useEffect(() => {
        if (!isOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeButtonRef.current?.focus();

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!project) return null;

    const hasVideo = Boolean(project.videoPath);
    const hasGif = !hasVideo && Boolean(project.gifPath);
    const hasLink = project.link && project.link !== "#";

    return createPortal(
        <div
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            onClick={onClose}
        >
            <div
                className="glass-panel-strong relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-y-auto rounded-2xl md:flex-row"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar detalles del proyecto"
                    className="glass-panel absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full text-white-50 transition-colors duration-300 hover:text-white"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-black-100 md:aspect-auto md:w-1/2">
                    {hasVideo ? (
                        <video
                            src={project.videoPath}
                            className="h-full w-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <img
                            src={hasGif ? project.gifPath : project.imagePath}
                            alt={project.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    )}
                </div>

                <div className="flex w-full flex-col gap-5 p-6 md:w-1/2 md:p-10">
                    <div>
                        <h3 className="text-2xl font-semibold text-white md:text-3xl">{project.title}</h3>
                        {project.subtitle && (
                            <p className="mt-2 text-sm text-blue-50 md:text-base">{project.subtitle}</p>
                        )}
                    </div>

                    <p className="text-white-50 leading-relaxed">{project.description}</p>

                    {project.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-black-50 bg-black-200 px-3 py-1 text-xs text-white-50"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {hasLink && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-panel mt-auto inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium text-white-50 transition-colors duration-300 hover:text-white"
                        >
                            Ver proyecto en vivo
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 17l9.2-9.2M17 17V7H7" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ProjectDetailModal;
