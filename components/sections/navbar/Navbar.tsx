"use client";

import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { NavbarDesktop } from "./NavbarDesktop";
import { NavbarMobile } from "./NavbarMobile";

interface NavbarProps {
  alwaysWhite?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ alwaysWhite }) => {
  const isMobile = useMediaQuery("(max-width:960px)");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isMobile) {
    return <NavbarMobile alwaysWhite={true} />;
  }

  return <NavbarDesktop alwaysWhite={alwaysWhite || scrolled} />;
};
