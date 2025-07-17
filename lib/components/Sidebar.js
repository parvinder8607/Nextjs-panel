import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
export default function Sidebar({ resources }) {
    return (_jsxs("aside", { className: "w-64 bg-gray-800 text-white min-h-screen p-4", children: [_jsx("h2", { className: "text-xl font-bold mb-6", children: "Admin Panel" }), _jsx("ul", { className: "space-y-2", children: Object.entries(resources).map(([key, resource]) => (_jsx("li", { children: _jsxs(Link, { href: `/admin/${resource.name}`, className: "flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 ", children: [resource.icon && resource.icon, " ", resource.label] }) }, key))) })] }));
}
