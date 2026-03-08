import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import FadeIn from "@/components/FadeIn";
import MdxContent from "@/components/MdxContent";
import BlogCTA from "@/components/BlogCTA";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  const url = `https://risingtidepg.com/blog/${params.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords ?? post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      siteName: "Rising Tide Property Group",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  // BlogPosting JSON-LD schema
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Rising Tide Property Group",
      url: "https://risingtidepg.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://risingtidepg.com/blog/${params.slug}`,
    },
    keywords: (post.keywords ?? post.tags).join(", "),
  };

  return (
    <>
      {/* BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema),
        }}
      />

      {/* Hero */}
      <section className="relative bg-slate-dark text-white overflow-hidden">
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-10"
          style={{
            background:
              "linear-gradient(135deg, #A8C5B8 0%, transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center text-sm text-white/50 hover:text-white/80 transition-colors mb-6"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance max-w-3xl">
              {post.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/50">
              <span>{post.author}</span>
              <span>&middot;</span>
              <time>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium bg-white/10 text-white/70 px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <article>
              <MdxContent source={post.content} />
            </article>
          </FadeIn>
          <BlogCTA />
        </div>
      </section>
    </>
  );
}
