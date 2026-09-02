import { useRef, useState, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../constants";
import TitleHeader from "../components/TitleHeader";
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

const AppShowcase = () => {
    const sectionRef = useRef(null);
    const { reducedMotion } = useMotionPreference();

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

    const stackItems = webProjects.map((project) => ({
        id: project.id,
        title: project.title,
        imageSrc: project.imagePath,
        // Not rendered inside the card (that's the point), but keeps
        // "click the active card" opening the project, same as before.
        href: project.link && project.link !== "#" ? project.link : undefined,
    }));

    const mobileImages = mobileProjects.map((project) => ({
        src: project.imagePath,
        alt: project.title,
    }));

    const [activeWebIndex, setActiveWebIndex] = useState(0);
    const [activeMobileIndex, setActiveMobileIndex] = useState(0);

    return (
        <div id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
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
                        <ProjectCaption project={webProjects[activeWebIndex]} />
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
                        <ProjectCaption project={mobileProjects[activeMobileIndex]} />
                    </div>
                )}
            </div>
        </div>
    );
};

/** Title, tech badges, and a "Ver proyecto" link for whichever project is
 * currently active in a CardStack or PhoneCarousel above it. */
const ProjectCaption = ({ project }) => {
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
            {href && (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-50 hover:text-white-50 text-sm mt-3 transition-colors"
                >
                    Ver proyecto
                </a>
            )}
        </div>
    );
};

export default AppShowcase;
