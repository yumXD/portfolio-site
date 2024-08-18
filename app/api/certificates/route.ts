import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const certificates = await prisma.certificate.findMany({
        orderBy: {
            dateIssued: 'desc',
        },
    });

    return NextResponse.json(certificates);
}
