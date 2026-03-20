import * as ejs from 'ejs'; // Use * as ejs for better compatibility
import fs from 'fs';
import path from 'path';

export class TemplateEngine {
  /**
   * Renders an EJS template with the provided data.
   */
 static render(templatePath: string, data: any): string {
    // 1. Try to find it in the 'dist' folder (Production)
    // __dirname is dist/src/core -> we need dist/src/templates
    const distPath = path.resolve(__dirname, '..', 'templates', templatePath);

    // 2. Try to find it in the 'src' folder (Development/Symlink)
    const devPath = path.resolve(process.cwd(), 'src', 'templates', templatePath);

    if (fs.existsSync(distPath)) {
        return this.executeRender(distPath, data);
    } else if (fs.existsSync(devPath)) {
        return this.executeRender(devPath, data);
    } else {
        // Log both so you can see where it's looking in your terminal
        console.error(`❌ Template not found.`);
        console.error(`   Looked in Dist: ${distPath}`);
        console.error(`   Looked in Dev:  ${devPath}`);
        throw new Error(`Template not found: ${templatePath}`);
    }
}

  private static executeRender(filePath: string, data: any): string {
    const templateStr = fs.readFileSync(filePath, 'utf-8');

    try {
      return ejs.render(templateStr, {
        ...data,
        // Helper functions
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