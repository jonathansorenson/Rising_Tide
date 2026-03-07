import Link from "next/link";
import FadeIn from "./FadeIn";

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  delay?: number;
}

export default function BlogCard({
  slug,
  title,
  date,
  excerpt,
  author,
  tags,
  delay = 0,
}: BlogCardProps) {
  return (
    <FadeIn delay={delay}>
      <Link href={`/blog/${slug}`} className="block group">
        <article className="bg-white rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-slate-dark bg-sage/20 px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-text-dark group-hover:text-warm-gold transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="mt-3 text-sm text-text-dark/60 leading-relaxed flex-grow">
            {excerpt}
          </p>

          {/* Meta */}
          <div className="mt-4 pt-4 border-t border-text-dark/5 flex items-center justify-between">
            <span className="text-xs text-text-dark/40">{author}</span>
            <time className="text-xs text-text-dark/40">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </article>
      </Link>
    </FadeIn>
  );
}
