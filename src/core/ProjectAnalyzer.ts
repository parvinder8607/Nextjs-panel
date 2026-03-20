import fs from 'fs';
import path from 'path';
import { ProjectPaths } from './ProjectPaths';

export class ProjectAnalyzer {
  private static root = ProjectPaths.getRoot();

  /**
   * Check if the project uses TypeScript
   */
  static isTypeScript(): boolean {
    return fs.existsSync(path.join(this.root, 'tsconfig.json'));
  }

  /**
   * Check if Tailwind CSS is installed in package.json
   */
  static hasTailwind(): boolean {
    const pkgPath = path.join(this.root, 'package.json');
    if (!fs.existsSync(pkgPath)) return false;
    
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    return !!deps['tailwindcss'];
  }

  /**
   * Detect if using App Router (Next.js 13+) or Pages Router
   */
  static getRouterType(): 'app' | 'pages' {
    const appDir = path.join(this.root, 'app');
    const srcAppDir = path.join(this.root, 'src', 'app');
    
    if (fs.existsSync(appDir) || fs.existsSync(srcAppDir)) {
      return 'app';
    }
    return 'pages';
  }

  /**
   * Determine file extension for generated files
   */
  static getExtension(isJsx: boolean = false): string {
    const isTs = this.isTypeScript();
    if (isJsx) return isTs ? 'tsx' : 'jsx';
    return isTs ? 'ts' : 'js';
  }

  /**
   * Determine project using alias
   */
  static getAlias(): string | null {
    const root = process.cwd();
    const tsConfigPath = path.join(root, 'tsconfig.json');
    const jsConfigPath = path.join(root, 'jsconfig.json');
    
    const configPath = fs.existsSync(tsConfigPath) ? tsConfigPath : (fs.existsSync(jsConfigPath) ? jsConfigPath : null);

    if (configPath) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        const paths = config.compilerOptions?.paths;
        if (paths) {
          // Look for the first alias that points to src or root
          const alias = Object.keys(paths).find(key => key.includes('/*'));
          return alias ? alias.replace('/*', '') : null;
        }
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}