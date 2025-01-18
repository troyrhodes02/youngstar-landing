"use client";

import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { MeetTheCreatorDesktop } from "./MeetTheCreatorDesktop";
import { MeetTheCreatorMobile } from "./MeetTheCreatorMobile";

export const MeetTheCreator = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? <MeetTheCreatorMobile /> : <MeetTheCreatorDesktop />;
};
