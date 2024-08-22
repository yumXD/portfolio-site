import {ReactNode} from "react";
import {Box} from "@chakra-ui/react";
import Toggle from "@/app/components/Toggle";
import UserPage from "@/app/user/page";

interface WithBasicInfoLayoutProps {
    children: ReactNode;
}

export default function WithBasicInfoLayout({children}: WithBasicInfoLayoutProps) {
    return (
        <Box p={8}>
            <UserPage/>
            <Toggle/>
            {children}
        </Box>
    );
}
