import { Metadata } from "next";
import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on commercial real estate investing, Florida's Space Coast market, and value-add strategies from Rising Tide Property Group.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Hero
        title="Blog"
        subtitle="Market insights, investment perspectives, and updates from Rising Tide Property Group."
      />

      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          {posts.length === 0 ? (
            <p className="text-text-dark/50 text-center">
              No posts yet. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post, i) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  date={post.date}
                  excerpt={post.excerpt}
                  author={post.author}
                  tags={post.tags}
                  delay={i * 0.1}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
