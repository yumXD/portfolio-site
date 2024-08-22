import {Box, Divider, Grid, GridItem, Heading, Highlight, Stack, Text,} from "@chakra-ui/react";

interface Certificate {
    id: number;
    title: string;
    issuer: string;
    dateIssued: string;
}

interface CertificatesProps {
    certificates: Certificate[];
}

export default function Certificates({certificates}: CertificatesProps) {
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
            <Heading size="md" mb={4}>자격증</Heading>
            <Divider orientation='horizontal' borderColor="gray.300" borderWidth="1px"/>
            <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(3, 1fr)"}} gap={2} mt={4}>
                {certificates.map((certificate) => (
                    <GridItem key={certificate.id}>
                        <Stack direction="column" spacing={2}>
                            <Text fontWeight="bold" fontSize="lg">
                                <Highlight query={certificate.title}
                                           styles={{px: '2', py: '1', rounded: 'full', bg: 'cyan.100'}}>
                                    {certificate.title}
                                </Highlight>
                            </Text>
                            <Text>{certificate.issuer}</Text>
                            <Text fontSize="sm"
                                  color="gray.500">{new Date(certificate.dateIssued).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: '2-digit'
                            })} 취득</Text>
                        </Stack>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
}
