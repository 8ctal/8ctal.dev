import { useRef, useState, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../constants";
import TitleHeader from "../components/TitleHeader";
import InteractiveFolderGallery from "../components/InteractiveFolderGallery";
import ProjectDetailModal from "../components/ProjectDetailModal";
import { useMotionPreference } from "../context/MotionPreference";

// Below the fold, and each pulls in its own real dependency (framer-motion,
// lucide-react): code-split so that weight only downloads once someone
// scrolls this far, instead of blocking the initial bundle.
const CardStack = lazy(() => import("../components/CardStack"));
const PhoneCarousel = lazy(() => import("../components/PhoneCarousel"));

const StackFallback = ({ height = 380 }) => (
    <div
        className="glass-panel rounded-2xl animate-pulse"
        style={{ height }}
        aria-hidden="true"
    />
);

gsap.registerPlugin(ScrollTrigger);

// The folder gallery's own preview stack — a handful of featured
// screenshots across both categories, purely decorative (opening the
// folder just reveals the real showcase below; it doesn't gate *which*
// projects show up there).
const folderPreviewIds = ["camos_digital", "copower_pr_elec", "parchuis", "gymapp", "school-admin"];

const AppShowcase = () => {
    const sectionRef = useRef(null);
    const { reducedMotion } = useMotionPreference();
    const [folderOpen, setFolderOpen] = useState(false);
    const [activeProject, setActiveProject] = useState(null);

    useGSAP(() => {
        // Animation for the main section
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
        );
    }, []);

    const webProjects = projects.filter((project) => project.category === "web");
    const mobileProjects = projects.filter((project) => project.category === "mobile");

    const folderPhotos = folderPreviewIds
        .map((id) => projects.find((project) => project.id === id))
        .filter(Boolean)
        .map((project) => ({ id: project.id, image: project.imagePath, alt: project.title }));

    const stackItems = webProjects.map((project) => ({
        id: project.id,
        title: project.title,
        imageSrc: project.imagePath,
        project,
    }));

    const mobileImages = mobileProjects.map((project) => ({
        src: project.imagePath,
        alt: project.title,
        islandColor: project.islandColor,
    }));

    const [activeWebIndex, setActiveWebIndex] = useState(0);
    const [activeMobileIndex, setActiveMobileIndex] = useState(0);

    return (
        <div id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                {/* First an interactive_folder_gallery gate — the real
                    showcase (title, CardStack/PhoneCarousel) only appears
                    once it's opened. */}
                <InteractiveFolderGallery
                    photos={folderPhotos}
                    folderName="mi-trabajo.gallery"
                    dragHintText="Arrastra una foto hacia abajo para cerrar"
                    onOpenChange={setFolderOpen}
                />

                <div
                    className={`transition-all duration-700 ${folderOpen ? "opacity-100" : "pointer-events-none -translate-y-6 opacity-0"}`}
                    aria-hidden={!folderOpen}
                >
                    <TitleHeader
                        title="Mi Trabajo"
                        sub="Proyectos que he construido"
                    />

                    {stackItems.length > 0 && (
                        <div className="mt-16">
                            {/* The card is image-only on purpose — text over the
                                artwork was covering it. Title/tech/link live in
                                the caption below, following the active card. */}
                            <Suspense fallback={<StackFallback />}>
                                <CardStack
                                    items={stackItems}
                                    onChangeIndex={setActiveWebIndex}
                                    forceReducedMotion={reducedMotion}
                                    onActivateClick={(item) => setActiveProject(item.project)}
                                    renderCard={(item) => (
                                        <img
                                            src={item.imageSrc}
                                            alt={item.title}
                                            className="h-full w-full object-cover"
                                            draggable={false}
                                            loading="eager"
                                        />
                                    )}
                                />
                            </Suspense>
                            <ProjectCaption
                                project={webProjects[activeWebIndex]}
                                onViewDetails={setActiveProject}
                            />
                        </div>
                    )}

                    {mobileImages.length > 0 && (
                        <div className="mt-20">
                            <h3 className="text-3xl font-bold mb-2 text-center">
                                Apps móviles
                            </h3>
                            <Suspense fallback={<StackFallback height={410} />}>
                                <PhoneCarousel
                                    images={mobileImages}
                                    onChangeIndex={setActiveMobileIndex}
                                    forceReducedMotion={reducedMotion}
                                />
                            </Suspense>
                            <ProjectCaption
                                project={mobileProjects[activeMobileIndex]}
                                onViewDetails={setActiveProject}
                            />
                        </div>
                    )}
                </div>
            </div>

            <ProjectDetailModal project={activeProject} onClose={() => setActiveProject(null)} />
        </div>
    );
};

/** Title, tech badges, a "Ver detalles" button (opens ProjectDetailModal)
 * and a direct "Ver proyecto" link, for whichever project is currently
 * active in a CardStack or PhoneCarousel above it. */
const ProjectCaption = ({ project, onViewDetails }) => {
    if (!project) return null;
    const href = project.link && project.link !== "#" ? project.link : undefined;

    return (
        <div className="text-center mt-6">
            <p className="text-white font-semibold text-lg">{project.title}</p>
            {project.technologies?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {project.technologies.slice(0, 5).map((tech) => (
                        <span
                            key={tech}
                            className="bg-black-200 text-white-50 text-xs px-3 py-1 rounded-full border border-blue-50/20"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            )}
            <div className="mt-4 flex items-center justify-center gap-4">
                <button
                    type="button"
                    onClick={() => onViewDetails?.(project)}
                    className="glass-panel rounded-lg px-4 py-2 text-sm font-medium text-white-50 transition-colors duration-300 hover:text-white"
                >
                    Ver detalles
                </button>
                {href && (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-blue-50 hover:text-white-50 text-sm transition-colors"
                    >
                        Ver proyecto
                    </a>
                )}
            </div>
        </div>
    );
};

export default AppShowcase;
