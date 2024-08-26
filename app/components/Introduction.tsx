'use client';

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from '@chakra-ui/react';
import React from 'react';

// 데이터 타입 정의
type Section = {
    content: string;
};

type IntroductionData = {
    title: string;
    sections: Section[];
};

type IntroductionProps = {
    data: IntroductionData[];
};

export default function Introduction({ data }: IntroductionProps) {
    return (
        <Box mt={6} p={6} borderWidth="2px" borderRadius="lg" borderColor="gray.200" maxWidth="1024px" width="100%" mx="auto" minWidth="300px">
            <Accordion allowMultiple>
                {data.map((item, index) => (
                    <AccordionItem key={index}>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                                    {item.title}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {item.sections.map((section, secIndex) => (
                                <Text as="p" mb={4} key={secIndex}>
                                    {section.content}
                                </Text>
                            ))}
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
}
