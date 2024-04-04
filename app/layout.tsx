import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/ui/nav/NavBar";
import Footer from "./components/Footer";
import Provider from "./components/Provider";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "BlogX | open source | personal blog",
  description:
    "BlogeX is an open source blogging template built with nextjs 13",
  metadataBase: new URL("https://blogs-flame.vercel.app/"),
  openGraph: {
    title: "BlogX | open source | personal blog",
    description:
      "BlogeX is an open source blogging template built with nextjs 13",
    siteName: "BlogX",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${roboto.variable} min-h-screen flex-col`}>
        <Provider>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
