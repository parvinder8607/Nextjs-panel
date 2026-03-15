"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateEngine = void 0;
const ejs_1 = __importDefault(require("ejs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class TemplateEngine {
    /**
     * Renders an EJS template with the provided data.
     * @param templatePath Relative path from the 'src/templates' directory (e.g., 'layout/Sidebar.ejs')
     * @param data Object containing variables for the template
     */
    static render(templatePath, data) {
        // 1. Resolve the path to the template file
        // We use __dirname to ensure it finds the templates folder inside the installed package
        const fullPath = path_1.default.join(__dirname, '../../src/templates', templatePath);
        if (!fs_1.default.existsSync(fullPath)) {
            throw new Error(`❌ Template not found at: ${fullPath}`);
        }
        // 2. Read the template file content
        const templateStr = fs_1.default.readFileSync(fullPath, 'utf-8');
        // 3. Render using EJS
        try {
            return ejs_1.default.render(templateStr, {
                ...data,
                // Useful helper functions you might want in your templates:
                capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),
                lowercase: (s) => s.toLowerCase(),
            });
        }
        catch (error) {
            console.error(`❌ Error rendering template: ${templatePath}`);
            throw error;
        }
    }
}
exports.TemplateEngine = TemplateEngine;
