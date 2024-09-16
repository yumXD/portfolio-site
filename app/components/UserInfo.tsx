'use client'

import {useState} from 'react';
import {Badge, Box, Button, Divider, HStack, Input, Text, Textarea, VStack} from '@chakra-ui/react';

interface UserInfoProps {
    data: {
        id: number;
        name: string;
        status: string;
        bio: string;
        birthDate: string;
        desiredJob: string;
        education: string;
        isMajor: boolean;
    };
}

const UserInfo = ({data}: UserInfoProps) => {
    // 사용자가 입력한 값을 추적하는 상태
    const [userData, setUserData] = useState({
        name: data.name || '',
        status: data.status || '',
        bio: data.bio || '',
        birthDate: data.birthDate || '',
        desiredJob: data.desiredJob || '',
        education: data.education || '',
        isMajor: data.isMajor || false,
    });

    // 입력 필드 변경 시 상태 업데이트
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    };

    // 전공자 여부 변경
    const handleMajorChange = () => {
        setUserData({...userData, isMajor: !userData.isMajor});
    };

    // birthDate를 YYYY-MM-DD 형식으로 변환하는 함수
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
    };

    // 만 나이를 계산하는 함수
    const calculateAge = (dateString: string) => {
        const birthDate = new Date(dateString);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        // 생일이 지나지 않았으면 나이를 한 살 더 낮춤
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // 수정된 데이터를 저장하는 함수 (서버에 PUT 요청)
    const handleSave = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
            method: 'PATCH', // PATCH로 변경
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: data.id, ...userData }), // 수정된 필드만 서버로 전송
        });

        if (res.ok) {
            console.log('User data updated successfully');
        } else {
            console.error('Error updating user data');
        }
    };

    return (
        <Box p={4} borderRadius="md" borderWidth="10px" borderColor="gray.200">
            <VStack align="start" spacing={4}>
                <HStack spacing={2} alignItems="center">
                    <Text fontSize="xl" fontWeight="bold">이름:</Text>
                    <Input
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        placeholder="이름을 입력하세요"
                    />
                    <Badge ml='1' colorScheme='green'>
                        <Input
                            name="status"
                            value={userData.status}
                            onChange={handleChange}
                            placeholder="상태를 입력하세요"
                        />
                    </Badge>
                </HStack>

                <Divider orientation='horizontal' borderColor="gray.300" borderWidth="2px"/>

                <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                    자기소개:
                </Text>
                <Textarea
                    name="bio"
                    value={userData.bio}
                    onChange={handleChange}
                    placeholder="자기소개를 입력하세요"
                />

                <Box p={2} borderRadius="md" bg="gray.100" mb={2}>
                    <HStack>
                        <Text>생년월일:</Text>
                        <Input
                            type="date"
                            name="birthDate"
                            value={userData.birthDate ? formatDate(userData.birthDate) : ''}
                            onChange={handleChange}
                        />
                        {userData.birthDate && (
                            <Badge ml='1' colorScheme='pink'>
                                만 {calculateAge(userData.birthDate)}세
                            </Badge>
                        )}
                    </HStack>
                </Box>

                <Box p={2} borderRadius="md" bg="gray.100" mb={2}>
                    <HStack>
                        <Text fontSize="md">
                            희망직무:
                        </Text>
                        <Input
                            name="desiredJob"
                            value={userData.desiredJob}
                            onChange={handleChange}
                            placeholder="희망 직무를 입력하세요"
                        />
                    </HStack>
                </Box>

                <Box p={2} borderRadius="md" bg="gray.100" width="100%">
                    <HStack>
                        <Text>학력 사항:</Text>
                        <Input
                            name="education"
                            value={userData.education}
                            onChange={handleChange}
                            placeholder="학력을 입력하세요"
                        />
                        <Button onClick={handleMajorChange} colorScheme={userData.isMajor ? 'blue' : 'gray'}>
                            {userData.isMajor ? '전공자' : '비전공자'}
                        </Button>
                    </HStack>
                </Box>

                <Button onClick={handleSave} colorScheme="blue">
                    정보 저장
                </Button>
            </VStack>
        </Box>
    );
};

export default UserInfo;
