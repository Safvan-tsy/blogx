import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import NavBar from '@/app/components/ui/nav/NavBar';
import Footer from '@/app/components/Footer';
import Provider from '@/app/components/Provider';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: {
    default: 'BlogX | open source | personal blog',
    template: '%s | Bogx',
  },
  description: 'BlogeX is an open source blogging template built with nextjs 13',
  metadataBase: new URL('https://blogs-flame.vercel.app/'),
  openGraph: {
    title: 'BlogX | open source | personal blog',
    description: 'BlogeX is an open source blogging template built with nextjs 13',
    siteName: 'BlogX',
  },
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
};
export default RootLayout;
