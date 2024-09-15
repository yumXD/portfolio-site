import {Badge, Box, Divider, Flex, Highlight, HStack, Text, VStack} from '@chakra-ui/react';

interface UserInfoProps {
    data: {
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

    return (
        <Box p={4} borderRadius="md" borderWidth="10px" borderColor="gray.200">
            <VStack align="start" spacing={2}>
                <Text fontSize="3xl" fontWeight="bold">
                    {data.name}
                    <Badge ml='1' colorScheme='green'>
                        {data.status}
                    </Badge>
                </Text>
                <Divider orientation='horizontal' borderColor="gray.300" borderWidth="2px"/>
                <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                    <Highlight
                        query={data.name}
                        styles={{px: '2', py: '1', rounded: 'full', bg: 'red.100'}}
                    >
                        {data.bio}
                    </Highlight>
                </Text>
                <Flex direction="column" width="100%">
                    <Box p={2} borderRadius="md" bg="gray.100" mb={2}>
                        <HStack>
                            <strong>생년월일:</strong>
                            <Text>{formatDate(data.birthDate)}</Text>
                            <Badge ml='1' colorScheme='pink'>
                                만 {calculateAge(data.birthDate)}세
                            </Badge>
                        </HStack>
                    </Box>
                    <Box p={2} borderRadius="md" bg="gray.100" mb={2}>
                        <Text fontSize="md">
                            <strong>희망직무:</strong>
                            <Highlight
                                query={data.desiredJob}
                                styles={{px: '2', py: '1', rounded: 'full', bg: 'red.100'}}
                            >
                                {data.desiredJob}
                            </Highlight>
                        </Text>
                    </Box>
                    <Box p={2} borderRadius="md" bg="gray.100">
                        <HStack>
                            <strong>학력 사항:</strong>
                            <Text>{data.education}</Text>
                            {data.isMajor && (  // 전공자일 경우에만 배지 표시
                                <Badge ml='1' colorScheme='blue'>
                                    전공자
                                </Badge>
                            )}
                        </HStack>
                    </Box>
                </Flex>
            </VStack>
        </Box>
    );
};

export default UserInfo;
