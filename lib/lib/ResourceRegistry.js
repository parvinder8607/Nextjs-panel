export class ResourceRegistry {
    static resources = {};
    static register(resource) {
        ResourceRegistry.resources[resource.name] = resource;
    }
    static getAll() {
        return ResourceRegistry.resources;
    }
    static get(name) {
        return ResourceRegistry.resources[name];
    }
}
