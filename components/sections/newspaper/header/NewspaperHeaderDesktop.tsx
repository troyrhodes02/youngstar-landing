"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Stack, Typography, Box, Modal } from "@mui/material";

export const NewspaperHeaderDesktop = () => {
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
          padding: "20px 0",
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
            width: "90%",
            height: "2px",
            backgroundColor: "#333",
            marginBottom: "10px",
            zIndex: 1,
          }}
        />
        <Typography
          variant="h1"
          sx={{
            position: "relative",
            fontSize: "7rem",
            fontWeight: "bold",
            fontFamily: "'Times New Roman', Times, serif",
            textTransform: "uppercase",
            letterSpacing: "5px",
            zIndex: 1,
            color: "#333",
          }}
        >
          Volume 1 Archives
        </Typography>
        <Stack
          sx={{
            position: "relative",
            width: "90%",
            height: "2px",
            backgroundColor: "#333",
            marginTop: "10px",
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "relative",
            width: "90%",
            height: "300px",
            marginTop: "20px",
            zIndex: 1,
            cursor: "pointer",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05) translateY(-5px)",
            },
          }}
          onClick={handleImageClick}
        >
          <Image
            src="/newspaperHeader.jpg"
            alt="Newspaper Feature"
            layout="fill"
            objectFit="cover"
            objectPosition="50% 40%"
            priority
          />
        </Box>
        <Stack
          sx={{
            position: "relative",
            width: "90%",
            height: "2px",
            backgroundColor: "#333",
            marginTop: "20px",
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
            maxWidth: "800px",
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
            <Image
              src="/newspaperHeader.jpg"
              alt="Newspaper Full Image"
              layout="responsive"
              width={800}
              height={600}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};
