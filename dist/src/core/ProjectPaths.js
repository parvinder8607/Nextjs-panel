"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectPaths = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ProjectPaths {
    /**
     * Returns the absolute path to the project root
     */
    static getRoot() {
        return process.cwd();
    }
    /**
     * Detects if the user is using the /src directory convention
     */
    static isSrcDir() {
        return fs_1.default.existsSync(path_1.default.join(this.getRoot(), 'src'));
    }
    /**
     * Gets the Next.js 'app' directory path
     */
    static getNextAppDir() {
        const root = this.getRoot();
        const appPath = this.isSrcDir()
            ? path_1.default.join(root, 'src', 'app')
            : path_1.default.join(root, 'app');
        if (!fs_1.default.existsSync(appPath)) {
            // Fallback or error: Next.js App Router projects must have an app directory
            return appPath;
        }
        return appPath;
    }
    /**
     * Finds the prisma schema file
     */
    static getPrismaSchema() {
        const root = this.getRoot();
        const standardPath = path_1.default.join(root, 'prisma', 'schema.prisma');
        if (fs_1.default.existsSync(standardPath)) {
            return standardPath;
        }
        // Check if path is defined in package.json (advanced)
        try {
            const pkgJson = JSON.parse(fs_1.default.readFileSync(path_1.default.join(root, 'package.json'), 'utf-8'));
            if (pkgJson.prisma?.schema) {
                return path_1.default.join(root, pkgJson.prisma.schema);
            }
        }
        catch (e) {
            // package.json might not exist or be invalid
        }
        return null;
    }
    /**
     * Path for the generated resource logic classes
     */
    static getResourceRegistryDir() {
        return path_1.default.join(this.getRoot(), 'panel-resources');
    }
    /**
     * Path for the admin dashboard UI
     */
    static getAdminPanelDir() {
        return path_1.default.join(this.getNextAppDir(), 'admin');
    }
}
exports.ProjectPaths = ProjectPaths;
