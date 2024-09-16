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

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {name, items} = body;

        const newTechStack = await prisma.techStack.create({
            data: {
                name,
                items: {
                    create: items.map((item: any) => ({
                        name: item.name,
                        icon: item.icon,
                        color: item.color,
                    })),
                },
            },
        });

        return NextResponse.json(newTechStack, {status: 201});
    } catch (error) {
        console.error('Error creating new tech stack:', error);
        return NextResponse.json({error: 'Failed to create tech stack'}, {status: 500});
    }
}


export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const {id, name, items} = body;

        // 기술 스택 업데이트
        const updatedTechStack = await prisma.techStack.update({
            where: {id: Number(id)},
            data: {
                name, // 스택 이름 업데이트
                items: {
                    deleteMany: {}, // 기존 아이템 모두 삭제
                    create: items.map((item: any) => ({
                        name: item.name,
                        icon: item.icon,
                        color: item.color,
                    })),
                },
            },
        });

        return NextResponse.json(updatedTechStack, {status: 200});
    } catch (error) {
        console.error('Error updating tech stack:', error);
        return NextResponse.json({error: 'Failed to update tech stack'}, {status: 500});
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const {id} = body;

        await prisma.techStack.delete({
            where: {id},
        });

        return NextResponse.json({message: 'Tech stack deleted successfully'}, {status: 200});
    } catch (error) {
        console.error('Error deleting tech stack:', error);
        return NextResponse.json({error: 'Failed to delete tech stack'}, {status: 500});
    }
}