import {Box, Divider, Grid, GridItem, HStack, Text, VStack} from "@chakra-ui/react";
import {FaAws, FaGitAlt, FaGithub, FaJava, FaNodeJs, FaPython, FaReact, FaSlack} from "react-icons/fa";
import {
    SiC,
    SiCplusplus,
    SiIntellijidea,
    SiJavascript,
    SiMongodb,
    SiMysql,
    SiNextdotjs,
    SiNotion,
    SiPycharm,
    SiSpring,
    SiTypescript,
    SiWebstorm
} from "react-icons/si";
import {DiVisualstudio} from "react-icons/di";

interface TechItem {
    id: number;
    name: string;
    icon: string;  // 아이콘 이름을 문자열로 받음
    color: string;
}

interface TechStack {
    name: string;
    items: TechItem[];
}

export default async function TechStack() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_TECH_STACK_PATH}`, {
        cache: 'no-store',
    });
    const techStacks: TechStack[] = await res.json();

    // 아이콘 매핑
    const iconsMap = {
        FaAws: FaAws,
        FaGitAlt: FaGitAlt,
        FaGithub: FaGithub,
        FaJava: FaJava,
        FaNodeJs: FaNodeJs,
        FaPython: FaPython,
        FaReact: FaReact,
        FaSlack: FaSlack,
        SiC: SiC,
        SiCplusplus: SiCplusplus,
        SiJavascript: SiJavascript,
        SiMongodb: SiMongodb,
        SiMysql: SiMysql,
        SiNextdotjs: SiNextdotjs,
        SiNotion: SiNotion,
        SiSpring: SiSpring,
        SiTypescript: SiTypescript,
        SiWebstorm: SiWebstorm,
        SiPycharm: SiPycharm,
        SiIntellijidea: SiIntellijidea,
        DiVisualstudio: DiVisualstudio,
    };


    return (
        <Box mt={6} p={6} borderWidth="2px" borderRadius="lg" borderColor="gray.200" maxWidth="1024px" width="100%"
             mx="auto" minWidth="300px">
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
                기술 스택
            </Text>
            <Divider orientation="horizontal" borderColor="gray.300" borderWidth="1px"/>
            <Grid mt={2} templateColumns={{base: "repeat(2, 1fr)", md: "repeat(6, 1fr)"}} gap={6} width="100%"
                  height="100%">
                {techStacks.map((techStack) => (
                    <GridItem key={techStack.name}>
                        <VStack align="start">
                            <Text fontSize="xl" fontWeight="semibold">
                                {techStack.name}
                            </Text>
                            <VStack spacing={2} align="start">
                                {techStack.items.map((item) => {
                                    const IconComponent = iconsMap[item.icon as keyof typeof iconsMap];
                                    return (
                                        <HStack spacing={2} key={item.id}>
                                            {IconComponent && <IconComponent size="24px" color={item.color}/>}
                                            <Text>{item.name}</Text>
                                        </HStack>
                                    );
                                })}
                            </VStack>
                        </VStack>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
}
