import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Etichetta | Il Test dell'Impossibilità di Essere Definiti",
    template: "%s | Etichetta",
  },
  description:
    "Scopri chi sei attraverso il Test dell'Impossibilità di Essere Definiti. Una parola che non esisteva prima di questo momento. Un progetto di Backdoor Studio.",
  keywords: [
    "etichetta",
    "test personalità",
    "backdoor studio",
    "identità",
    "definizione",
    "tratto personale",
  ],
  authors: [{ name: "Backdoor Studio", url: "https://backdoor.studio" }],
  creator: "Backdoor Studio",
  publisher: "Backdoor Studio",
  metadataBase: new URL("https://etichetta.vercel.app"),
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://etichetta.vercel.app",
    siteName: "Etichetta",
    title: "Etichetta | Il Test dell'Impossibilità di Essere Definiti",
    description:
      "Scopri chi sei attraverso il Test dell'Impossibilità di Essere Definiti. Una parola che non esisteva prima di questo momento.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etichetta | Il Test dell'Impossibilità di Essere Definiti",
    description:
      "Scopri chi sei attraverso il Test dell'Impossibilità di Essere Definiti. Una parola che non esisteva prima di questo momento.",
    creator: "@backdoorstudio",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/favicon/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/favicon/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/favicon/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/favicon/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/favicon/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/favicon/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/favicon/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/favicon/apple-icon-180x180.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon/apple-icon.png",
      },
    ],
  },
  manifest: "/favicon/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Etichetta",
  },
  formatDetection: {
    telephone: false,
  },
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0c" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
