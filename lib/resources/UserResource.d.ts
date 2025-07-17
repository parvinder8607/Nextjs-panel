import { Resource } from "@/lib/Resource";
export declare class UserResource extends Resource {
    name: string;
    label: string;
    getTableColumns(): {
        key: string;
        label: string;
    }[];
    getFormFields(): {
        name: string;
        label: string;
        type: string;
    }[];
    getImportSchema(): {
        name: string;
        label: string;
    }[];
    getApiRoutes(): {
        list: string;
        create: string;
        update: string;
        delete: string;
        import: string;
    };
}
