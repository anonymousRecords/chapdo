import ListItem from "@/components/ListItem";
import { getArchiveMeta } from "@/lib/getArchiveMeta";
import { BlogPost } from "@/types";

export default async function Posts() {
  const posts = await getArchiveMeta("POSTS") as BlogPost[];

  if (!posts || posts.length === 0) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }

  return (
    <section className="mx-auto mt-6 max-w-2xl">
      <h2 className="text-4xl font-bold dark:text-white/90 mb-8">Blog Posts</h2>
      {posts.map((post) => (
        <ListItem key={post.meta.id} post={post.meta} />
      ))}
    </section>
  );
}