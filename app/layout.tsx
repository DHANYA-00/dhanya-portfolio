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
  title: "Dhanya Lakshmi | Full-Stack Developer",
  description: "Personal developer portfolio of Dhanya Lakshmi, specializing in full-stack web development (MERN + Socket.IO) and cross-platform mobile development (Flutter).",
  keywords: ["Dhanya Lakshmi", "Full-Stack Developer", "MERN Developer", "Flutter Developer", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dhanya Lakshmi",
    "jobTitle": "Full-Stack Developer",
    "url": "https://dhanya-portfolio.netlify.app",
    "sameAs": [
      "https://github.com/DHANYA-00",
      "https://www.linkedin.com/in/dhanya-lakshmi-s-s-6114ab329/"
    ],
    "knowsAbout": ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "Flutter", "TypeScript"]
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
