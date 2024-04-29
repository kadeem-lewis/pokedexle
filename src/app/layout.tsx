import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import localFont from "next/font/local";
import { PreloadResources } from "@/components/PreloadResources";

const pokemonDs = localFont({
  src: "../../public/fonts/pokemon-ds.woff2",
  variable: "--font-pokemon-ds",
});
//add an icon and also set a favicon if thats different
export const metadata = {
  title: {
    default: "Pokédexle",
    template: "Pokédexle | %s",
  },
  description:
    "A variety of different game modes themed around guessing all things pokemon",
  metadataBase: new URL("https://pokedexle.com"),
  openGraph: {
    title: "Pokédexle",
    description:
      "A variety of different game modes themed around guessing all things pokemon",
    siteName: "Pokédexle",
    url: "https://pokedexle.com",
    locale: "en_US",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${pokemonDs.className}`}
    >
      <PreloadResources />
      <body>
        <Providers>
          {/* TODO: Figure out why there is overflow in the first place */}
          <div className="mx-auto flex min-h-screen flex-col items-center justify-between gap-y-2">
            <Navbar />
            <main className="w-full max-w-md grow px-4 text-2xl">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
