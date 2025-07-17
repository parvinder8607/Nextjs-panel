import { ReactNode } from "react";
import { ResourceRegistry } from "./ResourceRegistry";
import type { TableColumn, FormField, ImportField } from "@/lib/Types";

export abstract class Resource {
  abstract name: string;
  abstract label: string;
  icon?: ReactNode;

  //  Register Resource using class but not working currently
  // constructor() {   
  //   ResourceRegistry.register(this);
  // }


  
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