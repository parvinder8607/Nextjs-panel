import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { ProjectPaths } from '../../core/ProjectPaths';
import { FileWriter } from '../../core/FileWriter';
import { TemplateEngine } from '../../core/TemplateEngine';
import { ProjectAnalyzer } from '../../core/ProjectAnalyzer';

export function setupCommand() {
  console.log("🚀 Starting nextjs-panel setup...");

  const rootDir = ProjectPaths.getRoot();
  
  // 1. Run Environment Checks
  const alias = ProjectAnalyzer.getAlias() || './';
  const isTs = ProjectAnalyzer.isTypeScript();
  const hasTailwind = ProjectAnalyzer.hasTailwind();
  const routerType = ProjectAnalyzer.getRouterType();
  const ext = ProjectAnalyzer.getExtension(true); // 'tsx' or 'jsx'
  const scriptExt = ProjectAnalyzer.getExtension(false); // 'ts' or 'js'

  console.log(`🔎 Detected: ${isTs ? 'TypeScript' : 'JavaScript'}, ${routerType} router, Tailwind: ${hasTailwind}`);

  // 2. Prisma Setup
  const prismaSchemaPath = path.join(rootDir, 'prisma', 'schema.prisma');
  if (!fs.existsSync(prismaSchemaPath)) {
    console.log("💎 Initializing Prisma...");
    try {
      execSync('npx prisma init', { stdio: 'inherit', cwd: rootDir });
    } catch (e) {
      console.error("❌ Prisma init failed. Ensure npx is installed.");
    }
  }

  // 3. Create Admin Directory Logic
  const adminDir = ProjectPaths.getAdminPanelDir();
  if (!fs.existsSync(adminDir)) {
    fs.mkdirSync(adminDir, { recursive: true });
    
    // Define files to generate
    const files = [
      { template: 'layout/PanelLayout.ejs', target: `layout.${ext}` },
      { template: 'layout/Sidebar.ejs', target: `Sidebar.${ext}` },
      { template: 'layout/DashboardPage.ejs', target: `page.${ext}` }
    ];

    files.forEach(file => {
      const content = TemplateEngine.render(file.template, { 
        isTs, 
        hasTailwind, 
        routerType 
      });
      console.log(`📝 Generating ${file.target}...`);
      FileWriter.write(path.join(adminDir, file.target), content);
    });
  }

  // 4. Resource Registry Initialization
  // This registry tracks which models are active in the dashboard
  const registryDir = ProjectPaths.getResourceRegistryDir();
  if (!fs.existsSync(registryDir)) {
    fs.mkdirSync(registryDir, { recursive: true });
  }

  const registryPath = path.join(registryDir, `index.${scriptExt}`);
  if (!fs.existsSync(registryPath)) {
    const registryContent = isTs 
      ? `export const resourceRegistry: any[] = [];` 
      : `export const resourceRegistry = [];`;
    FileWriter.write(registryPath, registryContent);
  }

  // 5. Config File Generation
  const configPath = path.join(rootDir, `nextjs-panel.config.${scriptExt}`);
  if (!fs.existsSync(configPath)) {
    const configContent = `
/** @type {import('nextjs-panel').PanelConfig} */
export const panelConfig = {
  title: "Admin Panel",
  basePath: "/admin",
  // Project Structure Metadata
  metadata: {
    isTypeScript: ${isTs},
    routerType: "${routerType}",
    alias: "${alias}",
    srcDir: ${fs.existsSync(path.join(process.cwd(), 'src'))}
  },
  colors: {
    primary: "#000000"
  }
};`;
    FileWriter.write(configPath, configContent);
  }

  // 6. Final Instructions
  console.log("\n✅ Setup successful!");
  if (!hasTailwind) {
    console.warn("⚠️  Note: Tailwind CSS was not detected. UI will fall back to standard CSS.");
  }
  console.log(`
Next steps:
1. Add your database URL to .env
2. Define models in prisma/schema.prisma
3. Run: npx nextjs-panel make:resource <ModelName>
  `);
}