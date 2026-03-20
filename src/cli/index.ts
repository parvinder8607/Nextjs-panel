import { setupCommand } from "./commands/setup";
import { makeResourceCommand } from "./commands/makeResource";

export function runCLI(argv: string[]) {
  const [, , command, arg] = argv;

  switch (command) {
    case "setup":
      setupCommand();
      break;

    case "make:resource"
      if (!arg) {
        console.error("❌ Resource name is required");
        process.exit(1);
      }
      makeResourceCommand(arg);
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
