import Link from 'next/link';
import Explore from '../components/Explore';
import Reveal from '../components/Reveal';
import { SITE } from '../lib/config';

const steps = [
  ['Light', 'Create a token in two minutes. Locked liquidity and a revoked mint are on by default.'],
  ['Burn', 'While the fuse burns, everyone commits at the same price. No early access for bots.'],
  ['Ignite', 'When the curve fills, liquidity moves to a locked pool and trading continues.']
];

export default function Home() {
  return (
    <>
      <section className="pb-6 pt-16 sm:pt-28">
        <h1 className="rise max-w-4xl font-display text-[clamp(2.9rem,8.5vw,6.5rem)] font-medium leading-[0.95] tracking-tight">{SITE.tagline}</h1>
        <p className="mt-7 max-w-lg text-base leading-relaxed text-mute">
          Launch on a countdown fuse. Everyone joins at the same price, nobody gets a hidden allocation, and the mint is revoked by default.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/create" className="btn">Light a fuse</Link>
          <a href="#explore" className="btn-ghost">Explore launches</a>
        </div>
        <div className="relative mt-20 h-px bg-line" aria-hidden="true"><span className="fuse-spark" /></div>
        <dl className="mt-6 grid grid-cols-3 gap-4 text-sm">
          {[['0%', 'insider allocation'], ['Locked', 'liquidity by default'], ['Revoked', 'mint authority']].map(([v, k]) => (
            <div key={k}><dt className="font-display text-2xl text-spark sm:text-3xl">{v}</dt><dd className="mt-1 text-xs text-mute sm:text-sm">{k}</dd></div>
          ))}
        </dl>
      </section>

      <Explore />

      <Reveal className="mt-24 border-t border-line pt-12">
        <h2 className="font-display text-4xl">How a fuse works</h2>
        <ol className="mt-10 grid gap-10 sm:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li key={t}>
              <span className="num font-display text-5xl text-line">{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl">{t}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-mute">{d}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </>
  );
}
