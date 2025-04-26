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

export const Section1Mobile = () => {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: "15px 8px", sm: "18px 10px", md: "20px 12px" },
        }}
      >
        {["Lifestyle", "Fashion", "Streetwear"].map((title, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom:
                index < 2 ? { xs: "12px", sm: "14px", md: "16px" } : "0",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                color: "#333",
                textTransform: "uppercase",
                letterSpacing: { xs: "1px", sm: "1.5px", md: "2px" },
                fontFamily: "'Times New Roman', Times, serif",
              }}
            >
              {title}
            </Typography>
            {index < 2 && (
              <Divider
                orientation="horizontal"
                flexItem
                sx={{
                  width: { xs: "85%", sm: "90%", md: "95%" },
                  borderColor: "#333",
                  borderWidth: { xs: "0.5px", sm: "0.75px", md: "1px" },
                  marginY: { xs: 0.75, sm: 1, md: 1.25 },
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: { xs: "15px 10px", sm: "18px 15px", md: "20px" },
        }}
      >
        <Box
          sx={{
            padding: { xs: "0 8px", sm: "0 10px", md: "0 15px" },
            marginBottom: { xs: "15px", sm: "18px", md: "20px" },
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
              lineHeight: 1.6,
              color: "#333",
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            position: "relative",
            maxWidth: { xs: "300px", sm: "400px", md: "500px" },
            height: "auto",
            borderRadius: "10px",
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
            layout="responsive"
            width={500}
            height={300}
            style={{
              borderRadius: "10px",
            }}
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
            width: "95%",
            maxWidth: { xs: "350px", sm: "550px", md: "650px" },
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
