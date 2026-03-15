"use strict";
// src/core/Resource.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
/**
 * Base Resource class
 * Every generated resource MUST extend this class.
 *
 * This class contains NO framework-specific logic.
 * It only describes metadata.
 */
class Resource {
    /**
     * Optional: override for sidebar visibility
     */
    isVisible() {
        return true;
    }
    /**
     * Optional: default sorting
     */
    getDefaultSort() {
        return null;
    }
}
exports.Resource = Resource;
