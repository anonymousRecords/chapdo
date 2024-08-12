import React from "react";
import Link from "next/link";
import { BlogPost } from "@/types";

interface RecentTilListProps {
  posts: BlogPost[];
}

const RecentTilList: React.FC<RecentTilListProps> = ({ posts }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Recent TILs</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.meta.id} className="mb-2">
            <Link
              href={`/til/${post.meta.id.replace(/^TIL\//, "")}`}
              className="text-blue-500 hover:underline"
            >
              {post.meta.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTilList;
