"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export default function SchemaTable({ schema, api }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(api).then(res => res.json()).then(setData);
    }, [api]);
    return (_jsx("div", { className: " border border-gray-200 rounded-2xl  overflow-hidden ", children: _jsxs("table", { className: "w-full mb-6 ", children: [_jsx("thead", { children: _jsx("tr", { children: schema.map(col => (_jsx("th", { className: " text-left px-4 py-2 bg-gray-100", children: col.label }, col.key))) }) }), _jsx("tbody", { children: data.map((row, i) => (_jsx("tr", { children: schema.map(col => (_jsx("td", { className: " border-t border-b border-gray-200 px-4 py-2", children: row[col.key] }, col.key))) }, i))) })] }) }));
}
