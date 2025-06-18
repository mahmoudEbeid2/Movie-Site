import { Geist, Geist_Mono,Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { LanguageProvider } from './contexts/LanguageContext';
import NavbarComponent from "@/components/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ 
variable:"--font-inter",
subsets: ["latin"] });

export const metadata = {
  title: "Movie App",
  description: "This is a movie app built with Next.js and powered by The Movie Database (TMDB) API.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${inter.variable}  antialiased`}
      >
      <LanguageProvider>
        <NavbarComponent />
        {children}
      </LanguageProvider>
      </body>
    </html>
  );
}
