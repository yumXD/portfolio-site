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
