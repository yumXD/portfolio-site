"use client";

import {
    Badge,
    Box,
    Button,
    Divider,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import ProjectModal from "@/app/components/ProjectModal";

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

interface ProjectPanelProps {
    project: Project;
}

export default function ProjectPanel({project}: ProjectPanelProps) {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <VStack align="start" spacing={2}>
            <HStack spacing={3}>
                <Image
                    boxSize="35px"
                    objectFit="cover"
                    src={project.iconUrl}
                    alt={`${project.name} 아이콘`}
                />
                <Heading fontSize={{base: "xl", md: "2xl"}}>{project.name}</Heading>
                <Button size="sm" onClick={onOpen} mt="1">
                    자세히 보기
                </Button>
            </HStack>
            <Divider orientation="horizontal" borderColor="gray.300" borderWidth="1px"/>
            <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}} gap={2} mt={2} width="100%">
                <GridItem>
                    <Box>
                        <Text fontWeight="bold" color="teal.500" mb={2}>
                            소개
                        </Text>
                        <Text>{project.description}</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <HStack>
                        <Box flex="1" textAlign="left">
                            <Text fontWeight="bold" color="teal.500" mb={2}>
                                담당 역할
                            </Text>
                            <HStack>
                                <Text>{project.roleName}</Text>
                                <Badge colorScheme={project.roleColor}>{project.roleBadge}</Badge>
                            </HStack>
                        </Box>
                        <Box flex="1" textAlign="left">
                            <Text fontWeight="bold" color="teal.500" mb={2}>
                                팀구성
                            </Text>
                            <VStack align="start" spacing={2}>
                                <Text>{project.teamSize}명</Text>
                            </VStack>
                        </Box>
                    </HStack>
                </GridItem>
                <GridItem>
                    <Box>
                        <Text fontWeight="bold" color="teal.500" mb={2}>주요 기능</Text>
                        <VStack align="start" spacing={2}>
                            {project.projectPanelFeatures.map((feature, index) => (
                                <HStack key={index} width="100%" align="start">
                                    <Text as="strong" whiteSpace="nowrap"
                                          fontSize="calc(12px + (16 - 12) * ((100vw - 300px) / (1600 - 300)))">
                                        {feature.name.split(':')[0]}:
                                    </Text>
                                    <Text fontSize="calc(12px + (16 - 12) * ((100vw - 300px) / (1600 - 300)))">
                                        {feature.name.split(':')[1]}
                                    </Text>
                                </HStack>
                            ))}
                        </VStack>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box>
                        <Text fontWeight="bold" color="teal.500" mb={2}>이미지</Text>
                        <VStack>
                            <HStack>
                                {project.projectPanelImages.map((image, index) => (
                                    <Box key={index} flex="1" textAlign="left">
                                        <Image
                                            src={image.url}
                                            alt={`${project.name} 이미지`}
                                            borderRadius="lg"
                                            objectFit="cover"
                                            width="100%"
                                            height="auto"
                                        />
                                        <Text mt={1} fontSize="12px" color="gray.500">{image.caption}</Text>
                                    </Box>
                                ))}
                            </HStack>
                        </VStack>
                    </Box>
                </GridItem>
            </Grid>
            {project.projectModel && (
                <ProjectModal isOpen={isOpen} onClose={onClose} project={project}/>
            )}
        </VStack>
    );
}
