// Ported from ref_components/interactive_folder_gallery/interactive_folder_gallery.tsx
// (21st.dev community component). Only changes from the reference: TS prop
// types dropped (plain JS), and an `onOpenChange` callback added so a
// parent (ShowcaseSection) can react to the folder opening/closing — the
// reference managed `isFolderOpen` purely internally with nothing for a
// caller to hook into.
import { useState } from "react";
// Imported as `Motion` (capitalized): this project's ESLint config has no
// JSX-usage detection for member-expression tags like `motion.div`, so a
// lowercase import reads as unused even though it's referenced in the JSX
// below (see CardStack.jsx's own copy of this same note).
import { motion as Motion } from "framer-motion";

export function InteractiveFolderGallery({
    photos = [],
    folderName = "Photography.gallery",
    dragHintText = "Drag any photo down to close",
    className,
    onOpenChange,
    // ShowcaseSection uses this as a permanent gate — once someone's opened
    // it, the projects underneath should stay revealed until an actual page
    // reload, not close again because a photo got dragged too far. With
    // `closable = false`, that drag gesture (and the hint text about it)
    // just doesn't do anything, rather than closing the folder while the
    // parent keeps whatever it revealed open anyway — showing the hint but
    // having it not work would be worse than not showing it at all.
    closable = true,
}) {
    const [isFolderOpen, setIsFolderOpen] = useState(false);
    const [hoverFolder, setHoverFolder] = useState(false);

    const setOpen = (value) => {
        if (!value && !closable) return;
        setIsFolderOpen(value);
        onOpenChange?.(value);
    };

    return (
        <div className={`relative w-full py-32 ${className || ""}`}>
            <div className="relative flex min-h-[500px] w-full flex-col items-center justify-center">
                <div className="pointer-events-none relative z-0 flex h-[500px] w-[400px] justify-center">
                    <Motion.div
                        className="absolute bottom-6 h-56 w-80 drop-shadow-2xl"
                        animate={{ opacity: isFolderOpen ? 0 : 1, scale: isFolderOpen ? 0.9 : 1 }}
                    >
                        <div className="absolute left-0 top-0 h-10 w-32 rounded-t-xl border-l border-r border-t border-white/10 bg-linear-to-t from-[#1e1e1e] to-[#2a2a2a]" />
                        <div className="absolute bottom-0 left-0 right-0 top-8 rounded-b-xl rounded-tr-xl border border-white/10 bg-linear-to-b from-[#1e1e1e] to-[#0a0a0a] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
                        <div className="pointer-events-none absolute bottom-2 left-2 right-2 top-10 rounded-lg bg-black shadow-inner" />
                    </Motion.div>

                    <div className="absolute bottom-10 z-10 flex justify-center">
                        {photos.map((photo, i) => {
                            const offset = i - 2;

                            const stackY = hoverFolder ? offset * -10 - 40 : offset * -5;
                            const stackX = hoverFolder ? offset * 30 : offset * 3;
                            const stackRotate = hoverFolder ? offset * 8 : offset * 3;
                            const stackScale = 1 - Math.abs(offset) * 0.03;

                            const openY = -130;
                            const openX = offset * 130;
                            const openRotate = 0;
                            const openScale = 1.05;

                            return (
                                <Motion.div
                                    key={photo.id}
                                    drag={isFolderOpen && closable ? true : false}
                                    dragSnapToOrigin={true}
                                    onDragEnd={(e, info) => {
                                        if (info.offset.y > 100 && isFolderOpen) {
                                            setOpen(false);
                                            setHoverFolder(false);
                                        }
                                    }}
                                    className={`absolute bottom-0 h-72 w-56 origin-bottom overflow-hidden rounded-xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] ${isFolderOpen && closable ? "cursor-grab active:cursor-grabbing pointer-events-auto" : "pointer-events-none"}`}
                                    animate={
                                        !isFolderOpen
                                            ? { y: stackY, x: stackX, rotate: stackRotate, scale: stackScale, zIndex: i + 10 }
                                            : { y: openY, x: openX, rotate: openRotate, scale: openScale, zIndex: 50 }
                                    }
                                    whileHover={isFolderOpen ? { scale: openScale + 0.05, zIndex: 100 } : {}}
                                    whileDrag={isFolderOpen ? { scale: openScale + 0.1, rotate: 5, zIndex: 150 } : {}}
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                >
                                    <img src={photo.image} alt={photo.alt || "Gallery item"} className="pointer-events-none h-full w-full object-cover" />
                                </Motion.div>
                            );
                        })}
                    </div>

                    <Motion.div
                        className="pointer-events-auto absolute bottom-0 z-20 h-44 w-[340px] cursor-pointer drop-shadow-[0_-20px_40px_rgba(0,0,0,0.8)]"
                        style={{ transformOrigin: "bottom" }}
                        animate={{
                            opacity: isFolderOpen ? 0 : 1,
                            rotateX: hoverFolder ? -25 : 0,
                            y: hoverFolder ? 10 : 0,
                            pointerEvents: isFolderOpen ? "none" : "auto",
                        }}
                        onMouseEnter={() => setHoverFolder(true)}
                        onMouseLeave={() => setHoverFolder(false)}
                        onClick={() => setOpen(true)}
                    >
                        <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-2xl border border-white/20 bg-linear-to-b from-[#2a2a2a] to-[#111] pb-8 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)]">
                            <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

                            <div className="flex items-center justify-center rounded-lg border border-black/80 bg-black px-5 py-2.5 shadow-inner backdrop-blur-md">
                                <span className="text-sm font-medium tracking-wide text-white/90">{folderName}</span>
                            </div>
                        </div>
                    </Motion.div>
                </div>

                {closable && (
                    <Motion.div
                        animate={{ opacity: isFolderOpen ? 1 : 0, y: isFolderOpen ? 0 : 50 }}
                        className="pointer-events-none absolute bottom-10 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium uppercase tracking-widest text-white/50 backdrop-blur-md"
                    >
                        {dragHintText}
                    </Motion.div>
                )}
            </div>
        </div>
    );
}

export default InteractiveFolderGallery;
