"use client";

import React, { useState } from "react";
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
                                    key={`divider-${index}`} // Unique key for the divider
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
                        paddingTop: "25px",
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
                        Streetwear is the trendiest topic and talk of the town.
                        Contrary to the traditional characteristics of clothes,
                        streetwear focuses on individuality and personality. As
                        a result, it revolutionized the concept of fashion.

                        Add a personal touch by customizing this layout as much
                        as you want. You can also add other related visuals to
                        capture the attention of the readers. Indeed, add your
                        social media links to connect more with your audience.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        paddingTop: "35px",
                        paddingLeft: "25px",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="img"
                        src="newspaper1.jpeg"
                        alt="Fashion and Streetwear"
                        sx={{
                            maxWidth: "100%",
                            height: "650px",
                            cursor: "pointer",
                            transition: "transform 0.3s ease",
                            "&:hover": {
                                transform: "scale(1.05) translateY(-5px)",
                            },
                        }}
                        onClick={handleImageClick}
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
                        component="img"
                        src="newspaper1.jpeg"
                        alt="Fashion and Streetwear"
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
