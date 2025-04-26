"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Divider,
  Modal,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { OptimizedImage } from "../../../OptimizedImage";

export const Section1Desktop = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("lg", "xl"));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          px: { lg: 2, xl: 4 },
        }}
      >
        <Box
          sx={{
            marginTop: { lg: "15px", xl: "20px" },
            display: "flex",
            alignItems: "center",
            height: { lg: "65px", xl: "75px" },
            marginBottom: { lg: "40px", xl: "50px" },
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["Lifestyle", "Fashion", "Streetwear"].map((title, index) => (
            <React.Fragment key={index}>
              <Typography
                variant="h1"
                align="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: { lg: "3.5rem", xl: "4.5rem" },
                  color: "#333",
                  textTransform: "uppercase",
                  letterSpacing: { lg: "7px", xl: "10px" },
                  fontFamily: "'Times New Roman', Times, serif",
                  px: 1,
                }}
              >
                {title}
              </Typography>
              {index < 2 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    height: { lg: "65px", xl: "75px" },
                    borderColor: "#333",
                    borderWidth: "2px",
                    marginX: { lg: 1.5, xl: 2 },
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: { lg: "row" },
          px: { lg: 3, xl: 4 },
          mb: { lg: 4, xl: 5 },
        }}
      >
        <Box
          sx={{
            flex: 1,
            paddingLeft: { lg: "50px", xl: "200px" },
            paddingRight: { lg: "20px", xl: "30px" },
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "2.2rem", xl: "2.8rem" },
              lineHeight: 1.8,
              color: "#333",
              width: { lg: "100%", xl: "950px" },
            }}
          >
            Creative youth are vital to the world as they bring fresh ideas,
            innovation, and new perspectives that drive change. Their energy and
            imagination challenge conventional thinking, inspire progress, and
            shape future cultural, social, and technological trends. By
            embracing their creativity, young people push boundaries, create
            solutions, and influence the world in ways that make it more dynamic
            and diverse.
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            paddingLeft: { lg: "15px", xl: "25px" },
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
            height: { lg: "500px", xl: "600px" },
            cursor: "pointer",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05) translateY(-5px)",
            },
          }}
          onClick={handleImageClick}
        >
          <OptimizedImage
            src="/newspaper1.jpeg"
            alt="Fashion and Streetwear"
            layout="fill"
            objectFit="contain"
            priority
            lazyLoad={false}
          />
        </Box>
      </Box>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: { lg: "700px", xl: "800px" },
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
            <OptimizedImage
              src="/newspaper1.jpeg"
              alt="Fashion and Streetwear"
              layout="responsive"
              width={800}
              height={600}
              lazyLoad={false}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};
