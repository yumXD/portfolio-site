'use client';

import {
    Badge,
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Tooltip,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {useEffect, useState} from "react";

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

export default function Education() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedEducation, setSelectedEducation] = useState<EducationData | null>(null);

    const handleOpen = (education: EducationData) => {
        setSelectedEducation(education);
        onOpen();
    };

    const [educationData, setEducationData] = useState<EducationData[]>([]);

    useEffect(() => {
        // API 호출
        const fetchEducationData = async () => {
            const res = await fetch('/api/education');
            const data: EducationData[] = await res.json();
            setEducationData(data);
        };

        fetchEducationData();
    }, []);

    return (
        <Box
            mt={6}
            p={6}
            borderWidth="2px"
            borderRadius="lg"
            borderColor="gray.200"
            maxWidth="1024px"
            width="100%"
            mx="auto"
            minWidth="300px"
        >
            <Heading as="h2" size="lg" mb={2}>
                교육 이력
            </Heading>
            <Divider orientation="horizontal" borderColor="gray.300" borderWidth="1px"/>
            <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(3, 1fr)"}} gap={6} mt={4}>
                {educationData.map((education) => (
                    <Tooltip label="클릭해주세요!" fontSize="md" key={education.id}>
                        <GridItem
                            borderWidth="1px"
                            borderRadius="md"
                            p={4}
                            borderColor="gray.300"
                            cursor="pointer"
                            onClick={() => handleOpen(education)}
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
                    </Tooltip>
                ))}
            </Grid>

            {selectedEducation && (
                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay/>
                    <ModalContent
                        maxWidth={{base: "90vw", md: "800px"}}
                        maxHeight={{base: "90vh", md: "80vh"}}
                        overflowY="auto"
                    >
                        <ModalHeader>{selectedEducation.program}</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <HStack>
                                <Text mt={2}>{selectedEducation.institution}</Text>
                                <Badge mt={2} colorScheme="purple">{selectedEducation.courseType}</Badge>
                            </HStack>
                            <Text fontSize="sm" color="gray.500">
                                {selectedEducation.period}
                            </Text>
                            <Divider my={4}/>
                            <VStack spacing={6} align="stretch">
                                <Flex direction="column" p={4} gap={2} borderWidth="1px" borderRadius="md"
                                      borderColor="gray.300">
                                    <Text fontWeight="bold" fontSize="md">활동 내용</Text>
                                    {selectedEducation.activities.map((activity) => (
                                        <Text key={activity.id}>{activity.description}</Text>
                                    ))}
                                </Flex>

                                <Flex direction="column" p={4} gap={2} borderWidth="1px" borderRadius="md"
                                      borderColor="gray.300">
                                    <Text fontWeight="bold" fontSize="md">성과</Text>
                                    {selectedEducation.achievements.map((achievement) => (
                                        <Text key={achievement.id}>{achievement.description}</Text>
                                    ))}
                                </Flex>
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                닫기
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
}
