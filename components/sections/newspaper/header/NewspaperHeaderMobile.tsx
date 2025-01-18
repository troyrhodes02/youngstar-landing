"use client";

import React, { useState } from "react";
import { Stack, Typography, Box, Modal } from "@mui/material";

export const NewspaperHeaderMobile = () => {
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
          padding: "10px 0",
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
            width: "80%",
            height: "2px",
            backgroundColor: "#333",
            marginBottom: "8px",
            zIndex: 1,
          }}
        />
        <Typography
          variant="h2"
          sx={{
            position: "relative",
            fontSize: { xs: "1.3rem", md: "4rem" },
            fontWeight: "bold",
            fontFamily: "'Times New Roman', Times, serif",
            textTransform: "uppercase",
            letterSpacing: "3px",
            zIndex: 1,
            textAlign: "center",
            color: "#333",
          }}
        >
          Volume 1 Archives
        </Typography>
        <Stack
          sx={{
            position: "relative",
            width: "80%",
            height: "2px",
            backgroundColor: "#333",
            marginTop: "8px",
            zIndex: 1,
          }}
        />
        <Box
          component="img"
          src="/newspaperHeader.png"
          alt="Newspaper Feature"
          sx={{
            position: "relative",
            width: "80%",
            height: "150px",
            objectFit: "cover",
            objectPosition: "50% 40%",
            marginTop: "16px",
            zIndex: 1,
            transition: "transform 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.05) translateY(-5px)",
            },
          }}
          onClick={handleImageClick}
        />
        <Stack
          sx={{
            position: "relative",
            width: "80%",
            height: "2px",
            backgroundColor: "#333",
            marginTop: "16px",
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
            maxWidth: "600px",
            maxHeight: "80%",
            overflow: "hidden",
            backgroundColor: "#fff",
            outline: "none",
            borderRadius: "8px",
            boxShadow: 24,
          }}
        >
          <Box
            component="img"
            src="/newspaperHeader.png"
            alt="Newspaper Full Image"
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </Box>
      </Modal>
    </>
  );
};
