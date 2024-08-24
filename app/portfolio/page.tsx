import {Box, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import ProjectPanel from "../components/ProjectPanel";
import WithBasicInfoLayout from "@/app/layouts/WithBasicInfoLayout";
import {Metadata} from "next";
import React from 'react';

export const metadata: Metadata = {
    title: "포트폴리오",
    description: "포트폴리오 사이트입니다."
};

interface Project {
    id: number;
    name: string;
    description: string;
    roleBadge: string;
    roleName: string;
    roleColor: string;
    teamSize: number;
    iconUrl: string;
    projectPanelFeatures: { name: string }[];
    projectPanelImages: { url: string; caption: string }[];
    projectModel: {
        posterUrl?: string;  // 선택적 필드로 반영
        videoUrl?: string;   // 선택적 필드로 반영
        architectureUrl: string;
        githubUrl: string;
        projectTechStacks: { name: string; color: string }[];
        projectImprovements: {
            title: string;
            descriptions: { label: string; content: string }[];
            images: { url: string; caption: string }[];
        }[];
        projectTeamMembers: { role: string; name: string }[];
        projectAchievements: { label: string; content: string }[];
    } | null;
}

async function fetchProjects(): Promise<Project[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`, {
        cache: 'no-store', // SSR에서 항상 최신 데이터를 가져오기 위해 사용
    });

    if (!res.ok) {
        throw new Error('Failed to fetch projects');
    }

    return res.json();
}

const Portfolio = async () => {
    const projects = await fetchProjects();

    return (
        <WithBasicInfoLayout>
            <Box
                mt={6}
                p={2}
                borderWidth="2px"
                borderRadius="lg"
                borderColor="gray.200"
                maxWidth="1024px"
                width="100%"
                mx="auto"
                minWidth="300px"
            >
                <Tabs>
                    <TabList>
                        {projects.map((project, index) => (
                            <Tab key={index}>{project.name}</Tab>
                        ))}
                    </TabList>

                    <TabPanels>
                        {projects.map((project) => (
                            <TabPanel key={project.id}>
                                <ProjectPanel project={project}/>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </Box>
        </WithBasicInfoLayout>
    );
}

export default Portfolio;
