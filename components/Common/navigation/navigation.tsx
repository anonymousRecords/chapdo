"use client";

import MobileNavigation from "./mobile-navigation";
import DesktopNavigation from "./desktop-navigation";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Navigation() {
  const isMobile = useIsMobile();

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              chapdo
            </Link>
          </div>
          {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
        </div>
      </div>
    </nav>
  );
}
