"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import { Section1Desktop } from "./Section1Desktop";
import { Section1Mobile } from "./Section1Mobile";

export const Section1 = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

    return (
        <>
            {isMobile ? <Section1Mobile /> : <Section1Desktop />}
        </>
    );
};
