"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./SchemaForm.module.css";

function SchemaForm({ schema, api, params }: { schema: any[]; api: any; params: any }) {
  const [formData, setFormData] = useState<any>({});
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch(api.create, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({});
    router.push(`/admin/${params}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {schema.map((field) => (
        <div key={field.name} className={styles.field}>
          <label className={styles.label}>{field.label}</label>
          {field.type === "select" ? (
            <select
              name={field.name}
              onChange={handleChange}
              className={styles.select}
            >
              {field.options.map((opt: string) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              className={styles.input}
            />
          )}
        </div>
      ))}

      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
}

export default SchemaForm;
