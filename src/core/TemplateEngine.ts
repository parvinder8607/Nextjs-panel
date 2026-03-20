import * as ejs from 'ejs'; // Use * as ejs for better compatibility
import fs from 'fs';
import path from 'path';

export class TemplateEngine {
  /**
   * Renders an EJS template with the provided data.
   */
  static render(templatePath: string, data: any): string {
    // 1. Resolve path that works both in 'dev' and 'dist'
    // This assumes your build script copies templates to dist/src/templates
    const fullPath = path.resolve(__dirname, '../templates', templatePath);

    if (!fs.existsSync(fullPath)) {
      // Fallback for local development if the above fails
      const devPath = path.resolve(process.cwd(), 'src/templates', templatePath);
      if (!fs.existsSync(devPath)) {
        throw new Error(`❌ Template not found at: ${fullPath} or ${devPath}`);
      }
      return this.executeRender(devPath, data);
    }

    return this.executeRender(fullPath, data);
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