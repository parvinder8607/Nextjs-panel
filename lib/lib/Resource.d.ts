import { ReactNode } from "react";
import type { TableColumn, FormField, ImportField } from "@/lib/Types";
export declare abstract class Resource {
    abstract name: string;
    abstract label: string;
    icon?: ReactNode;
    abstract getTableColumns(): TableColumn[];
    abstract getFormFields(): FormField[];
    abstract getImportSchema(): ImportField[];
    abstract getApiRoutes(): {
        list: string;
        create: string;
        update: string;
        delete: string;
        import: string;
    };
}
