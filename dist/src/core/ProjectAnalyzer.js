"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectAnalyzer = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ProjectAnalyzer {
    constructor() {
        this.root = process.cwd();
    }
    hasSrcDir() {
        return fs_1.default.existsSync(path_1.default.join(this.root, "src"));
    }
    usesAppRouter() {
        return (fs_1.default.existsSync(path_1.default.join(this.root, "app")) ||
            fs_1.default.existsSync(path_1.default.join(this.root, "src", "app")));
    }
    usesTypeScript() {
        return fs_1.default.existsSync(path_1.default.join(this.root, "tsconfig.json"));
    }
    usesTailwind() {
        return fs_1.default.existsSync(path_1.default.join(this.root, "tailwind.config.js"));
    }
}
exports.ProjectAnalyzer = ProjectAnalyzer;
