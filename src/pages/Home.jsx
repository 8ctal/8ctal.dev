import Certifications from "../sections/Certifications";
import Contact from "../sections/Contact";
import Experience from "../sections/Experience";
import FeatureCards from "../sections/FeatureCards";
import Hero from "../sections/Hero";
import LogoShowcase from "../sections/LogoShowcase";
import RecentThoughts from "../sections/RecentThoughts";
import ShowcaseSection from "../sections/ShowcaseSection";
import StatsShowcase from "../components/StatsShowcase";
import TechStack from "../sections/TechStack";
import Testimonials from "../sections/Testimonials";

// The single scrolling page itself — everything that used to be App.jsx's
// body directly. Split out once App.jsx needed to become a route table
// (see App.jsx / the /blog routes): Navbar, Footer and the two floating
// overlays stay mounted at the App level across every route, but the home
// page's own section flow only renders on "/".
const Home = () => (
    <>
        <Hero />
        <StatsShowcase />
        <ShowcaseSection />
        <LogoShowcase />
        <FeatureCards />
        <Experience />
        <Certifications />
        <TechStack />
        <Testimonials />
        <RecentThoughts />
        <Contact />
    </>
);

export default Home;
