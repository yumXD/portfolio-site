import {Box, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import ProjectPanel from "../components/ProjectPanel";
import WithBasicInfoLayout from "@/app/layouts/WithBasicInfoLayout";
import {Metadata} from "next";
import React from 'react';

export const metadata: Metadata = {
    title: "포트폴리오",
    description: "포트폴리오 사이트입니다."
};

interface ProjectPanel {
    id: number;
    iconUrl: string;
    name: string;
    description: string;
    roleBadge: string;
    roleName: string;
    roleColor: string;
    teamSize: number;
    projectPanelFeatures: { name: string }[];
    projectPanelImages: { url: string; caption: string }[];
    createdAt: string;
    updatedAt: string;
}

async function fetchProjects(): Promise<ProjectPanel[]> {
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
