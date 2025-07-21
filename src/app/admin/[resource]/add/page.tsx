import { registeredResources } from "@/resources";
import {SchemaForm} from "nextjs-panel";
import Link from "next/link";


export default async function AdminPage({ params }: { params: { resource: keyof typeof registeredResources } }) {
  const { resource: resourceKey } = await params;
  const resource = registeredResources[resourceKey];
  
  if (!resource) return (
    <>
    <div>
      404 - Resource not found
    </div>
    </>
    );

  return (
    <main className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">{resource.label}</h1>
      <div className="flex justify-end py-4 mr-4">
        <Link href={`/admin/${resource.name}/add`} >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add {resource.label}
        </button>
        </Link>
      </div>
      {/* <SchemaTable schema={resource.getTableColumns()} api={resource.getApiRoutes().list} /> */}
      <SchemaForm schema={resource.getFormFields()} api={resource.getApiRoutes()} params={resource.name} />
    
    </main>
  );
}