import Link from "next/link";
import { Resource } from "../lib/Resource"; // adjust path as needed

type SidebarProps = {
  resources: Record<string, Resource>;
};


export default function Sidebar({resources} : SidebarProps) {
    
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-2">
        {Object.entries(resources).map(([key, resource]) => (
          <li key={key}>
            <Link
              href={`/admin/${resource.name}`}
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 "
            >
             {resource.icon && resource.icon} {resource.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}