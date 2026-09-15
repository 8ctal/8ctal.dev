import { socialImgs } from "../constants";
import RuixenGradientFooter from "../components/RuixenGradientFooter";
import SocialLinks from "../components/SocialLinks";

// The marquee band and the extra "Contáctame" button that used to sit next
// to the status dot were both removed per feedback — the status dot alone
// is enough of a footer sign-off, and NavBar's own "Contáctame" already
// covers that action everywhere on the page. The glow behind everything is
// ref_components/Ruixen_Gradient_Footer.tsx (see RuixenGradientFooter.jsx
// for the DESIGN.md note on why a second, deliberate exception to the
// single-neon-spark rule); the social row is
// ref_components/social_links/social_links.tsx (see SocialLinks.jsx).
const Footer = () => {
    return (
        <RuixenGradientFooter className="relative pt-16 pb-8 md:pt-20 md:pb-10">
            <div className="footer md:px-20 px-5">
                <div className="footer-container">
                    <div className="flex flex-col items-center justify-center gap-3 md:items-start">
                        <span className="flex items-center gap-2.5 text-sm text-blue-50">
                            <span className="relative flex size-2.5">
                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/70" />
                                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
                            </span>
                            Disponible para nuevos proyectos
                        </span>
                    </div>

                    <SocialLinks socials={socialImgs} />

                    <div className="flex flex-col justify-center">
                        <p className="text-center md:text-end">
                            © {new Date().getFullYear()} 8ctal development. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </RuixenGradientFooter>
    );
};

export default Footer;
