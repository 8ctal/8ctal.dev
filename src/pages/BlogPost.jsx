import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getBlogPost } from "../constants/blog";
import { iconForPost } from "../constants/blogIcons";

/**
 * /blog/:slug — a dedicated page per post. Not a modal or a section of the
 * home page: a real route, so a post has its own shareable URL and a
 * direct link to it (from search, a share, or typing it in) works on its
 * own, same as /blog itself (see public/404.html for how that survives a
 * hard reload on GitHub Pages, which has no server-side routing).
 */
const BlogPost = () => {
    const { slug } = useParams();
    const post = getBlogPost(slug);

    if (!post) {
        return (
            <section className="flex-center flex-col gap-6 pt-40 pb-20 md:pt-52 text-center px-5">
                <h1 className="text-3xl font-semibold text-white">Post no encontrado</h1>
                <p className="text-blue-50">Puede que el enlace esté roto o el post ya no exista.</p>
                <Link to="/blog" className="glass-panel rounded-lg px-5 py-3 text-sm font-medium text-white-50 hover:text-white transition-colors duration-300">
                    Volver al blog
                </Link>
            </section>
        );
    }

    const Icon = iconForPost(post);

    return (
        <article className="flex-center pt-40 pb-20 md:pt-52 md:pb-32 px-5 md:px-10">
            <div className="w-full max-w-2xl">
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-sm text-blue-50 transition-colors duration-300 hover:text-white-50"
                >
                    <ArrowLeft className="size-4" />
                    Todos los posts
                </Link>

                <header className="mt-8 flex flex-col items-center gap-5 text-center">
                    <span className="glass-panel flex size-20 items-center justify-center rounded-full">
                        <Icon className="size-8 text-blue-50" />
                    </span>
                    <h1 className="text-3xl font-semibold text-white md:text-4xl">{post.title}</h1>
                    <p className="text-sm text-blue-50">
                        {post.readTime} de lectura · <time dateTime={post.dateISO}>{post.date}</time>
                    </p>
                </header>

                <div className="mt-12 flex flex-col gap-6 text-white-50 leading-relaxed md:text-lg">
                    {post.body.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>

                <div className="mt-16 flex justify-center border-t border-black-50 pt-10">
                    <Link
                        to="/blog"
                        className="glass-panel rounded-lg px-5 py-3 text-sm font-medium text-white-50 transition-colors duration-300 hover:text-white"
                    >
                        Ver más posts
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default BlogPost;
