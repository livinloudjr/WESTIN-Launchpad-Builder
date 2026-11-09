# $Westin

Fair token launches on Solana, built on Meteora.

## Run locally
    npm install
    cp .env.example .env.local   # Windows PowerShell: Copy-Item .env.example .env.local
    npm run dev                  # http://localhost:3000

## Customize
- Name and tagline: `lib/config.js`
- Colors and fonts: `tailwind.config.js`
- Docs content: `lib/docs.js`

## Status
- Done: Explore, Create (validation + preview), Portfolio (placeholder), Docs, wallet connect, 3D scene.
- Next: `lib/meteora.js` (Dynamic Bonding Curve, DAMM v2, Alpha Vault) on devnet, then API routes for IPFS, scheduled launches and moderation.

## Security
Never commit `.env.local` or any private key or seed phrase. Only `.env.example` belongs in the repo.
