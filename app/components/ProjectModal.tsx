"use client";

import {
    Badge,
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    Image,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import {FaGithub} from "react-icons/fa";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
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
            posterUrl?: string;
            videoUrl?: string;
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
    };
}

const ProjectModal = ({isOpen, onClose, project}: ProjectModalProps) => {
    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="xl"
               isCentered>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    <Flex align="center" width="100%">
                        <Flex align="center">
                            <Image
                                boxSize="30px"
                                objectFit="cover"
                                src={project.iconUrl}
                                alt={`${project.name} 아이콘`}
                                mr={1}
                            />
                            {project.name}
                        </Flex>
                        <Link href={project.projectModel?.githubUrl} isExternal display="flex" alignItems="center"
                              color="teal.700" fontWeight="semibold" ml={3}>
                            <Icon as={FaGithub} w={5} h={5} mr={2}/>
                            <Text fontSize={16}>Visit my GitHub</Text>
                        </Link>
                    </Flex>
                </ModalHeader>

                <ModalCloseButton/>
                <ModalBody>
                    <VStack align="start" spacing={4}>
                        <Box>
                            <Text fontWeight="bold" color="teal.500" mb={2}>담당 역할</Text>
                            <VStack align="start" spacing={2}>
                                <HStack>
                                    <Text>{project.roleName}</Text>
                                    <Badge colorScheme={project.roleColor}>{project.roleBadge}</Badge>
                                </HStack>
                            </VStack>
                        </Box>
                        <Box width="100%">
                            <Text fontWeight="bold" color="teal.500" mb={2}>기술 스택</Text>
                            <Wrap spacing={2}>
                                {project.projectModel?.projectTechStacks.map((tech, index) => (
                                    <WrapItem key={index}>
                                        <Badge colorScheme={tech.color}>{tech.name}</Badge>
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </Box>
                        <Box width="100%">
                            <Text fontWeight="bold" color="teal.500">구현 혹은 개선한 것</Text>
                            {project.projectModel?.projectImprovements.map((improvement, index) => (
                                <Box key={index} width="100%">
                                    <Text mt={2} mb={2} fontWeight="bold"
                                          fontSize="calc(12px + (16 - 12) * ((100vw - 300px) / (1600 - 300)))">
                                        <Text as="span" bg="yellow" px={1} borderRadius="md" display="inline-block">
                                            {improvement.title}
                                        </Text>
                                    </Text>
                                    {improvement.descriptions.map((desc, idx) => (
                                        <HStack key={idx} align="start" width="100%">
                                            <Text as="strong" whiteSpace="nowrap" fontSize="md">
                                                {desc.label}:
                                            </Text>
                                            <Text fontSize="md">
                                                {desc.content}
                                            </Text>
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
                        </Box>
                        <Box width="100%">
                            <Text fontWeight="bold" color="teal.500" mb={2}>프로젝트 성과</Text>
                            <VStack align="start" spacing={2}>
                                {project.projectModel?.projectAchievements.map((achievement, index) => (
                                    <HStack key={index} align="start" width="100%">
                                        <Text as="strong" whiteSpace="nowrap"
                                              fontSize="calc(9px + (14 - 9) * ((100vw - 300px) / (1600 - 300)))">
                                            {achievement.label}:
                                        </Text>
                                        <Text fontSize="calc(9px + (14 - 9) * ((100vw - 300px) / (1600 - 300)))">
                                            {achievement.content}
                                        </Text>
                                    </HStack>
                                ))}
                            </VStack>
                        </Box>

                        {/* 아키텍처 */}
                        <Box width="100%">
                            <Text fontWeight="bold" color="teal.500" mb={2}>아키텍처</Text>
                            <Box width="100%" height="150px">
                                <Image
                                    src={project.projectModel?.architectureUrl}
                                    alt="아키텍처"
                                    borderRadius="lg"
                                    objectFit="contain"
                                    width="100%"
                                    height="100%"
                                />
                            </Box>
                        </Box>

                        {/* 팀원 정보 */}
                        <Box width="100%">
                            <HStack width="100%" mb={2}>
                                <Text fontWeight="bold" color="teal.500">팀원</Text>
                                <Text fontWeight="bold">- {project.teamSize}명</Text>
                            </HStack>
                            <Table variant="simple" size="sm">
                                <Thead>
                                    <Tr>
                                        <Th>담당</Th>
                                        <Th>이름</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {project.projectModel?.projectTeamMembers.map((member, index) => (
                                        <Tr key={index}>
                                            <Td>{member.role}</Td>
                                            <Td>{member.name}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>

                        {/* 포스터 (조건부 렌더링) */}
                        {project.projectModel?.posterUrl && (
                            <Box width="100%">
                                <Text fontWeight="bold" color="teal.500" mb={2}>포스터</Text>
                                <Box width="100%" height="150px">
                                    <Image
                                        src={project.projectModel.posterUrl}
                                        alt="포스터"
                                        borderRadius="lg"
                                        objectFit="contain"
                                        width="100%"
                                        height="100%"
                                    />
                                </Box>
                            </Box>
                        )}

                        {/* 동영상 (조건부 렌더링) */}
                        {project.projectModel?.videoUrl && (
                            <Box width="100%">
                                <Text fontWeight="bold" color="teal.500" mb={2}>동영상</Text>
                                <Box as="video" width="100%" controls>
                                    <source
                                        src={project.projectModel.videoUrl}
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </Box>
                            </Box>
                        )}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        닫기
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ProjectModal;
