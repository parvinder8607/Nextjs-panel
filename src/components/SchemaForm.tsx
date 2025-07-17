"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

 function SchemaForm({ schema, api, params }: { schema: any[]; api: any, params: any }) {
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
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md border border-gray-200"
    >
      {schema.map((field) => (
        <div key={field.name} className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">{field.label}</label>
          {field.type === "select" ? (
            <select
              name={field.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
              className="mt-1 block w-full p-2 border rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          )}
          
        </div>
      ))}

      
      

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
}

export default SchemaForm;