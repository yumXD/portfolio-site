import {Box} from "@chakra-ui/react";
import Certificates from "@/app/components/Certificates";
import Education from "@/app/components/Education";
import TechStack from "@/app/components/TechStack";
import AboutMe from "@/app/components/AboutMe";
import WithBasicInfoLayout from "@/app/layouts/WithBasicInfoLayout";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "이력서",
    description: "이력서 사이트입니다."
};

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
