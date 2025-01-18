"use client";

import React from "react";
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
        component="img"
        src="/alyssa2.png"
        alt="Creator"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "60%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

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
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Meet the Creator
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
