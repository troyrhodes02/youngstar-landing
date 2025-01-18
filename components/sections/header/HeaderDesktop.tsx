"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

const images = [
  "/collage1.png",
  "/collage2.png",
  "/collage5.png",
  "/collage4.png",
  "/collage3.png",
];

export const HeaderDesktop: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "500px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={image}
            alt={`Collage Image ${index + 1}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          />
        </Box>
      ))}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "3rem",
            color: "white",
            letterSpacing: "7px",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Explore The Latest Collection
        </Typography>
      </Box>
    </Box>
  );
};
