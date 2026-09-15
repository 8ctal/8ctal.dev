import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";
import GlobeCdn from "../components/GlobeCdn";
import useInView from "../hooks/useInView";

const Contact = () => {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    // Same reasoning as HeroExperience: don't keep a live canvas render
    // loop spinning once this section scrolls out of view.
    const [sceneRef, sceneVisible] = useInView({ initialInView: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading state

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            );

            // Reset form and stop loading
            setForm({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("EmailJS Error:", error); // Optional: show toast
        } finally {
            setLoading(false); // Always stop loading, even on error
        }
    };

    return (
        <section id="contact" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Contáctame"
                    sub="¿Tienes preguntas o ideas? ¡Házmelo saber!"
                />
                <div className="grid-12-cols mt-16">
                    <div className="xl:col-span-5">
                        <div className="flex-center border border-black-50 bg-black-100 rounded-xl p-10">
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col gap-7"
                            >
                                <div>
                                    <label htmlFor="name">Tu nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="¿Cuál es tu nombre?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email">Tu correo</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="¿Cuál es tu correo electrónico?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message">Tu mensaje</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="¿Cómo puedo ayudarte?"
                                        rows="5"
                                        required
                                    />
                                </div>

                                <button type="submit" className="cta-wrapper">
                                    <div className="cta-button glass-panel group">
                                        <p className="text">
                                            {loading ? "Enviando..." : "Enviar mensaje"}
                                        </p>
                                        <div className="arrow-wrapper">
                                            <img src="/images/arrow-right.svg" alt="" />
                                        </div>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="xl:col-span-7 min-h-96">
                        {/* Replaces the 3D pool-ball model previously here
                            (see ContactExperience.jsx/EightBall.jsx, left
                            unused rather than deleted) with the globe from
                            ref_components/globe_cdn.tsx — see GlobeCdn.jsx
                            for the Liquid Glass palette + trimmed overlays. */}
                        <div
                            ref={sceneRef}
                            className="flex h-full w-full items-center justify-center rounded-3xl overflow-hidden bg-black"
                        >
                            {sceneVisible && (
                                <GlobeCdn className="w-full max-w-md" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;