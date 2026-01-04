        // src/core/Resource.ts

export type TableColumn = {
  key: string;
  label: string;
};

export type FormField = {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "password" | "boolean" | "date";
  required?: boolean;
};

export type ApiRoutes = {
  list: string;
  read: string;
  create: string;
  update: string;
  delete: string;
  import?: string;
};

/**
 * Base Resource class
 * Every generated resource MUST extend this class.
 *
 * This class contains NO framework-specific logic.
 * It only describes metadata.
 */
export abstract class Resource {
  /** unique resource key (used in routes, sidebar, registry) */
  abstract name: string;

  /** human-readable label */
  abstract label: string;

  /** table column configuration */
  abstract getTableColumns(): TableColumn[];

  /** create/edit form configuration */
  abstract getFormFields(): FormField[];

  /** API endpoints used by the panel */
  abstract getApiRoutes(): ApiRoutes;

  /**
   * Optional: override for sidebar visibility
   */
  isVisible(): boolean {
    return true;
  }

  /**
   * Optional: default sorting
   */
  getDefaultSort(): { key: string; direction: "asc" | "desc" } | null {
    return null;
  }
}
