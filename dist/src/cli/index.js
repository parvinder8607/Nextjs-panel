"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCLI = runCLI;
const setup_1 = require("./commands/setup");
const makeResource_1 = require("./commands/makeResource");
function runCLI(argv) {
    const [, , command, arg] = argv;
    switch (command) {
        case "setup":
            (0, setup_1.setupCommand)();
            break;
        case "make:resource":
            if (!arg) {
                console.error("❌ Resource name is required");
                process.exit(1);
            }
            (0, makeResource_1.makeResourceCommand)(arg);
            break;
        default:
            printHelp();
    }
}
function printHelp() {
    console.log(`
nextjs-panel v2

Commands:
  setup
  make:resource <Name>

Example:
  nextjs-panel make:resource User
`);
}
