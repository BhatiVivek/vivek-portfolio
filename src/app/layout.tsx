import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopUtilityBar from "@/components/TopUtilityBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vivek Bhati | Senior Software Engineer",
  description: "Senior Full-Stack Developer specializing in React, TypeScript, Node.js, and Cloud Technologies. 10+ years of experience building scalable web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`} style={{ fontFamily: "'Inter', sans-serif", paddingTop: '38px' }}>
        <TopUtilityBar />
        {children}
      </body>
    </html>
  );
}
