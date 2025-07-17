import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { registeredResources } from "@/resources";
import { SchemaForm } from "nextjs-panel";
import Link from "next/link";
export default async function AdminPage({ params }) {
    const resource = registeredResources[params.resource];
    if (!resource)
        return (_jsx(_Fragment, { children: _jsx("div", { children: "404 - Resource not found" }) }));
    return (_jsxs("main", { className: "p-6 w-full", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: resource.label }), _jsx("div", { className: "flex justify-end py-4 mr-4", children: _jsx(Link, { href: `/admin/${resource.name}/add`, children: _jsxs("button", { className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded", children: ["Add ", resource.label] }) }) }), _jsx(SchemaForm, { schema: resource.getFormFields(), api: resource.getApiRoutes(), params: resource.name })] }));
}
