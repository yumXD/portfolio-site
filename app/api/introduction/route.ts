import {NextResponse} from 'next/server';
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
        return NextResponse.json({error: 'Failed to fetch introduction data'}, {status: 500});
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {title, sections} = body;

        // 새로운 introduction 추가
        const newIntroduction = await prisma.introduction.create({
            data: {
                title,
                sections: {
                    create: sections.map((section: any) => ({
                        content: section.content,
                    })),
                },
            },
        });

        return NextResponse.json(newIntroduction, {status: 201});
    } catch (error) {
        console.error('Error creating new introduction:', error);
        return NextResponse.json({error: 'Failed to create introduction'}, {status: 500});
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const {id, title, sections} = body;

        // 기존 introduction 업데이트
        const updatedIntroduction = await prisma.introduction.update({
            where: {id: Number(id)},
            data: {
                title,
                sections: {
                    deleteMany: {}, // 기존 섹션 모두 삭제
                    create: sections.map((section: any) => ({
                        content: section.content,
                    })),
                },
            },
        });

        return NextResponse.json(updatedIntroduction, {status: 200});
    } catch (error) {
        console.error('Error updating introduction:', error);
        return NextResponse.json({error: 'Failed to update introduction'}, {status: 500});
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const {id} = body;

        // introduction 삭제
        await prisma.introduction.delete({
            where: {id: Number(id)},
        });

        return NextResponse.json({message: 'Introduction deleted successfully'}, {status: 200});
    } catch (error) {
        console.error('Error deleting introduction:', error);
        return NextResponse.json({error: 'Failed to delete introduction'}, {status: 500});
    }
}