'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';

interface ChipProps {
  label: string;
  onDelete?: () => void;
  deletable?: boolean;
}

export default function Chip({ label, onDelete, deletable = false }: ChipProps) {
  return (
    <div className="inline-flex items-center px-3 py-1 bg-black text-white font-medium rounded-full">
      {label}
      {deletable && (
        <button onClick={onDelete} className=" ml-2 focus:outline-none" aria-label="삭제">
          <XMarkIcon className="h-4 w-4 text-white text-bold" />
        </button>
      )}
    </div>
  );
}
