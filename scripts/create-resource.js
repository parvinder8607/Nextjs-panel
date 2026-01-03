const fs = require("fs");
const path = require("path");
const { getDMMF } = require("@prisma/sdk");

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function getInputType(type) {
  if (["Int", "Float", "Decimal"].includes(type)) return "number";
  if (type === "Boolean") return "checkbox";
  if (type === "DateTime") return "date";
  return "text";
}

module.exports = async function createResource(resourceName) {
  if (!resourceName) {
    console.error("❌ Please provide a resource name. Example: npx nextjs-panel make:resource user");
    process.exit(1);
  }

  const projectRoot = process.cwd(); // User's project directory
  const pascalCase = capitalize(resourceName);
  const className = `${pascalCase}Resource`;
  const fileName = `${className}.tsx`;

  const resourceDir = path.join(projectRoot, "src", "resources");
  const filePath = path.join(resourceDir, fileName);
  const indexPath = path.join(resourceDir, "index.ts");
  const schemaPath = path.join(projectRoot, "prisma", "schema.prisma");

  if (!fs.existsSync(schemaPath)) {
    console.error("❌ schema.prisma not found. Expected at prisma/schema.prisma");
    process.exit(1);
  }

  const schema = fs.readFileSync(schemaPath, "utf8");
  const dmmf = await getDMMF({ datamodel: schema });

  const model = dmmf.datamodel.models.find((m) => m.name.toLowerCase() === resourceName.toLowerCase());
  if (!model) {
    console.error(`❌ Model "${resourceName}" not found in schema.prisma`);
    process.exit(1);
  }

  const fields = model.fields.filter((f) => f.name !== "id");

  const tableColumns = fields
    .map((f) => `      { key: "${f.name}", label: "${capitalize(f.name)}" }`)
    .join(",\n");

  const formFields = fields
    .map((f) => `      { name: "${f.name}", label: "${capitalize(f.name)}", type: "${getInputType(f.type)}" }`)
    .join(",\n");

  

  const resourceTemplate = `import { Resource } from "nextjs-panel";

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

 

  getApiRoutes() {
    return {
      list: "/api/${resourceName}",
      create: "/api/${resourceName}",
      update: "/api/${resourceName}/:id",
      delete: "/api/${resourceName}/:id",
    };
  }
}
`;

  if (!fs.existsSync(resourceDir)) fs.mkdirSync(resourceDir, { recursive: true });

  if (fs.existsSync(filePath)) {
    console.log(`⚠️ ${fileName} already exists.`);
  } else {
    fs.writeFileSync(filePath, resourceTemplate);
    console.log(`✅ Created ${fileName}`);
  }

  let indexContent = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, "utf8") : "";

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

  // API route generation
  const apiDir = path.join(projectRoot, "src", "app", "api", resourceName);
  const apiFile = path.join(apiDir, "route.ts");

  const createFields = fields.map((f) => `      ${f.name}: data.${f.name},`).join("\n");

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

  if (!fs.existsSync(apiDir)) fs.mkdirSync(apiDir, { recursive: true });

  if (fs.existsSync(apiFile)) {
    console.log("⚠️ API route already exists.");
  } else {
    fs.writeFileSync(apiFile, apiTemplate);
    console.log("✅ Created API route at " + path.relative(process.cwd(), apiFile));
  }
};
