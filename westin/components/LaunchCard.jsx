'use client';
import { useEffect, useState } from 'react';

const clock = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, '0')).join(':');
};

export default function LaunchCard({ l }) {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    if (l.type !== 'timed') return;
    const end = Date.now() + l.igniteInMin * 60000;
    const tick = () => setLeft(end - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [l]);

  const timed = l.type === 'timed';
  const fuse = left == null ? 100 : Math.min(100, (left / 86400000) * 100);
  const pct = Math.min(100, (l.raised / l.target) * 100);

  return (
    <article className="border border-line bg-panel/70 p-6 backdrop-blur-md transition-colors hover:border-spark/60">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl leading-none">{l.name}</h3>
          <p className="mt-2 text-xs text-mute">${l.ticker}</p>
        </div>
        <span className="text-xs text-mute">{timed ? 'Timed fuse' : 'Live on curve'}</span>
      </div>
      {timed ? (
        <div className="mt-8">
          <p className="num font-display text-4xl text-spark">{left == null ? '--:--:--' : clock(left)}</p>
          <div className="relative mt-4 h-px bg-line">
            <div className="absolute inset-y-0 left-0 bg-spark" style={{ width: `${fuse}%` }}>
              <span className="spark absolute -right-1 -top-[3px] h-[7px] w-[7px] rounded-full bg-spark" />
            </div>
          </div>
          <p className="mt-3 text-xs text-mute">until ignition</p>
        </div>
      ) : (
        <div className="mt-8">
          <p className="num font-display text-4xl">{l.raised} <span className="text-lg text-mute">of {l.target} SOL</span></p>
          <div className="mt-4 h-px bg-line"><div className="h-px bg-ok" style={{ width: `${pct}%` }} /></div>
          <p className="mt-3 text-xs text-mute">{Math.round(pct)}% of the curve filled</p>
        </div>
      )}
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-4 text-xs text-mute">
        <span>Team {l.team}%</span>
        {l.lpLocked ? <span>LP locked</span> : <span className="text-red-400">No LP lock</span>}
        <span>Mint revoked</span>
      </div>
    </article>
  );
}
