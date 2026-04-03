import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  keywords?: string[];
  image?: string;
  content: string;
  readingTime: number;
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 230));
}

const contentDir = path.join(process.cwd(), "content/blog");

export function getAllPosts(): Omit<BlogPost, "content">[] {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(contentDir, filename), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      author: data.author ?? "Rising Tide Property Group Partners",
      tags: data.tags ?? [],
      keywords: data.keywords ?? undefined,
      image: data.image ?? undefined,
      readingTime: estimateReadingTime(content),
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    author: data.author ?? "Rising Tide Property Group Partners",
    tags: data.tags ?? [],
    keywords: data.keywords ?? undefined,
    image: data.image ?? undefined,
    content,
    readingTime: estimateReadingTime(content),
  };
}
