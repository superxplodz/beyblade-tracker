# Bey Vault — Beyblade X collection tracker

Static site at **https://beyvault.superxplodz.biz.id**, served by GitHub Pages from this repo.

| File | What it is |
|---|---|
| `index.html` | The whole app: collection, parts library, products, deck builder, stats. |
| `data.js` | Parts and product catalog. Takara Tomy and Hasbro are tracked separately. |
| `extras.js` | Part photos (BeybladeHub), official ATK/DEF/STA stats, meta ratings, and release/colour variants. |
| `collection.enc` | Your collection, AES-256-GCM encrypted with a key derived from your username + password (PBKDF2, 310k rounds). Written by the site when GitHub sync is on. |
| `meta.json` | Live tournament meta from BEYWATCH.GG (30d / 90d / 6mo / all time). Rebuilt every Monday by `.github/workflows/meta.yml` running `scripts/fetch-meta.mjs`. |
| `prices.json` | Snapshot of Indonesian Tokopedia listings for common parts and sets. Tokopedia blocks GitHub's servers, so this is refreshed by hand, not by the weekly job. |
| `CNAME` | Custom domain for GitHub Pages. |

## Features
- Separate Takara Tomy and Hasbro catalogs (different moulds), switch at the top.
- Track quantity per part: blades, ratchets, bits, and CX lock chips / main / metal / over / assist blades.
- “I bought this” on a set adds all its parts. Random boosters ask which bey you pulled.
- Colour variants: every release of a part is tracked separately (e.g. Wyvern Hover from UX-21 vs UX-00).
- Parts split by type like BEYWATCH: blades, lock chips, main, metal, over and assist blades, ratchets, bits.
- Meta tab: top combos, best parts per type and YouTube creator picks, for 30 days, 90 days, 6 months or all time.
- Sets shown as boxes with the official Takara Tomy release photo, a bought counter (+/−) and a ★ shopping list.
- Deck builder: best legal 3on3 meta deck from your parts, best overall deck with a shopping list, and “Use” on any combo.
- Wishlist, per-part notes, purchase log with undo.
- 3on3 deck builder that flags repeated parts and shows bey weight.
- Custom parts for anything missing from the catalog.
- Export / import JSON backup.

## Sync between devices
Settings → Connect GitHub with a fine-grained token: Only select repositories → `beyblade-tracker`,
Permissions → Contents: Read and write. Edits are then saved encrypted to `collection.enc`.
Without a token, edits stay in that browser.

## Adding new releases
Add a line to `TT_PRODUCTS` or `H_PRODUCTS` in `data.js`. Notation is documented at the top of the file.

## Sign-in
The site asks for a username and password. They never leave the browser: they derive the key that decrypts `collection.enc`.
There is no reset. If you forget them, restore from an exported JSON backup and set new ones.
"Stay signed in" keeps the derived key on that device until you choose Settings → Sign out.

## Weekly meta refresh
The Action runs Mondays 03:17 UTC. Run it by hand from Actions → Weekly meta update → Run workflow.
If BEYWATCH changes its layout and parsing fails, the old `meta.json` is kept and the run shows as failed.

## Prices and deals
Each part and set has an Indonesian price box: snapshot listings, prices you log yourself (FB groups, Shopee, local shops), and a target price.
When any seen price is at or under your target, the part shows a **Deal** tag. Quick links open Tokopedia (new and bekas), Shopee and Facebook Marketplace sorted by cheapest.
