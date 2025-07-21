#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { getDMMF } = require("@prisma/sdk");

const resourceName = process.argv[2];
if (!resourceName) {
  console.error("❌ Please provide a resource name. Example: node ./scripts/create-resource.js user");
  process.exit(1);
}

const pascalCase = resourceName[0].toUpperCase() + resourceName.slice(1);
const className = `${pascalCase}Resource`;
const fileName = `${className}.tsx`;
const resourceDir = path.join(__dirname, "..", "src", "resources");
const filePath = path.join(resourceDir, fileName);
const indexPath = path.join(resourceDir, "index.ts");
const schemaPath = path.join(__dirname, "..", "prisma", "schema.prisma");

if (!fs.existsSync(schemaPath)) {
  console.error("❌ schema.prisma not found. Expected at prisma/schema.prisma");
  process.exit(1);
}

const schema = fs.readFileSync(schemaPath, "utf8");

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function getInputType(type) {
  if (["Int", "Float", "Decimal"].includes(type)) return "number";
  if (type === "Boolean") return "checkbox";
  if (type === "DateTime") return "date";
  return "text";
}

async function main() {
  const dmmf = await getDMMF({ datamodel: schema });
  const model = dmmf.datamodel.models.find((m) => m.name.toLowerCase() === resourceName.toLowerCase());

  if (!model) {
    console.error(`❌ Model "${resourceName}" not found in schema.prisma`);
    process.exit(1);
  }

  const fields = model.fields.filter((f) => f.name !== "id");

  // Generate table columns
  const tableColumns = fields
    .map((f) => `      { key: "${f.name}", label: "${capitalize(f.name)}" }`)
    .concat('      { key: "actions", label: "Actions" }')
    .join(",\n");

  // Generate form fields
  const formFields = fields
    .map((f) => `      { name: "${f.name}", label: "${capitalize(f.name)}", type: "${getInputType(f.type)}" }`)
    .join(",\n");

  // Generate import schema
  const importSchema = fields
    .map((f) => `      { name: "${f.name}", label: "${capitalize(f.name)}" }`)
    .join(",\n");

  // Template for the resource file
  const resourceTemplate = `import { Resource } from "@/lib/Resource";

export class ${className} extends Resource {
  name = "${resourceName}";
  label = "${pascalCase}";

  getTableColumns() {
    return [
${tableColumns}
    ];
  }

  getFormFields() {
    return [
${formFields}
    ];
  }

  getImportSchema() {
    return [
${importSchema}
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

}
`;

  // Write resource file
  if (fs.existsSync(filePath)) {
    console.log(`⚠️ ${fileName} already exists.`);
  } else {
    fs.writeFileSync(filePath, resourceTemplate);
    console.log(`✅ Created ${fileName}`);
  }

  // Update index.ts
  let indexContent = fs.readFileSync(indexPath, "utf8");

  const importLine = `import { ${className} } from "./${className}";`;
  if (!indexContent.includes(importLine)) {
    indexContent = `${importLine}\n${indexContent}`;
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

  // --- Generate API route file ---
  const apiDir = path.join(__dirname, "..", "src", "app", "api", resourceName);
  const apiFile = path.join(apiDir, "route.ts");

  const createFields = fields
    .map((f) => `      ${f.name}: data.${f.name},`)
    .join("\n");

  const apiTemplate = `import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  const ${resourceName}s = await prisma.${resourceName.toLowerCase()}.findMany();
  return NextResponse.json(${resourceName}s);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const ${resourceName} = await prisma.${resourceName.toLowerCase()}.create({
    data: {
${createFields}
    },
  });
  return NextResponse.json(${resourceName}, { status: 201 });
}
`;

  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
  }

  if (fs.existsSync(apiFile)) {
    console.log("⚠️ API route already exists.");
  } else {
    fs.writeFileSync(apiFile, apiTemplate);
    console.log("✅ Created API route at " + path.relative(process.cwd(), apiFile));
  }
}

main();
