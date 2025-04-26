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
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { CartIcon } from "../../cart/CartIcon";
import { FaLock } from "react-icons/fa";

interface NavbarMobileProps {
  alwaysWhite?: boolean;
  showSecureBanner?: boolean;
}

export const NavbarMobile: React.FC<NavbarMobileProps> = ({ alwaysWhite, showSecureBanner = false }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setDrawerOpen(open);
    };

  const starColor = "red";
  const appBarHeight = showSecureBanner ? "88px" : "64px";

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "black",
          height: appBarHeight,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          zIndex: 1100,
          justifyContent: "center",
          transition: "height 0.3s ease",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
            minHeight: "64px",
          }}
        >
          <CartIcon />

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
        {showSecureBanner && (
          <Box sx={{ 
            width: '100%', 
            bgcolor: 'red', 
            py: 0.5,
            textAlign: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0
          }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <FaLock size={12} color="white" />
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'white', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Secure Checkout
              </Typography>
            </Stack>
          </Box>
        )}
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
            <ListItem component="div" sx={{ padding: 0 }}>
              <Link href="/cart" passHref>
                <ListItemText
                  primary="Cart"
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
