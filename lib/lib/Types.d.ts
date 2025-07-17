export type TableColumn = {
    key: string;
    label: string;
};
export type FormField = {
    name: string;
    label: string;
    type: string;
    options?: string[];
    required?: boolean;
};
export type ImportField = {
    name: string;
    label: string;
    required?: boolean;
};
