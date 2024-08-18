import {Box} from "@chakra-ui/react";
import BasicInfo from "@/app/components/BasicInfo";
import AboutMe from "@/app/components/AboutMe";

function Page() {

    return (
        <Box p={8}>
            <BasicInfo/>
            <AboutMe/>
        </Box>
    );
}

export default Page;
