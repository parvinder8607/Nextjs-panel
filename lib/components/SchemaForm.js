"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./SchemaForm.module.css";
function SchemaForm({ schema, api, params }) {
    const [formData, setFormData] = useState({});
    const router = useRouter();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(api.create, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        setFormData({});
        router.push(`/admin/${params}`);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: styles.form, children: [schema.map((field) => (_jsxs("div", { className: styles.field, children: [_jsx("label", { className: styles.label, children: field.label }), field.type === "select" ? (_jsx("select", { name: field.name, onChange: handleChange, className: styles.select, children: field.options.map((opt) => (_jsx("option", { value: opt, children: opt }, opt))) })) : (_jsx("input", { type: field.type, name: field.name, value: formData[field.name] || "", onChange: handleChange, className: styles.input }))] }, field.name))), _jsx("button", { type: "submit", className: styles.button, children: "Submit" })] }));
}
export default SchemaForm;
