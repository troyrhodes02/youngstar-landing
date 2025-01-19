"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const images = [
  "/collage1.jpg",
  "/collage2.jpg",
  "/collage5.jpg",
  "/collage4.jpg",
  "/collage3.jpg",
];

export const HeaderMobile: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        height: "150px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
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
            <Image
              src={image}
              alt={`Collage Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
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
      </Box>

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
          sx={{
            fontSize: "1.5rem",
            color: "white",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Explore The Collection
        </Typography>
      </Box>
    </Box>
  );
};
