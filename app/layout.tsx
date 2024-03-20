import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProviders } from "./providers";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Provider from "./components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogs Template",
  description: "template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex-col`}>
        <Provider>
          <main className="flex-1">
            <NavBar />
            {children}
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
}
