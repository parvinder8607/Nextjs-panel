"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SchemaForm({ schema, api, params }: { schema: any[]; api: any, params: any }) {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
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
          {field.type === "file" && (
            <div
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("fileInput")?.click()}
            className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-sm text-gray-500">
              Drag & Drop your files or <span className="text-blue-600 underline">Browse</span>
            </p>
          
            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mx-auto w-full h-42 object-cover border rounded-md shadow-sm"
                />
              </div>
            )}
                </div>
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
