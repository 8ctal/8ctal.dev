import * as React from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

const MOBILE_BREAKPOINT = 768;
// The Iphone15Pro SVG's own proportions (viewBox 433x882) — used to size the
// stage to the frame's actual rendered height instead of a guessed fixed
// pixel value that didn't match it. The screen cutout inside that same
// viewBox is 389.5x843.5 (≈0.4618:1) — source images should match that
// ratio; see PhoneCarousel's own comment below.
const PHONE_ASPECT_RATIO = 882 / 433;

function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        mql.addEventListener("change", onChange);
        onChange();
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return isMobile;
}

/**
 * A realistic iPhone 15 Pro frame (pure SVG), with the screenshot dropped
 * in via a foreignObject <img>. Ported from a reference component: Next.js's
 * <Image> became a plain <img>, and the frame keeps only the "dark mode"
 * palette from the original (a light/silver device), since this site never
 * switches to a light page background.
 */
const Iphone15Pro = ({ width = "100%", height = "auto", src, alt = "iPhone screen content", className }) => {
    return (
        <div className={cn("relative", className)}>
            <svg
                width={width}
                height={height}
                viewBox="0 0 433 882"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all duration-500 ease-in-out"
            >
                {/* Outer frame */}
                <path
                    d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
                    className="fill-[#DADADA]"
                />
                {/* side nubs */}
                <path d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z" className="fill-[#DADADA]" />
                <path d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z" className="fill-[#DADADA]" />
                <path d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z" className="fill-[#DADADA]" />
                <path d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z" className="fill-[#DADADA]" />
                {/* inner body */}
                <path
                    d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
                    className="fill-[#F0F0F0]"
                />
                <path opacity="0.5" d="M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z" className="fill-[#DADADA]" />
                {/* screen area */}
                <path
                    d="M21.25 75C21.25 44.2101 46.2101 19.25 77 19.25H355C385.79 19.25 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 21.25 837.79 21.25 807V75Z"
                    className="fill-[#F5F5F5] stroke-[#E0E0E0] stroke-[0.5]"
                    filter="drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))"
                />
                {src && (
                    <foreignObject x="21.25" y="19.25" width="389.5" height="843.5" clipPath="url(#roundedCorners)">
                        <div style={{ width: "100%", height: "100%", position: "relative" }}>
                            <img
                                src={src}
                                alt={alt}
                                loading="eager"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%",
                                    // "contain", not "cover": until every project has a real
                                    // portrait screenshot, this avoids cropping a landscape
                                    // banner down to a thin vertical strip. Safe to switch
                                    // back to "cover" once the source images are phone-shaped.
                                    objectFit: "contain",
                                    backgroundColor: "#F5F5F5",
                                }}
                            />
                        </div>
                    </foreignObject>
                )}
                {/* notch area */}
                <path
                    d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
                    className="fill-[#F0F0F0]"
                />
                <path d="M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z" className="fill-[#F0F0F0]" />
                <path d="M254 48.5C254 45.4624 256.462 43 259.5 43C262.538 43 265 45.4624 265 48.5C265 51.5376 262.538 54 259.5 54C256.462 54 254 51.5376 254 48.5Z" className="fill-[#E0E0E0]" />
                {/* highlight */}
                <path
                    d="M76 4C37.3401 4 6 35.3401 6 74V808C6 846.66 37.3401 878 76 878H356C394.66 878 426 846.66 426 808V74C426 35.3401 394.66 4 356 4H76Z"
                    className="fill-transparent stroke-white/20 stroke-[0.5]"
                />
                <defs>
                    <clipPath id="roundedCorners">
                        <rect x="21.25" y="19.25" width="389.5" height="843.5" rx="55.75" ry="55.75" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

/** A small rounded glass icon-button — replaces the shadcn <Button> the
 * reference component used, on the same Liquid Glass language as the mobile
 * nav toggle (see DESIGN.md § Material). */
const CarouselButton = ({ onClick, label, children }) => (
    <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="glass-panel flex items-center justify-center size-10 rounded-full text-white-50 hover:text-white transition-colors duration-300"
    >
        {children}
    </button>
);

/**
 * An auto-rotating carousel of app screenshots, each inside an Iphone15Pro
 * frame, with previous/next/pause controls below it (not overlapping —
 * see the stage height comment). Expects portrait screenshots close to a
 * 0.4618:1 ratio (e.g. a real 1179x2556 iPhone screenshot); a mismatched
 * image just letterboxes under the current object-fit: contain rather
 * than cropping badly, but won't fill the frame edge to edge until it
 * matches.
 */
export const PhoneCarousel = ({ images, className, onChangeIndex, forceReducedMotion = false }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(false);
    const [isHovering, setIsHovering] = React.useState(false);
    const isMobile = useIsMobile();

    React.useEffect(() => {
        onChangeIndex?.(currentIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    React.useEffect(() => {
        if (isPaused || isHovering || forceReducedMotion || images.length <= 1) return;
        const interval = window.setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => window.clearInterval(interval);
    }, [isPaused, isHovering, forceReducedMotion, images.length]);

    if (!images?.length) return null;

    const handlePrevious = () =>
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const togglePause = () => setIsPaused((prev) => !prev);

    const phoneWidth = isMobile ? 280 : 350;
    // The stage is sized to the phone frame's real rendered height (from its
    // own SVG proportions) instead of a guessed fixed pixel value that used
    // to run ~160-200px short — that mismatch was clipping the phone and
    // sitting the controls on top of it instead of below it.
    const phoneHeight = Math.round(phoneWidth * PHONE_ASPECT_RATIO);

    return (
        <div
            role="region"
            className={cn("relative w-full py-6 md:py-10", className)}
            aria-label="Carrusel de capturas de la app"
        >
            {/* Stage: overflow-hidden lives here, and only here, so it crops
                the peeking prev/next phones without also clipping the
                controls row below (a sibling, unaffected by this). */}
            <div
                className="relative flex justify-center w-full overflow-hidden"
                style={{ height: phoneHeight }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {images.map((image, index) => {
                    const isActive = index === currentIndex;
                    const isPrevious =
                        index === currentIndex - 1 ||
                        (currentIndex === 0 && index === images.length - 1);
                    const isNext =
                        index === currentIndex + 1 ||
                        (currentIndex === images.length - 1 && index === 0);

                    return (
                        <div
                            key={image.src}
                            className={cn(
                                "absolute left-1/2 top-0 transition-all duration-700 ease-in-out",
                                isActive ? "z-20 opacity-100" : "opacity-0",
                                (isPrevious || isNext) && "opacity-30 z-10"
                            )}
                            style={{
                                // -50% first to center the phone itself on the
                                // container's midline, then layer the prev/next
                                // offset and scale on top of that anchor.
                                transform: `translateX(-50%) translateX(${isPrevious ? "-60%" : isNext ? "60%" : "0%"}) scale(${isActive ? 1 : 0.9})`,
                            }}
                            aria-hidden={!isActive}
                        >
                            <Iphone15Pro
                                width={phoneWidth}
                                height="auto"
                                src={image.src}
                                alt={image.alt}
                                className="transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    );
                })}
            </div>

            {images.length > 1 && (
                <div className="mt-6 flex justify-center items-center gap-4">
                    <CarouselButton onClick={handlePrevious} label="Imagen anterior">
                        <ChevronLeft className="h-5 w-5" />
                    </CarouselButton>
                    <CarouselButton onClick={togglePause} label={isPaused ? "Reanudar" : "Pausar"}>
                        {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                    </CarouselButton>
                    <CarouselButton onClick={handleNext} label="Siguiente imagen">
                        <ChevronRight className="h-5 w-5" />
                    </CarouselButton>
                </div>
            )}
        </div>
    );
};

export default PhoneCarousel;
