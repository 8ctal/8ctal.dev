import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

import { blogPosts } from "../constants/blog";
import TitleHeader from "../components/TitleHeader";
import { iconForPost } from "../constants/blogIcons";

gsap.registerPlugin(ScrollTrigger);

/**
 * The home page's "Recent thoughts" preview — adapted from
 * ref_components (hirael's journal.tsx via the portfolio.json registry).
 * Two changes from that reference: each entry marks itself with a lucide
 * icon in a glass circle instead of a photo (see constants/blog.js — there
 * is no real cover image for a placeholder post), and it links to a real
 * page (BlogPost.jsx via React Router) rather than back to its own anchor.
 * Shows the 3 most recent posts; "Ver todos" goes to the full /blog list
 * (BlogIndex.jsx).
 */
const RecentThoughts = () => {
    const recent = blogPosts.slice(0, 3);

    useGSAP(() => {
        gsap.utils.toArray(".thought-row").forEach((row, index) => {
            gsap.fromTo(
                row,
                { y: 24, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: "power2.out",
                    scrollTrigger: { trigger: row, start: "top 90%" },
                }
            );
        });
    }, []);

    if (!recent.length) return null;

    return (
        <section id="thoughts" className="flex-center md:mt-40 mt-20 section-padding xl:px-0">
            <div className="w-full h-full md:px-20 px-5">
                <TitleHeader title="Pensamientos recientes" sub="Notas sobre el oficio" />

                <div className="mt-16 flex flex-col gap-4">
                    {recent.map((post) => {
                        const Icon = iconForPost(post);
                        return (
                            <Link
                                key={post.slug}
                                to={`/blog/${post.slug}`}
                                className="thought-row group flex items-center gap-4 rounded-[40px] border border-black-50 bg-black-100/60 p-4 transition-colors duration-300 hover:bg-black-100 sm:gap-6 sm:rounded-full"
                            >
                                <span className="glass-panel flex size-16 shrink-0 items-center justify-center rounded-full sm:size-20">
                                    <Icon className="size-6 text-blue-50" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate text-base font-medium text-white sm:text-lg">
                                        {post.title}
                                    </h3>
                                    <p className="mt-1 text-xs text-blue-50 sm:text-sm">
                                        {post.readTime} de lectura · {post.date}
                                    </p>
                                </div>
                                <span className="me-2 flex size-9 shrink-0 items-center justify-center rounded-full border border-black-50 text-blue-50 transition-colors duration-300 group-hover:text-white">
                                    <ArrowUpRight className="size-4" />
                                </span>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-10 flex justify-center">
                    <Link
                        to="/blog"
                        className="glass-panel rounded-lg px-5 py-3 text-sm font-medium text-white-50 transition-colors duration-300 hover:text-white"
                    >
                        Ver todos los posts
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RecentThoughts;
