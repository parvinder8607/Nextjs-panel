import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/db';

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newUser = {
    id: products.length + 1,
    ...body
  };
  products.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}
