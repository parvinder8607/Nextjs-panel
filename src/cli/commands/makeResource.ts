import { ProjectAnalyzer } from "../../core/ProjectAnalyzer";

export function makeResourceCommand(name: string) {
  

  if (!ProjectAnalyzer.getRouterType()) {
    console.error("❌ App Router not detected");
    process.exit(1);
  }

  console.log(`🚀 Generating resource: ${name}`);

  // later:
  // - read prisma schema
  // - generate resource
  // - generate api
}
