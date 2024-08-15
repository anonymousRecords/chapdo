import React from "react";
import { BlogPost } from "@/types";

interface TilModalProps {
  til: BlogPost | null;
  onClose: () => void;
}

const TilModal: React.FC<TilModalProps> = ({ til, onClose }) => {
  if (!til) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-black p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400"
        >
          X
        </button>
        <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">
          {til.meta?.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {til.meta?.date}
        </p>
        <p className="text-black dark:text-white mb-4">
          {til.meta?.description}
        </p>
        {til.meta?.tags && (
          <div className="mb-4">
            {til.meta.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-yellow-500 text-black rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="prose dark:prose-invert max-w-none">{til.content}</div>
      </div>
    </div>
  );
};

export default TilModal;
