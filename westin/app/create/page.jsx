'use client';
import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import LaunchCard from '../../components/LaunchCard';
import { LIMITS } from '../../lib/config';
import { createLaunch } from '../../lib/meteora';

const init = { name: '', ticker: '', supply: 1e9, decimals: 9, team: 0, type: 'timed', countdownMin: 60, raise: 85, startFee: 50, decay: 30, lpLock: true };

function validate(f) {
  const e = {};
  const inR = (v, [a, b]) => v >= a && v <= b;
  if (!f.name || f.name.length > 32) e.name = 'Name is required, 32 characters max.';
  if (!/^[A-Za-z0-9]{2,10}$/.test(f.ticker)) e.ticker = 'Ticker: 2 to 10 letters or numbers.';
  if (!inR(f.supply, LIMITS.supply)) e.supply = 'Supply must be between 1M and 1T.';
  if (!inR(f.team, LIMITS.team)) e.team = 'Team share must be 0 to 20%.';
  if (!inR(f.raise, LIMITS.raise)) e.raise = 'Target raise must be 10 to 500 SOL.';
  if (!inR(f.startFee, LIMITS.fee)) e.startFee = 'Starting fee must be 3 to 99%.';
  if (!inR(f.decay, LIMITS.decay)) e.decay = 'Decay must be 10 to 3600 seconds.';
  return e;
}

export default function Create() {
  const [f, setF] = useState(init);
  const [msg, setMsg] = useState('');
  const { connection } = useConnection();
  const wallet = useWallet();
  const errors = validate(f);
  const set = (k, num) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : num ? Number(e.target.value) : e.target.value });

  async function submit() {
    if (!wallet.connected) return setMsg('Connect your wallet first.');
    if (Object.keys(errors).length) return setMsg('Fix the highlighted fields first.');
    try { await createLaunch(wallet, connection, f); } catch (err) { setMsg(err.message); }
  }

  const Field = ({ k, label, num, type = 'text' }) => (
    <label className="block text-sm">
      <span className="text-mute">{label}</span>
      <input type={type} value={f[k]} onChange={set(k, num)} className="mt-1 w-full field" />
      {errors[k] && <span className="text-xs text-red-400">{errors[k]}</span>}
    </label>
  );

  return (
    <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_340px]">
      <div className="space-y-5">
        <h1 className="font-display text-5xl">Light a fuse</h1>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field k="name" label="Name" /><Field k="ticker" label="Ticker" />
          <Field k="supply" label="Total supply" num type="number" /><Field k="team" label="Team share (%)" num type="number" />
          <Field k="raise" label="Target raise (SOL)" num type="number" />
          <label className="block text-sm"><span className="text-mute">Launch type</span>
            <select value={f.type} onChange={set('type')} className="mt-1 w-full field">
              <option value="instant">Instant ignition</option><option value="timed">Timed fuse</option><option value="commit">Timed fuse with commitments</option>
            </select></label>
          <Field k="startFee" label="Anti-sniper starting fee (%)" num type="number" />
          <Field k="decay" label="Fee drops to 2% over (seconds)" num type="number" />
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.lpLock} onChange={set('lpLock')} /> Lock liquidity forever</label>
        <button onClick={submit} className="btn">Review and launch</button>
        {msg && <p className="text-sm text-mute">{msg}</p>}
      </div>
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="mb-3 text-sm text-mute">Preview</p>
        <LaunchCard l={{ name: f.name || 'Your token', ticker: f.ticker || 'TICK', type: f.type === 'instant' ? 'instant' : 'timed', igniteInMin: f.countdownMin, raised: 0, target: f.raise, team: f.team, lpLocked: f.lpLock }} />
      </aside>
    </div>
  );
}
