// Konten docs. Token {N} = nama situs, {NET} = jaringan (dari lib/config.js).
export const GROUPS = [
  { title: 'Overview', sections: [
    { id: 'introduction', title: 'Introduction', blocks: [
      ['p', '**{N} is a Solana token launchpad built on Meteora.** Every launch starts at zero: either right away on a bonding curve, or after a countdown, the fuse, so everyone gets the same start instead of bots buying the first block.'],
      ['p', 'Protections are on by default: liquidity is locked forever, the mint is revoked, team tokens vest, and a creator-chosen anti-sniper fee makes the first seconds expensive for snipers. When a curve fills, liquidity moves to a Meteora DAMM v2 pool and the token keeps trading on {N}.'],
      ['p', "You're using **Solana {NET}**. Your wallet must be on the same network."]] },
    { id: 'key-concepts', title: 'Key concepts', blocks: [
      ['table', ['Concept', 'What it means'], [
        ['Launch', 'A new SPL token created on {N}, with its own page, chart and trust checks.'],
        ['Fuse', 'An optional countdown before trading opens. Shown as the burning bar on every card.'],
        ['Bonding curve', 'Meteora Dynamic Bonding Curve (DBC). Price rises with every buy and falls with every sell.'],
        ['Target raise', 'SOL the curve needs to fill. When it is reached, the token graduates.'],
        ['Graduation', 'Liquidity moves from the curve to a Meteora DAMM v2 pool, with the LP locked.'],
        ['Commitments', 'SOL buyers put into a Meteora Alpha Vault before zero; the vault buys once, at one price for all.'],
        ['Anti-sniper fee', 'A high trading fee at the opening that drops to the normal 2% in steps.'],
        ['Partner wallet', "{N}'s fee wallet. It receives the platform share of trading fees."]]]] }] },
  { title: 'Launching', sections: [
    { id: 'launch-a-token', title: 'Launch a token', blocks: [
      ['ol', [
        'Connect a Solana wallet (Phantom, Solflare, Backpack or any Wallet Standard wallet).',
        '**Identity**: name (up to 32 characters), ticker (2 to 10 letters and numbers), logo, description and links. The ticker must be free on {N} and cannot copy a well-known token.',
        '**Tokenomics**: total supply (1M to 1T), decimals (6 to 9) and an optional team share (0 to 20%).',
        '**Launch**: instant or timed, target raise (10 to 500 SOL), the anti-sniper fee and buyer protections. The live preview shows the exact card buyers will see.',
        '**Review**: confirm the summary, then approve in your wallet. Logo and metadata are pinned to IPFS, then the launch transactions are built in your browser for you to sign.']],
      ['p', 'Your wallet pays the network fees and account rent (about 0.06 SOL). The draft saves as you type, so a refresh never loses your work.'],
      ['link', '/create', 'Open the launch form']] },
    { id: 'launch-types', title: 'Launch types', blocks: [
      ['table', ['Type', 'How it opens', 'You sign'], [
        ['Instant ignition', 'The bonding curve opens as soon as the transaction confirms.', '1 transaction'],
        ['Timed fuse, countdown only', 'Countdown of 15 min to 24 h, then the bonding curve opens for everyone at the same moment. Nobody can buy before zero.', '2 approvals: a setup transaction now, and the pool creation signed now and sent at zero'],
        ['Timed fuse, with commitments', 'Countdown of 2 to 24 h on a Meteora DAMM v2 pool. Buyers commit SOL before zero; the pool opens at zero.', '1 approval for 3 transactions (token, pool, vault)']]],
      ['p', '**Countdown only:** the pool creation is signed with a durable nonce, so the signature never expires. {N} checks it, simulates it and submits it at zero. Until then the creator can cancel: closing the nonce account voids the signed transaction and returns its rent.'],
      ['p', '**With commitments:** the countdown must be at least 2 hours, because commitments close 65 minutes before zero.']] },
    { id: 'anti-sniper-fee', title: 'Anti-sniper fee', blocks: [
      ['p', "Bots buy in the first seconds. The anti-sniper fee starts high when trading opens and drops to the normal 2% in equal steps, so sniping costs a lot and real buyers get a fair shot. It is enforced on chain by Meteora's fee scheduler."],
      ['table', ['Setting', 'Range', 'Default'], [
        ['Starting fee', '3% to 99%', '50%'],
        ['Drops to 2% over', '10 s to 60 min', '30 s'],
        ['Drops every', '1 s or more (whole seconds, not longer than the decay)', '1 s']]],
      ['p', "Example with the defaults: buyers in the first second pay 50%, the fee falls about 1.6% every second and is back to 2% after 30 seconds. For commitment launches, the vault's own purchase before zero always pays only 2%."]] },
    { id: 'buyer-protections', title: 'Buyer protections', blocks: [
      ['table', ['Protection', 'On {N}'], [
        ['LP locked', 'On by default: all liquidity in the DAMM v2 pool is locked forever. If a creator turns it off, the card shows a red "No LP lock" (curve launches still keep 10% locked, a Meteora minimum).'],
        ['Mint revoked', 'Always. Nobody can ever mint more; supply is final.'],
        ['Team allocation', "Optional, up to 20%, always shown on the card. Curve launches: locked until graduation, then vests monthly over 6 months. Commitment launches: goes straight to the creator's wallet."],
        ['Fair start', 'Anti-sniper fee and, for timed launches, one opening moment for everyone.']]],
      ['p', 'Every token page has a **Buyer protection** card, and Explore can filter to *Only fully safe* launches.']] }] },
  { title: 'Trading', sections: [
    { id: 'buying-and-selling', title: 'Buying and selling', blocks: [
      ['ul', [
        'Trade on the token page: pick Buy or Sell, enter an amount, check the quote, approve in your wallet.',
        'The quote shows what you receive, the **minimum received** with your slippage, the **price impact** and the **fee** (including any anti-sniper fee).',
        'Slippage: 0.5%, 1%, 2%, 5% or custom; remembered in your browser. Default 1%.',
        'Price impact above 5% shows a warning; above 15% you must confirm before trading.',
        'Near the end of a curve, a buy larger than the room left only fills up to completion; the rest stays in your wallet.',
        'After graduation, trading continues on the token page through the DAMM v2 pool.',
        'Token-to-token Swap is coming soon.']]] },
    { id: 'commitments', title: 'Commitments', blocks: [
      ['p', 'Commitment launches let buyers get in before zero at one shared price:'],
      ['ol', [
        '**Commit** SOL during the countdown. You can take it back any time until commitments close.',
        '**Commitments close 65 minutes before zero.** The vault cap is the launch target raise; above it, SOL is refunded pro rata.',
        '**In the last hour**, anyone presses *Buy for committers now* (it costs only a network fee). The vault buys once, so every committer pays the same average price.',
        '**At zero** the pool opens. Claim your tokens (and any refund) from the token page or Portfolio.']],
      ['p', 'If nobody triggers the vault purchase before zero, nothing is bought and every committer can withdraw their SOL.'],
      ['p', "Pricing: a full vault buys 20% of the pool's tokens. The opening price is set so that happens exactly at the cap; a full vault pays on average 1.25x the opening price."]] },
    { id: 'graduation', title: 'Graduation', blocks: [
      ['p', 'When a bonding curve reaches its target raise, it is **launched**: trading on the curve stops and the liquidity migrates to a Meteora DAMM v2 pool with the LP locked. 20% of the supply seeds that pool. Meteora keepers usually migrate within minutes; if it takes longer, anyone can press *Trigger migration* on the token page.'],
      ['p', 'Once **graduated**, the token trades in-app on its DAMM v2 pool at the live price. Commitment launches start on DAMM v2, so they appear as graduated from zero.']] },
    { id: 'charts-and-data', title: 'Charts and data', blocks: [
      ['ul', [
        'Charts are built from real on-chain trades in 1m, 5m, 1h and 1d candles, ending at the live pool price.',
        'Each trade is priced **without the fee**, so anti-sniper fees do not show as fake spikes.',
        "After graduation, the chart and trade list combine the curve's history with the DAMM v2 pool's.",
        'Market cap = price x total supply. Data refreshes every few seconds.',
        'Explore filters by protocol and quote token, by status, market cap and safety.']]] }] },
  { title: 'Fees', sections: [
    { id: 'fees', title: 'Fees and the split', blocks: [
      ['p', 'Every bonding-curve trade pays a 2% trading fee in SOL (more while an anti-sniper fee is active). It is split:'],
      ['table', ['Goes to', 'Share of the fee', 'Of a 2% fee'], [
        ['Meteora protocol', '20%', '0.4%'], ['Creator', '50% of the rest', '0.8%'], ['{N} (partner wallet)', '50% of the rest', '0.8%']]],
      ['p', "After graduation the DAMM v2 pool charges a 1% fee that goes to the liquidity positions, including the creator's locked position, after Meteora's protocol share. Commitment-launch pools work the same way. Network fees and account rent are paid by whoever sends the transaction."]] },
    { id: 'creator-fees', title: 'Creator fees', blocks: [
      ['p', "Creators see their earnings in **Portfolio**: the curve's creator fees plus, after graduation, the fees of their locked LP position. *Claim* collects everything with one wallet approval. Locked liquidity can never be withdrawn, but its fees can always be claimed."],
      ['link', '/portfolio', 'Open Portfolio']] },
    { id: 'partner-wallet', title: 'Partner wallet', blocks: [
      ['p', 'Every {N} curve is created with this address as fee claimer, which is also how {N} finds its launches on chain. Set it in your config before going live:'],
      ['code', 'YOUR_PARTNER_WALLET_ADDRESS'],
      ['p', 'Platform fees can only be claimed by this wallet, from the partner dashboard.']] }] },
  { title: 'On chain', sections: [
    { id: 'whats-on-chain', title: "What's on chain", blocks: [
      ['ul', [
        '**Curve launches:** a DBC config (fees, curve, protections, partner wallet) and the pool. Token metadata is created by the DBC program.',
        '**Commitment launches:** the token (full supply minted, metadata, mint authority revoked), a DAMM v2 pool and an Alpha Vault.',
        '**Metadata:** name, ticker, description, logo and links, pinned to IPFS and linked from the token.',
        '**Off chain:** scheduled launches (the signed transaction until zero), the list of commitment launches, reports and Telegram subscriptions. Prices, balances and lock status are always read from chain.']]] },
    { id: 'programs', title: 'Programs', blocks: [
      ['p', "{N} does not deploy its own program; launches use Meteora's audited programs:"],
      ['table', ['Program', 'Address', 'Used for'], [
        ['Dynamic Bonding Curve', '`dbcij3LWUppWqq96dh6gJWwBifmcGfLSB5D4DuSMaqN`', 'Bonding curves and migration'],
        ['DAMM v2', '`cpamdpZCGKUy5JxQXB4dcpGPiikHawvSWAd6mEn1sGG`', 'Pools after graduation and for commitment launches'],
        ['Alpha Vault', '`vaU6kP7iNEGkbmPkLmZfGwiGxd4Mob24QQCie5R9kd2`', 'Commitments before zero'],
        ['Token Metadata', '`metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s`', 'Name, ticker and logo of commitment-launch tokens']]]] }] },
  { title: 'Trust', sections: [
    { id: 'security', title: 'Security and trust', blocks: [
      ['ul', [
        '**Your wallet signs everything.** {N} never asks for, stores or sees private keys or seed phrases. New mint, config and position keys are generated in your browser and only co-sign their own transaction.',
        '**Checked before it is stored.** A scheduled launch is decoded, checked (right nonce, right pool, nothing else in it, valid signatures) and simulated before {N} accepts it.',
        '**No custody.** Tokens and pools are standard Meteora accounts. {N} cannot freeze, mint or move them; funds only move with your signature.',
        '**Hardened site.** Strict security headers (no embedding in other sites), rate limits, and the RPC key stays on the server.',
        '**Know the risks.** New tokens are highly risky and can lose all value.']]] },
    { id: 'moderation', title: 'Reports and moderation', blocks: [
      ['p', 'Tickers of well-known tokens (SOL, USDC, BONK, JUP and others) and names that impersonate projects or use bait words like "official" or "airdrop" are refused, and such tokens are left out of Explore even if created elsewhere.'],
      ['p', 'Anyone can **report** a token from its page. The {N} team reviews reports and can hide a token from Explore and search, a decision signed by the partner wallet. Hidden tokens stay on chain; their page shows a warning.']] },
    { id: 'alerts', title: 'Telegram alerts', blocks: [
      ['p', 'On a launch that is counting down, *Get Telegram alerts* follows that launch in the {N} bot. You get a message 10 minutes before zero, at zero, and for commitment launches 30 minutes before commitments close and when the vault can buy. Send `/stop` to the bot to stop.'],
      ['p', "Alerts aren't enabled on this deployment yet."]] },
    { id: 'availability', title: 'Availability', blocks: [
      ['table', ['Status', 'Features'], [
        ['Live', 'Instant and timed launches, commitments, anti-sniper fee, trading on the curve and DAMM v2, charts, Portfolio with fee claims, Explore filters, reports.'],
        ['Coming soon', 'Swap (any token to any token).'],
        ['Not yet', 'Max-wallet cap on chain (needs a Token-2022 transfer hook) and launches priced in USDC or USD1.']]]] }] },
  { title: 'Developers', sections: [
    { id: 'api', title: 'API', blocks: [
      ['p', "Read-only JSON endpoints used by the app. They are rate-limited and only accept browser requests from this site; server-side scripts can call them directly. Token data itself is on chain: read it with any Solana RPC."],
      ['table', ['Method', 'Endpoint', 'Returns'], [
        ['GET', '`/api/pending-launches`', 'Timed launches still counting down'],
        ['GET', '`/api/vault-launches`', 'Commitment launches (pool, vault, timing)'],
        ['GET', '`/api/moderation`', 'Tokens hidden by moderation'],
        ['POST', '`/api/reports`', 'Report a token: { mint, reason, details }']]],
      ['p', 'Reasons for reports: `impersonation`, `scam`, `offensive`, `other`.']] }] }
];
