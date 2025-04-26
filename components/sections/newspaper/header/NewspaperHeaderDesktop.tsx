"use client";

import React, { useState } from "react";
import { Stack, Typography, Box, Modal, useTheme, useMediaQuery } from "@mui/material";
import { OptimizedImage } from "../../../OptimizedImage";

export const NewspaperHeaderDesktop = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const isMediumLargeScreen = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Stack
        sx={{
          position: "relative",
          width: "100%",
          padding: { lg: "15px 0", xl: "20px 0" },
          alignItems: "center",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          },
        }}
      >
        <Stack
          sx={{
            position: "relative",
            width: { lg: "95%", xl: "90%" },
            height: "2px",
            backgroundColor: "#333",
            marginBottom: { lg: "8px", xl: "10px" },
            zIndex: 1,
          }}
        />
        <Typography
          variant="h1"
          sx={{
            position: "relative",
            fontSize: { lg: "5rem", xl: "7rem" },
            fontWeight: "bold",
            fontFamily: "'Times New Roman', Times, serif",
            textTransform: "uppercase",
            letterSpacing: { lg: "3px", xl: "5px" },
            zIndex: 1,
            color: "#333",
            textAlign: "center",
          }}
        >
          Volume 1 Archives
        </Typography>
        <Stack
          sx={{
            position: "relative",
            width: { lg: "95%", xl: "90%" },
            height: "2px",
            backgroundColor: "#333",
            marginTop: { lg: "8px", xl: "10px" },
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "relative",
            width: { lg: "95%", xl: "90%" },
            height: { lg: "250px", xl: "300px" },
            marginTop: { lg: "15px", xl: "20px" },
            zIndex: 1,
            cursor: "pointer",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05) translateY(-5px)",
            },
          }}
          onClick={handleImageClick}
        >
          <OptimizedImage
            src="/newspaperHeader.jpg"
            alt="Newspaper Feature"
            layout="fill"
            objectFit="cover"
            objectPosition="50% 40%"
            priority
            lazyLoad={false}
          />
        </Box>
        <Stack
          sx={{
            position: "relative",
            width: { lg: "95%", xl: "90%" },
            height: "2px",
            backgroundColor: "#333",
            marginTop: { lg: "15px", xl: "20px" },
            zIndex: 1,
          }}
        />
      </Stack>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: { lg: "700px", xl: "800px" },
            maxHeight: "80%",
            overflow: "hidden",
            backgroundColor: "#fff",
            outline: "none",
            borderRadius: "8px",
            boxShadow: 24,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "auto",
            }}
          >
            <OptimizedImage
              src="/newspaperHeader.jpg"
              alt="Newspaper Full Image"
              layout="responsive"
              width={800}
              height={600}
              lazyLoad={false}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};
