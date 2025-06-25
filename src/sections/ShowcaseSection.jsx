import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
    const sectionRef = useRef(null);
    const rydeRef = useRef(null);
    const libraryRef = useRef(null);
    const ycDirectoryRef = useRef(null);

    useGSAP(() => {
        // Animation for the main section
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
        );

        // Animations for each app showcase
        const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

        cards.forEach((card, index) => {
            gsap.fromTo(
                card,
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
                        trigger: card,
                        start: "top bottom-=100",
                    },
                }
            );
        });
    }, []);

    return (
        <div id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    <div ref={rydeRef} className="first-project-wrapper">
                        <div className="image-wrapper">
                            <img src="/images/parchUIS_banner.png" alt="Ryde App Interface" />
                        </div>
                        <div className="text-content">
                            <h2>
                                Las últimas actualizaciones de la comunidad educativa en un solo lugar, un mundo digital 3D
                                llamado ParchUIS
                            </h2>
                            <p className="text-white-50 md:text-xl">
                                Una aplicación construida con Flutter,
                                Firebase, MapBox SDK y otras herramientas de desarrollo escalables.
                            </p>
                        </div>
                    </div>

                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project" ref={libraryRef}>
                            <div className="image-wrapper w-full overflow-hidden aspect-[16/9]">
                                <img
                                    src="/images/gym_app_banner.png"
                                    alt="Library Management Platform"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2>Con nuestra GymApp no tendrás que recordar tu rutina de ejercicios,
                                aquí tendrás a la mano todo lo relacionado con tu
                                sitio de entrenamiento.</h2>
                        </div>

                        <div className="project" ref={ycDirectoryRef}>
                            <div className="image-wrapper bg-black">
                                <img
                                    src="/images/school_admin_display.png"
                                    alt="YC Directory App"
                                />
                            </div>
                            <h2>Administra fácilmente tus estudiantes y profesores en un solo lugar.</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppShowcase;