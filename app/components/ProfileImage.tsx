import {Image} from '@chakra-ui/react';

interface ProfileImageProps {
    data: {
        profilePic: string;
    };
}

const ProfileImage = ({data}: ProfileImageProps) => {
    return (
        <Image
            src={data.profilePic}
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
