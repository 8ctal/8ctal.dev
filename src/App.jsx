import BootLoader from "./components/BootLoader";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import CustomCursor from "./components/CustomCursor";
import Experience from "./sections/Experience";
import FeatureCards from "./sections/FeatureCards";
import FloatingCVButton from "./components/FloatingCVButton";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import LogoShowcase from "./sections/LogoShowcase";
import Navbar from "./components/NavBar";
import ShowcaseSection from "./sections/ShowcaseSection";
import TechStack from "./sections/TechStack";
import Testimonials from "./sections/Testimonials";

const App = () => (
  <>
    <BootLoader />
    <CustomCursor />
    <Navbar />
    <Hero />
    <ShowcaseSection />
    <LogoShowcase />
    <FeatureCards />
    <Experience />
    <Certifications />
    <TechStack />
    <Testimonials />
    <Contact />
    <Footer />
    <FloatingCVButton />
  </>
);

export default App;