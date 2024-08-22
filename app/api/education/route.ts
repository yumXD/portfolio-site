import {NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const educationData = await prisma.education.findMany({
            include: {
                activities: true,
                achievements: true,
            },
        });

        return NextResponse.json(educationData);
    } catch (error) {
        console.error('Error fetching education data:', error);
        return NextResponse.json({error: 'Failed to fetch education data'}, {status: 500});
    }
}
