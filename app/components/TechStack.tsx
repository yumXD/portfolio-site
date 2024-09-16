'use client'

import {useState} from 'react';
import {Box, Divider, Grid, GridItem, HStack, Text, VStack} from '@chakra-ui/react';
import * as FaIcons from 'react-icons/fa'; // Fa icons
import * as SiIcons from 'react-icons/si'; // Si icons
import * as DiIcons from 'react-icons/di'; // Di icons

// 모든 아이콘 라이브러리를 미리 import한 후 아이콘을 매칭하는 함수
const getIconComponent = (iconName: string) => {
    // 아이콘이 "Fa"로 시작하면 FaIcons에서 가져오고, "Si"로 시작하면 SiIcons, "Di"로 시작하면 DiIcons에서 가져옴
    if (iconName.startsWith('Fa')) {
        return FaIcons[iconName as keyof typeof FaIcons] || null;
    } else if (iconName.startsWith('Si')) {
        return SiIcons[iconName as keyof typeof SiIcons] || null;
    } else if (iconName.startsWith('Di')) {
        return DiIcons[iconName as keyof typeof DiIcons] || null;
    }
    return null;
};

interface TechItem {
    id?: number;
    name: string;
    icon: string;
    color: string;
}

interface TechStackProps {
    techStacks: {
        id: number;
        name: string;
        items: TechItem[];
    }[];
}

export default function TechStackComponent({techStacks: initialData}: TechStackProps) {
    const [techStacks, setTechStacks] = useState(initialData);

    return (
        <Box mt={6} p={6} borderWidth="2px" borderRadius="lg" borderColor="gray.200" maxWidth="1024px" width="100%"
             mx="auto" minWidth="300px">
            <Text fontSize="2xl" fontWeight="bold" mb={2}>
                기술 스택
            </Text>
            <Divider orientation="horizontal" borderColor="gray.300" borderWidth="1px"/>
            <Grid mt={2} templateColumns={{base: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)'}} gap={6}
                  sx={{
                      '@media print': {
                          gridTemplateColumns: "repeat(6, 1fr)",
                          gap: '4px',
                      }
                  }}
            >
                {techStacks.map((stack) => (
                    <GridItem key={stack.id}>
                        <VStack align="start">
                            <Text fontSize="xl" fontWeight="semibold">
                                {stack.name}
                            </Text>
                            <VStack spacing={2} align="start">
                                {stack.items.map((item) => {
                                    const IconComponent = getIconComponent(item.icon); // 아이콘을 동적으로 가져옴
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
