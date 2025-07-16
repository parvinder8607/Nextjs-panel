import { NextRequest, NextResponse } from 'next/server';
import { contacts } from '@/lib/db';

export async function GET() {
  return NextResponse.json(contacts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newUser = {
    id: contacts.length + 1,
    ...body
  };
  contacts.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}
