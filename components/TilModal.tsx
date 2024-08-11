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
      <div className="bg-gray-800 p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300"
        >
          X
        </button>
        <h3 className="text-2xl font-bold mb-4 text-white">
          {til.meta?.title}
        </h3>
        <p className="text-gray-300 mb-4">{til.meta?.date}</p>
        <p className="text-white mb-4">{til.meta?.description}</p>
        {til.meta?.tags && (
          <div className="mb-4">
            {til.meta.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="prose prose-invert max-w-none">{til.content}</div>
      </div>
    </div>
  );
};

export default TilModal;
