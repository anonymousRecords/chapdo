import Link from "next/link";
import React from "react";

export type Meta = {
  id: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
};

type TILItemProps = {
  item: Meta;
};

function TILItem({ item }: TILItemProps) {
  return (
    <Link href={`/til/${item.id.replace(/^TIL\//, "")}`}>
      <div className="w-64 h-64  bg-white hover:bg-yellow-300 transition-all duration-300 p-4 border border-gray-300 rounded-lg shadow-sm flex flex-col justify-between group hover:-translate-x-2 cursor-pointer">
        <div>
          <h3 className="text-lg text-black font-semibold mb-2 line-clamp-2 group-hover:line-clamp-none">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-3 group-hover:line-clamp-none">
            {item.description}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">{item.date}</p>
          <div className="flex flex-wrap gap-1">
            {item.tags?.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

type TILGridProps = {
  items: Meta[];
};

function TILGrid({ items }: TILGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
      {items.map((item) => (
        <div key={item.id} className="relative overflow-visible">
          <TILItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default TILGrid;
