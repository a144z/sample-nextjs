import type { Metadata } from "next";
import { ThemeProvider } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medix Co-pilot",
  description: "AI-powered clinic management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-medix-navy-dark">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
