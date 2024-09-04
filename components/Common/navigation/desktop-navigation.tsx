import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ELEMENTS } from "@/constants";

export default function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex space-x-4">
      {NAV_ELEMENTS.map((element) => (
        <Link
          key={element.name}
          href={element.url}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            pathname === element.url
              ? "bg-yellow-500 text-white"
              : "text-gray-700 hover:bg-yellow-200 hover:text-gray-900"
          }`}
        >
          {element.name}
        </Link>
      ))}
    </div>
  );
}
