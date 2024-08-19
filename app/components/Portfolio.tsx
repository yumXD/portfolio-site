import {Box, Divider, Heading} from "@chakra-ui/react";

const Portfolio = () => {
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
            <Heading size="xl" mb={4}>포트폴리오</Heading>
            <Divider orientation="horizontal" borderColor="gray.300" borderWidth="1px" mb={6}/>

        </Box>
    );
};

export default Portfolio;
