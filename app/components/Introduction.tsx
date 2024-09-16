'use client';

import {useState} from 'react';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    HStack,
    Input,
    Textarea,
    VStack,
} from '@chakra-ui/react';

type Section = {
    id?: number; // 섹션에 ID를 포함해 수정 및 삭제 기능 처리
    content: string;
};

type IntroductionData = {
    id?: number; // 새 항목 추가 시 ID가 없을 수 있음
    title: string;
    sections: Section[];
    isNew?: boolean; // 새로 추가된 항목인지 확인하기 위한 필드
};

type IntroductionProps = {
    data: IntroductionData[];
};

export default function Introduction({data}: IntroductionProps) {
    const [introductionData, setIntroductionData] = useState<IntroductionData[]>(data);

    // 섹션 추가
    const addSection = (introductionId: number) => {
        const updatedData = introductionData.map((intro) => {
            if (intro.id === introductionId) {
                return {
                    ...intro,
                    sections: [...intro.sections, {content: '', id: Date.now()}], // 임시 ID 사용
                };
            }
            return intro;
        });
        setIntroductionData(updatedData);
    };

    // 섹션 삭제
    const deleteSection = (introductionId: number, sectionId: number) => {
        const updatedData = introductionData.map((intro) => {
            if (intro.id === introductionId) {
                return {
                    ...intro,
                    sections: intro.sections.filter((section) => section.id !== sectionId),
                };
            }
            return intro;
        });
        setIntroductionData(updatedData);
    };

    // 섹션 내용 수정
    const handleSectionChange = (introductionId: number, sectionId: number, content: string) => {
        const updatedData = introductionData.map((intro) => {
            if (intro.id === introductionId) {
                return {
                    ...intro,
                    sections: intro.sections.map((section) => {
                        if (section.id === sectionId) {
                            return {...section, content};
                        }
                        return section;
                    }),
                };
            }
            return intro;
        });
        setIntroductionData(updatedData);
    };

    // 제목 수정
    const handleTitleChange = (introductionId: number, title: string) => {
        const updatedData = introductionData.map((intro) => {
            if (intro.id === introductionId) {
                return {...intro, title};
            }
            return intro;
        });
        setIntroductionData(updatedData);
    };

    // 새로운 소개 추가
    const addNewIntroduction = () => {
        const newIntro = {
            id: Date.now(),
            title: '새 소개',
            sections: [{id: Date.now(), content: ''}],
            isNew: true, // 새로 추가된 소개 항목임을 나타냄
        };
        setIntroductionData([...introductionData, newIntro]);
    };

    // 서버에 새로운 소개 저장 (POST)
    const handlePostSave = async (id: number) => {
        const introduction = introductionData.find((intro) => intro.id === id);
        if (introduction) {
            const response = await fetch('/api/introduction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(introduction),
            });

            if (response.ok) {
                console.log('Introduction data saved successfully');
                // 저장 후 isNew 상태 제거
                const updatedData = introductionData.map((intro) => {
                    if (intro.id === id) {
                        return {...intro, isNew: false};
                    }
                    return intro;
                });
                setIntroductionData(updatedData);
            } else {
                console.error('Error saving introduction data');
            }
        }
    };

    // 서버에 수정된 소개 저장 (PATCH)
    const handlePatchSave = async (id: number) => {
        const introduction = introductionData.find((intro) => intro.id === id);
        if (introduction) {
            const response = await fetch('/api/introduction', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(introduction),
            });

            if (response.ok) {
                console.log('Introduction data updated successfully');
            } else {
                console.error('Error updating introduction data');
            }
        }
    };

    // 서버에서 소개 삭제 (DELETE)
    const handleDelete = async (id: number) => {
        const response = await fetch('/api/introduction', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        });

        if (response.ok) {
            setIntroductionData(introductionData.filter((intro) => intro.id !== id));
            console.log('Introduction deleted successfully');
        } else {
            console.error('Error deleting introduction');
        }
    };

    return (
        <Box mt={6} p={6} borderWidth="2px" borderRadius="lg" borderColor="gray.200" maxWidth="1024px" width="100%"
             mx="auto" minWidth="300px">
            <Button onClick={addNewIntroduction} colorScheme="green" mb={4}>
                새로운 소개 추가
            </Button>
            <Accordion allowMultiple>
                {introductionData.map((item) => (
                    <AccordionItem key={item.id}>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                                    <Input
                                        value={item.title}
                                        onChange={(e) => handleTitleChange(item.id!, e.target.value)}
                                        placeholder="제목을 입력하세요"
                                    />
                                </Box>
                                <AccordionIcon/>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <VStack spacing={4} align="start">
                                {item.sections.map((section) => (
                                    <HStack key={section.id} width="100%">
                                        <Textarea
                                            value={section.content}
                                            onChange={(e) => handleSectionChange(item.id!, section.id!, e.target.value)}
                                            placeholder="섹션 내용을 입력하세요"
                                        />
                                        <Button
                                            colorScheme="red"
                                            onClick={() => deleteSection(item.id!, section.id!)}
                                        >
                                            섹션 삭제
                                        </Button>
                                    </HStack>
                                ))}
                                <Button colorScheme="blue" onClick={() => addSection(item.id!)}>
                                    섹션 추가
                                </Button>
                                {item.isNew ? (
                                    <Button colorScheme="green" onClick={() => handlePostSave(item.id!)}>
                                        저장
                                    </Button>
                                ) : (
                                    <Button colorScheme="green" onClick={() => handlePatchSave(item.id!)}>
                                        수정 사항 저장
                                    </Button>
                                )}
                                <Button colorScheme="red" onClick={() => handleDelete(item.id!)}>
                                    소개 삭제
                                </Button>
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
}
