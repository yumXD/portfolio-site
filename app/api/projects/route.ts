import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        // 전체 프로젝트 데이터 가져오기
        const projectPanel = await prisma.projectPanel.findMany({
            include: {
                projectPanelFeatures: true,
                projectPanelImages: true,
                projectModel: {
                    include: {
                        projectTechStacks: true,
                        projectImprovements: {
                            include: {
                                descriptions: true,
                                images: true,
                            },
                        },
                        projectTeamMembers: true,
                        projectAchievements: true,
                    },
                },
            },
        });

        return NextResponse.json(projectPanel);
    } catch (error) {
        console.error("Failed to fetch projects:", error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}
