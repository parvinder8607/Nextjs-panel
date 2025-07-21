import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import styles from "./Sidebar.module.css";
export default function Sidebar({ resources }) {
    return (_jsxs("aside", { className: styles.sidebar, children: [_jsx("h2", { className: styles.heading, children: "Admin Panel" }), _jsx("ul", { className: styles.list, children: Object.entries(resources).map(([key, resource]) => (_jsx("li", { children: _jsxs(Link, { href: `/admin/${resource.name}`, className: styles.link, children: [resource.icon && resource.icon, " ", resource.label] }) }, key))) })] }));
}
