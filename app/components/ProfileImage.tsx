'use client'

import {Image} from '@chakra-ui/react';

interface ProfileImageProps {
    imageUrl?: string | null; // 프로필 이미지 URL을 전달받기 위한 props, 선택적(optional)로 설정
}

const ProfileImage = ({imageUrl}: ProfileImageProps) => {
    return (
        <Image
            src={imageUrl || "https://via.placeholder.com/250"}
            alt="photo"
            borderRadius='md'
            objectFit="cover"
            height="250px"
            border="2px solid"
            borderColor="gray.300"
        />
    );
};

export default ProfileImage;
