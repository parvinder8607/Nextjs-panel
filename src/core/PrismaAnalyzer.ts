import fs from 'fs';
import path from 'path';

export interface PrismaField {
  name: string;
  type: string;
  isId: boolean;
  isRequired: boolean;
}

export class PrismaAnalyzer {
  static getModelFields(modelName: string): PrismaField[] {
    const root = process.cwd();
    const schemaPath = path.join(root, 'prisma', 'schema.prisma');

    if (!fs.existsSync(schemaPath)) {
      throw new Error("❌ schema.prisma not found in /prisma folder.");
    }

    const content = fs.readFileSync(schemaPath, 'utf-8');
    
    // 1. Find the specific model block
    const modelRegex = new RegExp(`model ${modelName} \\{([\\s\\S]*?)\\}`, 'g');
    const match = modelRegex.exec(content);

    if (!match) {
      throw new Error(`❌ Model "${modelName}" not found in schema.prisma.`);
    }

    const modelBody = match[1];
    const fields: PrismaField[] = [];

    // 2. Parse lines inside the model
    const lines = modelBody.split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('@@')) return;

      const parts = trimmed.split(/\s+/);
      if (parts.length < 2) return;

      const name = parts[0];
      const typeRaw = parts[1];
      
      // Basic detection
      fields.push({
        name,
        type: typeRaw.replace('?', '').replace('[]', ''), // Clean type
        isId: trimmed.includes('@id'),
        isRequired: !typeRaw.includes('?'),
      });
    });

    return fields;
  }
}