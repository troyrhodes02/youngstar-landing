"use client";

import React, { useState } from "react";
import { Typography, Box, Grid, Modal } from "@mui/material";

export const Section2Desktop = () => {
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
                    padding: "60px 30px",
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
                        marginBottom: "50px",
                    }}
                />

                <Grid
                    container
                    sx={{
                        maxWidth: "80%",
                        justifyContent: "space-between",
                        alignItems: "stretch",
                    }}
                    spacing={5}
                >
                    {[
                        {
                            image: "news3.png",
                            text: "Add a personal touch by customizing this layout as much as you want. Add social media links for engagement. Streetwear has the power to express individuality and revolutionize personal style.",
                            imageHeight: "500px",
                            textAboveImage: false,
                        },
                        {
                            image: "news4.png",
                            text: "The trendsetter of our streetwear collection. Join the newsletter for an exclusive interview with them! Dive into the latest trends and discover the stories behind our designs. Explore the artistry, craftsmanship, and inspiration that make every piece unique and unforgettable. Whether it’s your first look or your go-to style, you’ll find something to fall in love with in our latest collection.",
                            imageHeight: "300px",
                            textAboveImage: true,
                        },
                        {
                            image: "news5.png",
                            text: "Personalize this by customizing this layout. You can also add other visuals to capture the attention of the readers. Add social media links for engagement. Unleash creativity and elevate your wardrobe with a touch of bold originality. Let your style tell your story and inspire others to do the same. This is more than fashion; it’s a lifestyle built on boldness, confidence, and the art of standing out from the crowd.",
                            imageHeight: "300px",
                            textAboveImage: false,
                        },
                    ].map((item, index) => (
                        <Grid item xs={12} md={3.5} key={index}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    height: "100%",
                                }}
                            >
                                {item.textAboveImage ? (
                                    <>
                                        <Typography
                                            sx={{
                                                fontSize: "1.8rem",
                                                fontWeight: "bold",
                                                lineHeight: 1.5,
                                                textAlign: "justify",
                                                color: "#333",
                                                marginBottom: "20px",
                                            }}
                                        >
                                            {item.text}
                                        </Typography>
                                        <Box
                                            component="img"
                                            src={item.image}
                                            alt={`Image ${index + 1}`}
                                            sx={{
                                                width: "100%",
                                                height: item.imageHeight,
                                                borderRadius: "10px",
                                                cursor: "pointer",
                                                transition: "transform 0.3s ease",
                                                "&:hover": {
                                                    transform: "scale(1.05) translateY(-5px)",
                                                },
                                            }}
                                            onClick={() => handleImageClick(item.image)}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Box
                                            component="img"
                                            src={item.image}
                                            alt={`Image ${index + 1}`}
                                            sx={{
                                                width: "100%",
                                                height: item.imageHeight,
                                                borderRadius: "10px",
                                                marginBottom: "20px",
                                                cursor: "pointer",
                                                transition: "transform 0.3s ease",
                                                "&:hover": {
                                                    transform: "scale(1.05) translateY(-5px)",
                                                },
                                            }}
                                            onClick={() => handleImageClick(item.image)}
                                        />
                                        <Typography
                                            sx={{
                                                fontSize: "1.8rem",
                                                fontWeight: "bold",
                                                lineHeight: 1.5,
                                                textAlign: "justify",
                                                color: "#333",
                                            }}
                                        >
                                            {item.text}
                                        </Typography>
                                    </>
                                )}
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
                        component="img"
                        src={currentImage}
                        alt="Full View"
                        sx={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                        }}
                    />
                </Box>
            </Modal>
        </>
    );
};
