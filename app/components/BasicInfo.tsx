import {Box, Flex, Grid, GridItem, Link, Tooltip} from '@chakra-ui/react';
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

const BasicInfo = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_API_BASE_PATH}`);
    const data: User = await response.json();

    return (
        <Grid templateColumns={{base: "1fr", md: "1fr 3fr"}} gap={4} width="100%" p={6} maxWidth="1024px" mx="auto"
              minWidth="300px">
            <GridItem>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <ProfileImage imageUrl={data.profilePic}/>
                    <Flex mt={4} justifyContent="space-around" width="100%" maxWidth={{base: "250px", md: "100%"}}>
                        {data.blogUrl && (
                            <Tooltip label="티스토리">
                                <Link href={data.blogUrl} isExternal>
                                    <SiTistory size="24px"/>
                                </Link>
                            </Tooltip>
                        )}
                        {data.githubUrl && (
                            <Tooltip label="깃허브">
                                <Link href={data.githubUrl || undefined} isExternal>
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
                </Box>
            </GridItem>
            <GridItem>
                <UserInfo
                    userName={data.name}
                    userStatus={data.status}
                    intro={data.bio || "자기소개가 없습니다."}
                    birthdate={data.birthDate || "알 수 없음"}
                    role={data.desiredJob || "미정"}
                    education={data.education || "미정"}
                />
            </GridItem>
        </Grid>
    );
};

export default BasicInfo;