import type { Resource } from "@/lib/Resource";
export declare class ResourceRegistry {
    private static resources;
    static register(resource: Resource): void;
    static getAll(): Record<string, Resource>;
    static get(name: string): Resource | undefined;
}
