'use client';

import {Box, Divider, Grid, GridItem, Text, VStack} from '@chakra-ui/react';

// 컴포넌트 내부에서 타입 정의
interface Experience {
    id: number;
    content: string;
}

interface Habit {
    id: number;
    content: string;
}

interface Goal {
    id: number;
    content: string;
}

interface AboutMeProps {
    experiences: Experience[];
    habits: Habit[];
    goals: Goal[];
}

export default function AboutMe({experiences, habits, goals}: AboutMeProps) {
    return (
        <Box mt={6} p={6} borderWidth="2px" borderRadius="lg" borderColor="gray.200" maxWidth="1024px" width="100%"
             mx="auto" minWidth="300px">
            <Grid templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)'}} gap={6}>
                <GridItem>
                    <VStack align="start" spacing={2} p={3} height="100%">
                        <Text fontSize="lg" fontWeight="bold">경험</Text>
                        <Divider orientation="horizontal" borderColor="gray.300" borderWidth="1px"/>
                        <VStack align="start" spacing={1} height="100%" justifyContent="center">
                            {experiences.map((experience) => (
                                <Text key={experience.id} fontSize="15px">{experience.content}</Text>
                            ))}
                        </VStack>
                    </VStack>
                </GridItem>

                <GridItem>
                    <VStack align="start" spacing={2} p={3}>
                        <Text fontSize="lg" fontWeight="bold">습관</Text>
                        <Divider orientation="horizontal" borderColor="gray.300" borderWidth="1px"/>
                        <VStack align="start" spacing={1}>
                            {habits.map((habit) => (
                                <Text key={habit.id} fontSize="16px">{habit.content}</Text>
                            ))}
                        </VStack>
                    </VStack>
                </GridItem>

                <GridItem>
                    <VStack align="start" spacing={2} p={3}>
                        <Text fontSize="lg" fontWeight="bold">목표</Text>
                        <Divider orientation="horizontal" borderColor="gray.300" borderWidth="1px"/>
                        <VStack align="start" spacing={1}>
                            {goals.map((goal) => (
                                <Text key={goal.id} fontSize="16px">{goal.content}</Text>
                            ))}
                        </VStack>
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    );
}
