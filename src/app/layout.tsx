import type { Metadata } from "next";
import "../index.css";
import "../App.css";
import SiteShell from "../components/SiteShell";

export const metadata: Metadata = {
  title: "VanhongHorn Portfolio",
  description: "Cyber Security student portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
