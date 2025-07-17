import { ProductResource } from "./ProductResource";
import { UserResource } from "./UserResource";
export const registeredResources = {
    product: new ProductResource(),
    user: new UserResource(),
};
