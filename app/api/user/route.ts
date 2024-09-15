import {NextResponse} from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
    const user = await prisma.user.findFirst();

    if (!user) {
        return NextResponse.json({error: 'No user found'}, {status: 404});
    }

    return NextResponse.json(user);
}