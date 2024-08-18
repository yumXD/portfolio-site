import {NextResponse} from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // 데이터베이스에서 기술 스택 데이터를 가져옴
        const techStacks = await prisma.techStack.findMany({
            include: {
                items: true, // 관련된 아이템들(기술들)도 함께 가져옴
            },
        });

        // JSON 응답으로 반환
        return NextResponse.json(techStacks);
    } catch (error) {
        console.error('Error fetching tech stacks:', error);
        return NextResponse.json({error: 'Failed to fetch tech stack data'}, {status: 500});
    }
}
