import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ELEMENTS } from "@/constants";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
      >
        {isOpen ? (
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 bg-white shadow-md mt-2 py-2 px-4">
          {NAV_ELEMENTS.map((element) => (
            <Link
              key={element.name}
              href={element.url}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === element.url
                  ? "bg-yellow-500 text-white"
                  : "text-gray-700 hover:bg-yellow-200 hover:text-gray-900"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {element.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
