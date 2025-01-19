"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Typography, Box, Divider, Modal } from "@mui/material";

export const Section1Desktop = () => {
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
        }}
      >
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            height: "75px",
            marginBottom: "50px",
          }}
        >
          {["Lifestyle", "Fashion", "Streetwear"].map((title, index) => (
            <React.Fragment key={index}>
              <Typography
                variant="h1"
                align="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: "4.5rem",
                  color: "#333",
                  textTransform: "uppercase",
                  letterSpacing: "10px",
                  fontFamily: "'Times New Roman', Times, serif",
                }}
              >
                {title}
              </Typography>
              {index < 2 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    height: "75px",
                    borderColor: "#333",
                    borderWidth: "2px",
                    marginX: 2,
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
        }}
      >
        <Box
          sx={{
            flex: 1,
            paddingLeft: "200px",
          }}
        >
          <Typography
            sx={{
              fontSize: "2.8rem",
              lineHeight: 1.8,
              color: "#333",
              width: "950px",
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
            paddingLeft: "25px",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
            height: "600px",
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
            layout="fill"
            objectFit="contain"
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
