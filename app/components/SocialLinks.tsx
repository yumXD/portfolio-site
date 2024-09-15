import {Flex, Link, Tooltip} from '@chakra-ui/react';
import {SiTistory} from 'react-icons/si';
import {FaGithub} from 'react-icons/fa';
import {HiOutlineMailOpen, HiPhone} from 'react-icons/hi';

interface SocialLinksProps {
    data: {
        blogUrl?: string;
        githubUrl?: string;
        email: string;
        phoneNumber?: string;
    };
}

export default function SocialLinks({data}: SocialLinksProps) {
    return (
        <Flex mt={4} justifyContent="space-around" width="100%" maxWidth={{base: '250px', md: '100%'}}>
            {data.blogUrl && (
                <Tooltip label="티스토리">
                    <Link href={data.blogUrl} isExternal>
                        <SiTistory size="24px"/>
                    </Link>
                </Tooltip>
            )}
            {data.githubUrl && (
                <Tooltip label="깃허브">
                    <Link href={data.githubUrl} isExternal>
                        <FaGithub size="24px"/>
                    </Link>
                </Tooltip>
            )}
            {data.email && (
                <Tooltip label={data.email}>
                    <Link href={`mailto:${data.email}`} isExternal>
                        <HiOutlineMailOpen size="24px"/>
                    </Link>
                </Tooltip>
            )}
            {data.phoneNumber && (
                <Tooltip label={data.phoneNumber}>
                    <Link href={`tel:${data.phoneNumber}`} isExternal>
                        <HiPhone size="24px"/>
                    </Link>
                </Tooltip>
            )}
        </Flex>
    );
}
