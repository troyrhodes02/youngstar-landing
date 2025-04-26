"use client";

import React, { useState } from "react";
import { Typography, Box, Grid, Modal, useTheme, useMediaQuery } from "@mui/material";
import { OptimizedImage } from "../../../OptimizedImage";

export const Section2Mobile = () => {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
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
          padding: { xs: "20px 10px", sm: "25px 12px", md: "30px 15px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "95%", sm: "92%", md: "90%" },
            height: "2px",
            backgroundColor: "#333",
            marginBottom: { xs: "20px", sm: "25px", md: "30px" },
          }}
        />

        <Grid
          container
          spacing={{ xs: 2, sm: 2.5, md: 3 }}
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
                  mb: { xs: 2, sm: 2.5, md: 3 },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: { xs: "280px", sm: "350px", md: "400px" },
                    height: { xs: "200px", sm: "225px", md: "250px" },
                    marginBottom: { xs: "12px", sm: "14px", md: "15px" },
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
                  <OptimizedImage
                    src={`/${item.image}`}
                    alt={`Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition={item.objectPosition || "center"}
                    style={{ borderRadius: "10px" }}
                    priority={index === 0}
                    lazyLoad={index !== 0}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                    fontWeight: "bold",
                    lineHeight: 1.5,
                    textAlign: "center",
                    color: "#333",
                    px: { xs: 1, sm: 2, md: 3 },
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
            width: "95%",
            maxWidth: { xs: "350px", sm: "500px", md: "600px" },
            maxHeight: { xs: "80%", sm: "85%" },
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
              src={`/${currentImage}`}
              alt="Full View"
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
