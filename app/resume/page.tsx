import {Box} from "@chakra-ui/react";
import Certificates from "@/app/components/Certificates";
import Education from "@/app/components/Education";
import TechStack from "@/app/components/TechStack";
import AboutMe from "@/app/components/AboutMe";
import WithBasicInfoLayout from "@/app/layouts/WithBasicInfoLayout";

export default function Page() {
    return (
        <WithBasicInfoLayout>
            <Box>
                <AboutMe/>
                <TechStack/>
                <Education/>
                <Certificates/>
            </Box>
        </WithBasicInfoLayout>
    );
}
