'use client';

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
    Wrap,
    WrapItem,
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
            images?: { url: string; caption: string }[];
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
            <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}} gap={2} mt={2} width="100%"
                  sx={{
                      '@media print': {
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: '4px',
                          padding: '4',
                      }
                  }}
            >
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

            {/* 모달은 화면에서만 보이도록 하고 인쇄 시 숨김 */}
            {project.projectModel && (
                <>
                    <ProjectModal isOpen={isOpen} onClose={onClose} project={project}/>

                    {/* 인쇄 시에만 패널 밑에 모달 내용을 렌더링 */}
                    <Box display="none" sx={{'@media print': {display: 'block'}}} mt={4} p={4}>
                        <Text fontWeight="bold" color="teal.500" mb={2}>기술 스택</Text>
                        <Wrap spacing={2} mb={4}>
                            {project.projectModel.projectTechStacks.map((tech, index) => (
                                <WrapItem key={index}>
                                    <Badge colorScheme={tech.color}>{tech.name}</Badge>
                                </WrapItem>
                            ))}
                        </Wrap>
                        <Text fontWeight="bold" color="teal.500" mb={2}>구현 혹은 개선한 것</Text>
                        {project.projectModel.projectImprovements.map((improvement, index) => (
                            <Box key={index} mb={4}>
                                <Text fontWeight="bold" bg="yellow" px={2} borderRadius="md" mb={2}>
                                    {improvement.title}
                                </Text>
                                {improvement.descriptions.map((desc, idx) => (
                                    <HStack key={idx} align="start" mb={2}>
                                        <Text as="strong" whiteSpace="nowrap">{desc.label}:</Text>
                                        <Text>{desc.content}</Text>
                                    </HStack>
                                ))}
                                {improvement.images && (
                                    <HStack spacing={4} mt={4}>
                                        {improvement.images.map((image, imgIndex) => (
                                            <Box key={imgIndex}
                                                 flex={improvement.images?.length === 1 ? "0.5" : "1"}
                                                 textAlign="left">
                                                <Image
                                                    src={image.url}
                                                    alt={image.caption}
                                                    borderRadius="lg"
                                                    objectFit="cover"
                                                    width="100%"
                                                    height="auto"
                                                />
                                                <Text mt={1} fontSize="12px" color="gray.500" textAlign="center">
                                                    {image.caption}
                                                </Text>
                                            </Box>
                                        ))}
                                    </HStack>
                                )}
                            </Box>
                        ))}
                        <Text fontWeight="bold" color="teal.500" mb={2}>프로젝트 성과</Text>
                        <VStack align="start" spacing={2} mb={4}>
                            {project.projectModel.projectAchievements.map((achievement, index) => (
                                <HStack key={index} align="start" width="100%">
                                    <Text as="strong" whiteSpace="nowrap">{achievement.label}:</Text>
                                    <Text>{achievement.content}</Text>
                                </HStack>
                            ))}
                        </VStack>
                        <Text fontWeight="bold" color="teal.500" mb={2}>아키텍처</Text>
                        <Box mb={4}>
                            <Image
                                src={project.projectModel.architectureUrl}
                                alt="아키텍처"
                                borderRadius="lg"
                                objectFit="contain"
                                width="100%"
                            />
                        </Box>
                    </Box>
                </>
            )}
        </VStack>
    );
}
