"use client";

import React, { useState } from "react";
import { Stack, Typography, Box, Modal, useTheme, useMediaQuery } from "@mui/material";
import { OptimizedImage } from "../../../OptimizedImage";

export const NewspaperHeaderMobile = () => {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumMobile = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
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
          padding: { xs: "8px 0", sm: "10px 0", md: "12px 0" },
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
            width: { xs: "90%", sm: "85%", md: "80%" },
            height: "2px",
            backgroundColor: "#333",
            marginBottom: { xs: "6px", sm: "8px", md: "10px" },
            zIndex: 1,
          }}
        />
        <Typography
          variant="h2"
          sx={{
            position: "relative",
            fontSize: { xs: "1.3rem", sm: "2rem", md: "3rem" },
            fontWeight: "bold",
            fontFamily: "'Times New Roman', Times, serif",
            textTransform: "uppercase",
            letterSpacing: { xs: "1px", sm: "2px", md: "3px" },
            zIndex: 1,
            textAlign: "center",
            color: "#333",
            px: 2,
          }}
        >
          Volume 1 Archives
        </Typography>
        <Stack
          sx={{
            position: "relative",
            width: { xs: "90%", sm: "85%", md: "80%" },
            height: "2px",
            backgroundColor: "#333",
            marginTop: { xs: "6px", sm: "8px", md: "10px" },
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "relative",
            width: { xs: "90%", sm: "85%", md: "80%" },
            height: { xs: "120px", sm: "150px", md: "180px" },
            marginTop: { xs: "12px", sm: "14px", md: "16px" },
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
            width: { xs: "90%", sm: "85%", md: "80%" },
            height: "2px",
            backgroundColor: "#333",
            marginTop: { xs: "12px", sm: "14px", md: "16px" },
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
            width: "95%",
            maxWidth: { xs: "400px", sm: "500px", md: "600px" },
            maxHeight: "85%",
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
              width={600}
              height={400}
              lazyLoad={false}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};
