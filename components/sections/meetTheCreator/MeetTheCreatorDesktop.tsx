"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

export const MeetTheCreatorDesktop = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "900px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#f5d2d2",
        }}
      />

      <Box
        sx={{
          flex: 1,
          position: "relative",
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        <Image
          src="/alyssa2.jpg"
          alt="Creator"
          layout="fill"
          objectFit="cover"
          priority
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#333",
          borderRadius: "16px",
          padding: "20px",
          maxWidth: "400px",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Meet Alyssa,
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            marginBottom: "10px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Creator of YOUNGSTARWORLD
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "white",
            lineHeight: "1.5",
            textAlign: "center",
            fontSize: "1.2rem",
          }}
        >
          <strong>OMG! Hey, I'm Alyssa!</strong> I'm a 21-year-old entrepreneur,
          growing media personality, and the proud creator of{" "}
          <strong>YOUNGSTARWORLD</strong>—a brand built from the heart of{" "}
          <strong>Dallas, Texas</strong>. My mission is simple: to bring
          confidence, style, and empowerment to today’s world through fashion.
          <br />
          <br />
          With a mindset that says,{" "}
          <strong>“I’m a star, how could I not shine?”</strong> I channel that
          energy and creativity into every piece of clothing we create, treating
          fabric as a canvas to capture the vibrant energy and spirit of today’s
          youth.
          <br />
          <br />
          At <strong>YOUNGSTARWORLD</strong>, we embrace the truth that{" "}
          <strong>
            we are the youth of society, the young stars of the world.
          </strong>{" "}
          Every design reflects that spirit of self-expression, confidence, and
          unity, making a statement that we’re here to shine and be seen.
          <br />
          <br />
          Thank you for being part of this journey and supporting a brand that
          reflects the <strong>YOUNGSTAR energy</strong> you bring to the world.
          ^_−☆
        </Typography>
      </Box>
    </Box>
  );
};
