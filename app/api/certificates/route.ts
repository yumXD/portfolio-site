import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const certificates = await prisma.certificate.findMany({
        orderBy: {
            dateIssued: 'desc',
        },
    });

    return NextResponse.json(certificates);
}

// PATCH 메서드를 통해 자격증 데이터 수정
export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const {id, title, issuer, dateIssued} = body;

        if (!id || !title || !issuer || !dateIssued) {
            return NextResponse.json({error: 'All fields are required'}, {status: 400});
        }

        const updatedCertificate = await prisma.certificate.update({
            where: {id: Number(id)},
            data: {
                title,
                issuer,
                dateIssued: new Date(dateIssued), // 날짜 형식 변환
            },
        });

        return NextResponse.json(updatedCertificate, {status: 200});
    } catch (error) {
        console.error('Error updating certificate:', error);
        return NextResponse.json({error: 'Failed to update certificate'}, {status: 500});
    }
}

// POST 요청 - 새로운 자격증 추가
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {title, issuer, dateIssued} = body;

        if (!title || !issuer || !dateIssued) {
            return NextResponse.json({error: 'All fields are required'}, {status: 400});
        }

        const newCertificate = await prisma.certificate.create({
            data: {
                title,
                issuer,
                dateIssued: new Date(dateIssued),
            },
        });

        return NextResponse.json(newCertificate, {status: 201});
    } catch (error) {
        console.error('Error adding certificate:', error);
        return NextResponse.json({error: 'Failed to add certificate'}, {status: 500});
    }
}

// DELETE 요청 - 자격증 삭제
export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const {id} = body;

        if (!id) {
            return NextResponse.json({error: 'ID is required'}, {status: 400});
        }

        await prisma.certificate.delete({
            where: {id: Number(id)},
        });

        return NextResponse.json({message: 'Certificate deleted successfully'}, {status: 200});
    } catch (error) {
        console.error('Error deleting certificate:', error);
        return NextResponse.json({error: 'Failed to delete certificate'}, {status: 500});
    }
}