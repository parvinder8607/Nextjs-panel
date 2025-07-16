import { Resource } from "@/lib/Resource";
import { FaUser } from "react-icons/fa";

export class UsersResource extends Resource {
  name = "users";
  label = "Users";
  icon = <FaUser />;

 

  getTableColumns() {
    return [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "role", label: "Role" },
    ];
  }

  getFormFields() {
    return [
      { name: "name", label: "Name", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Password", type: "password" },
      { name: "role", label: "Role", type: "select", options: ["admin", "user"] },
    ];
  }

  getImportSchema() {
    return [
     
    ];
  }

  getApiRoutes() {
    return {
      list: "/api/users",
      create: "/api/users",
      update: "/api/users/:id",
      delete: "/api/users/:id",
      import: "/api/users/import",
    };
  }

 
}