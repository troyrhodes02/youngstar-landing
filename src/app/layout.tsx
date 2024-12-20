"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Bebas_Neue } from "next/font/google";

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
    <html lang="en">
      <body className={`${bebasNeue.variable}`}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
