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
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
              fontSize: "1.5rem",
              letterSpacing: "5px",
            }}
          >
            YOUNGSTARWORLD
          </Typography>
          <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: "30%" }}>
          <List>
            <ListItem component="div" sx={{ padding: 0 }}>
              <Link href="/" passHref>
                <Box
                  component="a"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    textDecoration: "none",
                    color: "inherit",
                    padding: "16px",
                  }}
                  onClick={toggleDrawer(false)}
                >
                  <ListItemText primary="Home" />
                </Box>
              </Link>
            </ListItem>
            <ListItem component="div" sx={{ padding: 0 }}>
              <Link href="/lookbook" passHref>
                <Box
                  component="a"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    textDecoration: "none",
                    color: "inherit",
                    padding: "16px",
                  }}
                  onClick={toggleDrawer(false)}
                >
                  <ListItemText primary="Lookbook" />
                </Box>
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
