import {Box} from "@chakra-ui/react";
import BasicInfo from "@/app/components/BasicInfo";
import AboutMe from "@/app/components/AboutMe";
import TechStack from "@/app/components/TechStack";

function Page() {

    return (
        <Box p={8}>
            <BasicInfo/>
            <AboutMe/>
            <TechStack/>
        </Box>
    );
}

export default Page;
