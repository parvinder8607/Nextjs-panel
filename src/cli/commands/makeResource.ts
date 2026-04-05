import path from 'path';
import fs from 'fs';
import { ProjectAnalyzer } from "../../core/ProjectAnalyzer";
import { PrismaAnalyzer } from "../../core/PrismaAnalyzer";
import { TemplateEngine } from "../../core/TemplateEngine";
import { FileWriter } from "../../core/FileWriter";
import { ProjectPaths } from "../../core/ProjectPaths";

export async function makeResourceCommand(name: string) {
  if (ProjectAnalyzer.getRouterType() !== 'app') {
    console.error("❌ nextjs-panel only supports the Next.js App Router.");
    process.exit(1);
  }

  try {
    const fields = PrismaAnalyzer.getModelFields(name);
    const isTs = ProjectAnalyzer.isTypeScript();
    const scriptExt = ProjectAnalyzer.getExtension(false);
    const modelLower = name.toLowerCase();

    const resourcesDir = ProjectPaths.getResourceRegistryDir();
    if (!fs.existsSync(resourcesDir)) {
      fs.mkdirSync(resourcesDir, { recursive: true });
    }

    // Ensure BaseResource exists with explicit return types
    const baseResourcePath = path.join(resourcesDir, `BaseResource.${scriptExt}`);
    if (!fs.existsSync(baseResourcePath)) {
      const baseContent = TemplateEngine.render('resource/BaseResource.ejs', { isTs });
      FileWriter.write(baseResourcePath, baseContent);
    }

    const resourceFile = path.join(resourcesDir, `${name}Resource.${scriptExt}`);
    const resourceContent = TemplateEngine.render('resource/ResourceClass.ejs', {
      name,
      fields,
      isTs
    });
    
    FileWriter.write(resourceFile, resourceContent);

    // Fixed Registry Update
    updateRegistry(name, resourcesDir, scriptExt, isTs);

    console.log(`\n✅ Resource ${name} created successfully.`);

    // --- PHASE 2: CRUD API Generation ---
    const appDir = ProjectPaths.getNextAppDir();
    const apiBaseDir = path.join(appDir, 'api', 'admin', modelLower);
    const apiIdDir = path.join(apiBaseDir, '[id]');

    // Create API directories
    if (!fs.existsSync(apiIdDir)) {
      fs.mkdirSync(apiIdDir, { recursive: true });
    }

    // 1. Generate Collection Route: /api/admin/[model]/route.ts (GET all, POST)
    const collectionRoutePath = path.join(apiBaseDir, `route.${scriptExt}`);
    const collectionContent = TemplateEngine.render('api/CollectionRoute.ejs', { name, isTs });
    FileWriter.write(collectionRoutePath, collectionContent);

    // 2. Generate Single Record Route: /api/admin/[model]/[id]/route.ts (GET one, PATCH, DELETE)
    const singleRoutePath = path.join(apiIdDir, `route.${scriptExt}`);
    const singleContent = TemplateEngine.render('api/SingleRoute.ejs', { name, isTs });
    FileWriter.write(singleRoutePath, singleContent);

    console.log(`\n✅ Success: Created Resource and CRUD API for ${name}.`);
    console.log(`📍 Resource: /panel-resources/${name}Resource.${scriptExt}`);
    console.log(`📡 API: /api/admin/${modelLower}`);

  } catch (error: any) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}

function updateRegistry(name: string, dir: string, ext: string, isTs: boolean) {
  const registryPath = path.join(dir, `index.${ext}`);
  const resourceClassName = `${name}Resource`;
  const importLine = `import { ${resourceClassName} } from './${resourceClassName}';`;

  // 1. Initial Creation (If file doesn't exist)
  if (!fs.existsSync(registryPath)) {
    const initial = `${importLine}\n\nexport const resourceRegistry${isTs ? ': any[]' : ''} = [\n  ${resourceClassName}\n];\n`;
    fs.writeFileSync(registryPath, initial);
    return;
  }

  let content = fs.readFileSync(registryPath, 'utf-8');

  // 2. Ensure Import exists
  if (!content.includes(importLine)) {
    content = `${importLine}\n${content}`;
  }

  // 3. The "Nuke" Strategy:
  // This Regex finds the variable name, optional type, and everything between [ and ]
  const registryRegex = /(export const resourceRegistry(?::\s*any\[\])?\s*=\s*\[)([\s\S]*?)(\];?)/;

  const match = content.match(registryRegex);

  if (match) {
    const [fullMatch, start, inner, end] = match;

    // Check if the resource is already there to prevent duplicates
    if (!inner.includes(resourceClassName)) {
      // Clean the current content: remove empty spaces and split by commas
      const existingResources = inner
        .split(',')
        .map(r => r.trim())
        .filter(r => r !== "");

      // Add the new one
      existingResources.push(resourceClassName);

      // Rebuild the entire array string with clean formatting
      const newArrayContent = `\n  ${existingResources.join(',\n  ')},\n`;
      const updatedRegistryLine = `${start}${newArrayContent}${end}`;

      // Replace the old block with the new one
      content = content.replace(fullMatch, updatedRegistryLine);
    }
  } else {
    // Emergency Fallback: If the Regex fails to find the variable at all
    content += `\nexport const resourceRegistry = [${resourceClassName}]; // Recovered`;
  }

  fs.writeFileSync(registryPath, content);
}