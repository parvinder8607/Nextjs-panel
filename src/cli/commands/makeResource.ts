import { ProjectAnalyzer } from "../../core/ProjectAnalyzer";

export function makeResourceCommand(name: string) {
  const analyzer = new ProjectAnalyzer();

  if (!analyzer.usesAppRouter()) {
    console.error("❌ App Router not detected");
    process.exit(1);
  }

  console.log(`🚀 Generating resource: ${name}`);

  // later:
  // - read prisma schema
  // - generate resource
  // - generate api
}
