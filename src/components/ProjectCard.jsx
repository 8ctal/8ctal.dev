import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const ProjectCard = ({ project, index, isFeatured = false }) => {
    const cardRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            cardRef.current,
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.3 * (index + 1),
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top bottom-=100",
                },
            }
        );
    }, []);

    const handleClick = () => {
        if (project.link && project.link !== "#") {
            window.open(project.link, "_blank", "noopener,noreferrer");
        }
    };

    const isClickable = project.link && project.link !== "#";

    if (isFeatured) {
        return (
            <div 
                ref={cardRef} 
                className={`featured-project-wrapper ${isClickable ? 'cursor-pointer hover:scale-[1.02] transition-transform duration-300' : ''}`}
                onClick={isClickable ? handleClick : undefined}
            >
                <div className="image-wrapper">
                    <img src={project.imagePath} alt={project.title} />
                </div>
                <div className="text-content">
                    <div className="badges">
                        {project.technologies.map((tech, idx) => (
                            <span key={idx} className="badge">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <h2>{project.subtitle}</h2>
                    <p className="text-white-50 md:text-xl">{project.description}</p>
                    {isClickable && (
                        <div className="mt-4 flex items-center gap-3 text-blue-50 group">
                            <span className="text-sm font-medium group-hover:text-white transition-colors duration-300">
                                Ver proyecto
                            </span>
                            <div className="relative">
                                <svg 
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 group-hover:text-white" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                                </svg>
                                <div className="absolute inset-0 bg-blue-400/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div 
            ref={cardRef} 
            className={`project ${isClickable ? 'cursor-pointer hover:scale-[1.02] transition-transform duration-300' : ''}`}
            onClick={isClickable ? handleClick : undefined}
        >
            <div className="image-wrapper">
                <img src={project.imagePath} alt={project.title} />
            </div>
            <div className="project-info">
                <h2>{project.subtitle}</h2>
                <p className="text-white-50 md:text-xl">{project.description}</p>
                <div className="tech-badges">
                    {project.technologies.slice(0, 5).map((tech, idx) => (
                        <span key={idx} className="tech-badge">
                            {tech}
                        </span>
                    ))}
                </div>
                {isClickable && (
                    <div className="mt-3 flex items-center gap-3 text-blue-50 group">
                        <span className="text-sm font-medium group-hover:text-white transition-colors duration-300">
                            Ver proyecto
                        </span>
                        <div className="relative">
                            <svg 
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 group-hover:text-white" 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path d="M7 17l9.2-9.2M17 17V7H7"/>
                            </svg>
                            <div className="absolute inset-0 bg-blue-400/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
