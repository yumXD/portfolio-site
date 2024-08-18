'use client';

import {useEffect, useState} from 'react';
import {Box, Flex, Grid, GridItem, Link, Spinner, Tooltip} from '@chakra-ui/react';
import {SiTistory} from "react-icons/si";
import {FaGithub} from "react-icons/fa";
import {HiOutlineMailOpen, HiPhone} from "react-icons/hi";
import ProfileImage from "@/app/components/ProfileImage";
import UserInfo from "@/app/components/UserInfo";

interface User {
    name: string;
    profilePic?: string | null;
    bio?: string | null;
    birthDate?: string | null;
    desiredJob?: string | null;
    education?: string | null;
    status?: string | null;
    blogUrl?: string | null;
    githubUrl?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
}

const BasicInfo = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_BASE_PATH}`);
            const data = await response.json();
            setUser(data);
        };

        fetchData();
    }, []);

    if (!user) {
        return (
            <Box
                mt={6}
                p={3}
                maxWidth="1024px"
                width="100%"
                mx="auto"
                minWidth="300px"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Spinner size="xl"/>
            </Box>
        );
    }

    return (
        <Grid templateColumns={{base: "1fr", md: "1fr 3fr"}} gap={4} width="100%" p={6} maxWidth="1024px" mx="auto"
              minWidth="300px">
            <GridItem>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <ProfileImage imageUrl={user.profilePic}/>
                    <Flex mt={4} justifyContent="space-around" width="100%" maxWidth={{base: "250px", md: "100%"}}>
                        {user.blogUrl && (
                            <Tooltip label="티스토리">
                                <Link href={user.blogUrl} isExternal>
                                    <SiTistory size="24px"/>
                                </Link>
                            </Tooltip>
                        )}
                        {user.githubUrl && (
                            <Tooltip label="깃허브">
                                <Link href={user.githubUrl || undefined} isExternal>
                                    <FaGithub size="24px"/>
                                </Link>
                            </Tooltip>
                        )}
                        {user.email && (
                            <Tooltip label={user.email}>
                                <Link href={`mailto:${user.email}`} isExternal>
                                    <HiOutlineMailOpen size="24px"/>
                                </Link>
                            </Tooltip>
                        )}
                        {user.phoneNumber && (
                            <Tooltip label={user.phoneNumber}>
                                <Link href={`tel:${user.phoneNumber}`} isExternal>
                                    <HiPhone size="24px"/>
                                </Link>
                            </Tooltip>
                        )}
                    </Flex>
                </Box>
            </GridItem>
            <GridItem>
                <UserInfo
                    userName={user.name}
                    userStatus={user.status}
                    intro={user.bio || "자기소개가 없습니다."}
                    birthdate={user.birthDate || "알 수 없음"}
                    role={user.desiredJob || "미정"}
                    education={user.education || "미정"}
                />
            </GridItem>
        </Grid>
    );
};

export default BasicInfo;