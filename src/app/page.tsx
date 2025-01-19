"use client";

import { useState, useEffect } from "react";
import { Stack, CircularProgress } from "@mui/material";
import { FeaturedProduct } from "../../components/sections/featured/FeaturedProduct";
import { Header } from "../../components/sections/header/Header";
import { MeetTheCreator } from "../../components/sections/meetTheCreator/MeetTheCreator";
import { Navbar } from "../../components/sections/navbar/Navbar";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Stack
          sx={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
          }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Stack
          sx={{
            paddingTop: { xs: "64px", md: "0" },
          }}
        >
          <Navbar />
          <Header />
          <FeaturedProduct />
          <MeetTheCreator />
        </Stack>
      )}
    </>
  );
}
