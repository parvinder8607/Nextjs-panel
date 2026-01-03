// Currently not in working
import type { Resource } from "@/lib/Resource";

export class ResourceRegistry {
  private static resources: Record<string, Resource> = {};

  static register(resource: Resource) {
    ResourceRegistry.resources[resource.name] = resource;
  }

  static getAll(): Record<string, Resource> {
    return ResourceRegistry.resources;
  }

  static get(name: string): Resource | undefined {
    return ResourceRegistry.resources[name];
  }
}