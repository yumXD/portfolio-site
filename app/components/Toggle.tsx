"use client";

import {Box, FormControl, FormLabel, Switch} from "@chakra-ui/react";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Toggle() {
    const pathname = usePathname();
    const router = useRouter();
    const [isChecked, setIsChecked] = useState(pathname === "/portfolio");

    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        if (newCheckedState) {
            router.push("/portfolio");
        } else {
            router.push("/resume");
        }
    };

    useEffect(() => {
        setIsChecked(pathname === "/portfolio");
    }, [pathname]);

    return (
        <Box mt={6}
             p={3}
             borderWidth="2px"
             borderRadius="lg"
             borderColor="gray.200"
             maxWidth="1024px"
             width="100%"
             mx="auto"
             minWidth="300px">
            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="toggle-switch" mb="0">
                    {isChecked ? "Portfolio" : "Resume"}
                </FormLabel>
                <Switch id="toggle-switch" isChecked={isChecked} onChange={handleToggle}/>
            </FormControl>
        </Box>
    );
}
