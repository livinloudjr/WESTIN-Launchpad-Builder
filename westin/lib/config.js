// Ganti nama dan teks situs di sini saja.
export const SITE = {
  name: '$Westin',
  tagline: 'Every launch starts at zero.',
  description: 'Fair token launches on Solana: same price for everyone, locked liquidity, revoked mint.'
};
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com';
export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'devnet';
// Batas form, mengikuti aturan launchpad Meteora-style
export const LIMITS = { supply: [1e6, 1e12], decimals: [6, 9], team: [0, 20], raise: [10, 500], fee: [3, 99], decay: [10, 3600] };
