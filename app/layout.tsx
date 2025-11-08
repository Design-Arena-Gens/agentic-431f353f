import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Is It Free Here?",
  description: "Discover free resources, spaces, and services around you with a smart decision helper.",
  openGraph: {
    title: "Is It Free Here?",
    description: "Find free amenities, events, and services nearby in seconds.",
    url: "https://agentic-431f353f.vercel.app",
    siteName: "Is It Free Here?",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Is It Free Here?",
    description: "Discover free resources and services near you."
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
