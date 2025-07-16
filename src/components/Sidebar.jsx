'use client';

import Link from "next/link";
import { registeredResources } from "@/resources";

export default function Sidebar() {
    
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-2">
        {Object.entries(registeredResources).map(([key, resource]) => (
          <li key={key}>
            <Link
              href={`/admin/${resource.name}`}
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 "
            >
             {resource?.icon} {resource.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}