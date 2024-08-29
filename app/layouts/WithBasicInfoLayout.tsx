import {ReactNode} from "react";
import {Box} from "@chakra-ui/react";
import Toggle from "@/app/components/Toggle";
import UserPage from "@/app/user/page";

interface WithBasicInfoLayoutProps {
    children: ReactNode;
}

export default function WithBasicInfoLayout({children}: WithBasicInfoLayoutProps) {
    return (
        <Box p={8} sx={{
            '@media print': {
                padding: '0',
                width: '100%',
            }
        }}>
            <UserPage/>
            <Toggle/>
            {children}
        </Box>
    );
}
