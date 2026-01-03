"use client";
import { useEffect, useState } from "react";
export default function SchemaTable({ schema, api }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(api).then(res => res.json()).then(setData);
    }, [api]);
    return (<div className=" border border-gray-200 rounded-2xl  overflow-hidden ">
      <table className="w-full mb-6 ">
      <thead>
        <tr>
          {schema.map(col => (<th key={col.key} className=" text-left px-4 py-2 bg-gray-100">{col.label}</th>))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (<tr key={i}>
            {schema.map(col => (<td key={col.key} className=" border-t border-b border-gray-200 px-4 py-2">
                {row[col.key]}
              </td>))}
          </tr>))}
      </tbody>
    </table>
    </div>);
}
