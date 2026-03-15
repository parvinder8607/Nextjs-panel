"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileWriter = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileWriter {
    static write(targetPath, content) {
        const dir = path_1.default.dirname(targetPath);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        fs_1.default.writeFileSync(targetPath, content, 'utf-8');
        console.log(`📝 Generated: ${path_1.default.relative(process.cwd(), targetPath)}`);
    }
}
exports.FileWriter = FileWriter;
