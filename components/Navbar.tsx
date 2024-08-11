"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { navElements } from "@/constants";
import NavbarButton from "@/components/NavbarButton";

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex shrink-0 items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                chapdo
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navElements.map((element) => (
                <Link
                  key={element.name}
                  href={element.url}
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    pathname === element.url
                      ? "border-blue-500 text-gray-900 dark:text-white"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  {element.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="sm:hidden">
            <NavbarButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
