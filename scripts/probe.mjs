const r = await fetch('https://www.tokopedia.com/search?q=' + encodeURIComponent('beyblade x cx-11'), { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36', 'accept-language': 'id-ID,id;q=0.9' } });
const h = await r.text();
console.log('status', r.status, 'len', h.length, 'Rp count', (h.match(/Rp[\d.]+/g) || []).length);
const k = h.indexOf('Emperor'); console.log('ctx', h.slice(Math.max(0, k - 300), k + 500).replace(/\s+/g, ' '));
const m = h.match(/"price(Text|Fmt|Str)?"\s*:\s*"[^"]+"/g); console.log('priceFields', (m || []).slice(0, 5));
