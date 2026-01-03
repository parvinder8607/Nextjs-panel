import { NextRequest, NextResponse } from 'next/server';
export declare function GET(): Promise<NextResponse<{
    id: number;
    name: string;
    description: string;
    price: number;
}[]>>;
export declare function POST(req: NextRequest): Promise<NextResponse<{
    id: number;
    name: string;
    description: string;
    price: number;
}>>;
