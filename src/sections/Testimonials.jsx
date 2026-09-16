
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";
import { useLanguage } from "../context/Language";

const Testimonials = () => {
    const { t } = useLanguage();

    return (
        <section id="testimonials" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title={t.testimonials.title}
                    sub={t.testimonials.sub}
                />

                <div className="lg:columns-3 md:columns-2 columns-1 mt-16"><h1 className="text-white-50 text-center text-2xl">{t.testimonials.underConstruction}</h1>
              {/*       {testimonials.map((testimonial, index) => (
                        <GlowCard card={testimonial} key={index} index={index}>
                            <div className="flex items-center gap-3">
                                <div>
                                    <img src={testimonial.imgPath} alt="" />
                                </div>
                                <div>
                                    <p className="font-bold">{testimonial.name}</p>
                                    <p className="text-white-50">{testimonial.mentions}</p>
                                </div>
                            </div>
                        </GlowCard>
                    ))} */}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
