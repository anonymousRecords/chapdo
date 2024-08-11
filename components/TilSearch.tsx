"use client";
import React, { useState } from "react";
import { BlogPost } from "@/types";
import Link from "next/link";

interface TilSearchProps {
  posts: BlogPost[];
}

const TilSearch: React.FC<TilSearchProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filteredPosts = posts.filter(
      (post) =>
        post.meta.title.toLowerCase().includes(term.toLowerCase()) ||
        post.meta.description.toLowerCase().includes(term.toLowerCase()),
    );

    setSearchResults(filteredPosts);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search TILs..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full rounded border p-2"
      />
      {searchTerm && (
        <ul className="mt-2">
          {searchResults.map((post) => (
            <li key={post.meta.id} className="mb-2">
              <Link
                href={`/til/${post.meta.id}`}
                className="text-blue-500 hover:underline"
              >
                {post.meta.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TilSearch;
