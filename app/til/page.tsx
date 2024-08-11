import { getArchiveMeta } from "@/lib/getArchiveMeta";
import TilCalendar from "@/components/TilCalendar";
import RecentTilList from "@/components/RecentTilList";
import TilSearch from "@/components/TilSearch";
import { BlogPost } from "@/types";

export default async function TilPage() {
  const posts = (await getArchiveMeta("TIL")) as BlogPost[];

  if (!posts || posts.length === 0) {
    return <p className="mt-10 text-center">Sorry, no TIL posts available.</p>;
  }

  return (
    <section className="mx-auto mt-6 max-w-4xl">
      <h2 className="text-4xl font-bold dark:text-white/90 mb-8">
        Today I Learned
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <TilCalendar posts={posts} />
        </div>
        <div>
          <TilSearch posts={posts} />
          <RecentTilList posts={posts.slice(0, 5)} />
        </div>
      </div>
    </section>
  );
}
