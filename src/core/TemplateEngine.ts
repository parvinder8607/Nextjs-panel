import ejs from 'ejs';
import fs from 'fs';
import path from 'path';

export class TemplateEngine {
  /**
   * Renders an EJS template with the provided data.
   * @param templatePath Relative path from the 'src/templates' directory (e.g., 'layout/Sidebar.ejs')
   * @param data Object containing variables for the template
   */
  static render(templatePath: string, data: any): string {
    // 1. Resolve the path to the template file
    // We use __dirname to ensure it finds the templates folder inside the installed package
    const fullPath = path.join(__dirname, '../../src/templates', templatePath);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`❌ Template not found at: ${fullPath}`);
    }

    // 2. Read the template file content
    const templateStr = fs.readFileSync(fullPath, 'utf-8');

    // 3. Render using EJS
    try {
      return ejs.render(templateStr, {
        ...data,
        // Useful helper functions you might want in your templates:
        capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
        lowercase: (s: string) => s.toLowerCase(),
      });
    } catch (error) {
      console.error(`❌ Error rendering template: ${templatePath}`);
      throw error;
    }
  }
}