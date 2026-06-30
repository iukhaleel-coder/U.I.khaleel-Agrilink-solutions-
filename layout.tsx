import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "U.I Khaleel Agrilink Solutions",
  description: "Connecting Farmers, Markets and Innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
