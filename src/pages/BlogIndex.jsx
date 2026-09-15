import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { blogPosts } from "../constants/blog";
import { iconForPost } from "../constants/blogIcons";
import TitleHeader from "../components/TitleHeader";

/**
 * /blog — every post, same row style as the home page's RecentThoughts
 * preview (see that file for why each row carries an icon marker instead
 * of a photo). `pt-40`/`mt-20` on the wrapper stand in for the section
 * spacing every other section gets from `.section-padding` further down
 * the page — this is the first thing on its own page, so nothing above it
 * pushes it clear of the fixed navbar.
 */
const BlogIndex = () => {
    return (
        <section className="flex-center pt-40 pb-20 md:pt-52 md:pb-32 px-5 md:px-10">
            <div className="w-full max-w-4xl">
                <TitleHeader title="Blog" sub="Todos los posts" />

                <div className="mt-16 flex flex-col gap-4">
                    {blogPosts.map((post) => {
                        const Icon = iconForPost(post);
                        return (
                            <Link
                                key={post.slug}
                                to={`/blog/${post.slug}`}
                                className="group flex items-center gap-4 rounded-[40px] border border-black-50 bg-black-100/60 p-4 transition-colors duration-300 hover:bg-black-100 sm:gap-6 sm:rounded-full"
                            >
                                <span className="glass-panel flex size-16 shrink-0 items-center justify-center rounded-full sm:size-20">
                                    <Icon className="size-6 text-blue-50" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h2 className="truncate text-base font-medium text-white sm:text-lg">
                                        {post.title}
                                    </h2>
                                    <p className="mt-1 line-clamp-1 text-xs text-blue-50 sm:text-sm">
                                        {post.excerpt}
                                    </p>
                                    <p className="mt-1 text-xs text-blue-50/70">
                                        {post.readTime} de lectura · {post.date}
                                    </p>
                                </div>
                                <span className="me-2 flex size-9 shrink-0 items-center justify-center rounded-full border border-black-50 text-blue-50 transition-colors duration-300 group-hover:text-white">
                                    <ArrowUpRight className="size-4" />
                                </span>
                            </Link>
                        );
                    })}

                    {blogPosts.length === 0 && (
                        <p className="text-center text-blue-50">Todavía no hay posts publicados.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogIndex;
