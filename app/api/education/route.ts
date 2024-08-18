import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const educationData = await prisma.education.findMany({
        include: {
            activities: true,
            achievements: true,
        },
    });

    return NextResponse.json(educationData);
}
