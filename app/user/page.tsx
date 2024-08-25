import {Box, Flex, Grid, GridItem, Link, Tooltip} from '@chakra-ui/react';
import {SiTistory} from "react-icons/si";
import {FaGithub} from "react-icons/fa";
import {HiOutlineMailOpen, HiPhone} from "react-icons/hi";
import ProfileImage from "../components/ProfileImage";
import UserInfo from "../components/UserInfo";
export const dynamic = "force-dynamic";

export default async function UserPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
        cache: "no-store",
    });
    const user = await res.json();

    if (res.status !== 200) {
        return <div>Error: {user.error}</div>;
    }

    return (
        <Grid
            templateColumns={{base: "1fr", md: "1fr 3fr"}}
            gap={4}
            width="100%"
            p={6}
            maxWidth="1024px"
            mx="auto"
            minWidth="300px"
        >
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
                    isMajor={user.isMajor}
                />
            </GridItem>
        </Grid>
    );
}
