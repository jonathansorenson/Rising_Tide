import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import FadeIn from "./FadeIn";

interface LatestInsightsProps {
  /** Filter posts by tag (e.g., "Industrial", "Multifamily"). Shows all if omitted. */
  filterTag?: string;
  /** Max posts to show. Defaults to 3. */
  count?: number;
  /** Section heading. Defaults to "Latest Insights". */
  title?: string;
}

export default function LatestInsights({
  filterTag,
  count = 3,
  title = "Latest Insights",
}: LatestInsightsProps) {
  let posts = getAllPosts();

  if (filterTag) {
    posts = posts.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === filterTag.toLowerCase())
    );
  }

  const display = posts.slice(0, count);

  if (display.length === 0) return null;

  return (
    <section className="bg-slate-dark py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {title}
          </h2>
        </FadeIn>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {display.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors h-full"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-warm-gold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-white text-sm leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs text-white/50 line-clamp-2">
                  {post.excerpt}
                </p>
                <p className="mt-3 text-xs text-sage font-medium">
                  Read more &rarr;
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              View all insights &rarr;
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
