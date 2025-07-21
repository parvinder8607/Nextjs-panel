import { Resource } from "@/lib/Resource";

export class UserResource extends Resource {
  name = "user";
  label = "User";

  getTableColumns() {
    return [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "password", label: "Password" },
      { key: "actions", label: "Actions" }
    ];
  }

  getFormFields() {
    return [
      { name: "name", label: "Name", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "password", label: "Password", type: "text" }
    ];
  }

  getImportSchema() {
    return [
      { name: "name", label: "Name" },
      { name: "email", label: "Email" },
      { name: "password", label: "Password" }
    ];
  }

  getApiRoutes() {
    return {
      list: "/api/user",
      create: "/api/user",
      update: "/api/user/:id",
      delete: "/api/user/:id",
      import: "/api/user/import",
    };
  }

}
