import {Image} from '@chakra-ui/react';

interface ProfileImageProps {
    imageUrl?: string | null;
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
