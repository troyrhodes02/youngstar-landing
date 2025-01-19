"use client";

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import Link from "next/link";

interface NavbarDesktopProps {
  alwaysWhite?: boolean;
}

export const NavbarDesktop: React.FC<NavbarDesktopProps> = ({
  alwaysWhite = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!alwaysWhite) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [alwaysWhite]);

  const navbarBackgroundColor =
    alwaysWhite || isScrolled ? "white" : "transparent";
  const navbarTextColor = alwaysWhite || isScrolled ? "black" : "white";
  const starColor = alwaysWhite || isScrolled ? "red" : "white";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: navbarBackgroundColor,
        transition: "background-color 0.3s ease",
        boxShadow:
          alwaysWhite || isScrolled ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
        color: navbarTextColor,
        height: "100px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          height: "100%",
        }}
      >
        <Box sx={{ flex: 1 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "25px",
              height: "25px",
              backgroundColor: starColor,
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              transition: "background-color 0.3s ease",
              marginRight: "15px",
              display: "inline-block",
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: "2.5rem",
              letterSpacing: "7px",
              color: "inherit",
              lineHeight: 1,
            }}
          >
            YOUNGSTARWORLD
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Link href="/" passHref>
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                textTransform: "uppercase",
                fontWeight: "500",
                fontSize: "1.25rem",
                color: navbarTextColor,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Home
            </Typography>
          </Link>
          <Link href="/lookbook" passHref>
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                textTransform: "uppercase",
                fontWeight: "500",
                fontSize: "1.25rem",
                color: navbarTextColor,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Lookbook
            </Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
