import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ComponentPropsWithoutRef } from "react";

const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="text-3xl md:text-4xl font-bold text-text-dark tracking-tight mt-10 mb-4"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="text-2xl md:text-3xl font-bold text-text-dark tracking-tight mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="text-xl font-bold text-text-dark tracking-tight mt-8 mb-3"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className="text-text-dark/80 leading-relaxed mb-5"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="list-disc list-outside ml-6 mb-5 space-y-2 text-text-dark/80"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="list-decimal list-outside ml-6 mb-5 space-y-2 text-text-dark/80"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-warm-gold pl-4 my-6 italic text-text-dark/60"
      {...props}
    />
  ),
  a: ({ href, ...props }: ComponentPropsWithoutRef<"a">) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-warm-gold hover:text-warm-gold/80 underline underline-offset-2 transition-colors"
          {...props}
        />
      );
    }
    return (
      <a
        href={href}
        className="text-warm-gold hover:text-warm-gold/80 underline underline-offset-2 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  },
  hr: () => (
    <hr className="my-8 border-text-dark/10" />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="text-text-dark/60" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-text-dark" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="bg-sage/15 text-slate-dark px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="bg-slate-dark text-cream p-4 rounded-lg overflow-x-auto my-6 text-sm"
      {...props}
    />
  ),
};

interface MdxContentProps {
  source: string;
}

export default function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote source={source} components={mdxComponents} />;
}
