import React from "react";
import { getTILs } from "@/lib/githubApi";
import { BlogPost } from "@/types";
import TilPageClient from "@/components/Til/TilPageClient";


// BlogPost를 Meta로 변환하는 함수
function convertBlogPostToMeta(post: BlogPost) {
  return {
    id: post.meta.id,
    title: post.meta.title,
    description: post.meta.description,
    date: post.meta.date,
    tags: post.meta.tags,
  };
}

export default async function TilPage() {
  const posts = await getTILs();

  if (!posts || posts.length === 0) {
    return (
      <p className="mt-10 text-center text-black dark:text-white">
        Sorry, no TIL posts available.
      </p>
    );
  }

  // BlogPost[]를 Meta[]로 변환
  const metaPosts = posts.map(convertBlogPostToMeta);

  return <TilPageClient metaPosts={metaPosts} posts={posts} />;
}
