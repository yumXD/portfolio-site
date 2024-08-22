import {ReactNode} from "react";
import {Box} from "@chakra-ui/react";
import UserPage from "@/app/user/page";

interface WithBasicInfoLayoutProps {
    children: ReactNode;
}

export default function WithBasicInfoLayout({children}: WithBasicInfoLayoutProps) {
    return (
        <Box p={8}>
            <UserPage/>
            {children}
        </Box>
    );
}
