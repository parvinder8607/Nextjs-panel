"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResourceCommand = makeResourceCommand;
const ProjectAnalyzer_1 = require("../../core/ProjectAnalyzer");
function makeResourceCommand(name) {
    const analyzer = new ProjectAnalyzer_1.ProjectAnalyzer();
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
