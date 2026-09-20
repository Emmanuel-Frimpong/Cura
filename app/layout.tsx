import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Heebo, Oswald, Inter } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CURA Design System",
  description: "A modern design language for CURA, your destination for curated essentials.",
};

/** Provides the shared document shell, fonts, and Clerk context for every route. */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${heebo.variable} ${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F4F4F4] text-[#232323]">
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
