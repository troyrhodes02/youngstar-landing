"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Bebas_Neue } from "next/font/google";
import { CartProvider } from "../context/CartContext";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

const theme = createTheme({
  typography: {
    fontFamily: "Bebas Neue, Arial, sans-serif",
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ margin: 0, padding: 0, width: "100%", height: "100%" }}
    >
      <body
        className={`${bebasNeue.variable}`}
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          overflowX: "hidden",
        }}
      >
        <ThemeProvider theme={theme}>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
