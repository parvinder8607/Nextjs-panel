// src/config/loadConfig.ts
import fs from 'fs';
import path from 'path';

export interface PanelConfig {
  metadata: {
    isTypeScript: boolean;
    routerType: 'app' | 'pages';
    alias: string;
    srcDir: boolean;
  };
}

export function loadProjectConfig(): PanelConfig | null {
  const root = process.cwd();
  // Check for both .ts and .js versions
  const configPath = [
    path.join(root, 'nextjs-panel.config.ts'),
    path.join(root, 'nextjs-panel.config.js')
  ].find(p => fs.existsSync(p));

  if (!configPath) return null;

  // For now, we can parse the metadata out or use a regex 
  // to avoid complex dynamic imports of TS files in a CLI
  const content = fs.readFileSync(configPath, 'utf-8');
  
  // Quick helper to extract values from the file string
  const extract = (key: string) => {
    const match = content.match(new RegExp(`${key}:\\s*["']?([^"',\\s]+)["']?`));
    return match ? match[1] : null;
  };

  return {
    metadata: {
      isTypeScript: extract('isTypeScript') === 'true',
      routerType: extract('routerType') as any || 'app',
      alias: extract('alias') || '@',
      srcDir: extract('srcDir') === 'true',
    }
  };
}