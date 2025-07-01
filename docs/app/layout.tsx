import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "Mantine Select Async Paginate - Documentation",
  description: "Async paginate select component for Mantine UI. Load options dynamically with pagination support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}