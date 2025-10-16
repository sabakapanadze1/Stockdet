"use client";
import Link from "next/link";
import NAV_ITEMS from "@/lib/constants";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map(({ label, href }) => (
        <li key={href}>
          <Link
            href={href}
            className={`hover:text-yellow-500 transition-colors ${
              isActive(href) ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
