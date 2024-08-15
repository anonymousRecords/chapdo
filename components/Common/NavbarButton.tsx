"use client";
import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import { navElements } from "@/constants";

export default function NavbarButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed right-4 top-4 z-50 sm:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <IoClose className="size-6" />
          ) : (
            <IoMenu className="size-6" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 sm:hidden dark:bg-gray-900">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navElements.map((element) => (
              <Link
                key={element.name}
                href={element.url}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {element.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
