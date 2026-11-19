// Adds images, official stats, meta ratings and colour/release variants to window.CATALOG.
// Images: BeybladeHub (img.beybladehub.app). Stats: byybladebuilder.com (official ATK/DEF/STA).
// Meta: BEYWATCH.GG Nov 2026 report, BBX Weekly 4-week rankings (May 2026),
//       Beyblade Kingdom tier list (Jul 2026), note.com/bey_bee tier list (Jun 2026).
(() => {
  const C = window.CATALOG;
  const IMG = 'https://img.beybladehub.app/';

  // ---------- Part images ----------
  const BLADE_IMG = {
    'Dran Sword': 'DrSw', 'Hells Scythe': 'HlSc', 'Wizard Arrow': 'WzAr', 'Knight Shield': 'KnSh', 'Knight Lance': 'KnLn',
    'Shark Edge': 'ShEd', 'Leon Claw': 'LnCl', 'Viper Tail': 'VpTl', 'Rhino Horn': 'RhHr', 'Dran Dagger': 'DrDg', 'Hells Chain': 'HlCh',
    'Phoenix Wing': 'PhWn', 'Wyvern Gale': 'WyGl', 'Unicorn Sting': 'UnSt', 'Sphinx Cowl': 'SpCw', 'Tyranno Beat': 'TyBt',
    'Weiss Tiger': 'WsTg', 'Cobalt Dragoon': 'CbDg', 'Black Shell': 'BlSh', 'Whale Wave': 'WhWv', 'Bear Scratch': 'BrSc',
    'Crimson Garuda': 'CrGr', 'Shelter Drake': 'ShDr', 'Tricera Press': 'TrPr', 'Samurai Calibur': 'SmCl', 'Cobalt Drake': 'CbDr',
    'Goat Tackle': 'GtTc', 'Dran Strike': 'DrSt', 'Heavens Ring': 'HvRg', 'Luster Dragoon': 'LuDr', 'Sieg Superion': 'SgSp-v2',
    'Horus Shatter': 'HrSh', 'Phoenix Feather': 'PhFt', 'Shinobi Knife': 'ShKn', 'Samurai Steel': 'SmSt', 'Ptera Swing': 'PtSw',
    'Mammoth Tusk': 'MmTs', 'Croc Crunch': 'CrCr', 'Tyranno Roar': 'TyRr', 'Shark Gill': 'ShGl', 'Dran Buster': 'DrBs',
    'Hells Hammer': 'HlHm', 'Wizard Rod': 'WzRd', 'Shinobi Shadow': 'ShSh', 'Leon Crest': 'LnCr', 'Phoenix Rudder': 'PhRd',
    'Silver Wolf': 'SlWl', 'Samurai Saber': 'SmSb', 'Knight Mail': 'KnMl', 'Impact Drake': 'ImDr', 'Ghost Circle': 'GhCr',
    'Golem Rock': 'GlRc', 'Scorpio Spear': 'ScSp', 'Shark Scale': 'ShSc', 'Clock Mirage': 'ClMr', 'Meteor Dragoon': 'MtDg',
    'Mummy Curse': 'MmCr', 'Bullet Griffon': 'BlGr', 'Glory Valkyrie': 'GlVl', 'Hells Nether': 'HlNt_official',
    'Vanish Lucifer': 'VnLc-v2', 'Bison Burrow': 'BsBr-v2', 'Orochi Cluster': 'OrCl', 'Aero Pegasus': 'ArPg', 'Wyvern Hover': 'WyHv',
    'Dranzer Spiral': 'DrSp', 'Driger Slash': 'DrSl', 'Lightning L-Drago': 'LtLdU', 'Draciel Shield': 'DrSh', 'Xeno Xcalibur': 'XnXc',
    'Rock Leone': 'RkLn', 'Storm Spriggan': 'S2', 'Dragoon Storm': 'DgSt', 'Storm Pegasis': 'StPg', 'Victory Valkyrie': 'V2',
  };
  const LOCK_IMG = { Dran: 'Dr', Wizard: 'Wz', Perseus: 'Pr', Hells: 'Hl', Rhino: 'Rh', Fox: 'Fx', Pegasus: 'Pg', Cerberus: 'Cr', Whale: 'Wh',
    Sol: 'Sl', Wolf: 'Wl', Emperor: 'Em', Phoenix: 'Ph', Bahamut: 'Bh', Knight: 'Kn', Valkyrie: 'Vl', Ragna: 'Rg', Unicorn: 'Un',
    Brachio: 'Br', Croco: 'Co', Kid: 'Kd', Leon: 'Ln' };
  const MAIN_IMG = { Brave: 'Br', Courage: 'Br', Arc: 'Ar', Dark: 'Dr', Reaper: 'Rp', Brush: 'Bs', Blast: 'Bl', Flame: 'Fl', Eclipse: 'Ec',
    Hunt: 'Hn', Might: 'Mg', Flare: 'Fr', Volt: 'Vl', Fang: 'Fn' };
  const METAL_IMG = { Blitz: 'Bl', Fortress: 'Fr', Rage: 'Rg', Delta: 'Dl', Whip: 'Wh', Tread: 'Tr-v2', Force: 'Fc' };

  // Hasbro blade name -> Takara Tomy name (images and stats come from the Takara Tomy part)
  const H2T = {};
  for (const p of Object.values(C.parts)) if (p.brand === 'tt' && p.alt) H2T[p.alt.replace('Hasbro: ', '')] = p.name;

  function partImage(p) {
    const n = p.brand === 'hb' && (p.kind === 'blade' || p.kind === 'rblade') ? (H2T[p.name] || p.name) : p.name;
    const lockName = n.replace(' (Metal)', '');
    switch (p.kind) {
      case 'blade': case 'rblade': return BLADE_IMG[n] ? `${IMG}blades-db/${BLADE_IMG[n]}.webp` : '';
      case 'ratchet': return `${IMG}ratchets/${p.name === '8-80' ? '8-80-v2' : p.name}.webp`;
      case 'bit': case 'rbit': return `${IMG}bits/${p.code === 'LC' ? 'LC_z5m' : p.code}.webp`;
      case 'lock': return LOCK_IMG[lockName] ? `${IMG}blades-cx/chip-${LOCK_IMG[lockName]}.webp` : '';
      case 'main': return MAIN_IMG[n] ? `${IMG}blades-cx/main-${MAIN_IMG[n]}.webp` : '';
      case 'metal': return METAL_IMG[n] ? `${IMG}blades-cx/metal-${METAL_IMG[n]}.webp` : '';
      case 'assist': return `${IMG}blades-cx/assist-${p.code === 'G' ? 'G-v2' : p.code}.webp`;
      case 'over': return `${IMG}blades-cx/over-${p.code}.webp`;
    }
    return '';
  }

  // ---------- Product images (photo of that release, so it shows the colourway) ----------
  const PROD_IMG = {
    'BX-05': 'combos/BX-05', 'BX-06': 'combos/BX-06', 'BX-07': 'combos/BX-07', 'BX-08': 'combos/BX08-hlsc', 'BX-14': 'combos/BX-14-v01',
    'BX-16': 'combos/BX-16-v01', 'BX-17': 'combos/BX-17', 'BX-19': 'combos/BX-19', 'BX-23': 'combos/BX-23', 'BX-24': 'combos/BX-24-v01',
    'BX-26': 'combos/BX-26', 'BX-37': 'combos/BX-37', 'BX-46': 'combos/BX-46', 'BX-48': 'combos/BX48-v01', 'BX-50': 'combos/BX-50',
    'BX-53': 'combos/BX-53/card_7we', 'BX-55': 'combos/BX-55-v01', 'UX-04': 'combos/UX-04', 'UX-12': 'combos/UX-12-v02',
    'UX-18': 'combos/UX-18-v02', 'CX-01': 'combos/CX01', 'CX-02': 'combos/CX02', 'CX-03': 'combos/CX03', 'CX-04': 'combos/CX-04',
    'CX-05': 'combos/CX05', 'CX-06': 'combos/CX06', 'CX-07': 'combos/CX07', 'CX-08': 'combos/CX08', 'CX-09': 'combos/CX09',
    'CX-10': 'combos/CX10', 'CX-11': 'combos/CX11', 'CX-12': 'combos/CX12', 'CX-13': 'combos/CX13', 'CX-14': 'combos/CX14',
    'CX-15': 'combos/CX15', 'CX-16': 'combos/CX-16', 'CX-17': 'combos/CX17', 'CX-18': 'combos/CX18', 'CX-19': 'combos/CX19',
    'CX-20': 'combos/CX20-phoenixforce',
  };
  // Single beys inside multi-bey sets that have their own photo
  const BEY_IMG = { 'UX-15#1': 'combos/UX15-tyrr', 'CX-11#2': 'combos/CX11-sharkgill', 'UX-10#1': 'combos/UX10-pteraswing',
    'BX-53#0': 'blades-color/ArPg-bx53-blue-cyan_7we', 'BX-53#1': 'blades-db/WzAr2', 'BX-53#2': 'blades-db/KnSh2' };

  // ---------- Official stats (ATK / DEF / STA) ----------
  const STATS = {
    'Aero Pegasus': [60, 25, 30], 'Bahamut Blitz': [65, 20, 15], 'Bear Scratch': [25, 45, 30], 'Cobalt Dragoon': [60, 15, 25],
    'Cobalt Drake': [65, 30, 20], 'Croc Crunch': [65, 27, 23], 'Dragoon Storm': [55, 30, 15], 'Dran Buster': [70, 20, 10],
    'Dran Dagger': [50, 25, 25], 'Dran Sword': [55, 25, 20], 'Glory Valkyrie': [85, 35, 25], 'Impact Drake': [75, 25, 10],
    'Lightning L-Drago': [55, 25, 20], 'Meteor Dragoon': [75, 15, 35], 'Phoenix Feather': [50, 20, 30], 'Phoenix Wing': [65, 30, 20],
    'Samurai Saber': [65, 20, 25], 'Shark Edge': [60, 25, 15], 'Shark Scale': [70, 15, 15], 'Shinobi Knife': [28, 55, 32],
    'Storm Pegasis': [55, 15, 30], 'Dran Strike': [58, 25, 17], 'Tyranno Beat': [65, 30, 5], 'Tyranno Roar': [60, 28, 12],
    'Victory Valkyrie': [55, 20, 25], 'Xeno Xcalibur': [65, 25, 10], 'Black Shell': [10, 65, 25], 'Draciel Shield': [30, 50, 20],
    'Golem Rock': [30, 60, 10], 'Heavens Ring': [10, 60, 30], 'Knight Lance': [25, 60, 15], 'Knight Mail': [10, 65, 35],
    'Knight Shield': [20, 55, 25], 'Leon Crest': [15, 70, 15], 'Mummy Curse': [30, 60, 20], 'Rhino Horn': [20, 50, 30],
    'Rock Leone': [30, 55, 15], 'Shinobi Shadow': [10, 70, 20], 'Sphinx Cowl': [35, 55, 10], 'Tricera Press': [20, 65, 15],
    'Wyvern Hover': [13, 60, 27], 'Clock Mirage': [10, 10, 80], 'Ghost Circle': [5, 40, 55], 'Phoenix Rudder': [15, 40, 60],
    'Ptera Swing': [27, 23, 50], 'Shark Gill': [20, 25, 55], 'Silver Wolf': [15, 30, 65], 'Viper Tail': [30, 20, 50],
    'Wizard Arrow': [15, 30, 55], 'Wizard Rod': [15, 25, 60], 'Wyvern Gale': [10, 40, 50], 'Crimson Garuda': [45, 25, 30],
    'Dranzer Spiral': [35, 30, 35], 'Driger Slash': [40, 35, 25], 'Goat Tackle': [13, 65, 22], 'Hells Chain': [35, 40, 25],
    'Hells Hammer': [50, 25, 25], 'Hells Scythe': [30, 35, 35], 'Leon Claw': [40, 40, 20], 'Mammoth Tusk': [38, 40, 37],
    'Bullet Griffon': [45, 45, 40], 'Samurai Calibur': [40, 30, 30], 'Scorpio Spear': [25, 55, 30], 'Shelter Drake': [25, 40, 35],
    'Storm Spriggan': [30, 40, 30], 'Samurai Steel': [45, 42, 28], 'Unicorn Sting': [35, 35, 30], 'Weiss Tiger': [45, 30, 25],
    'Whale Wave': [45, 35, 20], 'Brave': [40, 10, 10], 'Brush': [60, 30, 10], 'Blast': [50, 10, 15], 'Might': [25, 25, 25],
    'Eclipse': [47, 33, 20], 'Reaper': [40, 20, 40], 'Dark': [10, 40, 10], 'Arc': [10, 10, 40], 'Flame': [5, 15, 40], 'Hunt': [20, 10, 30],
    'Fang': [35, 10, 15], 'Flare': [25, 40, 10], 'Volt': [45, 15, 15], 'assist:S': [10, 20, 10], 'assist:A': [25, 10, 5],
    'assist:T': [35, 20, 45], 'assist:Z': [22, 15, 3],
  };
  const RATCHET_STATS = { '0-60': [3, 14, 13], '0-70': [3, 13, 14], '0-80': [3, 12, 15], '1-50': [18, 9, 3], '1-60': [17, 9, 4], '1-70': [17, 6, 7],
    '1-80': [17, 7, 6], '2-60': [16, 8, 6], '2-70': [10, 12, 8], '2-80': [10, 11, 9], '3-60': [15, 9, 6], '3-70': [15, 8, 7], '3-80': [15, 7, 8],
    '3-85': [5, 15, 10], '4-50': [12, 13, 5], '4-55': [7, 11, 12], '4-60': [11, 13, 6], '4-70': [11, 12, 7], '4-80': [11, 11, 8], '5-60': [12, 9, 9],
    '5-70': [12, 8, 10], '5-80': [12, 8, 10], 'M-85': [8, 19, 13], '6-60': [14, 8, 8], '6-70': [14, 7, 9], '6-80': [14, 6, 10], '7-55': [6, 14, 10],
    '7-60': [8, 14, 8], '7-70': [8, 12, 10], '7-80': [7, 14, 9], '8-70': [8, 10, 12], '9-60': [13, 10, 7], '9-65': [13, 10, 7], '9-70': [13, 10, 7], '9-80': [13, 10, 7] };
  const BIT_STATS = { A: [40, 10, 10], B: [15, 25, 50], BS: [5, 60, 30], C: [40, 5, 10], DB: [15, 20, 55], DS: [5, 55, 40], D: [10, 55, 25],
    E: [30, 15, 20], F: [40, 15, 10], FB: [10, 25, 60], FF: [55, 5, 5], GB: [10, 15, 45], GF: [50, 5, 5], GN: [20, 40, 10], GP: [30, 25, 15],
    GR: [45, 10, 10], GU: [30, 20, 20], G: [20, 10, 55], H: [30, 35, 20], HN: [15, 55, 20], HT: [30, 25, 20], I: [50, 15, 5], J: [35, 10, 15],
    K: [35, 25, 15], L: [40, 5, 15], LF: [45, 5, 10], LO: [5, 25, 55], LR: [45, 5, 15], M: [50, 20, 10], MN: [8, 57, 30], Nr: [5, 20, 62],
    N: [10, 50, 30], O: [10, 30, 50], Op: [20, 50, 50], P: [25, 25, 25], Q: [55, 15, 5], RA: [60, 17, 3], R: [40, 10, 20], S: [10, 45, 35],
    T: [35, 20, 20], TK: [35, 30, 20], TP: [35, 25, 25], Tr: [30, 30, 60], UF: [55, 5, 5], UN: [10, 60, 20], U: [25, 25, 30], V: [45, 10, 5],
    WB: [15, 30, 45], WW: [5, 60, 25], W: [5, 55, 30], Y: [8, 25, 58], Z: [30, 20, 15] };

  // ---------- Meta ----------
  // usage = share of top-cut decks, BEYWATCH.GG Nov 2026 (last 30 days). bbx = BBX Weekly 4-week score (May 2026).
  // tier = Bey Vault consensus across BEYWATCH, BBX Weekly, Beyblade Kingdom and note.com tier lists.
  const META = {
    blade: {
      'Shark Scale': { tier: 'S+', usage: 68.0, bbx: 92, notes: 'SS on Beyblade Kingdom, X rank on note.com' },
      'Wizard Rod': { tier: 'S+', usage: 61.2, bbx: 90, notes: 'Most-played build: Wizard Rod 1-60 Hexa' },
      'Aero Pegasus': { tier: 'S', usage: 24.6, bbx: 65 }, 'Glory Valkyrie': { tier: 'S', usage: 23.4 },
      'Sieg Superion': { tier: 'S', usage: 18.6, notes: 'Rising in Nov 2026' }, 'Cobalt Dragoon': { tier: 'S', bbx: 53, notes: 'Left spin, counters Wizard Rod' },
      'Meteor Dragoon': { tier: 'S', usage: 7.5, bbx: 52, notes: 'X rank on note.com' }, 'Bullet Griffon': { tier: 'S', notes: 'S on Beyblade Kingdom' },
      'Wyvern Hover': { tier: 'A', usage: 6.5, bbx: 50 }, 'Knight Mail': { tier: 'A', bbx: 50 }, 'Silver Wolf': { tier: 'A', usage: 7.2, bbx: 44 },
      'Knight Shield': { tier: 'A', usage: 7.0 }, 'Dran Strike': { tier: 'A', usage: 6.5 }, 'Phoenix Wing': { tier: 'A', bbx: 41 },
      'Hells Nether': { tier: 'A', notes: 'Rising in Nov 2026' }, 'Tyranno Beat': { tier: 'B', bbx: 36 }, 'Clock Mirage': { tier: 'B', bbx: 34 },
      'Mummy Curse': { tier: 'B', bbx: 34 }, 'Scorpio Spear': { tier: 'B', bbx: 33 }, 'Golem Rock': { tier: 'B', bbx: 31 },
      'Luster Dragoon': { tier: 'B', usage: 2.9 }, 'Heavens Ring': { tier: 'B', notes: 'Provisional on Beyblade Kingdom' },
    },
    metal: { Rage: { tier: 'A', bbx: 49 }, Delta: { tier: 'A', usage: 4.8 }, Blitz: { tier: 'B', bbx: 36 }, Fortress: { tier: 'B', bbx: 29 } },
    main: { Blast: { tier: 'A', usage: 4.1, bbx: 47 } },
    ratchet: {
      '1-60': { tier: 'S+', usage: 81.4, bbx: 100 }, '9-60': { tier: 'S', usage: 58.3, bbx: 76 }, '3-60': { tier: 'A', usage: 38.8, bbx: 57 },
      '1-50': { tier: 'A', usage: 21.2, bbx: 56 }, '7-60': { tier: 'A', usage: 20.0, bbx: 50 }, '1-70': { tier: 'A', bbx: 56 }, '3-70': { tier: 'A', bbx: 55 },
      '7-70': { tier: 'B', bbx: 49 }, '4-50': { tier: 'B', bbx: 46 }, '5-60': { tier: 'B', bbx: 44 }, '6-60': { tier: 'B', bbx: 41 },
      '1-80': { tier: 'B', bbx: 34 }, '4-55': { tier: 'B', bbx: 34 }, '9-70': { tier: 'B', bbx: 34 }, '7-55': { tier: 'B', bbx: 33 }, '8-70': { tier: 'B', bbx: 32 },
    },
    bit: {
      H: { tier: 'S+', usage: 46.7, bbx: 78 }, Nr: { tier: 'S', usage: 41.9 }, FB: { tier: 'S', usage: 40.2, bbx: 58 }, R: { tier: 'S', usage: 40.0, bbx: 67 },
      LR: { tier: 'S', bbx: 75 }, K: { tier: 'S', usage: 34.9, bbx: 51 }, E: { tier: 'A', bbx: 54 }, L: { tier: 'A', bbx: 52 }, J: { tier: 'A', bbx: 45 },
      B: { tier: 'A', bbx: 43 }, W: { tier: 'A', bbx: 42 }, LO: { tier: 'A', bbx: 42 }, P: { tier: 'B', bbx: 41 }, U: { tier: 'B', bbx: 40 },
      T: { tier: 'B', bbx: 40 }, UN: { tier: 'B', bbx: 29 },
    },
    assist: { H: { tier: 'S', bbx: 48 }, W: { tier: 'A', bbx: 32 } },
    over: { F: { tier: 'A', bbx: 48 }, B: { tier: 'B', bbx: 32 } },
  };
  const TOP_BUILDS = [['Wizard Rod 1-60H', 136], ['Glory Valkyrie K', 44], ['Shark Scale 3-60Nr', 43], ['Wizard Rod 1-60FB', 41], ['Cobalt Dragoon 9-60E', 39]];

  // ---------- Apply to parts ----------
  for (const p of Object.values(C.parts)) {
    p.img = partImage(p);
    const ttName = p.brand === 'hb' && (p.kind === 'blade' || p.kind === 'rblade') ? (H2T[p.name] || p.name) : p.name;
    let st = null, meta = null;
    if (p.kind === 'blade' || p.kind === 'rblade') { st = STATS[ttName]; meta = META.blade[ttName]; }
    else if (p.kind === 'main' || p.kind === 'metal') { st = STATS[p.name]; meta = (META[p.kind] || {})[p.name]; }
    else if (p.kind === 'ratchet') { st = RATCHET_STATS[p.name]; meta = META.ratchet[p.name]; }
    else if (p.kind === 'bit' || p.kind === 'rbit') { st = BIT_STATS[p.code]; meta = META.bit[p.code]; }
    else if (p.kind === 'assist') { st = STATS['assist:' + p.code]; meta = META.assist[p.code]; }
    else if (p.kind === 'over') meta = META.over[p.code];
    if (st) p.stats = { atk: st[0], def: st[1], sta: st[2] };
    if (meta) p.meta = meta;
  }

  // ---------- Variants: every release of a part is its own colourway ----------
  C.variants = {};
  for (const prod of C.products) {
    const prodImg = prod.brand === 'tt' && PROD_IMG[prod.code] ? IMG + PROD_IMG[prod.code] + '.webp' : '';
    prod.img = prodImg || (prod.beys[0] && C.parts[prod.beys[0].parts[0]]?.img) || '';
    prod.beys.forEach((bey, i) => {
      let img = '';
      if (prod.brand === 'tt' && BEY_IMG[`${prod.code}#${i}`]) img = IMG + BEY_IMG[`${prod.code}#${i}`] + '.webp';
      else if (prod.random && prodImg && /-v0\d\.webp$/.test(prodImg)) img = prodImg.replace(/-v0\d\.webp$/, `-v0${i + 1}.webp`);
      bey.img = img || prodImg;
      for (const pid of bey.parts) {
        const vid = `${pid}@${prod.id}#${i}`;
        C.variants[vid] = { id: vid, part: pid, product: prod.id, bey: i, label: `${prod.code} · ${bey.name}`, img: bey.img || C.parts[pid].img };
      }
    });
    prod.extra.forEach(pid => {
      const vid = `${pid}@${prod.id}#x`;
      C.variants[vid] = { id: vid, part: pid, product: prod.id, bey: 'x', label: `${prod.code} · loose part`, img: prodImg || C.parts[pid].img };
    });
  }
  C.partVariants = {};
  for (const v of Object.values(C.variants)) (C.partVariants[v.part] = C.partVariants[v.part] || []).push(v);
  C.topBuilds = TOP_BUILDS;
  C.metaUpdated = 'Nov 2026';

  // Creator picks from YouTube testers, compiled by Beyblade X Combo Finder (albertocabasvidani.github.io), videos up to Mar 2026
  C.creatorPicks = [
    { name: 'Cobalt Dragoon 1-60 Elevate', src: 'JacobPomegranate · California deck' },
    { name: 'Aero Pegasus 9-60 Rush', src: 'JacobPomegranate' },
    { name: 'Impact Drake 3-60 Cyclone', src: 'JacobPomegranate' },
    { name: 'Clock Mirage 4-55 Low Orb', src: 'JacobPomegranate · beats Wizard Rod' },
    { name: 'Clock Mirage 7-55 Low Orb', src: 'JacobPomegranate · Jan 2026' },
    { name: 'Phoenix Wing 3-60 Rush', src: 'JacobPomegranate · main attacker' },
    { name: 'Shark Scale 4-50 Low Rush', src: 'Anti Wizard Wizard Club' },
    { name: 'Phoenix Wing 1-60 Low Rush', src: 'MBBC theory videos' },
    { name: 'Hover Wyvern 1-60 Kick', src: 'MBBC benchmark' },
    { name: 'Hover Wyvern 9-60 Rush', src: 'MBBC / HaruRen Hobbies' },
    { name: 'Meteor Dragoon 1-60 Level', src: 'HaruRen Hobbies' },
    { name: 'Meteor Dragoon 9-60 Kick', src: 'HaruRen Hobbies' },
    { name: 'Wizard Rod 1-60 Rush', src: 'HaruRen Hobbies' },
    { name: 'Tricera Press 7-60 Hexa', src: 'HaruRen Hobbies' },
    { name: 'Mummy Curse 7-60 Hexa', src: 'HaruRen Hobbies' },
    { name: 'Dran Sword 9-60 Kick', src: 'HaruRen Hobbies' },
    { name: 'Ghost Circle 9-70 Kick', src: 'HaruRen Hobbies' },
    { name: 'Silver Wolf 9-60 Under Needle', src: 'Community pick' },
  ];

  // Battle types for CX main/metal blades and a few blades, from BEYWATCH's type column
  const TYPE_FILL = {"tt:main:flame":"Stamina","tt:main:reaper":"Balance","tt:blade:horus-shatter":"Stamina","tt:main:fang":"Attack","tt:main:blast":"Attack","tt:main:brave":"Attack","tt:main:brush":"Attack","tt:main:arc":"Stamina","tt:main:dark":"Defense","tt:main:eclipse":"Balance","tt:main:hunt":"Stamina","tt:main:might":"Balance","tt:main:flare":"Defense","tt:metal:blitz":"Attack","tt:metal:fortress":"Defense","tt:metal:rage":"Stamina","tt:metal:delta":"Balance","tt:metal:whip":"Stamina","tt:main:volt":"Attack","hb:main:blast":"Attack","hb:main:fang":"Attack","hb:main:reaper":"Balance","hb:main:flame":"Stamina","hb:blade:stun-medusa":"Stamina","hb:metal:rage":"Stamina","hb:metal:blitz":"Attack","hb:main:might":"Balance","hb:main:courage":"Attack"};
  for (const [id, t] of Object.entries(TYPE_FILL)) if (C.parts[id] && !C.parts[id].type) C.parts[id].type = t;
})();
