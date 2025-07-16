import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
    },
  });
  return NextResponse.json(product, { status: 201 });
}
