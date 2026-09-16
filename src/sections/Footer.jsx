import { socialImgs } from "../constants";
import RuixenGradientFooter from "../components/RuixenGradientFooter";
import SocialLinks from "../components/SocialLinks";
import { useLanguage } from "../context/Language";

// The marquee band, the extra "Contáctame" button that used to sit next to
// the status dot, and then the status dot itself were all removed per
// feedback — NavBar's own "Contáctame" already covers that action
// everywhere on the page, and the footer doesn't need its own project-
// availability sign-off. The glow behind everything is
// ref_components/Ruixen_Gradient_Footer.tsx (see RuixenGradientFooter.jsx
// for the DESIGN.md note on why a second, deliberate exception to the
// single-neon-spark rule); the social row is
// ref_components/social_links/social_links.tsx (see SocialLinks.jsx).
const Footer = () => {
    const { t } = useLanguage();

    return (
        <RuixenGradientFooter minReveal={0} className="relative pt-16 pb-8 md:pt-20 md:pb-10">
            <div className="footer md:px-20 px-5">
                <div className="footer-container">
                    <SocialLinks socials={socialImgs} />

                    <p className="text-center md:text-end">
                        © {new Date().getFullYear()} 8ctal development. {t.footer.rights}
                    </p>
                </div>
            </div>
        </RuixenGradientFooter>
    );
};

export default Footer;
