'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SITE, NETWORK } from '../lib/config';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((m) => m.WalletMultiButton),
  { ssr: false }
);
const links = [['/', 'Explore'], ['/create', 'Create'], ['/portfolio', 'Portfolio'], ['/docs', 'Docs']];

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-1 px-5 py-3 sm:px-8">
        <Link href="/" className="font-display text-2xl tracking-wide">{SITE.name}</Link>
        <nav className="order-3 -mx-1 flex w-full gap-6 overflow-x-auto text-sm text-mute md:order-none md:mx-0 md:w-auto">
          {links.map(([href, label]) => <Link key={href} href={href} className="whitespace-nowrap py-2 hover:text-ivory">{label}</Link>)}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-xs text-mute sm:block">{NETWORK}</span>
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
}
