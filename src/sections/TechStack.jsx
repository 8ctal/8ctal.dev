import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
import { lazy, Suspense, useState } from "react";

import TitleHeader from "../components/TitleHeader";
import { techStackIcons, techStackImgs } from "../constants";

// Only the desktop branch below ever mounts this — mobile renders the
// static image instead — so code-split it rather than shipping R3F/drei
// to visitors who will never trigger it.
const TechIconCardExperience = lazy(() =>
    import("../components/models/tech_logos/TechIconCardExperience")
);

const TechStack = () => {
    // Below this width, skip the 3D canvases entirely and render the static
    // logo instead — five live WebGL contexts on one screen is real cost on
    // a phone (battery, thermals, first paint), and mobile users never get
    // to orbit them anyway. See DESIGN.md for the rest of the perf pass.
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    // On desktop, only the hovered/focused card goes live 3D — the other
    // four stay static images. Mounting all five R3F Canvas instances at
    // once was hitting the browser's simultaneous-WebGL-context ceiling
    // ("THREE.WebGLRenderer: Context Lost" in the console); this caps it
    // at one live context in this section, ever.
    const [activeIndex, setActiveIndex] = useState(null);

    // Animate the tech cards in the skills section
    useGSAP(() => {
        // This animation is triggered when the user scrolls to the #skills wrapper
        // The animation starts when the top of the wrapper is at the center of the screen
        // The animation is staggered, meaning each card will animate in sequence
        // The animation ease is set to "power2.inOut", which is a slow-in fast-out ease
        gsap.fromTo(
            ".tech-card",
            {
                // Initial values
                y: 50, // Move the cards down by 50px
                opacity: 0, // Set the opacity to 0
            },
            {
                // Final values
                y: 0, // Move the cards back to the top
                opacity: 1, // Set the opacity to 1
                duration: 1, // Duration of the animation
                ease: "power2.inOut", // Ease of the animation
                stagger: 0.2, // Stagger the animation by 0.2 seconds
                scrollTrigger: {
                    trigger: "#skills", // Trigger the animation when the user scrolls to the #skills wrapper
                    start: "top center", // Start the animation when the top of the wrapper is at the center of the screen
                },
            }
        );
    });

    return (
        <div id="skills" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Habilidades clave y tecnologías"
                    sub="Lo que puedo aportar"
                />
                <div className="tech-grid">
                    {/* Loop through the techStackIcons array and create a component for each item.
              The key is set to the name of the tech stack icon, and the classnames are set to
              border border-black-50 bg-black-100, tech-card, overflow-hidden, and group. The xl:rounded-full and rounded-lg
              classes are only applied on larger screens. */}
                    {techStackIcons.map((techStackIcon, index) => (
                        <div
                            key={techStackIcon.name}
                            tabIndex={0}
                            className="border border-black-50 bg-black-100 tech-card overflow-hidden group xl:rounded-full rounded-lg"
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex((current) => (current === index ? null : current))}
                            onFocus={() => setActiveIndex(index)}
                            onBlur={() => setActiveIndex((current) => (current === index ? null : current))}
                        >
                            {/* The tech-card-animated-bg div is used to create a background animation when the
                  component is hovered. */}
                            <div className="tech-card-animated-bg" />
                            <div className="tech-card-content">
                                {/* Mobile: always the static logo image. Desktop: the static
                    image too, except the one card under hover/focus, which
                    swaps to the animated 3D model — see activeIndex above.
                    Positionally paired via index from techStackImgs since
                    the two lists use different display names. */}
                                <div className="tech-icon-wrapper">
                                    {!isMobile && activeIndex === index ? (
                                        <Suspense fallback={<div className="w-20 h-20 animate-pulse rounded-full bg-black-200" />}>
                                            <TechIconCardExperience model={techStackIcon} />
                                        </Suspense>
                                    ) : (
                                        <img
                                            src={techStackImgs[index]?.imgPath}
                                            alt={techStackIcon.name}
                                            className="w-20 h-20 object-contain"
                                            loading="lazy"
                                        />
                                    )}
                                </div>
                                {/* The padding-x and w-full classes are used to add horizontal padding to the
                    text and make it take up the full width of the component. */}
                                <div className="padding-x w-full">
                                    {/* The p tag contains the name of the tech stack icon. */}
                                    <p>{techStackIcon.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechStack;
