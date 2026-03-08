import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

interface RelatedPostsProps {
  currentSlug: string;
  currentTags: string[];
}

export default function RelatedPosts({
  currentSlug,
  currentTags,
}: RelatedPostsProps) {
  const allPosts = getAllPosts();

  // Score posts by shared tags, exclude current
  const scored = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      ...p,
      score: p.tags.filter((t) => currentTags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scored.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-text-dark/10">
      <h3 className="text-lg font-bold text-text-dark mb-6">
        Related Articles
      </h3>
      <div className="grid gap-4">
        {scored.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block p-4 bg-cream rounded-lg hover:shadow-sm transition-all"
          >
            <p className="font-semibold text-text-dark group-hover:text-warm-gold transition-colors">
              {post.title}
            </p>
            <p className="mt-1 text-sm text-text-dark/50 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="mt-2 flex gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-sage/20 text-text-dark/60 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
