import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import BasicInfo from "@/app/components/BasicInfo";

interface WithBasicInfoLayoutProps {
    children: ReactNode;
}

export default function WithBasicInfoLayout({ children }: WithBasicInfoLayoutProps) {
    return (
        <Box p={8}>
            <BasicInfo />
            {children}
        </Box>
    );
}
