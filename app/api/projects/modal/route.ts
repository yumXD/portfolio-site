import {NextRequest, NextResponse} from 'next/server';
import prisma from "@/lib/prisma";

interface ProjectTechStack {
    id: number;
    name: string;
    color: string;
}

interface ProjectImprovementDescription {
    id: number;
    label: string;
    content: string;
}

interface ProjectImprovementImage {
    id: number;
    url: string;
    caption: string;
}

interface ProjectImprovement {
    id: number;
    title: string;
    descriptions: ProjectImprovementDescription[];
    images?: ProjectImprovementImage[];
}

interface ProjectTeamMember {
    id: number;
    role: string;
    name: string;
}

interface ProjectAchievement {
    id: number;
    label: string;
    content: string;
}

interface ProjectModelData {
    posterUrl?: string;
    videoUrl?: string;
    architectureUrl?: string;
    githubUrl?: string;
    projectTechStacks?: ProjectTechStack[];
    projectImprovements?: ProjectImprovement[];
    projectTeamMembers?: ProjectTeamMember[];
    projectAchievements?: ProjectAchievement[];
}

export async function PATCH(req: NextRequest) {
    try {
        const {id, data}: { id: number; data: ProjectModelData } = await req.json();

        // ProjectModel 수정만 처리
        const updatedProjectModel = await prisma.projectModel.update({
            where: {id},
            data: {
                posterUrl: data.posterUrl,
                videoUrl: data.videoUrl,
                architectureUrl: data.architectureUrl,
                githubUrl: data.githubUrl,
                projectTechStacks: {
                    update: data.projectTechStacks?.map((stack) => ({
                        where: {id: stack.id},
                        data: {name: stack.name, color: stack.color},
                    })),
                },
                projectImprovements: {
                    update: data.projectImprovements?.map((improvement) => ({
                        where: {id: improvement.id},
                        data: {
                            title: improvement.title,
                            descriptions: {
                                update: improvement.descriptions?.map((desc) => ({
                                    where: {id: desc.id},
                                    data: {label: desc.label, content: desc.content},
                                })),
                            },
                            images: improvement.images
                                ? {
                                    update: improvement.images.map((image) => ({
                                        where: {id: image.id},
                                        data: {url: image.url, caption: image.caption},
                                    })),
                                }
                                : undefined,
                        },
                    })),
                },
                projectTeamMembers: {
                    update: data.projectTeamMembers?.map((member) => ({
                        where: {id: member.id},
                        data: {role: member.role, name: member.name},
                    })),
                },
                projectAchievements: {
                    update: data.projectAchievements?.map((achievement) => ({
                        where: {id: achievement.id},
                        data: {label: achievement.label, content: achievement.content},
                    })),
                },
            },
        });

        return NextResponse.json(updatedProjectModel);
    } catch (error) {
        console.error("Failed to update project model:", error);
        return NextResponse.json({error: 'Failed to update project model'}, {status: 500});
    }
}
