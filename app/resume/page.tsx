import {Box} from "@chakra-ui/react";
import WithBasicInfoLayout from "@/app/layouts/WithBasicInfoLayout";
import {Metadata} from "next";
import AboutMePage from "@/app/about-me/page";
import TechStackPage from "@/app/tech-stack/page";

export const metadata: Metadata = {
    title: "이력서",
    description: "이력서 사이트입니다."
};

export default function Page() {
    return (
        <WithBasicInfoLayout>
            <Box>
                <AboutMePage/>
                <TechStackPage/>
            </Box>
        </WithBasicInfoLayout>
    );
}
