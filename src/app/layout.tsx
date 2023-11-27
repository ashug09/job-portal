const inter = Inter({ subsets: ["latin"] });
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import "../../firebase";
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import Nav from "./components/nav/page";
import LoaderAnimation from "./loader";

export const metadata = {
  title: "Job Portal",
  description: "job portal codsoft assingment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Suspense fallback={<LoaderAnimation />}>
            <Nav />
            {children}
          </Suspense>
        </MantineProvider>
      </body>
    </html>
  );
}
