"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Typography, Box, Divider, Modal } from "@mui/material";

export const Section1Mobile = () => {
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
          padding: "20px 10px",
        }}
      >
        {["Lifestyle", "Fashion", "Streetwear"].map((title, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: index < 2 ? "16px" : "0",
            }}
          >
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "#333",
                textTransform: "uppercase",
                letterSpacing: "2px",
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
                  width: "100%",
                  borderColor: "#333",
                  borderWidth: "1px",
                  marginY: 1,
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
          padding: "20px",
        }}
      >
        <Box
          sx={{
            padding: "0 10px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.2rem",
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
            maxWidth: "500px",
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
          <Image
            src="/newspaper1.jpeg"
            alt="Fashion and Streetwear"
            layout="responsive"
            width={500}
            height={300}
            style={{
              borderRadius: "10px",
            }}
            priority
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
            maxWidth: "800px",
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
              src="/newspaper1.jpeg"
              alt="Fashion and Streetwear"
              layout="responsive"
              width={800}
              height={600}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};
