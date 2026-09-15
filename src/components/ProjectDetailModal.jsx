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

    // Web screenshots are landscape and mobile ones are portrait — one
    // fixed aspect-ratio box cropping both to fit was always going to cut
    // pieces off one of them. Web keeps the media on top the whole width
    // (it's already wide, so full-width top billing is what shows the most
    // of it) with text below; mobile puts the media in a side column,
    // narrower but free to run as tall as the screenshot actually is,
    // alongside the text rather than above it — a portrait screenshot
    // stacked above a paragraph of text would push that text a long way
    // down for no reason.
    const isMobileProject = project.category === "mobile";

    return createPortal(
        <div
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            onClick={onClose}
        >
            <div
                className={`glass-panel-strong relative flex max-h-[88vh] w-full max-w-4xl flex-col overflow-y-auto rounded-2xl ${
                    isMobileProject ? "md:flex-row" : ""
                }`}
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

                {/* object-contain, not object-cover: letterboxing beats
                    cropping either shape of screenshot. md:self-start (mobile
                    only) keeps this column from being stretched to match the
                    text column's height, so it's free to size purely off the
                    image's own aspect ratio instead. Web's image gets a
                    max-height so an unusually long full-page screenshot
                    can't dominate the whole modal — mobile deliberately has
                    no such cap, since letting it run "as tall as necessary"
                    is the point of putting it in its own column. */}
                <div
                    className={`relative flex w-full shrink-0 items-center justify-center overflow-hidden bg-black-100 ${
                        isMobileProject ? "md:w-2/5 md:self-start" : ""
                    }`}
                >
                    {hasVideo ? (
                        <video
                            src={project.videoPath}
                            className={`w-full object-contain ${isMobileProject ? "h-auto" : "h-auto max-h-[60vh]"}`}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <img
                            src={hasGif ? project.gifPath : project.imagePath}
                            alt={project.title}
                            className={`w-full object-contain ${isMobileProject ? "h-auto" : "h-auto max-h-[60vh]"}`}
                            loading="lazy"
                        />
                    )}
                </div>

                <div className={`flex w-full flex-col gap-5 p-6 md:p-10 ${isMobileProject ? "md:w-3/5" : ""}`}>
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
