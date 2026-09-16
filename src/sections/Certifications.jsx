import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "../context/Language";
import TitleHeader from "../components/TitleHeader";
import CertificationStack from "../components/CertificationStack";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
    const { certifications, t } = useLanguage();

    useGSAP(() => {
        gsap.fromTo(
            "#certifications .cert-stack",
            { yPercent: 15, opacity: 0 },
            {
                yPercent: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#certifications .cert-stack",
                    start: "top 85%",
                },
            }
        );
    }, []);

    return (
        <section
            id="certifications"
            className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
        >
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader
                    title={t.certifications.title}
                    sub={t.certifications.sub}
                />

                {/* Stack instead of a grid — mechanics ported from
                    ref_components/animated_card, see CertificationStack.jsx. */}
                <div className="cert-stack mt-20">
                    <CertificationStack items={certifications} />
                </div>
            </div>
        </section>
    );
};

export default Certifications;
