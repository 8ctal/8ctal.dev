import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "../constants";
import ProjectCard from "../components/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // Animation for the main section
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
        );
    }, []);

    // Separar proyectos destacados y regulares
    const featuredProjects = projects.filter(project => project.featured);
    const regularProjects = projects.filter(project => !project.featured);

    return (
        <div id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    {/* Proyecto principal destacado */}
                    <ProjectCard 
                        project={featuredProjects[0]} 
                        index={0} 
                        isFeatured={true} 
                    />

                    {/* Lista de proyectos secundarios */}
                    <div className="project-list-wrapper overflow-hidden">
                        {featuredProjects.slice(1).map((project, index) => (
                            <ProjectCard 
                                key={project.id}
                                project={project} 
                                index={index + 1} 
                            />
                        ))}
                    </div>
                </div>

                {/* Sección adicional para proyectos regulares */}
                {regularProjects.length > 0 && (
                    <div className="additional-projects mt-20">
                        <h3 className="text-3xl font-bold mb-10 text-center">
                            Más Proyectos
                        </h3>
                        <div className="grid-3-cols">
                            {regularProjects.map((project, index) => (
                                <ProjectCard 
                                    key={project.id}
                                    project={project} 
                                    index={index} 
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppShowcase;