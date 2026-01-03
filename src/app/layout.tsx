import type { Metadata } from "next";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "@fontsource/funnel-sans/400.css";
import "@fontsource/funnel-sans/500.css";
import "@fontsource/funnel-sans/600.css";
import "@fontsource/funnel-sans/700.css";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import OrderProvider from "@/src/contexts/OrderProvider";
import QueryProvider from "../components/tanstackQuery/QueryProvider";
import Header from "../components/fixed/Header";
import Footer from "../components/fixed/Footer";
import ToastContainer from "../components/ui/ToastContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "reflawood | Tables & Mirrors Store",
  description:
    "Discover premium handcrafted tables and elegant mirrors at reflawood. Stylish furniture for timeless spaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased bg-[var(--color-Background)] text-[var(--color-Text)]`}
      >
        <OrderProvider>
          <QueryProvider>
            <Header />

            {children}
            <Footer />
            <ToastContainer />
          </QueryProvider>
        </OrderProvider>
      </body>
    </html>
  );
}
