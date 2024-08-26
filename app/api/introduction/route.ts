import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const introductionData = await prisma.introduction.findMany({
            include: {
                sections: true,
            },
        });

        return NextResponse.json(introductionData);
    } catch (error) {
        console.error('Error fetching introduction data:', error);
        return NextResponse.json({ error: 'Failed to fetch introduction data' }, { status: 500 });
    }
}
