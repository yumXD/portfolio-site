import {NextRequest, NextResponse} from 'next/server';
import prisma from "@/lib/prisma";

interface ProjectPanelFeature {
    id: number;
    name: string;
}

interface ProjectPanelImage {
    id: number;
    url: string;
    caption: string;
}

interface ProjectPanelData {
    name?: string;
    description?: string;
    iconUrl?: string;
    roleBadge?: string;
    roleName?: string;
    roleColor?: string;
    teamSize?: number;
    projectPanelFeatures?: ProjectPanelFeature[];
    projectPanelImages?: ProjectPanelImage[];
}


export async function PATCH(req: NextRequest) {
    try {
        const {id, data}: { id: number; data: ProjectPanelData } = await req.json();

        // ProjectPanel 수정만 처리
        const updatedProjectPanel = await prisma.projectPanel.update({
            where: {id},
            data: {
                name: data.name,
                description: data.description,
                iconUrl: data.iconUrl,
                roleBadge: data.roleBadge,
                roleName: data.roleName,
                roleColor: data.roleColor,
                teamSize: data.teamSize,
                projectPanelFeatures: {
                    update: data.projectPanelFeatures?.map((feature) => ({
                        where: {id: feature.id},
                        data: {name: feature.name},
                    })),
                },
                projectPanelImages: {
                    update: data.projectPanelImages?.map((image) => ({
                        where: {id: image.id},
                        data: {url: image.url, caption: image.caption},
                    })),
                },
            },
        });

        return NextResponse.json(updatedProjectPanel);
    } catch (error) {
        console.error("Failed to update project panel:", error);
        return NextResponse.json({error: 'Failed to update project panel'}, {status: 500});
    }
}
