'use client';

import React, { useState } from 'react';
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function ExpandableNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-lg">
      <div className="flex items-center justify-between px-4 h-9">
        <button onClick={toggleExpand} className="focus:outline-none">
          {isExpanded ? (
            <XMarkIcon className="h-6 w-6 text-gray-600" />
          ) : (
            <AdjustmentsHorizontalIcon className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="px-4 py-2 bg-gray-100 transition-all duration-300 ease-in-out">
          <div className="relative">
            <input
              type="text"
              placeholder="검색..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      )}
    </div>
  );
}
