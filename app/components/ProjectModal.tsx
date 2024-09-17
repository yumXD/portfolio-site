import {
    Badge,
    Box,
    Button,
    HStack,
    Icon,
    Image,
    Input,
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
    Textarea,
    Th,
    Thead,
    Tr,
    VStack,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import {FaGithub} from "react-icons/fa";
import {useState} from "react";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        id: number;
        name: string;
        roleName: string;
        roleBadge: string;
        roleColor: string;
        projectModel: {
            githubUrl?: string;
            architectureUrl?: string;
            posterUrl?: string;
            videoUrl?: string;
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
    };
}

const ProjectModal = ({isOpen, onClose, project}: ProjectModalProps) => {
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
    const [formData, setFormData] = useState({
        githubUrl: project.projectModel?.githubUrl || "",
        architectureUrl: project.projectModel?.architectureUrl || "",
        posterUrl: project.projectModel?.posterUrl || "",
        videoUrl: project.projectModel?.videoUrl || "",
        projectTechStacks: project.projectModel?.projectTechStacks.map((stack) => ({
            id: stack.id,
            name: stack.name,
            color: stack.color,
        })) || [],
        projectImprovements: project.projectModel?.projectImprovements.map((improvement) => ({
            ...improvement,
            images: improvement.images || [{id: 0, url: '', caption: ''}, {id: 1, url: '', caption: ''}] // 빈 이미지를 기본으로 2개 추가
        })) || [],
        projectAchievements: project.projectModel?.projectAchievements || [],
        projectTeamMembers: project.projectModel?.projectTeamMembers || [],
    });

    // 입력 필드 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 기술 스택 변경 핸들러
    const handleTechStackChange = (index: number, field: string, value: string) => {
        const updatedTechStacks = [...formData.projectTechStacks];
        updatedTechStacks[index] = {...updatedTechStacks[index], [field]: value};
        setFormData({...formData, projectTechStacks: updatedTechStacks});
    };

    // 이미지 필드 변경 핸들러
    const handleImageChange = (improvementIndex: number, imageIndex: number, field: string, value: string) => {
        const updatedImprovements = [...formData.projectImprovements];
        const updatedImages = [...updatedImprovements[improvementIndex].images];
        updatedImages[imageIndex] = {...updatedImages[imageIndex], [field]: value};
        updatedImprovements[improvementIndex].images = updatedImages;
        setFormData({...formData, projectImprovements: updatedImprovements});
    };

    // 저장 요청
    const handleSubmit = async () => {
        try {
            const res = await fetch(`/api/projects/modal`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id: project.id, data: formData}),
            });

            if (res.ok) {
                alert("수정 완료");
                setIsEditing(false); // 수정 모드 해제
                onClose(); // 수정 후 모달 닫기
            } else {
                alert("수정 실패");
            }
        } catch (error) {
            console.error("Failed to update project:", error);
        }
    };

    // 수정 취소 핸들러
    const handleCancel = () => {
        setIsEditing(false); // 수정 모드 해제
        setFormData({
            githubUrl: project.projectModel?.githubUrl || "",
            architectureUrl: project.projectModel?.architectureUrl || "",
            posterUrl: project.projectModel?.posterUrl || "",
            videoUrl: project.projectModel?.videoUrl || "",
            projectTechStacks: project.projectModel?.projectTechStacks.map((stack) => ({
                id: stack.id,
                name: stack.name,
                color: stack.color,
            })) || [],
            projectImprovements: project.projectModel?.projectImprovements.map((improvement) => ({
                ...improvement,
                images: improvement.images || [{id: 0, url: '', caption: ''}, {id: 1, url: '', caption: ''}] // 빈 이미지를 기본으로 2개 추가
            })) || [],
            projectAchievements: project.projectModel?.projectAchievements || [],
            projectTeamMembers: project.projectModel?.projectTeamMembers || [],
        });
    };

    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="xl"
               isCentered>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    <HStack>
                        {/* 프로젝트 이름은 수정 불가 */}
                        <Text fontSize="lg" fontWeight="bold">{project.name}</Text>
                        <Badge colorScheme={project.roleColor}>{project.roleBadge}</Badge>
                        <Link href={formData.githubUrl} isExternal>
                            <Icon as={FaGithub} w={5} h={5}/>
                        </Link>
                    </HStack>
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <VStack align="start" spacing={4}>
                        {/* 깃허브 링크 수정 */}
                        <Box>
                            <Text fontWeight="bold">깃허브 링크</Text>
                            {isEditing ? (
                                <Input
                                    name="githubUrl"
                                    value={formData.githubUrl}
                                    onChange={handleChange}
                                    placeholder="GitHub URL"
                                />
                            ) : (
                                <Link href={formData.githubUrl} isExternal>
                                    {formData.githubUrl}
                                </Link>
                            )}
                        </Box>

                        {/* 기술 스택 수정 */}
                        <Box>
                            <Text fontWeight="bold">기술 스택</Text>
                            <Wrap>
                                {formData.projectTechStacks.map((tech, index) => (
                                    <WrapItem key={tech.id}>
                                        {isEditing ? (
                                            <>
                                                <Input
                                                    value={tech.name}
                                                    onChange={(e) => handleTechStackChange(index, "name", e.target.value)}
                                                    placeholder="기술 스택 이름"
                                                    size="sm"
                                                />
                                                <Input
                                                    value={tech.color}
                                                    onChange={(e) => handleTechStackChange(index, "color", e.target.value)}
                                                    placeholder="기술 스택 색상"
                                                    size="sm"
                                                    mt={2}
                                                />
                                            </>
                                        ) : (
                                            <Badge colorScheme={tech.color}>{tech.name}</Badge>
                                        )}
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </Box>

                        {/* 구현 및 개선 사항 수정 */}
                        <Box width="100%">
                            <Text fontWeight="bold">구현 혹은 개선한 것</Text>
                            {formData.projectImprovements.map((improvement, index) => (
                                <Box key={improvement.id} mt={4}>
                                    {isEditing ? (
                                        <Input
                                            value={improvement.title}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    projectImprovements: formData.projectImprovements.map((imp, i) =>
                                                        i === index ? {...imp, title: e.target.value} : imp
                                                    ),
                                                })
                                            }
                                            placeholder="개선 내용 제목"
                                        />
                                    ) : (
                                        <Text>{improvement.title}</Text>
                                    )}
                                    {improvement.descriptions.map((desc, descIndex) => (
                                        <Box key={desc.id} mt={2}>
                                            {isEditing ? (
                                                <>
                                                    <Input
                                                        value={desc.label}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                projectImprovements: formData.projectImprovements.map((imp, i) =>
                                                                    i === index
                                                                        ? {
                                                                            ...imp,
                                                                            descriptions: imp.descriptions.map((d, di) =>
                                                                                di === descIndex ? {
                                                                                    ...d,
                                                                                    label: e.target.value
                                                                                } : d
                                                                            ),
                                                                        }
                                                                        : imp
                                                                ),
                                                            })
                                                        }
                                                        placeholder="설명 라벨"
                                                    />
                                                    <Textarea
                                                        value={desc.content}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                projectImprovements: formData.projectImprovements.map((imp, i) =>
                                                                    i === index
                                                                        ? {
                                                                            ...imp,
                                                                            descriptions: imp.descriptions.map((d, di) =>
                                                                                di === descIndex ? {
                                                                                    ...d,
                                                                                    content: e.target.value
                                                                                } : d
                                                                            ),
                                                                        }
                                                                        : imp
                                                                ),
                                                            })
                                                        }
                                                        placeholder="설명 내용"
                                                        mt={2}
                                                    />
                                                </>
                                            ) : (
                                                <Text>{desc.label}: {desc.content}</Text>
                                            )}
                                        </Box>
                                    ))}

                                    {/* 이미지 추가 */}
                                    <Box>
                                        <Text mt={2} fontWeight="bold">이미지</Text>
                                        <Wrap>
                                            {improvement.images?.map((image, imgIndex) => (
                                                <WrapItem key={imgIndex}>
                                                    {isEditing ? (
                                                        <>
                                                            {image.url && (
                                                                <Image src={image.url} alt={image.caption}
                                                                       boxSize="100px" mt={2}/>
                                                            )}
                                                            <Input
                                                                value={image.url}
                                                                onChange={(e) => handleImageChange(index, imgIndex, "url", e.target.value)}
                                                                placeholder="이미지 URL"
                                                                size="sm"
                                                                mt={2}
                                                            />
                                                            <Input
                                                                value={image.caption}
                                                                onChange={(e) => handleImageChange(index, imgIndex, "caption", e.target.value)}
                                                                placeholder="이미지 설명"
                                                                size="sm"
                                                                mt={2}
                                                            />
                                                        </>
                                                    ) : (
                                                        <Box>
                                                            <Image src={image.url} alt={image.caption} boxSize="100px"/>
                                                            <Text fontSize="sm">{image.caption}</Text>
                                                        </Box>
                                                    )}
                                                </WrapItem>
                                            ))}
                                        </Wrap>
                                    </Box>
                                </Box>
                            ))}
                        </Box>

                        {/* 프로젝트 성과 수정 */}
                        <Box width="100%">
                            <Text fontWeight="bold">프로젝트 성과</Text>
                            {formData.projectAchievements.map((achievement, index) => (
                                <Box key={achievement.id} mt={2}>
                                    {isEditing ? (
                                        <>
                                            <Input
                                                value={achievement.label}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        projectAchievements: formData.projectAchievements.map((ach, i) =>
                                                            i === index ? {...ach, label: e.target.value} : ach
                                                        ),
                                                    })
                                                }
                                                placeholder="성과 라벨"
                                            />
                                            <Textarea
                                                value={achievement.content}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        projectAchievements: formData.projectAchievements.map((ach, i) =>
                                                            i === index ? {...ach, content: e.target.value} : ach
                                                        ),
                                                    })
                                                }
                                                placeholder="성과 내용"
                                                mt={2}
                                            />
                                        </>
                                    ) : (
                                        <Text>{achievement.label}: {achievement.content}</Text>
                                    )}
                                </Box>
                            ))}
                        </Box>

                        {/* 아키텍처 이미지 수정 */}
                        <Box width="100%">
                            <Text fontWeight="bold">아키텍처 이미지</Text>
                            {isEditing ? (
                                <>
                                    {formData.architectureUrl && (
                                        <Image src={formData.architectureUrl} alt="아키텍처 미리보기" mt={2}/>
                                    )}
                                    <Input
                                        name="architectureUrl"
                                        value={formData.architectureUrl}
                                        onChange={handleChange}
                                        placeholder="아키텍처 이미지 URL"
                                        size="sm"
                                        mt={2}
                                    />
                                </>
                            ) : (
                                <Image src={formData.architectureUrl} alt="아키텍처 미리보기" mt={2}/>
                            )}
                        </Box>

                        {/* 포스터 이미지 수정 */}
                        <Box width="100%">
                            <Text fontWeight="bold">포스터 이미지</Text>
                            {isEditing ? (
                                <>
                                    {formData.posterUrl && (
                                        <Image src={formData.posterUrl} alt="포스터 미리보기" mt={2}/>
                                    )}
                                    <Input
                                        name="posterUrl"
                                        value={formData.posterUrl}
                                        onChange={handleChange}
                                        placeholder="포스터 이미지 URL"
                                        size="sm"
                                        mt={2}
                                    />
                                </>
                            ) : (
                                <Image src={formData.posterUrl} alt="포스터 미리보기" mt={2}/>
                            )}
                        </Box>

                        {/* 동영상 주소 수정 */}
                        <Box width="100%">
                            <Text fontWeight="bold">동영상 주소</Text>
                            {isEditing ? (
                                <Input
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={handleChange}
                                    placeholder="동영상 주소"
                                />
                            ) : (
                                <Box as="video" width="100%" controls mt={2}>
                                    <source src={formData.videoUrl} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </Box>
                            )}
                        </Box>

                        {/* 팀원 정보 수정 */}
                        <Box width="100%">
                            <Text fontWeight="bold">팀원 정보</Text>
                            <Table variant="simple" size="sm">
                                <Thead>
                                    <Tr>
                                        <Th>역할</Th>
                                        <Th>이름</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {formData.projectTeamMembers.map((member, index) => (
                                        <Tr key={member.id}>
                                            <Td>
                                                {isEditing ? (
                                                    <Input
                                                        value={member.role}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                projectTeamMembers: formData.projectTeamMembers.map((mem, i) =>
                                                                    i === index ? {...mem, role: e.target.value} : mem
                                                                ),
                                                            })
                                                        }
                                                        placeholder="역할"
                                                    />
                                                ) : (
                                                    <Text>{member.role}</Text>
                                                )}
                                            </Td>
                                            <Td>
                                                {isEditing ? (
                                                    <Input
                                                        value={member.name}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                projectTeamMembers: formData.projectTeamMembers.map((mem, i) =>
                                                                    i === index ? {...mem, name: e.target.value} : mem
                                                                ),
                                                            })
                                                        }
                                                        placeholder="이름"
                                                    />
                                                ) : (
                                                    <Text>{member.name}</Text>
                                                )}
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    {isEditing ? (
                        <>
                            <Button colorScheme="blue" onClick={handleSubmit}>
                                저장
                            </Button>
                            <Button ml={3} onClick={handleCancel}>
                                취소
                            </Button>
                        </>
                    ) : (
                        <Button colorScheme="yellow" onClick={() => setIsEditing(true)}>
                            수정
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ProjectModal;
