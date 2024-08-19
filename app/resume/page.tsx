import {Box} from "@chakra-ui/react";
import BasicInfo from "@/app/components/BasicInfo";
import AboutMe from "@/app/components/AboutMe";
import TechStack from "@/app/components/TechStack";
import Education from "@/app/components/Education";
import Certificates from "@/app/components/Certificates";

function Page() {
    return (
        <Box p={8}>
            <BasicInfo/>
            <AboutMe/>
            <TechStack/>
            <Education/>
            <Certificates/>
        </Box>
    );
}

export default Page;
