import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ceferino Troya | AI Solutions Architect & Data Scientist",
  description: "Experienced AI Developer specializing in conversational agents, machine learning, and intelligent automation. Proven track record with enterprise AI solutions.",
  keywords: ["AI Developer", "Data Scientist", "Machine Learning", "LangChain", "OpenAI", "Python", "TensorFlow"],
  authors: [{ name: "Ceferino Troya" }],
  openGraph: {
    title: "Ceferino Troya | AI Solutions Architect",
    description: "Building intelligent AI solutions that deliver real business impact",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
