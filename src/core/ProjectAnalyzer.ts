import fs from "fs";
import path from "path";

export class ProjectAnalyzer {
  root = process.cwd();

  hasSrcDir(): boolean {
    return fs.existsSync(path.join(this.root, "src"));
  }

  usesAppRouter(): boolean {
    return (
      fs.existsSync(path.join(this.root, "app")) ||
      fs.existsSync(path.join(this.root, "src", "app"))
    );
  }

  usesTypeScript(): boolean {
    return fs.existsSync(path.join(this.root, "tsconfig.json"));
  }

  usesTailwind(): boolean {
    return fs.existsSync(path.join(this.root, "tailwind.config.js"));
  }
}
