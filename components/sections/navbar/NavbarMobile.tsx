"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface NavbarMobileProps {
  alwaysWhite?: boolean;
}

export const NavbarMobile: React.FC<NavbarMobileProps> = ({ alwaysWhite }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setDrawerOpen(open);
    };

  const starColor = "red";

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "black",
          height: "64px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          zIndex: 1100,
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          <Box />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "20px",
                height: "20px",
                backgroundColor: starColor,
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                marginRight: "8px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                letterSpacing: "5px",
                textAlign: "center",
              }}
            >
              YOUNGSTARWORLD
            </Typography>
          </Box>

          <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: "60%" }}>
          <List>
            <ListItem component="div" sx={{ padding: 0 }}>
              <Link href="/" passHref>
                <ListItemText
                  primary="Home"
                  sx={{
                    padding: "16px",
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={toggleDrawer(false)}
                />
              </Link>
            </ListItem>
            <ListItem component="div" sx={{ padding: 0 }}>
              <Link href="/lookbook" passHref>
                <ListItemText
                  primary="Lookbook"
                  sx={{
                    padding: "16px",
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={toggleDrawer(false)}
                />
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
