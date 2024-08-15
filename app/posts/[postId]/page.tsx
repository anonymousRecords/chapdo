import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostByName, getPosts } from "@/lib/githubApi";

export const revalidate = 86400;

type Props = {
  params: {
    postId: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPosts();

  if (!posts) return [];

  return posts.map((post) => ({
    postId: post.meta.id.replace(/^POSTS\//, ""),
  }));
}

export async function generateMetadata({ params: { postId } }: Props) {
  const post = await getPostByName(`POSTS/${postId}.mdx`);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.meta.title,
  };
}

export default async function Post({ params: { postId } }: Props) {
  const post = await getPostByName(`POSTS/${postId}.mdx`);

  if (!post) notFound();

  const { meta, content } = post;

  return (
    <article className="mx-auto max-w-2xl mt-8 prose prose-slate dark:prose-invert">
      <h1 className="mb-2 text-3xl font-bold text-black dark:text-white">{meta.title}</h1>
      <p className="mt-0 text-sm text-gray-600 dark:text-gray-400">{meta.date}</p>
      <div className="mt-8 text-black dark:text-white">{content}</div>
      <p className="mt-8">
        <Link href="/posts" className="text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 no-underline">
          ← Back to posts
        </Link>
      </p>
    </article>
  );
}