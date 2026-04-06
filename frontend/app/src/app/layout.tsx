import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Hierarchy Query System",
  description: "Advanced trees project using Euler Tour and Binary Lifting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
