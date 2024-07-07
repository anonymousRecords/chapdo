import ListItem from "@/components/ListItem";
import { getArchiveMeta } from "@/lib/getArchiveMeta";

export default async function Posts() {
  const posts = await getArchiveMeta("POSTS");

  if (!posts) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }

  return (
    <section className="mx-auto mt-6 max-w-2xl">
      <h2 className="text-4xl font-bold dark:text-white/90">Blog</h2>
      {posts.map((post) => (
        <ListItem key={post.id} post={post} />
      ))}
    </section>
  );
}
