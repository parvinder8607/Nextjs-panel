import * as ejs from 'ejs';
import fs from 'fs';
import path from 'path';

export class TemplateEngine {
  static render(templatePath: string, data: any): string {
    const distPath = path.resolve(__dirname, '..', 'templates', templatePath);
    const devPath = path.resolve(process.cwd(), 'src', 'templates', templatePath);

    const finalPath = fs.existsSync(distPath) ? distPath : (fs.existsSync(devPath) ? devPath : null);

    if (!finalPath) {
      console.error(`❌ Template not found.\n Dist: ${distPath}\n Dev: ${devPath}`);
      throw new Error(`Template not found: ${templatePath}`);
    }

    return this.executeRender(finalPath, data);
  }

  private static executeRender(filePath: string, data: any): string {
    const templateStr = fs.readFileSync(filePath, 'utf-8');

    // Extract project metadata from data passed in
    const { alias, srcDir } = data;

    try {
      return ejs.render(templateStr, {
        ...data,
        // --- THE IMPORT RESOLVER HELPER ---
        // Usage in EJS: <%- resolveImport('panel-resources/_registry') %>
        resolveImport: (targetPath: string) => {
          if (alias && alias !== './') {
            const cleanAlias = alias.replace(/\/$/, '').replace(/\/\*$/, '');
            // Returns something like "@/panel-resources/_registry"
           return `${cleanAlias}/${targetPath}`;
          }
          // Returns relative path based on whether user is using /src/
          // Assuming we are always going from /app/admin/ (3 levels deep)
          const depth = srcDir ? '../../../' : '../../';
          return `${depth}${targetPath}`;
        },
        
        capitalize: (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '',
        lowercase: (s: string) => s ? s.toLowerCase() : '',
        pluralize: (s: string) => s ? (s.endsWith('y') ? s.slice(0, -1) + 'ies' : s + 's') : '',
      });
    } catch (error) {
      console.error(`❌ Error rendering template at: ${filePath}`);
      throw error;
    }
  }
}