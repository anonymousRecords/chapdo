import React from 'react';

interface PostTileProps {
  title: string;
  content: string;
  tags: string[];
  maxContentLength: number;
}

export default function PostTile({ title, content, tags, maxContentLength = 150 }: PostTileProps) {
  if (!title.trim()) {
    return null;
  }
      
  const truncatedContent = content.length > maxContentLength 
    ? `${content.slice(0, maxContentLength)}...` 
    : content;

  return (
    <div className="w-[300px] h-[300px] bg-white shadow-md p-6 overflow-hidden flex flex-col">
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{truncatedContent}</p>
      </div>
      <div className="flex  flex-wrap">
        {tags.filter(tag => tag.trim()).map((tag) => (
          <span
            key={`${title}-${tag}`}
            className="bg-blue-500 text-white rounded-full px-2 py-1 text-sm mr-2 mb-2"
          >
            {tag.trim()}
          </span>
        ))}
      </div>
    </div>
  );
}
