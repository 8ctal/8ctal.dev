import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import BootLoader from "./components/BootLoader";
import CustomCursor from "./components/CustomCursor";
import FloatingCVButton from "./components/FloatingCVButton";
import Navbar from "./components/NavBar";
import Footer from "./sections/Footer";
import Home from "./pages/Home";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";

// React Router doesn't scroll on navigation by default — without this, a
// <Link> from the home page to /blog (or between two blog posts) would
// land wherever the previous page happened to be scrolled to. A plain hash
// still gets to scroll to its element (the browser's own anchor-scroll
// only fires on a full page load, not a client-side route change).
const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            document.getElementById(hash.slice(1))?.scrollIntoView();
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
};

const App = () => (
    <>
        <BootLoader />
        <CustomCursor />
        <ScrollToTop />
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
        <Footer />
        <FloatingCVButton />
    </>
);

export default App;
