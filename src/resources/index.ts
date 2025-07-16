import { ProductResource } from "./ProductResource";
import { UsersResource } from "@/resources/UserResource";

export const registeredResources = {
  product: new ProductResource(),

  users: new UsersResource(),
  


};