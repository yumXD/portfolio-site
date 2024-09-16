'use client'

import { useState } from 'react';
import { Image, Button, Input, Box } from '@chakra-ui/react';

interface ProfileImageProps {
    data: {
        id: number;
        profilePic: string;
    };
}

const ProfileImage = ({ data }: ProfileImageProps) => {
    const [imageUrl, setImageUrl] = useState<string>(data.profilePic || '');
    const [imageError, setImageError] = useState<boolean>(false); // 이미지 로드 오류 상태

    // 입력값 변경 처리
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(event.target.value);
        setImageError(false); // URL 변경 시 에러 상태 초기화
    };

    // 이미지 로드 오류 발생 시 placeholder 이미지로 대체
    const handleImageError = () => {
        setImageError(true);
    };

    // 데이터 저장
    const handleSave = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
            method: 'PATCH', // PATCH로 변경
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: data.id, profilePic: imageUrl }), // 사용자 ID와 수정된 필드만 전송
        });

        if (response.ok) {
            console.log('Profile image updated successfully');
        } else {
            console.error('Error updating profile image');
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Image
                src={
                    imageError || !imageUrl
                        ? 'https://via.placeholder.com/250' // 기본 placeholder 이미지
                        : imageUrl
                }
                alt="Profile Picture"
                borderRadius="md"
                objectFit="cover"
                height="250px"
                width="250px" // 크기 고정
                border="2px solid"
                borderColor="gray.300"
                mb={4}
                onError={handleImageError} // 이미지 로드 실패 시 처리
            />
            <Input
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={handleChange}
                mb={4}
            />
            <Button onClick={handleSave} colorScheme="blue">
                Save Image URL
            </Button>
        </Box>
    );
};

export default ProfileImage;
