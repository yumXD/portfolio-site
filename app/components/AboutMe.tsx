'use client';

import {Box, Divider, Grid, GridItem, Text, VStack} from '@chakra-ui/react';

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
                                <VStack key={experience.id} align="start" spacing={1}>
                                    <Text fontSize="15px" fontWeight="bold">
                                        {experience.content}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        임팩트: {experience.impact}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        학습 포인트: {experience.learning}
                                    </Text>
                                </VStack>
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
                                <VStack key={habit.id} align="start" spacing={1}>
                                    <Text fontSize="15px" fontWeight="bold">
                                        {habit.content}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        임팩트: {habit.impact}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        학습 포인트: {habit.learning}
                                    </Text>
                                </VStack>
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
                                <VStack key={goal.id} align="start" spacing={1}>
                                    <Text fontSize="15px" fontWeight="bold">
                                        {goal.content}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        임팩트: {goal.impact}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        학습 포인트: {goal.learning}
                                    </Text>
                                </VStack>
                            ))}
                        </VStack>
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    );
}
