"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

export const MeetTheCreatorMobile = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "60%",
          overflow: "hidden",
        }}
      >
        <Image
          src="/alyssa2.jpg"
          alt="Creator"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          width: "100%",
          height: "60%",
          backgroundColor: "#f5d2d2",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
          }}
        >
          Meet Alyssa,
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Creator of YOUNGSTARWORLD
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#555",
            lineHeight: "1.5",
            textAlign: "center",
            width: "95%",
          }}
        >
          <strong>OMG! Hey, I'm Alyssa!</strong> I'm a 21-year-old entrepreneur, growing media personality, and the proud creator of <strong>YOUNGSTARWORLD</strong>—a brand built from the heart of <strong>Dallas, Texas</strong>. My mission is simple: to bring confidence, style, and empowerment to today’s world through fashion.
          <br />
          <br />
          With a mindset that says, <strong>“I’m a star, how could I not shine?”</strong> I channel that energy and creativity into every piece of clothing we create, treating fabric as a canvas to capture the vibrant energy and spirit of today’s youth.
          <br />
          <br />
          At <strong>YOUNGSTARWORLD</strong>, we embrace the truth that <strong>we are the youth of society, the young stars of the world.</strong> Every design reflects that spirit of self-expression, confidence, and unity, making a statement that we’re here to shine and be seen.
          <br />
          <br />
          Thank you for being part of this journey and supporting a brand that reflects the <strong>YOUNGSTAR energy</strong> you bring to the world. ^_−☆
        </Typography>
      </Box>
    </Box>
  );
};
