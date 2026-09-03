import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { useMotionPreference } from "../context/MotionPreference";

/**
 * Entrance boot sequence — adapted from camosdigital's BootLoader.tsx (same
 * "terminal" voice: a scrambling status line, an eased counter, a thin
 * progress fill), simplified for this project:
 * - No external asset-readiness store — "ready" here is just
 *   `window.load` (or already-complete) plus a minimum display time, since
 *   this site has nothing bespoke to track the way camosdigital's Flee
 *   stage did.
 * - No i18n — this site is Spanish-only.
 * - Gated on both the OS prefers-reduced-motion query AND this site's own
 *   toggle (MotionPreference) — the reference only read the OS query.
 * A repeat visit within the same tab session skips the theatrics (a quick
 * sweep to 100 and out), and a hard failsafe guarantees this never traps
 * a visitor behind a stalled load.
 */

const STATUSES = [
    "inicializando interfaz",
    "cargando modelo 3d",
    "calibrando la cámara",
    "abriendo el portafolio",
];
const READY_LABEL = "listo";
const EYEBROW = "8ctal — portafolio";
const BOOT_ANNOTATION = "secuencia de arranque";

const SESSION_KEY = "8ctal:booted";
const SCRAMBLE_CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789·—/";
const STATUS_CYCLE_MS = 620;
const SCRAMBLE_MS = 500;
const COSMETIC_EASE_MS = 1800;
const MIN_DISPLAY_MS = 700;
const PRE_READY_CAP = 99;
const FINAL_TWEEN_S = 0.2;
const HOLD_BEFORE_EXIT_MS = 300;
const EXIT_FADE_S = 0.7;
const FAILSAFE_MS = 4000;
// absolute ceiling — rips the overlay off with a plain setTimeout + set, no
// tweens or readiness state involved, so nothing upstream can trap a visitor
const HARD_KILL_MS = 8000;

const FAST_TWEEN_S = 0.3;
const FAST_HOLD_MS = 120;
const FAST_EXIT_FADE_S = 0.35;

const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3);

const scrambleText = (target, revealed) => {
    let out = "";
    for (let i = 0; i < target.length; i += 1) {
        out +=
            i < revealed || target[i] === " "
                ? target[i]
                : SCRAMBLE_CHARSET[Math.floor(Math.random() * SCRAMBLE_CHARSET.length)];
    }
    return out;
};

const readHasBooted = () => {
    try {
        return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
        return false;
    }
};

const markHasBooted = () => {
    try {
        sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
        // storage unavailable (private mode) — full boot replays, harmless
    }
};

