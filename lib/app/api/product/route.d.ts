import { NextRequest, NextResponse } from 'next/server';
export declare function GET(): Promise<NextResponse<{
    name: string;
    id: number;
    description: string;
    price: number;
}[]>>;
export declare function POST(req: NextRequest): Promise<NextResponse<{
    name: string;
    id: number;
    description: string;
    price: number;
}>>;
