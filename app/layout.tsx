import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/jetbrains-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "aattica. — UX/UI & Product Designer",
  description: "Portfolio of Daniil Golsky, UX/UI and product designer.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
