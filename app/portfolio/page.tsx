import {Box} from "@chakra-ui/react";
import Portfolio from "@/app/components/Portfolio";
import WithBasicInfoLayout from "@/app/layouts/WithBasicInfoLayout";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "포트폴리오",
    description: "포트폴리오 사이트입니다."
};

export default function PortfolioPage() {
    return (
        <WithBasicInfoLayout>
            <Box>
                <Portfolio/>
            </Box>
        </WithBasicInfoLayout>
    );
}
