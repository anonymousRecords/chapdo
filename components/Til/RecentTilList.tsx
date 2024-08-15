import React from "react";
import Link from "next/link";
import { BlogPost } from "@/types";

interface RecentTilListProps {
  posts: BlogPost[];
}

const RecentTilList: React.FC<RecentTilListProps> = ({ posts }) => {
  return (
    <div className="mt-8 bg-white dark:bg-black p-4 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Recent TILs
      </h3>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li
            key={post.meta.id}
            className="transition-all duration-200 ease-in-out"
          >
            <Link
              href={`/til/${post.meta.id.replace(/^TIL\//, "")}`}
              className="block text-black dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400 hover:translate-x-1 transition-all duration-200"
            >
              <div className="font-medium">{post.meta.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(post.meta.date).toLocaleDateString()}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/til"
        className="block mt-4 text-center text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 font-medium"
      >
        View All TILs →
      </Link>
    </div>
  );
};

export default RecentTilList;
