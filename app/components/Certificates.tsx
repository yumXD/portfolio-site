'use client';

import {useState} from 'react';
import {Box, Button, Divider, Grid, GridItem, Heading, Input, Stack, Textarea} from "@chakra-ui/react";

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
    const [certificateData, setCertificateData] = useState(certificates);

    // 새 자격증 초기값 (임시 ID는 음수로 설정)
    const emptyCertificate = {
        id: Date.now(), // 임시 ID
        title: '',
        issuer: '',
        dateIssued: new Date().toISOString().split('T')[0],
    };

    // 자격증 추가
    const addCertificate = () => {
        setCertificateData([...certificateData, {...emptyCertificate, id: -certificateData.length - 1}]);
    };

    // 자격증 삭제
    const deleteCertificate = async (id: number) => {
        if (id < 0) {
            // 임시로 추가된 자격증은 서버에 저장되지 않았으므로 상태에서만 삭제
            setCertificateData(certificateData.filter((cert) => cert.id !== id));
            console.log(`Certificate with temporary ID ${id} removed locally.`);
        } else {
            // 서버에 저장된 자격증 삭제
            const response = await fetch(`/api/certificates`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id}),
            });

            if (response.ok) {
                setCertificateData(certificateData.filter((cert) => cert.id !== id));
                console.log(`Certificate with ID ${id} successfully deleted.`);
            } else {
                console.error('Error deleting certificate');
            }
        }
    };

    // 입력값 변경 처리
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
        const {name, value} = e.target;

        setCertificateData(
            certificateData.map((cert) =>
                cert.id === id ? {...cert, [name]: value} : cert
            )
        );
    };

    // 데이터 저장
    const handleSave = async (id: number, title: string, issuer: string, dateIssued: string) => {
        if (id < 0) {
            // POST 요청으로 새로운 자격증 추가
            const response = await fetch(`/api/certificates`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title, issuer, dateIssued}),
            });

            if (response.ok) {
                const newCertificate = await response.json();
                // 서버에서 반환된 실제 ID로 업데이트
                setCertificateData(
                    certificateData.map((cert) =>
                        cert.id === id ? newCertificate : cert
                    )
                );
                console.log('New certificate added successfully:', newCertificate);
            } else {
                console.error('Error adding certificate');
            }
        } else {
            // PATCH 요청으로 기존 자격증 수정
            const response = await fetch(`/api/certificates`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id, title, issuer, dateIssued}),
            });

            if (response.ok) {
                console.log(`Certificate with ID ${id} successfully updated.`);
            } else {
                console.error('Error updating certificate');
            }
        }
    };

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
            <Button onClick={addCertificate} colorScheme="green" mb={4}>
                자격증 추가
            </Button>
            <Divider orientation='horizontal' borderColor="gray.300" borderWidth="1px"/>
            <Grid
                templateColumns={{base: "repeat(1, 1fr)", md: "repeat(3, 1fr)"}}
                gap={2}
                mt={4}
            >
                {certificateData.map((certificate) => (
                    <GridItem key={certificate.id}>
                        <Stack direction="column" spacing={2}>
                            <Textarea
                                name="title"
                                value={certificate.title}
                                onChange={(e) => handleChange(e, certificate.id)}
                                placeholder="자격증 제목을 입력하세요"
                            />
                            <Textarea
                                name="issuer"
                                value={certificate.issuer}
                                onChange={(e) => handleChange(e, certificate.id)}
                                placeholder="발급 기관을 입력하세요"
                            />
                            <Input
                                type="date"
                                name="dateIssued"
                                value={new Date(certificate.dateIssued).toISOString().split('T')[0]}
                                onChange={(e) => handleChange(e, certificate.id)}
                            />
                            <Button
                                onClick={() =>
                                    handleSave(
                                        certificate.id,
                                        certificate.title,
                                        certificate.issuer,
                                        certificate.dateIssued
                                    )
                                }
                                colorScheme="blue"
                            >
                                저장
                            </Button>
                            <Button
                                onClick={() => deleteCertificate(certificate.id)}
                                colorScheme="red"
                            >
                                삭제
                            </Button>
                        </Stack>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
}
