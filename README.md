# Bey Vault — Beyblade X collection tracker

Static site at **https://superxplodz.biz.id**, served by GitHub Pages from this repo.

| File | What it is |
|---|---|
| `index.html` | The whole app: collection, parts library, products, deck builder, stats. |
| `data.js` | Parts and product catalog. Takara Tomy and Hasbro are tracked separately. |
| `collection.json` | Your collection. The site reads it on load; the site writes it when GitHub sync is on. |
| `CNAME` | Custom domain for GitHub Pages. |

## Features
- Separate Takara Tomy and Hasbro catalogs (different moulds), switch at the top.
- Track quantity per part: blades, ratchets, bits, and CX lock chips / main / metal / over / assist blades.
- “I bought this” on a set adds all its parts. Random boosters ask which bey you pulled.
- Wishlist, per-part notes, purchase log with undo.
- 3on3 deck builder that flags repeated parts and shows bey weight.
- Custom parts for anything missing from the catalog.
- Export / import JSON backup.

## Sync between devices
Settings → Connect GitHub with a fine-grained token: Only select repositories → `beyblade-tracker`,
Permissions → Contents: Read and write. Edits are then saved to `collection.json`.
Without a token, edits stay in that browser.

## Adding new releases
Add a line to `TT_PRODUCTS` or `H_PRODUCTS` in `data.js`. Notation is documented at the top of the file.
