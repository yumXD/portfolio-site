import {ReactNode} from "react";
import {Box} from "@chakra-ui/react";
import BasicInfo from "@/app/components/BasicInfo";
import Toggle from "@/app/components/Toggle";

interface WithBasicInfoLayoutProps {
    children: ReactNode;
}

export default function WithBasicInfoLayout({children}: WithBasicInfoLayoutProps) {
    return (
        <Box p={8}>
            <BasicInfo/>
            <Toggle/>
            {children}
        </Box>
    );
}
