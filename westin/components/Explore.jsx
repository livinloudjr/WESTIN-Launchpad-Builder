'use client';
import { useState } from 'react';
import LaunchCard from './LaunchCard';
import Reveal from './Reveal';
import Tilt from './Tilt';
import { LAUNCHES } from '../lib/launches';

const tabs = [['all', 'All'], ['timed', 'Igniting soon'], ['instant', 'Live now']];

export default function Explore() {
  const [tab, setTab] = useState('all');
  const list = LAUNCHES.filter((l) => tab === 'all' || l.type === tab);
  return (
    <section id="explore" className="pt-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-4xl">Explore launches</h2>
        <div className="flex gap-1 text-sm" role="group" aria-label="Filter launches">
          {tabs.map(([k, label]) => (
            <button key={k} aria-pressed={tab === k} onClick={() => setTab(k)}
              className={`px-4 py-2 ${tab === k ? 'bg-spark text-ink' : 'border border-line text-mute hover:text-ivory'}`}>{label}</button>
          ))}
        </div>
      </div>
      {list.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((l, i) => <Reveal key={l.id} delay={i * 80}><Tilt><LaunchCard l={l} /></Tilt></Reveal>)}</div>
      ) : <p className="text-mute">No launches here yet. Light the first fuse.</p>}
    </section>
  );
}
