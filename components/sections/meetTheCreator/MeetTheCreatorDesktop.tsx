"use client";

import React from "react";
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
        }}
      >
        <Box
          component="img"
          src="/alyssa2.png"
          alt="Creator"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
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
            marginBottom: "10px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Meet the Creator
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
          Street fashion has had a profound influence on urban communities,
          acting as a powerful form of self-expression and cultural identity.
          Emerging and blending influences from music, art, and social
          movements, it became a way for individuals, especially youth, to
          showcase their personality, status, and creativity.  As it gained
          popularity, street fashion empowered communities to embrace bold,
          unique styles that reflect their experiences and backgrounds, breaking
          traditional fashion norms. Over time, it has shaped not only local
          trends but also global fashion, creating a lasting impact on how
          culture and individuality are expressed through clothing. With social
          media and digital platforms, people can freely share their styles,
          beliefs, and stories, shaping both personal and global culture. It
          empowers individuals to break norms and celebrate diversity. The world
          is ours.  Creative youth are vital to the world as they bring fresh
          ideas, innovation, and new perspectives that drive change. Their
          energy and imagination challenge conventional thinking, inspire
          progress, and shape future cultural, social, and technological trends.
          By embracing their creativity, young people push boundaries, create
          solutions, and influence the world in ways that make it more dynamic
          and diverse.
        </Typography>
      </Box>
    </Box>
  );
};
