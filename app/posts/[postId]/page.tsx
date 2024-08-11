import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostByName } from "@/lib/getPostByName";
import { getArchiveMeta } from "@/lib/getArchiveMeta";

export const revalidate = 86400;

type Props = {
  params: {
    postId: string;
  };
};

export async function generateStaticParams() {
  const posts = await getArchiveMeta("POSTS");

  if (!posts) return [];

  return posts.map((post) => ({
    postId: post.meta.id.replace(/^POSTS\//, ''),
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
      <h1 className="mb-2">{meta.title}</h1>
      <p className="mt-0 text-sm text-gray-500">{meta.date}</p>
      {content}
      <p className="mt-8">
        <Link href="/posts" className="text-blue-500 hover:underline">
          ← Back to posts
        </Link>
      </p>
    </article>
  );
}