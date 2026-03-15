import path from 'path';
import fs from 'fs';

export class ProjectPaths {
  /**
   * Returns the absolute path to the project root
   */
  static getRoot(): string {
    return process.cwd();
  }

  /**
   * Detects if the user is using the /src directory convention
   */
  static isSrcDir(): boolean {
    return fs.existsSync(path.join(this.getRoot(), 'src'));
  }

  /**
   * Gets the Next.js 'app' directory path
   */
  static getNextAppDir(): string {
    const root = this.getRoot();
    const appPath = this.isSrcDir() 
      ? path.join(root, 'src', 'app') 
      : path.join(root, 'app');
    
    if (!fs.existsSync(appPath)) {
      // Fallback or error: Next.js App Router projects must have an app directory
      return appPath; 
    }
    return appPath;
  }

  /**
   * Finds the prisma schema file
   */
  static getPrismaSchema(): string | null {
    const root = this.getRoot();
    const standardPath = path.join(root, 'prisma', 'schema.prisma');
    
    if (fs.existsSync(standardPath)) {
      return standardPath;
    }

    // Check if path is defined in package.json (advanced)
    try {
      const pkgJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
      if (pkgJson.prisma?.schema) {
        return path.join(root, pkgJson.prisma.schema);
      }
    } catch (e) {
      // package.json might not exist or be invalid
    }

    return null;
  }

  /**
   * Path for the generated resource logic classes
   */
  static getResourceRegistryDir(): string {
    return path.join(this.getRoot(), 'panel-resources');
  }

  /**
   * Path for the admin dashboard UI
   */
  static getAdminPanelDir(): string {
    return path.join(this.getNextAppDir(), 'admin');
  }
}