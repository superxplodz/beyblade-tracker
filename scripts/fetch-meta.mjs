// Pulls BEYWATCH.GG tier list, combos and part stats for several time windows
// and writes meta.json. Keeps the old file if parsing looks broken.
import fs from 'node:fs';
const BASE = 'https://beywatch.gg';
const WINDOWS = ['30d', '90d', '6mo', 'all'];
const MAX_COMBOS = 300;
const PAGES = { tier: '/', parts: '/parts', combos: '/combos' };
const DUMP = !!process.env.DUMP;
if (DUMP) fs.mkdirSync('raw', { recursive: true });

async function get(path, range) {
  const url = BASE + path + (range === 'all' ? '' : (path.includes('?') ? '&' : '?') + 'range=' + range);
  const r = await fetch(url, { headers: { 'user-agent': 'BeyVault weekly meta bot (+https://beyvault.superxplodz.biz.id)' } });
  if (!r.ok) throw new Error(url + ' → ' + r.status);
  const html = await r.text();
  if (DUMP) fs.writeFileSync(`raw/${path.replace(/\W+/g, '_') || 'root'}_${range}.html`, html);
  return html;
}
const strip = s => s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const num = s => { const m = String(s).replace(/,/g, '').match(/-?\d+(\.\d+)?/); return m ? +m[0] : null; };

// Generic table-row parser: every <tr> → cells (text) + hrefs + img alts
function rows(html) {
  const out = [];
  for (const tr of html.split(/<tr[\s>]/).slice(1)) {
    const body = tr.split(/<\/tr>/)[0];
    const cells = body.split(/<td[\s>]/).slice(1).map(c => strip('<x ' + c.split(/<\/td>/)[0]));
    const hrefs = [...body.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
    const alts = [...body.matchAll(/alt="([^"]*)"/g)].map(m => m[1]);
    if (cells.length) out.push({ cells, hrefs, alts });
  }
  return out;
}
function comboFrom(hrefs) {
  const c = hrefs.find(h => h.startsWith('/combos/'));
  const parts = hrefs.filter(h => h.startsWith('/parts/') || h.startsWith('/blades/')).map(h => h.split('/').pop());
  return c ? { slug: c.split('/').pop(), parts: [...new Set(parts)] } : null;
}
function parseTier(html) {
  return rows(html).map(({ cells, hrefs, alts }) => {
    const blade = hrefs.find(h => h.startsWith('/blades/'));
    if (!blade || cells.length < 7) return null;
    const pct = cells.filter(c => /%$/.test(c));
    const combo = comboFrom(hrefs);
    return {
      blade: blade.split('/').pop(), type: alts[0] || '', tier: cells[3] || '',
      winShare: num(pct[0]), firstRate: num(pct[1]), cuts: num(cells[cells.length - 1]),
      combo: combo && { ...combo, name: cells[cells.length - 2].replace(/^[+\s]+/, '') },
    };
  }).filter(r => r && r.cuts);
}
function parseCombos(html) {
  return rows(html).map(({ cells, hrefs }) => {
    const combo = comboFrom(hrefs);
    if (!combo) return null;
    const pct = cells.filter(c => /%$/.test(c)).map(num);
    const ints = cells.map(c => /^[\d,]+$/.test(c) ? num(c) : null).filter(v => v != null);
    const raw = cells.find(c => /[A-Za-z]/.test(c) && !/^(Attack|Defense|Stamina|Balance)$/.test(c)) || '';
    const name = raw.replace(/\s+[\d.]+%.*$/, '').replace(/[+\s]+$/, '').trim();
    return { ...combo, name, pct, cuts: ints.length ? Math.max(...ints) : null };
  }).filter(Boolean);
}
// Parts page: cards linking /parts/<cat>-<name> with tier / % / cuts text nearby
function parseParts(html) {
  const out = {};
  const re = /href="\/(parts|blades)\/([a-z0-9-]+)"([\s\S]*?)<\/a>/g;
  let m;
  while ((m = re.exec(html))) {
    const slug = m[2]; const text = strip(m[3]);
    const cat = m[1] === 'blades' ? 'blade' : (slug.match(/^(lockchip|overblade|assist|ratchet|bit|metalblade|mainblade|blade)-/) || [])[1];
    if (!cat) continue;
    const pct = text.match(/([\d.]+)%/); const cuts = text.match(/([\d,]+)\s*(top )?cuts?/i);
    const tier = (text.match(/(?:^|\s)(X|S|A|B|C|D|\?)(?:\s|$)/) || [])[1] || '';
    (out[cat] ||= []);
    if (!out[cat].some(p => p.slug === slug) && (pct || cuts)) out[cat].push({ slug, tier, pct: pct ? +pct[1] : null, cuts: cuts ? num(cuts[1]) : null });
  }
  return out;
}

const result = { source: 'BEYWATCH.GG', fetchedAt: new Date().toISOString(), windows: {} };
for (const w of WINDOWS) {
  const tierHtml = await get(PAGES.tier, w);
  const meta = strip(tierHtml).match(/Updated:\s*([A-Z][a-z]{2} \d+, \d{4}).*?Combos Analyzed:\s*([\d.,K]+).*?Tournaments:\s*([\d,]+)/);
  const entry = {
    updated: meta?.[1] || null, combosAnalyzed: meta?.[2] || null, tournaments: meta ? num(meta[3]) : null,
    blades: parseTier(tierHtml).filter(b => b.cuts > 0),
  };
  // The combos page only lists ~100 rows, so also read each top blade's own page
  const combos = new Map();
  const merge = list => { for (const c of list) { if (!c.cuts) continue; const o = combos.get(c.slug); if (!o || (c.cuts > (o.cuts || 0))) combos.set(c.slug, o && !c.name ? { ...c, name: o.name } : c); } };
  try { merge(parseCombos(await get(PAGES.combos, w))); } catch (e) { console.warn(e.message); }
  const topBlades = [...entry.blades].sort((a, b) => b.cuts - a.cuts).slice(0, 30);
  for (const b of topBlades) {
    try { merge(parseCombos(await get('/blades/' + b.blade, w))); } catch (e) { console.warn(e.message); }
    await new Promise(r => setTimeout(r, 250));
  }
  entry.combos = [...combos.values()].sort((a, b) => b.cuts - a.cuts).slice(0, MAX_COMBOS);
  try { entry.parts = parseParts(await get(PAGES.parts, w)); } catch (e) { console.warn(e.message); entry.parts = {}; }
  console.log(w, 'blades', entry.blades.length, 'combos', entry.combos.length, 'part cats', Object.keys(entry.parts).join(','));
  result.windows[w] = entry;
}
const ok = Object.values(result.windows).every(e => e.blades.length >= 5);
if (!ok) { console.error('Parse looks broken; keeping old meta.json'); process.exit(DUMP ? 0 : 1); }
fs.writeFileSync('meta.json', JSON.stringify(result));
console.log('meta.json written');
