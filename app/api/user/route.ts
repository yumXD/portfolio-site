import {NextResponse} from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
    const user = await prisma.user.findFirst();

    if (!user) {
        return NextResponse.json({error: 'No user found'}, {status: 404});
    }

    return NextResponse.json(user);
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, ...updatedFields } = body;

        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // 업데이트할 데이터가 없으면 오류 반환
        if (Object.keys(updatedFields).length === 0) {
            return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
        }

        // 사용자 데이터 업데이트
        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: updatedFields, // 전달된 필드만 업데이트
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}