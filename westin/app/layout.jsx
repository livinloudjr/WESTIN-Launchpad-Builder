import './globals.css';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import Providers from './providers';
import Header from '../components/Header';
import Scene from '../components/Scene';
import { SITE } from '../lib/config';

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-display' });
const body = Manrope({ subsets: ['latin'], variable: '--font-body' });
export const metadata = { title: `${SITE.name}: ${SITE.tagline}`, description: SITE.description };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-sans`}>
        <Providers>
          <Scene />
          <Header />
          <main className="relative z-[1] mx-auto max-w-6xl px-5 pb-24 sm:px-8">{children}</main>
          <footer className="relative z-[1] border-t border-line px-5 py-10 text-center text-xs leading-relaxed text-mute">
            Tokens are highly risky and can lose all value. Nothing here is financial advice.
          </footer>
        </Providers>
      </body>
    </html>
  );
}
