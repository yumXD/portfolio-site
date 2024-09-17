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
    Input,
    Select,
    Text,
    Textarea,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import {useState} from "react";
import ProjectModal from "@/app/components/ProjectModal"; // ProjectModal 연결은 그대로 유지

interface Project {
    id: number;
    name: string;
    description: string;
    roleBadge: string;
    roleName: string;
    roleColor: string;
    teamSize: number;
    iconUrl: string;
    projectPanelFeatures: { id: number; name: string }[];
    projectPanelImages: { id: number; url: string; caption: string }[];
    projectModel: {
        posterUrl?: string;
        videoUrl?: string;
        architectureUrl: string;
        githubUrl: string;
        projectTechStacks: { id: number; name: string; color: string }[];
        projectImprovements: {
            id: number;
            title: string;
            descriptions: { id: number; label: string; content: string }[];
            images?: { id: number; url: string; caption: string }[];
        }[];
        projectTeamMembers: { id: number; role: string; name: string }[];
        projectAchievements: { id: number; label: string; content: string }[];
    } | null;
}

interface ProjectPanelProps {
    project: Project;
}

export default function ProjectPanel({project}: ProjectPanelProps) {
    const {isOpen, onOpen, onClose} = useDisclosure(); // 모달 제어 유지
    const [isEditing, setIsEditing] = useState(false);

    // 상태 관리 (수정할 때 사용)
    const [formData, setFormData] = useState({
        name: project.name,
        description: project.description,
        roleName: project.roleName,
        roleBadge: project.roleBadge,
        roleColor: project.roleColor,
        teamSize: project.teamSize,
        iconUrl: project.iconUrl,
        features: project.projectPanelFeatures.map((f) => f.name), // 주요 기능
        images: project.projectPanelImages.map((img) => ({url: img.url, caption: img.caption})), // 이미지
    });

    // 입력 필드 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // 주요 기능 필드 변경 핸들러
    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({...formData, features: newFeatures});
    };

    // 이미지 필드 변경 핸들러
    const handleImageChange = (index: number, field: string, value: string) => {
        const newImages = [...formData.images];
        newImages[index] = {...newImages[index], [field]: value};
        setFormData({...formData, images: newImages});
    };

    // 수정 모드 토글
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    // 수정 요청
    const handleSubmit = async () => {
        try {
            // PATCH 요청을 보낼 때 projectPanel에 맞는 형식으로 데이터를 준비
            const bodyData = {
                id: project.id,
                data: {
                    name: formData.name,
                    description: formData.description,
                    roleName: formData.roleName,
                    roleBadge: formData.roleBadge,
                    roleColor: formData.roleColor,
                    teamSize: formData.teamSize,
                    iconUrl: formData.iconUrl,
                    projectPanelFeatures: formData.features.map((feature, index) => ({
                        id: project.projectPanelFeatures[index].id, // feature의 ID를 함께 보냄
                        name: feature,
                    })),
                    projectPanelImages: formData.images.map((image, index) => ({
                        id: project.projectPanelImages[index].id, // 이미지의 ID를 함께 보냄
                        url: image.url,
                        caption: image.caption,
                    })),
                },
            };

            const res = await fetch(`/api/projects/panel`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            });

            if (res.ok) {
                alert("수정 완료");
                setIsEditing(false); // 수정 후 수정 모드 종료
            } else {
                alert("수정 실패");
            }
        } catch (error) {
            console.error("Failed to update project:", error);
        }
    };

    return (
        <VStack align="start" spacing={2}>
            <HStack spacing={3}>
                {/* 아이콘 이미지 미리보기 */}
                <Box>
                    <Image
                        width="60px"  // 너비와 높이를 명시적으로 설정
                        height="60px"
                        objectFit="contain"  // 이미지가 짤리지 않도록 설정
                        src={formData.iconUrl}
                        alt="아이콘 미리보기"
                    />
                </Box>

                {/* 아이콘 URL (이미지 주소) */}
                {isEditing ? (
                    <Box>
                        <Input
                            name="iconUrl"
                            value={formData.iconUrl}
                            onChange={handleChange}
                            placeholder="아이콘 URL 수정"
                            size="sm"
                            width="400px"  // 아이콘 URL 필드를 길게 설정
                        />
                    </Box>
                ) : null}

                {/* 프로젝트 이름 */}
                {isEditing ? (
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        size="sm"  // 프로젝트 이름 필드를 작게 설정
                        width="200px"
                        placeholder="프로젝트 이름 수정"
                    />
                ) : (
                    <Heading fontSize="lg">{formData.name}</Heading>  // 프로젝트 이름을 작게 설정
                )}

                {isEditing ? (
                    <Button size="sm" onClick={handleSubmit} mt="1" colorScheme="blue">
                        저장
                    </Button>
                ) : (
                    <Button size="sm" onClick={onOpen} mt="1"> {/* 모달 열기 */}
                        자세히 보기
                    </Button>
                )}

                <Button size="sm" onClick={toggleEdit} mt="1" colorScheme={isEditing ? "red" : "yellow"}>
                    {isEditing ? "취소" : "수정"}
                </Button>
            </HStack>

            <Divider orientation="horizontal" borderColor="gray.300" borderWidth="1px"/>

            <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}} gap={2} mt={2} width="100%">
                {/* 소개 */}
                <GridItem>
                    <Box>
                        <Text fontWeight="bold" color="teal.500" mb={2}>
                            소개
                        </Text>
                        {isEditing ? (
                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="프로젝트 설명 수정"
                            />
                        ) : (
                            <Text>{formData.description}</Text>
                        )}
                    </Box>
                </GridItem>

                {/* 담당 역할 및 팀 구성 */}
                <GridItem>
                    <HStack>
                        <Box flex="1" textAlign="left">
                            <Text fontWeight="bold" color="teal.500" mb={2}>
                                담당 역할
                            </Text>
                            {isEditing ? (
                                <>
                                    <Input
                                        name="roleName"
                                        value={formData.roleName}
                                        onChange={handleChange}
                                        placeholder="담당 역할 수정"
                                    />
                                    <Select
                                        name="roleColor"
                                        value={formData.roleColor}
                                        onChange={handleChange}
                                    >
                                        <option value="red">Red</option>
                                        <option value="green">Green</option>
                                        <option value="blue">Blue</option>
                                    </Select>
                                    <Input
                                        name="roleBadge"
                                        value={formData.roleBadge}
                                        onChange={handleChange}
                                        placeholder="뱃지 수정"
                                    />
                                </>
                            ) : (
                                <HStack>
                                    <Text>{formData.roleName}</Text>
                                    <Badge colorScheme={formData.roleColor}>{formData.roleBadge}</Badge>
                                </HStack>
                            )}
                        </Box>

                        <Box flex="1" textAlign="left">
                            <Text fontWeight="bold" color="teal.500" mb={2}>
                                팀구성
                            </Text>
                            {isEditing ? (
                                <Input
                                    name="teamSize"
                                    type="number"
                                    value={formData.teamSize}
                                    onChange={handleChange}
                                    placeholder="팀 인원 수정"
                                />
                            ) : (
                                <VStack align="start" spacing={2}>
                                    <Text>{formData.teamSize}명</Text>
                                </VStack>
                            )}
                        </Box>
                    </HStack>
                </GridItem>

                {/* 주요 기능 */}
                <GridItem>
                    <Box>
                        <Text fontWeight="bold" color="teal.500" mb={2}>
                            주요 기능
                        </Text>
                        <VStack align="start" spacing={2}>
                            {formData.features.map((feature, index) => (
                                <HStack key={index} width="100%" align="start">
                                    {isEditing ? (
                                        <Input
                                            value={feature}
                                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                                            placeholder="주요 기능 수정"
                                            size="sm"
                                        />
                                    ) : (
                                        <Text>{feature}</Text>
                                    )}
                                </HStack>
                            ))}
                        </VStack>
                    </Box>
                </GridItem>

                {/* 이미지 */}
                <GridItem>
                    <Box>
                        <Text fontWeight="bold" color="teal.500" mb={2}>
                            이미지
                        </Text>
                        <VStack align="start" spacing={4}>
                            {formData.images.map((image, index) => (
                                <HStack key={index} width="100%" align="start" spacing={4}>
                                    {/* 이미지 미리보기 */}
                                    <Box flex="1" textAlign="left">
                                        <Image
                                            src={image.url}
                                            alt={image.caption}
                                            borderRadius="lg"
                                            objectFit="cover"
                                            width="100%"
                                            height="auto"
                                        />
                                    </Box>

                                    {/* 이미지 URL 수정 */}
                                    {isEditing ? (
                                        <Box flex="1" textAlign="left">
                                            <Input
                                                value={image.url}
                                                onChange={(e) => handleImageChange(index, "url", e.target.value)}
                                                placeholder="이미지 URL 수정"
                                                size="sm"
                                            />
                                            <Input
                                                value={image.caption}
                                                onChange={(e) => handleImageChange(index, "caption", e.target.value)}
                                                placeholder="이미지 설명 수정"
                                                size="sm"
                                                mt={2}
                                            />
                                        </Box>
                                    ) : (
                                        <Text>{image.caption}</Text>
                                    )}
                                </HStack>
                            ))}
                        </VStack>
                    </Box>
                </GridItem>
            </Grid>

            {/* ProjectModal 연결은 그대로 유지 */}
            {project.projectModel && (
                <ProjectModal isOpen={isOpen} onClose={onClose} project={project}/>
            )}
        </VStack>
    );
}
