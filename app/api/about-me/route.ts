import {NextResponse} from 'next/server';
import prisma from "@/lib/prisma"; // Prisma 클라이언트 가져오기

export async function GET() {
    try {
        const experiences = await prisma.experience.findMany();
        const habits = await prisma.habit.findMany();
        const goals = await prisma.goal.findMany();

        return NextResponse.json({experiences, habits, goals});
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({experiences: [], habits: [], goals: []}, {status: 500});
    }
}

// PATCH 메서드를 처리하여 수정된 데이터만 업데이트
export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const {id, type, content, impact, learning} = body;

        if (!id || !type) {
            return NextResponse.json({error: 'ID와 타입이 필요합니다.'}, {status: 400});
        }

        // 타입에 따라 테이블 선택
        let updatedItem;
        if (type === 'experience') {
            updatedItem = await prisma.experience.update({
                where: {id: Number(id)},
                data: {content, impact, learning},
            });
        } else if (type === 'habit') {
            updatedItem = await prisma.habit.update({
                where: {id: Number(id)},
                data: {content, impact, learning},
            });
        } else if (type === 'goal') {
            updatedItem = await prisma.goal.update({
                where: {id: Number(id)},
                data: {content, impact, learning},
            });
        } else {
            return NextResponse.json({error: '유효하지 않은 타입입니다.'}, {status: 400});
        }

        return NextResponse.json(updatedItem, {status: 200});
    } catch (error) {
        console.error("Error updating data:", error);
        return NextResponse.json({error: '수정 중 오류가 발생했습니다.'}, {status: 500});
    }
}