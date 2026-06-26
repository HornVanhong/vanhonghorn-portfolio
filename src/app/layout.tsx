import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "../index.css";
import "../App.css";
import SiteShell from "../components/SiteShell";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vanhonghorn-portfolio.vercel.app"),
  title: "Vanhong Horn | Cybersecurity & Web Developer Portfolio",
  description: "Specializing in Cyber Security, Network Configurations, and modern Front-End Web/Mobile engineering. Korea Software HRD Center 14th Gen student & MPTC Scholar.",
  openGraph: {
    title: "Vanhong Horn | Cybersecurity & Web Developer Portfolio",
    description: "Specializing in Cyber Security, Network Configurations, and modern Front-End Web/Mobile engineering. Korea Software HRD Center 14th Gen student & MPTC Scholar.",
    url: "https://vanhonghorn-portfolio.vercel.app", // standard placeholder domain that can resolve relative metadata
    siteName: "Vanhong Horn Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "Vanhong Horn Portfolio Cover Shield",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanhong Horn | Cybersecurity & Web Developer Portfolio",
    description: "Specializing in Cyber Security, Network Configurations, and modern Front-End Web/Mobile engineering. Korea Software HRD Center 14th Gen student & MPTC Scholar.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
