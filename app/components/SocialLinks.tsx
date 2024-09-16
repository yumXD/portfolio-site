'use client'

import { useState } from 'react';
import { Flex, Link, Tooltip, Input, Button, VStack } from '@chakra-ui/react';
import { SiTistory } from 'react-icons/si';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineMailOpen, HiPhone } from 'react-icons/hi';

interface SocialLinksProps {
    data: {
        id: number; // 유저 식별을 위한 id 추가
        blogUrl?: string;
        githubUrl?: string;
        email?: string;
        phoneNumber?: string;
    };
}

export default function SocialLinks({ data }: SocialLinksProps) {
    // 소셜 링크와 관련된 상태 관리
    const [socialData, setSocialData] = useState({
        blogUrl: data.blogUrl || '',
        githubUrl: data.githubUrl || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
    });

    // 입력값 변경 처리
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSocialData({
            ...socialData,
            [name]: value,
        });
    };

    // 데이터 저장
    const handleSave = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
            method: 'PATCH', // PATCH로 변경
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: data.id, ...socialData }), // 수정된 필드만 서버로 전송
        });

        if (response.ok) {
            console.log('Social links updated successfully');
        } else {
            console.error('Error updating social links');
        }
    };

    return (
        <VStack spacing={4} align="start">
            {/* 블로그 URL */}
            <Flex justifyContent="space-between" width="100%" maxWidth={{ base: '250px', md: '100%' }}>
                <SiTistory size="24px" />
                <Input
                    name="blogUrl"
                    value={socialData.blogUrl}
                    onChange={handleChange}
                    placeholder="블로그 URL을 입력하세요"
                    size="sm"
                />
            </Flex>

            {/* GitHub URL */}
            <Flex justifyContent="space-between" width="100%" maxWidth={{ base: '250px', md: '100%' }}>
                <FaGithub size="24px" />
                <Input
                    name="githubUrl"
                    value={socialData.githubUrl}
                    onChange={handleChange}
                    placeholder="GitHub URL을 입력하세요"
                    size="sm"
                />
            </Flex>

            {/* 이메일 */}
            <Flex justifyContent="space-between" width="100%" maxWidth={{ base: '250px', md: '100%' }}>
                <HiOutlineMailOpen size="24px" />
                <Input
                    name="email"
                    value={socialData.email}
                    onChange={handleChange}
                    placeholder="이메일을 입력하세요"
                    size="sm"
                />
            </Flex>

            {/* 전화번호 */}
            <Flex justifyContent="space-between" width="100%" maxWidth={{ base: '250px', md: '100%' }}>
                <HiPhone size="24px" />
                <Input
                    name="phoneNumber"
                    value={socialData.phoneNumber}
                    onChange={handleChange}
                    placeholder="전화번호를 입력하세요"
                    size="sm"
                />
            </Flex>

            {/* 저장 버튼 */}
            <Button colorScheme="blue" onClick={handleSave}>
                저장
            </Button>
        </VStack>
    );
}
