import { NextRequest, NextResponse } from 'next/server';
export declare function GET(): Promise<NextResponse<{
    id: number;
    name: string;
    email: string;
    password: string;
}[]>>;
export declare function POST(req: NextRequest): Promise<NextResponse<{
    id: number;
    name: string;
    email: string;
    password: string;
}>>;
