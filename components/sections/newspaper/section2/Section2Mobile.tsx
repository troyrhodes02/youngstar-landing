"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Typography, Box, Grid, Modal } from "@mui/material";

export const Section2Mobile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");

  const handleImageClick = (image: string) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          padding: "30px 15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "2px",
            backgroundColor: "#333",
            marginBottom: "30px",
          }}
        />

        <Grid
          container
          spacing={3}
          sx={{
            maxWidth: "100%",
            justifyContent: "center",
          }}
        >
          {[
            {
              image: "news3.jpg",
              text: "As it gained popularity, street fashion empowered communities to embrace bold, unique styles that reflect their experiences and backgrounds, breaking traditional fashion norms.",
              objectPosition: "top center",
            },
            {
              image: "news4.jpg",
              text: "Street fashion has had a profound influence on urban communities, acting as a powerful form of self-expression and cultural identity. Emerging and blending influences from music, art, and social movements, it became a way for individuals, especially youth, to showcase their personality, status, and creativity.",
            },
            {
              image: "news5.jpg",
              text: "With social media and digital platforms, people can freely share their styles, beliefs, and stories, shaping both personal and global culture. It empowers individuals to break norms and celebrate diversity. The world is ours.",
            },
          ].map((item, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "400px",
                    height: "250px",
                    marginBottom: "15px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05) translateY(-5px)",
                    },
                  }}
                  onClick={() => handleImageClick(item.image)}
                >
                  <Image
                    src={`/${item.image}`}
                    alt={`Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition={item.objectPosition || "center"}
                    style={{ borderRadius: "10px" }}
                    priority
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    lineHeight: 1.5,
                    textAlign: "center",
                    color: "#333",
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

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
            sx={{
              position: "relative",
              width: "100%",
              height: "auto",
            }}
          >
            <Image
              src={`/${currentImage}`}
              alt="Full View"
              layout="responsive"
              width={600}
              height={400}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};
