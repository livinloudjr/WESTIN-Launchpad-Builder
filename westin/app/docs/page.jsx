import Link from 'next/link';
import { SITE, NETWORK } from '../../lib/config';
import { GROUPS } from '../../lib/docs';

export const metadata = {
  title: `Docs: ${SITE.name}`,
  description: `How ${SITE.name} works: timed and instant launches on Meteora, the anti-sniper fee, commitments, fees, what is on chain and the API.`
};

const fill = (s) => s.replaceAll('{N}', () => SITE.name).replaceAll('{NET}', NETWORK);
const rich = (s) => fill(s).split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/).map((p, i) =>
  p.startsWith('**') ? <strong key={i} className="font-medium text-ivory">{p.slice(2, -2)}</strong>
  : p.startsWith('`') ? <code key={i} className="break-all bg-ink px-1.5 py-0.5 text-[0.85em] text-spark">{p.slice(1, -1)}</code>
  : p.startsWith('*') ? <em key={i} className="text-ivory">{p.slice(1, -1)}</em> : p);

function Block({ b: [t, a, c] }) {
  if (t === 'p') return <p className="mt-4 leading-relaxed text-mute">{rich(a)}</p>;
  if (t === 'ul' || t === 'ol') {
    const L = t;
    return <L className={`mt-4 space-y-2 pl-5 text-mute marker:text-spark ${t === 'ul' ? 'list-disc' : 'list-decimal'}`}>{a.map((x, i) => <li key={i} className="leading-relaxed">{rich(x)}</li>)}</L>;
  }
  if (t === 'table') return (
    <div className="mt-5 overflow-x-auto border border-line">
      <table className="w-full min-w-[34rem] text-left text-sm">
        <thead className="border-b border-line text-ivory"><tr>{a.map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead>
        <tbody>{c.map((r, i) => <tr key={i} className="border-b border-line/60 align-top text-mute last:border-0">{r.map((x, j) => <td key={j} className={`px-4 py-3 leading-relaxed ${j === 0 ? 'text-ivory' : ''}`}>{rich(x)}</td>)}</tr>)}</tbody>
      </table>
    </div>);
  if (t === 'code') return <pre className="mt-4 overflow-x-auto border border-line bg-ink p-4 text-sm text-spark">{fill(a)}</pre>;
  if (t === 'link') return <Link href={a} className="btn-ghost mt-5 text-sm">{c}</Link>;
  return null;
}

const nav = GROUPS.map((g) => (
  <div key={g.title} className="mb-5">
    <p className="mb-2 text-xs text-mute/70">{g.title}</p>
    <ul className="space-y-1.5 text-sm">
      {g.sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="text-mute hover:text-ivory">{s.title}</a></li>)}
    </ul>
  </div>
));

export default function Docs() {
  return (
    <div className="py-12 sm:py-16 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
      <aside className="mb-8 lg:sticky lg:top-28 lg:mb-0 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
        <details className="border border-line bg-panel/80 p-4 backdrop-blur-md lg:hidden">
          <summary className="cursor-pointer text-sm">On this page</summary>
          <div className="mt-4">{nav}</div>
        </details>
        <div className="hidden lg:block">{nav}</div>
      </aside>
      <article className="max-w-3xl border border-line bg-ink/75 p-5 backdrop-blur-sm sm:p-8">
        <h1 className="font-display text-5xl">Docs</h1>
        {GROUPS.map((g) => (
          <div key={g.title}>
            <p className="mt-14 text-xs text-spark">{g.title}</p>
            {g.sections.map((s) => (
              <section key={s.id} id={s.id} className="mt-6 scroll-mt-32">
                <h2 className="font-display text-3xl">{s.title}</h2>
                {s.blocks.map((b, i) => <Block key={i} b={b} />)}
              </section>
            ))}
          </div>
        ))}
      </article>
    </div>
  );
}
