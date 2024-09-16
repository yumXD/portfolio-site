'use client';

import {useState} from 'react';
import {Box, Button, Divider, Grid, GridItem, Text, Textarea, VStack} from '@chakra-ui/react';

interface Experience {
    id: number;
    content: string;
    impact: string;
    learning: string;
}

interface Habit {
    id: number;
    content: string;
    impact: string;
    learning: string;
}

interface Goal {
    id: number;
    content: string;
    impact: string;
    learning: string;
}

interface AboutMeProps {
    experiences: Experience[];
    habits: Habit[];
    goals: Goal[];
}

export default function AboutMe({experiences, habits, goals}: AboutMeProps) {
    const [experienceData, setExperienceData] = useState(experiences);
    const [habitData, setHabitData] = useState(habits);
    const [goalData, setGoalData] = useState(goals);

    // 입력값 변경 처리
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, type: string, id: number) => {
        const {name, value} = e.target;

        // 데이터 상태 업데이트
        const updateState = (data: any, setData: any) => {
            setData(data.map((item: any) => (item.id === id ? {...item, [name]: value} : item)));
        };

        if (type === 'experience') {
            updateState(experienceData, setExperienceData);
        } else if (type === 'habit') {
            updateState(habitData, setHabitData);
        } else if (type === 'goal') {
            updateState(goalData, setGoalData);
        }
    };

    // 데이터 저장 처리
    const handleSave = async (id: number, type: string, content: string, impact: string, learning: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/about-me`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, type, content, impact, learning}),
        });

        if (response.ok) {
            console.log('Data updated successfully');
        } else {
            console.error('Error updating data');
        }
    };

    const renderSection = (data: any, type: string) => {
        return data.map((item: any) => (
            <VStack key={item.id} align="start" spacing={1} width="100%">
                <Textarea
                    name="content"
                    value={item.content}
                    onChange={(e) => handleChange(e, type, item.id)}
                    placeholder="내용을 입력하세요"
                />
                <Textarea
                    name="impact"
                    value={item.impact}
                    onChange={(e) => handleChange(e, type, item.id)}
                    placeholder="임팩트를 입력하세요"
                />
                <Textarea
                    name="learning"
                    value={item.learning}
                    onChange={(e) => handleChange(e, type, item.id)}
                    placeholder="학습 포인트를 입력하세요"
                />
                <Button
                    onClick={() => handleSave(item.id, type, item.content, item.impact, item.learning)}
                    colorScheme="blue"
                    mt={2}
                >
                    저장
                </Button>
            </VStack>
        ));
    };

    return (
        <Box mt={6} p={6} borderWidth="2px" borderRadius="lg" borderColor="gray.200" maxWidth="1024px" width="100%"
             mx="auto" minWidth="300px">
            <Grid templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)'}} gap={6}>
                {/* 경험 섹션 */}
                <GridItem>
                    <VStack align="start" spacing={2} p={3}>
                        <Text fontSize="lg" fontWeight="bold">경험</Text>
                        <Divider orientation="horizontal" borderColor="gray.300" borderWidth="1px"/>
                        {renderSection(experienceData, 'experience')}
                    </VStack>
                </GridItem>

                {/* 습관 섹션 */}
                <GridItem>
                    <VStack align="start" spacing={2} p={3}>
                        <Text fontSize="lg" fontWeight="bold">습관</Text>
                        <Divider orientation="horizontal" borderColor="gray.300" borderWidth="1px"/>
                        {renderSection(habitData, 'habit')}
                    </VStack>
                </GridItem>

                {/* 목표 섹션 */}
                <GridItem>
                    <VStack align="start" spacing={2} p={3}>
                        <Text fontSize="lg" fontWeight="bold">목표</Text>
                        <Divider orientation="horizontal" borderColor="gray.300" borderWidth="1px"/>
                        {renderSection(goalData, 'goal')}
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    );
}
