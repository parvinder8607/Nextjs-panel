import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar } from "nextjs-panel";
import { registeredResources } from "@/resources";
export default function Layout({ children, }) {
    return (_jsxs("div", { className: "flex", children: [_jsx(Sidebar, { resources: registeredResources }), children] }));
}
