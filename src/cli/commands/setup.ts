// src/cli/commands/setup.ts
import fs from 'fs';
import path from 'path';
import { ProjectPaths } from '../../core/ProjectPaths';
import { FileWriter } from '../../core/FileWriter';
import { TemplateEngine } from '../../core/TemplateEngine';

export function setupCommand() {
  console.log("⚙️  nextjs-panel setup started...");

  const appDir = ProjectPaths.getNextAppDir();
  const rootDir = ProjectPaths.getRoot();

  // 1. Create Admin Route (e.g., /app/admin)
  const adminDirPath = path.join(appDir, 'admin');
  if (!fs.existsSync(adminDirPath)) {
    fs.mkdirSync(adminDirPath, { recursive: true });
    // Create a basic layout.tsx for the admin panel
    // inside setupCommand()
const adminDir = ProjectPaths.getAdminPanelDir();

// Generate Layout
const layoutContent = TemplateEngine.render('layout/PanelLayout.ejs', {});
FileWriter.write(path.join(adminDir, 'layout.tsx'), layoutContent);

// Generate Sidebar
const sidebarContent = TemplateEngine.render('layout/Sidebar.ejs', {});
FileWriter.write(path.join(adminDir, 'Sidebar.tsx'), sidebarContent);

// Generate Page
const pageContent = TemplateEngine.render('layout/DashboardPage.ejs', {});
FileWriter.write(path.join(adminDir, 'page.tsx'), pageContent);

// Initialize an empty registry so the imports don't break
const registryPath = path.join(ProjectPaths.getResourceRegistryDir(), '_registry.ts');
FileWriter.write(registryPath, `export const resourceRegistry = [];`);
  }

  // 2. Create Resources Folder (where user-defined logic lives)
  const resourceDir = path.join(rootDir, 'panel-resources');
  if (!fs.existsSync(resourceDir)) {
    fs.mkdirSync(resourceDir);
    console.log("📁 Created /panel-resources for your model configurations");
  }

  // 3. Create Config File (nextjs-panel.config.ts)
  const configPath = path.join(rootDir, 'nextjs-panel.config.ts');
  if (!fs.existsSync(configPath)) {
    const defaultConfig = `
export const panelConfig = {
  title: "Admin Panel",
  basePath: "/admin",
  colors: {
    primary: "#000000"
  }
};`;
    FileWriter.write(configPath, defaultConfig);
  }

  console.log("✅ Setup complete! You can now run: npx nextjs-panel make:resource <Model>");
}