"use client";

import {Box, Button, ButtonGroup} from "@chakra-ui/react";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Toggle() {
    const pathname = usePathname();
    const router = useRouter();
    const [selectedPage, setSelectedPage] = useState("");

    useEffect(() => {
        if (pathname === "/portfolio") {
            setSelectedPage("portfolio");
        } else if (pathname === "/resume") {
            setSelectedPage("resume");
        } else if (pathname === "/introduction") {
            setSelectedPage("introduction");
        }
    }, [pathname]);

    const handleNavigation = (page: string) => {
        if (page !== selectedPage) {
            setSelectedPage(page);
            router.push(`/${page}`);
        }
    };

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
            <ButtonGroup isAttached>
                <Button
                    colorScheme={selectedPage === "resume" ? "blue" : "gray"}
                    onClick={() => handleNavigation("resume")}
                    isDisabled={selectedPage === "resume"}
                    _disabled={{cursor: "default"}}
                >
                    이력서
                </Button>
                <Button
                    colorScheme={selectedPage === "portfolio" ? "blue" : "gray"}
                    onClick={() => handleNavigation("portfolio")}
                    isDisabled={selectedPage === "portfolio"}
                    _disabled={{cursor: "default"}}
                >
                    포트폴리오
                </Button>
                <Button
                    colorScheme={selectedPage === "introduction" ? "blue" : "gray"}
                    onClick={() => handleNavigation("introduction")}
                    isDisabled={selectedPage === "introduction"}
                    _disabled={{cursor: "default"}}
                >
                    자기소개서
                </Button>
            </ButtonGroup>
        </Box>
    );
}
