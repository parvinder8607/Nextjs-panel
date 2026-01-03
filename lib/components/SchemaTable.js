"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import styles from "./SchemaTable.module.css";
export default function SchemaTable({ schema, api }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(api).then(res => res.json()).then(setData);
    }, [api]);
    return (_jsx("div", { className: styles.container, children: _jsxs("table", { className: styles.table, children: [_jsx("thead", { className: styles.thead, children: _jsx("tr", { children: schema.map(col => (_jsx("th", { className: styles.th, children: col.label }, col.key))) }) }), _jsx("tbody", { children: data.map((row, i) => (_jsx("tr", { children: schema.map(col => (_jsx("td", { className: styles.td, children: row[col.key] }, col.key))) }, i))) })] }) }));
}
