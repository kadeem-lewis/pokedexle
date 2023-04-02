"use client";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import localFont from "next/font/local";

const pokemonDs = localFont({
  src: "../public/fonts/pokemon-ds.ttf",
  variable: "--font-pokemon-ds",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pokemonDs.className}>
        <Providers>
          <div className=" max-w-md mx-auto px-4">
            <Navbar />
            <main className="pt-2 text-2xl">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
