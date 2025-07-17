import { Resource } from "@/lib/Resource";
export class ProductResource extends Resource {
    name = "product";
    label = "Product";
    getTableColumns() {
        return [
            { key: "name", label: "Name" },
            { key: "description", label: "Description" },
            { key: "price", label: "Price" },
            { key: "actions", label: "Actions" }
        ];
    }
    getFormFields() {
        return [
            { name: "name", label: "Name", type: "text" },
            { name: "description", label: "Description", type: "text" },
            { name: "price", label: "Price", type: "number" }
        ];
    }
    getImportSchema() {
        return [
            { name: "name", label: "Name" },
            { name: "description", label: "Description" },
            { name: "price", label: "Price" }
        ];
    }
    getApiRoutes() {
        return {
            list: "/api/product",
            create: "/api/product",
            update: "/api/product/:id",
            delete: "/api/product/:id",
            import: "/api/product/import",
        };
    }
}
