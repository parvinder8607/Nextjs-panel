import { NextRequest, NextResponse } from 'next/server';
export declare function GET(): Promise<NextResponse<{
    name: string;
    email: string;
    password: string;
    id: number;
}[]>>;
export declare function POST(req: NextRequest): Promise<NextResponse<{
    name: string;
    email: string;
    password: string;
    id: number;
}>>;
