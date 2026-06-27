import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
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
    // 1. Core Browser Attributes
    metadataBase: new URL("https://yourdomain.com"),
    title: {
        default: "Wandile Mlambo | Full-Stack Software Developer",
        template: "%s | Wandile Mlambo"
    },
    description: "Specializing in scalable full-stack applications using React, Python, FastAPI, and Django. Focused on clean code architecture and production-grade software.",
    keywords: ["Full Stack Developer", "Python", "FastAPI", "React", "Next.js", "Django", "Software Engineer", "Sandton Developer"],
    authors: [{name: "Wandile Mlambo"}],
    creator: "Wandile Mlambo",

    // 2. Open Graph Protocol
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://yourportfolio.dev",
        title: "Wandile Mlambo | Full-Stack Software Developer",
        description: "Production-ready web applications built with React, Next.js, and Python frameworks.",
        siteName: "Wandile Mlambo Portfolio",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "Wandile Mlambo | Full-Stack Software Developer Portfolio",
            }
        ],
    },

    // 3. Twitter/X Cards
    twitter: {
        card: "summary_large_image",
        title: "Wandile Mlambo | Full-Stack Developer",
        description: "Building production web applications with React & Python."
    },

    // 4. Search Crawler Controls
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
