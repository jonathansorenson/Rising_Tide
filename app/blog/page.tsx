import { Metadata } from "next";
import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/blog";

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Rising Tide Property Group Blog",
  description:
    "Market insights, investment analysis, and commercial real estate trends from Rising Tide Property Group.",
  url: "https://risingtidepg.com/blog",
  publisher: {
    "@type": "Organization",
    name: "Rising Tide Property Group",
    url: "https://risingtidepg.com",
  },
};

export const metadata: Metadata = {
  title: "Blog — CRE Insights & Market Analysis",
  description:
    "Insights on commercial real estate investing, Florida's Space Coast market, industrial trends, and value-add strategies from Rising Tide Property Group.",
  keywords: [
    "commercial real estate blog",
    "CRE market insights",
    "Space Coast real estate news",
    "industrial real estate trends",
    "Florida CRE investment analysis",
    "value-add real estate strategies",
    "NNN lease investing blog",
    "Brevard County commercial property",
  ],
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
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
