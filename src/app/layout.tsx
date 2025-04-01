import type { Metadata } from "next";
import "./globals.css";
import { outfit } from "@/fonts";
import GlobalProvider from "@/provider/global-provider";
import { DashboardLaoyout } from "@/components";


export const metadata: Metadata = {
  title: "Tangl Capital Partners | Admin Portal",
  description: "",
  //  Open Graph
  openGraph: {
    title: "Tangl Capital Partners",
    description: "", url: "https://nextjs.org",
    siteName: "Next.js",
    images: [
      {
        url: "https://i.ibb.co/D12gDtR/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://i.ibb.co/D12gDtR/og.png",
        width: 1800,
        height: 1600,
        alt: "Tangl Capital Partners",
      },
    ],
    locale: "en_GB",
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Tangl Capital Partners",
    description: "", images: ["https://i.ibb.co/D12gDtR/og.png"],
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "android-chrome-icon",
      url: "/android-chrome-192x192.png",
    },
  },

  // Manifest
  manifest: "/site.webmanifest",

};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={`${outfit.variable} ${outfit.className} antialiased`}>
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
