import {Box, Divider, Grid, GridItem, Text, VStack} from "@chakra-ui/react";

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

interface AboutMeData {
    experiences: Experience[];
    habits: Habit[];
    goals: Goal[];
}

export default async function AboutMe() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_ABOUT_PATH}`);
    const data: AboutMeData = await res.json();

    const {experiences, habits, goals} = data;

    return (
        <Box mt={6} p={6} borderWidth="2px" borderRadius="lg" borderColor="gray.200" maxWidth="1024px" width="100%"
             mx="auto"
             minWidth="300px">
            <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(3, 1fr)"}} gap={6}>
                <GridItem>
                    <VStack align="start" spacing={2} p={3} height="100%">
                        <Text fontSize="lg" fontWeight="bold">경험</Text>
                        <Divider orientation='horizontal' borderColor="gray.300" borderWidth="1px"/>
                        <VStack align="start" spacing={1} height="100%" justifyContent="center">
                            {experiences?.map((experience, index) => (
                                <Text key={index} fontSize="15px">{experience.content}</Text>
                            ))}
                        </VStack>
                    </VStack>
                </GridItem>

                <GridItem>
                    <VStack align="start" spacing={2} p={3}>
                        <Text fontSize="lg" fontWeight="bold">습관</Text>
                        <Divider orientation='horizontal' borderColor="gray.300" borderWidth="1px"/>
                        <VStack align="start" spacing={1}>
                            {habits?.map((habit, index) => (
                                <Text key={index} fontSize="16px">{habit.content}</Text>
                            ))}
                        </VStack>
                    </VStack>
                </GridItem>

                <GridItem>
                    <VStack align="start" spacing={2} p={3}>
                        <Text fontSize="lg" fontWeight="bold">목표</Text>
                        <Divider orientation='horizontal' borderColor="gray.300" borderWidth="1px"/>
                        <VStack align="start" spacing={1}>
                            {goals.map((goal, index) => (
                                <Text key={index} fontSize="16px">{goal.content}</Text>
                            ))}
                        </VStack>
                    </VStack>
                </GridItem>
            </Grid>
        </Box>
    );
}