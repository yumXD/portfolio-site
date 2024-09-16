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
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";
import {useState} from "react";

interface Activity {
    id: number;
    description: string;
}

interface Achievement {
    id: number;
    description: string;
}

interface EducationData {
    id: number;
    institution: string;
    program: string;
    period: string;
    courseType: string;
    activities: Activity[];
    achievements: Achievement[];
}

interface EducationProps {
    educationData: EducationData[];
}

export default function Education({educationData}: EducationProps) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedEducation, setSelectedEducation] = useState<EducationData | null>(null);
    const [deletedActivities, setDeletedActivities] = useState<number[]>([]);  // 삭제된 활동 추적
    const [deletedAchievements, setDeletedAchievements] = useState<number[]>([]);  // 삭제된 성과 추적

    const emptyEducation = {
        id: -Date.now(), // 임시로 음수 ID 생성
        institution: '',
        program: '',
        period: '',
        courseType: '',
        activities: [],
        achievements: []
    };

    const [educationList, setEducationList] = useState(educationData);

    // 새로운 교육을 추가할 때 상태 초기화 및 모달 열기
    const handleNewEducation = () => {
        setSelectedEducation(emptyEducation);
        onOpen();
    };

    // 입력값 변경 처리
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        if (!selectedEducation) return;
        setSelectedEducation({...selectedEducation, [field]: e.target.value});
    };

    // 교육 저장 (POST 또는 PATCH)
    const handleSave = async () => {
        if (!selectedEducation) return;

        const method = selectedEducation.id < 0 ? 'POST' : 'PATCH';

        const response = await fetch(`/api/education`, {
            method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ...selectedEducation,
                deletedActivities, // 삭제된 활동 전송
                deletedAchievements, // 삭제된 성과 전송
                activities: selectedEducation.activities.map((activity) => ({
                    id: activity.id,
                    description: activity.description
                })),
                achievements: selectedEducation.achievements.map((achievement) => ({
                    id: achievement.id,
                    description: achievement.description
                })),
            }),
        });

        if (response.ok) {
            const updatedEducation = await response.json();
            // 새 교육이 추가된 경우 (POST), 기존 교육 리스트에 새 교육 추가
            if (method === 'POST') {
                setEducationList([...educationList, updatedEducation]);
            } else {
                // 수정된 교육 업데이트
                setEducationList(
                    educationList.map((edu) =>
                        edu.id === selectedEducation.id ? updatedEducation : edu
                    )
                );
            }
            setDeletedActivities([]); // 삭제 항목 초기화
            setDeletedAchievements([]); // 삭제 항목 초기화
            onClose();

            // 페이지 새로고침
            window.location.reload();  // 페이지를 강제로 새로고침
        } else {
            console.error('Error saving education data');
        }
    };

    // 교육 삭제
    const handleDelete = async (id: number) => {
        const response = await fetch(`/api/education`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id}),
        });

        if (response.ok) {
            setEducationList(educationList.filter((edu) => edu.id !== id));
            onClose();

            // 페이지 새로고침
            window.location.reload();  // 페이지를 강제로 새로고침
        } else {
            console.error('Error deleting education');
        }
    };

    // 활동/성과 추가
    const addActivityOrAchievement = (type: 'activity' | 'achievement') => {
        if (!selectedEducation) return;
        const newItem = {id: -Date.now(), description: ''};

        if (type === 'activity') {
            setSelectedEducation({
                ...selectedEducation,
                activities: [...selectedEducation.activities, newItem],
            });
        } else {
            setSelectedEducation({
                ...selectedEducation,
                achievements: [...selectedEducation.achievements, newItem],
            });
        }
    };

    // 활동/성과 삭제
    const handleDeleteItem = (type: 'activity' | 'achievement', id: number) => {
        if (!selectedEducation) return;
        if (type === 'activity') {
            setSelectedEducation({
                ...selectedEducation,
                activities: selectedEducation.activities.filter((activity) => activity.id !== id),
            });
            setDeletedActivities([...deletedActivities, id]);  // 삭제된 활동 추적
        } else {
            setSelectedEducation({
                ...selectedEducation,
                achievements: selectedEducation.achievements.filter((achievement) => achievement.id !== id),
            });
            setDeletedAchievements([...deletedAchievements, id]);  // 삭제된 성과 추적
        }
    };

    // 활동/성과 수정
    const handleItemChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        type: 'activity' | 'achievement',
        id: number
    ) => {
        if (!selectedEducation) return;
        const updatedItems =
            type === 'activity'
                ? selectedEducation.activities.map((activity) =>
                    activity.id === id
                        ? {...activity, description: e.target.value}
                        : activity
                )
                : selectedEducation.achievements.map((achievement) =>
                    achievement.id === id
                        ? {...achievement, description: e.target.value}
                        : achievement
                );

        setSelectedEducation({
            ...selectedEducation,
            [type === 'activity' ? 'activities' : 'achievements']: updatedItems,
        });
    };

    return (
        <Box mt={6} p={6} borderWidth="2px" borderRadius="lg" borderColor="gray.200" maxWidth="1024px" width="100%"
             mx="auto" minWidth="300px">
            <Heading as="h2" size="lg" mb={2}>
                교육 이력
            </Heading>
            <Button onClick={handleNewEducation} colorScheme="green" mb={4}>
                새로운 교육 추가
            </Button>
            <Divider orientation="horizontal" borderColor="gray.300" borderWidth="1px"/>
            <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(3, 1fr)"}} gap={6} mt={4}>
                {educationList.map((education) => (
                    <GridItem
                        key={education.id}
                        borderWidth="1px"
                        borderRadius="md"
                        p={4}
                        borderColor="gray.300"
                        cursor="pointer"
                        onClick={() => {
                            setSelectedEducation(education);
                            onOpen();
                        }}
                        _hover={{backgroundColor: "gray.100"}}
                    >
                        <Text fontWeight="bold" fontSize="lg">{education.program}</Text>
                        <HStack>
                            <Text mt={2}>{education.institution}</Text>
                            <Badge mt={2} colorScheme="purple">{education.courseType}</Badge>
                        </HStack>
                        <Text fontSize="sm" color="gray.500">
                            {education.period}
                        </Text>
                    </GridItem>
                ))}
            </Grid>

            {selectedEducation && (
                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay/>
                    <ModalContent maxWidth={{base: "90vw", md: "800px"}} maxHeight={{base: "90vh", md: "80vh"}}
                                  overflowY="auto">
                        <ModalHeader>{selectedEducation.id < 0 ? "새 교육 추가" : selectedEducation.program}</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Input
                                placeholder="Institution"
                                value={selectedEducation.institution}
                                onChange={(e) => handleChange(e, 'institution')}
                            />
                            <Input
                                placeholder="Program"
                                value={selectedEducation.program}
                                onChange={(e) => handleChange(e, 'program')}
                            />
                            <Input
                                placeholder="Period"
                                value={selectedEducation.period}
                                onChange={(e) => handleChange(e, 'period')}
                            />
                            <Input
                                placeholder="Course Type"
                                value={selectedEducation.courseType}
                                onChange={(e) => handleChange(e, 'courseType')}
                            />
                            <Divider my={4}/>

                            {/* 활동 */}
                            <Button onClick={() => addActivityOrAchievement('activity')} colorScheme="blue" mb={2}>
                                활동 추가
                            </Button>
                            {selectedEducation.activities.map((activity) => (
                                <HStack key={activity.id} spacing={2}>
                                    <Textarea
                                        value={activity.description}
                                        onChange={(e) => handleItemChange(e, 'activity', activity.id)}
                                    />
                                    <Button
                                        colorScheme="red"
                                        onClick={() => handleDeleteItem('activity', activity.id)}
                                    >
                                        삭제
                                    </Button>
                                </HStack>
                            ))}

                            {/* 성과 */}
                            <Button onClick={() => addActivityOrAchievement('achievement')} colorScheme="blue" mb={2}>
                                성과 추가
                            </Button>
                            {selectedEducation.achievements.map((achievement) => (
                                <HStack key={achievement.id} spacing={2}>
                                    <Textarea
                                        value={achievement.description}
                                        onChange={(e) => handleItemChange(e, 'achievement', achievement.id)}
                                    />
                                    <Button
                                        colorScheme="red"
                                        onClick={() => handleDeleteItem('achievement', achievement.id)}
                                    >
                                        삭제
                                    </Button>
                                </HStack>
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleSave}>
                                저장
                            </Button>
                            {selectedEducation.id > 0 && (
                                <Button colorScheme="red" mr={3} onClick={() => handleDelete(selectedEducation.id)}>
                                    삭제
                                </Button>
                            )}
                            <Button onClick={onClose}>닫기</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
}
