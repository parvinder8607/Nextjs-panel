#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const resourceName = process.argv[2];

if (!resourceName) {
  console.error("❌ Please provide a resource name. Example: node ./scripts/create-resource.js user");
  process.exit(1);
}

const pascalCase = resourceName[0].toUpperCase() + resourceName.slice(1);
const className = `${pascalCase}Resource`;
const fileName = `${className}.ts`;
const resourceDir = path.join(__dirname, "..", "src", "resources");
const filePath = path.join(resourceDir, fileName);
const indexPath = path.join(resourceDir, "index.ts");


const template = `import { Resource } from "@/lib/Resource";

export class ${className} extends Resource {
  name = "${resourceName}";
  label = "${pascalCase}";

  getTableColumns() {
    return [
      { key: "name", label: "Name" },
      { key: "description", label: "Description" },
      { key: "status", label: "Status" },
      { key: "actions", label: "Actions" },
    ];
  }

  getFormFields() {
    return [
      { name: "name", label: "Name", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "status", label: "Status", type: "select", options: ["active", "inactive"] },
    ];
  }

  getImportSchema() {
    return [
      { name: "name", label: "Name" },
      { name: "description", label: "Description" },
      { name: "status", label: "Status" },
    ];
  }

  getApiRoutes() {
    return {
      list: "/api/${resourceName}",
      create: "/api/${resourceName}",
      update: "/api/${resourceName}/:id",
      delete: "/api/${resourceName}/:id",
      import: "/api/${resourceName}/import",
    };
  }

  override getRowActions(row: any) {
    return [
      { label: "Edit", onClick: () => this.editRow(row) },
      { label: "Delete", onClick: () => this.deleteRow(row) },
    ];
  }
}

`;

if (fs.existsSync(filePath)) {
  console.log(`⚠️ ${fileName} already exists.`);
  process.exit(1);
}

fs.writeFileSync(filePath, template);
console.log(`✅ Created ${fileName}`);


let indexContent = fs.readFileSync(indexPath, "utf8");

const importLine = `import { ${className} } from "./${className}";`;
if (!indexContent.includes(importLine)) {
  indexContent = `${importLine}\n` + indexContent;
}

if (!indexContent.includes("export const registeredResources")) {
  indexContent += `\nexport const registeredResources = {\n  ${resourceName}: new ${className}()\n};`;
} else {
  indexContent = indexContent.replace(
    /export const registeredResources\s*=\s*{([\s\S]*?)}/,
    (match, group) => `export const registeredResources = {\n  ${resourceName}: new ${className}(),\n${group}}`
  );
}

fs.writeFileSync(indexPath, indexContent);
console.log("✅ Injected into index.ts");
