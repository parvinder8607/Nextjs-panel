"use client";
import { useEffect, useState } from "react";
import styles from "./SchemaTable.module.css";

export default function SchemaTable({ schema, api }: { schema: any[]; api: string }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(api).then(res => res.json()).then(setData);
  }, [api]);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {schema.map(col => (
              <th key={col.key} className={styles.th}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {schema.map(col => (
                <td key={col.key} className={styles.td}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
