import {NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

// GET 요청 - 교육 이력 조회
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

// POST 요청 - 새로운 교육 이력 추가
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {institution, program, period, courseType, activities, achievements} = body;

        // 기본 교육 정보 생성
        const newEducation = await prisma.education.create({
            data: {
                institution,
                program,
                period,
                courseType,
                // 활동 및 성과는 배열 형태로 받아 생성합니다.
                activities: {
                    create: activities?.map((activity: { description: string }) => ({
                        description: activity.description,
                    })),
                },
                achievements: {
                    create: achievements?.map((achievement: { description: string }) => ({
                        description: achievement.description,
                    })),
                },
            },
        });

        return NextResponse.json(newEducation, {status: 201});
    } catch (error) {
        console.error('Error adding education data:', error);
        return NextResponse.json({error: 'Failed to add education data'}, {status: 500});
    }
}


export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const {
            id,
            institution,
            program,
            period,
            courseType,
            activities,
            achievements,
            deletedActivities,
            deletedAchievements
        } = body;

        // 기존 교육 정보 업데이트
        const updatedEducation = await prisma.education.update({
            where: {id: Number(id)},
            data: {
                institution,
                program,
                period,
                courseType,
            },
        });

        // 삭제된 활동 처리
        if (deletedActivities.length > 0) {
            await prisma.activity.deleteMany({
                where: {id: {in: deletedActivities}},
            });
        }

        // 삭제된 성과 처리
        if (deletedAchievements.length > 0) {
            await prisma.achievement.deleteMany({
                where: {id: {in: deletedAchievements}},
            });
        }

        // 기존 활동 업데이트 및 새 활동 추가
        for (const activity of activities) {
            if (activity.id < 0) {
                await prisma.activity.create({
                    data: {
                        description: activity.description,
                        educationId: updatedEducation.id,
                    },
                });
            } else {
                await prisma.activity.update({
                    where: {id: activity.id},
                    data: {description: activity.description},
                });
            }
        }

        // 기존 성과 업데이트 및 새 성과 추가
        for (const achievement of achievements) {
            if (achievement.id < 0) {
                await prisma.achievement.create({
                    data: {
                        description: achievement.description,
                        educationId: updatedEducation.id,
                    },
                });
            } else {
                await prisma.achievement.update({
                    where: {id: achievement.id},
                    data: {description: achievement.description},
                });
            }
        }

        return NextResponse.json(updatedEducation, {status: 200});
    } catch (error) {
        console.error('Error updating education data:', error);
        return NextResponse.json({error: 'Failed to update education data'}, {status: 500});
    }
}

// DELETE 요청 - 교육 이력 삭제
export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const {id} = body;

        // 교육 데이터 삭제 (onDelete: Cascade로 자식 데이터도 함께 삭제됨)
        await prisma.education.delete({
            where: {id: Number(id)},  // educationId를 기준으로 삭제
        });

        return NextResponse.json({message: 'Education deleted successfully'}, {status: 200});
    } catch (error) {
        console.error('Error deleting education:', error);
        return NextResponse.json({error: 'Failed to delete education data'}, {status: 500});
    }
}