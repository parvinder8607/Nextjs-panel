"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCommand = setupCommand;
// src/cli/commands/setup.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ProjectPaths_1 = require("../../core/ProjectPaths");
const FileWriter_1 = require("../../core/FileWriter");
const TemplateEngine_1 = require("../../core/TemplateEngine");
function setupCommand() {
    console.log("⚙️  nextjs-panel setup started...");
    const appDir = ProjectPaths_1.ProjectPaths.getNextAppDir();
    const rootDir = ProjectPaths_1.ProjectPaths.getRoot();
    // 1. Create Admin Route (e.g., /app/admin)
    const adminDirPath = path_1.default.join(appDir, 'admin');
    if (!fs_1.default.existsSync(adminDirPath)) {
        fs_1.default.mkdirSync(adminDirPath, { recursive: true });
        // Create a basic layout.tsx for the admin panel
        // inside setupCommand()
        const adminDir = ProjectPaths_1.ProjectPaths.getAdminPanelDir();
        // Generate Layout
        const layoutContent = TemplateEngine_1.TemplateEngine.render('layout/PanelLayout.ejs', {});
        FileWriter_1.FileWriter.write(path_1.default.join(adminDir, 'layout.tsx'), layoutContent);
        // Generate Sidebar
        const sidebarContent = TemplateEngine_1.TemplateEngine.render('layout/Sidebar.ejs', {});
        FileWriter_1.FileWriter.write(path_1.default.join(adminDir, 'Sidebar.tsx'), sidebarContent);
        // Generate Page
        const pageContent = TemplateEngine_1.TemplateEngine.render('layout/DashboardPage.ejs', {});
        FileWriter_1.FileWriter.write(path_1.default.join(adminDir, 'page.tsx'), pageContent);
        // Initialize an empty registry so the imports don't break
        const registryPath = path_1.default.join(ProjectPaths_1.ProjectPaths.getResourceRegistryDir(), '_registry.ts');
        FileWriter_1.FileWriter.write(registryPath, `export const resourceRegistry = [];`);
    }
    // 2. Create Resources Folder (where user-defined logic lives)
    const resourceDir = path_1.default.join(rootDir, 'panel-resources');
    if (!fs_1.default.existsSync(resourceDir)) {
        fs_1.default.mkdirSync(resourceDir);
        console.log("📁 Created /panel-resources for your model configurations");
    }
    // 3. Create Config File (nextjs-panel.config.ts)
    const configPath = path_1.default.join(rootDir, 'nextjs-panel.config.ts');
    if (!fs_1.default.existsSync(configPath)) {
        const defaultConfig = `
export const panelConfig = {
  title: "Admin Panel",
  basePath: "/admin",
  colors: {
    primary: "#000000"
  }
};`;
        FileWriter_1.FileWriter.write(configPath, defaultConfig);
    }
    console.log("✅ Setup complete! You can now run: npx nextjs-panel make:resource <Model>");
}