const BootLoader = () => {
    const rootRef = useRef(null);
    const counterRef = useRef(null);
    const fillRef = useRef(null);
    const statusRef = useRef(null);
    const [isDone, setIsDone] = useState(false);
    const { reducedMotion } = useMotionPreference();

    useEffect(() => {
        const root = rootRef.current;
        const counterEl = counterRef.current;
        const fillEl = fillRef.current;
        const statusEl = statusRef.current;
        if (!root || !counterEl || !fillEl || !statusEl) return undefined;

        document.documentElement.classList.add("is-booting");

        const rafIds = new Set();
        const timeoutIds = new Set();
        const tweens = [];
        let isFinished = false;
        let isStatusStopped = false;
        let assetsReady = document.readyState === "complete";

        const raf = (fn) => {
            const id = requestAnimationFrame((time) => {
                rafIds.delete(id);
                fn(time);
            });
            rafIds.add(id);
        };

        const later = (fn, ms) => {
            const id = setTimeout(() => {
                timeoutIds.delete(id);
                fn();
            }, ms);
            timeoutIds.add(id);
        };

        const setDisplay = (value) => {
            counterEl.textContent = String(Math.round(value)).padStart(2, "0");
            fillEl.style.width = `${value}%`;
        };

        const exit = () => {
            document.documentElement.classList.remove("is-booting");
            markHasBooted();
            setIsDone(true);
        };

        if (!assetsReady) {
            window.addEventListener(
                "load",
                () => {
                    assetsReady = true;
                },
                { once: true }
            );
        }

        const hasBooted = readHasBooted();

        // hard kill — unconditional exit, independent of every other path
        later(() => {
            if (isFinished) return;
            isFinished = true;
            isStatusStopped = true;
            gsap.set(root, { autoAlpha: 0 });
            exit();
        }, HARD_KILL_MS);

        const prefersReducedMotion =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches || reducedMotion;

        if (prefersReducedMotion) {
            // no theatrics: drop the overlay the moment assets resolve (or
            // immediately, if they already have)
            const exitInstantly = () => {
                if (isFinished) return;
                isFinished = true;
                gsap.set(root, { autoAlpha: 0 });
                exit();
            };
            if (assetsReady) {
                exitInstantly();
            } else {
                later(function poll() {
                    if (assetsReady) exitInstantly();
                    else later(poll, 50);
                }, 50);
            }
        } else if (hasBooted) {
            // session fast-path — quick sweep to 100, minimal hold, out
            const finishFast = () => {
                if (isFinished) return;
                isFinished = true;
                statusEl.textContent = READY_LABEL;
                const proxy = { v: 0 };
                tweens.push(
                    gsap.to(proxy, {
                        v: 100,
                        duration: FAST_TWEEN_S,
                        ease: "power1.out",
                        onUpdate: () => setDisplay(proxy.v),
                        onComplete: () => {
                            later(() => {
                                tweens.push(
                                    gsap.to(root, {
                                        autoAlpha: 0,
                                        duration: FAST_EXIT_FADE_S,
                                        ease: "expo.out",
                                        onComplete: exit,
                                    })
                                );
                            }, FAST_HOLD_MS);
                        },
                    })
                );
            };
            if (assetsReady) {
                finishFast();
            } else {
                later(function poll() {
                    if (assetsReady) finishFast();
                    else later(poll, 50);
                }, 50);
            }
        } else {
            // status line — terminal scramble, one string per cycle
            const runStatusCycle = (index) => {
                if (isStatusStopped) return;
                const target = STATUSES[index % STATUSES.length];
                const cycleStart = performance.now();
                const step = (now) => {
                    if (isStatusStopped) return;
                    const p = Math.min(1, (now - cycleStart) / SCRAMBLE_MS);
                    const revealed = Math.floor(p * target.length);
                    statusEl.textContent = p >= 1 ? target : scrambleText(target, revealed);
                    if (p < 1) raf(step);
                };
                raf(step);
                later(() => runStatusCycle(index + 1), STATUS_CYCLE_MS);
            };
            runStatusCycle(0);

            // gated exit — 100%, hold, fade, hand off to the page
            const finish = (fromValue) => {
                if (isFinished) return;
                isFinished = true;
                isStatusStopped = true;
                statusEl.textContent = READY_LABEL;
                const proxy = { v: fromValue };
                tweens.push(
                    gsap.to(proxy, {
                        v: 100,
                        duration: FINAL_TWEEN_S,
                        ease: "power1.out",
                        onUpdate: () => setDisplay(proxy.v),
                        onComplete: () => {
                            later(() => {
                                tweens.push(
                                    gsap.to(root, {
                                        autoAlpha: 0,
                                        duration: EXIT_FADE_S,
                                        ease: "expo.out",
                                        onComplete: exit,
                                    })
                                );
                            }, HOLD_BEFORE_EXIT_MS);
                        },
                    })
                );
            };

            // counter — cosmetic ease, capped pre-ready, gated on real readiness
            const bootStart = performance.now();
            const tick = (now) => {
                if (isFinished) return;
                const elapsed = now - bootStart;
                const cosmetic = easeOutCubic(Math.min(1, elapsed / COSMETIC_EASE_MS)) * PRE_READY_CAP;
                const shown = Math.min(PRE_READY_CAP, cosmetic);
                setDisplay(shown);
                if (assetsReady && elapsed >= MIN_DISPLAY_MS) {
                    finish(shown);
                    return;
                }
                raf(tick);
            };
            raf(tick);
        }

        return () => {
            document.documentElement.classList.remove("is-booting");
            rafIds.forEach((id) => cancelAnimationFrame(id));
            timeoutIds.forEach((id) => clearTimeout(id));
            tweens.forEach((tween) => tween.kill());
        };
        // reducedMotion is read once at boot start on purpose — flipping the
        // toggle mid-sequence shouldn't restart this effect.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isDone) return null;

    return (
        <div
            ref={rootRef}
            id="boot-loader"
            className="fixed inset-0 z-[400] grid touch-none grid-rows-[1fr_auto_1fr] overscroll-contain bg-black px-5 py-8 md:px-10"
        >
            <noscript>
                <style>{"#boot-loader{display:none}"}</style>
            </noscript>

            <div className="flex items-start justify-center">
                <p className="text-blue-50 text-xs tracking-[0.18em] uppercase">
                    <span aria-hidden="true">[ </span>
                    {EYEBROW}
                    <span aria-hidden="true"> ]</span>
                </p>
            </div>

            <div className="flex flex-col items-center gap-6 text-center">
                <div
                    ref={counterRef}
                    className="font-bold leading-none text-white-50 tabular-nums"
                    style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}
                    aria-hidden="true"
                >
                    00
                </div>
                <div className="h-px w-40 overflow-hidden bg-glass-border" aria-hidden="true">
                    <div
                        ref={fillRef}
                        className="h-full bg-white-50"
                        style={{ width: "0%" }}
                    />
                </div>
                <p className="text-blue-50 text-xs tracking-[0.1em]" role="status" aria-live="polite">
                    <span ref={statusRef}>{STATUSES[0]}</span>
                </p>
            </div>

            <div className="flex items-end justify-between text-blue-50 text-xs tracking-[0.1em]">
                <span>{BOOT_ANNOTATION}</span>
                <span>8ctal.dev</span>
            </div>
        </div>
    );
};

export default BootLoader;
