import {Box, Grid, GridItem} from '@chakra-ui/react';
import ProfileImage from "../components/ProfileImage";
import UserInfo from "../components/UserInfo";
import SocialLinks from "@/app/components/SocialLinks";

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
            sx={{
                '@media print': {
                    gridTemplateColumns: "1fr 3fr",
                    gap: 0,
                    padding: 0,
                }
            }}
        >
            <GridItem>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <ProfileImage data={user}/>
                    <SocialLinks data={user}/>
                </Box>
            </GridItem>
            <GridItem>
                <UserInfo data={user}/>
            </GridItem>
        </Grid>
    );
}
