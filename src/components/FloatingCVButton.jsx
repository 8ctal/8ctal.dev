import { useLanguage } from "../context/Language";

// The entrance pop and idle float both live in index.css now (see
// .cv-animated-div's `animation` there) instead of as GSAP tweens — this
// component used to run both through useGSAP, gated on reducedMotion for
// the infinite float, but a gsap.ticker-driven tween stalls while its tab
// is hidden/occluded and jumps to catch up once it regains focus, which
// for an *infinite* loop meant a visible jitter every time that happened,
// not just once. Plain CSS animations don't have that failure mode, and
// the site's existing `.reduce-motion` rule (index.css) already collapses
// them the same as everything else, so there's nothing left for this
// component to gate in JS — it's a static button.
const FloatingCVButton = () => {
    const { cvLink, t } = useLanguage();

    return (
        <div
            className="cv-animated-div fixed bottom-15 right-9
                        sm:bottom-8 sm:right-8
                        md:bottom-15 md:right-10
                        z-50"
        >
            <a
                href={cvLink}
                className="cv-btn glass-panel group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.cv.download}
                title={t.cv.download}
            >
                <img
                    src="/images/cv_button.png"
                    alt=""
                    className="w-7 h-7 sm:w-8 sm:h-8 transition duration-300 group-hover:rotate-12 group-hover:scale-110"
                />
            </a>
        </div>
    );
};

export default FloatingCVButton;
