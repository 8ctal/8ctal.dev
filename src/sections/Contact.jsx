import { useRef, useState, lazy, Suspense } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";
import useInView from "../hooks/useInView";

// Below the fold and its own three.js scene — code-split so the contact
// form (the actual above-the-fold content here) isn't waiting on it.
const ContactExperience = lazy(() => import("../components/models/contact/ContactExperience"));

const Contact = () => {
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    // Same reasoning as HeroExperience: don't keep a live WebGL context
    // spinning once this section scrolls out of view.
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

                                <button type="submit">
                                    <div className="cta-button group">
                                        <div className="bg-circle" />
                                        <p className="text">
                                            {loading ? "Enviando..." : "Enviar mensaje"}
                                        </p>
                                        <div className="arrow-wrapper">
                                            <img src="/images/arrow-down.svg" alt="arrow" />
                                        </div>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="xl:col-span-7 min-h-96">
                        <div
                            ref={sceneRef}
                            className="bg-black w-full h-full hover:cursor-grab rounded-3xl overflow-hidden"
                        >
                            {sceneVisible && (
                                <Suspense fallback={<div className="w-full h-full animate-pulse bg-black-100" />}>
                                    <ContactExperience />
                                </Suspense>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;