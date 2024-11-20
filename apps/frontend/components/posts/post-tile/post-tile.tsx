import React from 'react';

interface PostTileProps {
  title: string;
  content: string;
  tags: string[];
}

export default function PostTile({ title, content, tags }: PostTileProps) {
  return (
    <div className="w-[300px] h-[300px] bg-white shadow-md p-6 overflow-hidden flex flex-col">
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
      <div className="flex  flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-500 text-white rounded-full px-2 py-1 text-sm mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
