import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
  return NextResponse.json(user, { status: 201 });
}
