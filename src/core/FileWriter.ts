import fs from 'fs';
import path from 'path';

export class FileWriter {
  static write(targetPath: string, content: string) {
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(targetPath, content, 'utf-8');
    console.log(`📝 Generated: ${path.relative(process.cwd(), targetPath)}`);
  }
}