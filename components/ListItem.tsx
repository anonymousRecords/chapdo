import { Meta } from "@/types";
import Link from "next/link";
import React from "react";

type ListItemProps = {
  post: Meta;
};

export default function ListItem({ post }: ListItemProps) {
  const { id, title, description, date } = post;
  return (
    <Link
      className="block mx-auto my-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1"
      href={`/posts/${id.replace(/^POSTS\//, '')}`}
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{date}</p>
      <p className="text-gray-700 dark:text-gray-200">{description}</p>
    </Link>
  );
}