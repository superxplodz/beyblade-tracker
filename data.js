// Beyblade X parts catalog.
// Sources (Nov 2026): official Takara Tomy lineup (beyblade.takaratomy.co.jp/beyblade-x/lineup),
// byybladebuilder.com/parts (stats, weights, Hasbro names), beyblade.fandom.com Custom Line parts list,
// beysandbricks.com / malloftoys.com / beywarehouse.com product listings (set contents).
//
// Bey notation used in product lists:
//   BX/UX:                 "Blade Name|ratchet|bit"          e.g. "Dran Sword|3-60|F"
//   Ratchet-integrated:    "Blade Name||bit"                 e.g. "Hells Nether||Z"
//   CX:                    "@Lock/Main/Assist|ratchet|bit"   e.g. "@Dran/Brave/S|6-60|V"
//   CX Expand:             "@Lock/Metal/Over+Assist|r|b"     e.g. "@Brachio/Whip/O+W|5-70|Nr"
//   CX ratchet-integrated bit (Turbo, Operate): "@Pegasus/Blast/A||Tr"
//   A "?" means that piece is not confirmed and is skipped.
// A metal lock chip is written with a trailing "*" (e.g. "Emperor*").

window.CATALOG = (() => {
  // ---------- Shared part data ----------
  // Ratchets: name -> weight (g)
  const RATCHETS = {
    '0-60': 6.81, '0-70': 6.99, '0-80': 7.57, '1-50': 5.63, '1-60': 5.96, '1-70': 6.12, '1-80': 6.7,
    '2-60': 6.16, '2-70': 6.33, '2-80': 6.86, '3-60': 6.29, '3-70': 6.44, '3-80': 6.93, '3-85': 4.76,
    '4-50': 5.81, '4-55': 4.75, '4-60': 6.26, '4-70': 6.42, '4-80': 6.9, '5-50': null, '5-60': 6.59, '5-70': 6.73,
    '5-80': 7.22, 'M-85': 10.73, '6-60': 6.16, '6-70': 6.39, '6-80': 6.85, '7-55': 5.28, '7-60': 7.11,
    '7-70': 7.24, '7-80': 7.83, '8-70': 7.72, '8-80': null, '9-60': 6.19, '9-65': 4.48, 'M-65': null, '9-70': 6.29, '9-80': 6.89,
  };

  // Bits: code -> [name, type, weight]
  const BITS = {
    A: ['Accel', 'Attack', 2.6], B: ['Ball', 'Stamina', 2.1], BS: ['Bound Spike', 'Defense', 2.1],
    C: ['Cyclone', 'Attack', 2.1], DB: ['Disc Ball', 'Stamina', 3.1], DS: ['Disk Spike', 'Defense', 3.1],
    D: ['Dot', 'Defense', 2.0], E: ['Elevate', 'Attack', 3.2], F: ['Flat', 'Attack', 2.3],
    FB: ['Free Ball', 'Stamina', 1.9], FF: ['Free Flat', 'Attack', 2.1], GB: ['Gear Ball', 'Stamina', 2.1],
    GF: ['Gear Flat', 'Attack', 2.3], GN: ['Gear Needle', 'Defense', 2.6], GP: ['Gear Point', 'Attack', 2.3],
    GR: ['Gear Rush', 'Attack', 2.6], GU: ['Gear Unite', 'Balance', 2.28], G: ['Glide', 'Stamina', 2.54],
    H: ['Hexa', 'Defense', 2.6], HN: ['High Needle', 'Defense', 2.2], HT: ['High Taper', 'Balance', 2.2],
    I: ['Ignition', 'Attack', 2.36], J: ['Jolt', 'Attack', 2.1], K: ['Kick', 'Balance', 2.1],
    L: ['Level', 'Attack', 2.1], LC: ['Low Cyclone', 'Attack', null], LF: ['Low Flat', 'Attack', 2.1],
    LO: ['Low Orb', 'Stamina', 2.1], LR: ['Low Rush', 'Attack', 2.1], M: ['Merge', 'Attack', 2.1],
    MN: ['Metal Needle', 'Defense', 2.79], Nr: ['Narrow', 'Stamina', 2.1], N: ['Needle', 'Defense', 2.0],
    O: ['Orb', 'Stamina', 2.0], P: ['Point', 'Balance', 2.2], Q: ['Quake', 'Attack', 2.2],
    RA: ['Rubber Accel', 'Attack', 3.11], R: ['Rush', 'Attack', 2.1], S: ['Spike', 'Defense', 2.0],
    T: ['Taper', 'Attack', 2.2], TK: ['Trans Kick', 'Balance', 2.1], TP: ['Trans Point', 'Balance', 2.17],
    UF: ['Under Flat', 'Attack', 2.1], UN: ['Under Needle', 'Defense', 2.1], U: ['Unite', 'Balance', 2.1],
    V: ['Vortex', 'Attack', 2.1], WB: ['Wall Ball', 'Stamina', 2.1], WW: ['Wall Wedge', 'Defense', 2.4],
    W: ['Wedge', 'Defense', 2.1], Y: ['Yield', 'Stamina', 2.1], Z: ['Zap', 'Attack', 2.1],
    MO: ['Metal Orb', 'Stamina', null], LP: ['Low Point', 'Balance', null], MT: ['Metal Taper', '', null],
    // Ratchet-integrated bits (no separate ratchet)
    Tr: ['Turbo', 'Balance', 13.5, 'rib'], Op: ['Operate', 'Defense', 14.1, 'rib'],
  };

  const ASSIST = {
    A: 'Assault', B: 'Bumper', C: 'Charge', D: 'Dual', E: 'Erase', F: 'Free', G: 'Gravity', H: 'Heavy',
    J: 'Jaggy', K: 'Knuckle', M: 'Massive', O: 'Odd', Q: 'Quell', R: 'Round', S: 'Slash', T: 'Turn',
    V: 'Vertical', W: 'Wheel', Z: 'Zillion',
  };
  const OVER = { B: 'Break', F: 'Flow', G: 'Guard', O: 'Outer', P: 'Peak', T: 'Tough', W: 'Weight' };

  // ---------- Takara Tomy blades (BX / UX) ----------
  // name: [line, type, weight, spin, hasbroName, integrated]
  const TT_BLADES = {
    'Dran Sword': ['BX', 'Attack', 34.9, 'R', 'Sword Dran'], 'Hells Scythe': ['BX', 'Balance', 33.7, 'R', 'Scythe Incendio'],
    'Wizard Arrow': ['BX', 'Stamina', 31.8, 'R', 'Arrow Wizard'], 'Knight Shield': ['BX', 'Defense', 32.5, 'R', 'Helm Knight'],
    'Knight Lance': ['BX', 'Defense', 32.7, 'R', 'Lance Knight'], 'Shark Edge': ['BX', 'Attack', 34.5, 'R', 'Keel Shark'],
    'Leon Claw': ['BX', 'Balance', 31.4, 'R', 'Claw Leon'], 'Viper Tail': ['BX', 'Stamina', 34.6, 'R', 'Tail Viper'],
    'Rhino Horn': ['BX', 'Defense', 32.8, 'R', 'Horn Rhino'], 'Dran Dagger': ['BX', 'Attack', 35.2, 'R', 'Dagger Dran'],
    'Hells Chain': ['BX', 'Balance', 33.3, 'R', 'Chain Incendio'], 'Phoenix Wing': ['BX', 'Attack', 38.3, 'R', 'Soar Phoenix'],
    'Wyvern Gale': ['BX', 'Stamina', 31.8, 'R', 'Gale Wyvern'], 'Unicorn Sting': ['BX', 'Balance', 34.0, 'R', 'Sting Unicorn'],
    'Sphinx Cowl': ['BX', 'Defense', 32.9, 'R', 'Cowl Sphinx'], 'Phoenix Feather': ['BX', 'Attack', 33.4, 'R', 'Feather Phoenix'],
    'Tyranno Beat': ['BX', 'Attack', 37.0, 'R', 'Beat Tyranno'], 'Weiss Tiger': ['BX', 'Balance', 34.6, 'R', 'Pearl Tiger'],
    'Cobalt Dragoon': ['BX', 'Attack', 37.8, 'L', 'Cobalt Dragoon'], 'Cobalt Drake': ['BX', 'Attack', 38.1, 'R', 'Cobalt Drake'],
    'Black Shell': ['BX', 'Defense', 32.4, 'R', 'Obsidian Shell'], 'Whale Wave': ['BX', 'Balance', 38.3, 'R', 'Tide Whale'],
    'Bear Scratch': ['BX', 'Attack', 30.3, 'R', 'Savage Bear'], 'Crimson Garuda': ['BX', 'Balance', 35.2, 'R', 'Scarlet Garuda'],
    'Shelter Drake': ['BX', 'Balance', 32.5, 'R', 'Shelter Drake'], 'Tricera Press': ['BX', 'Defense', 36.5, 'R', 'Ridge Triceratops'],
    'Samurai Calibur': ['BX', 'Balance', 36.0, 'R', 'Calibur Samurai'], 'Goat Tackle': ['BX', 'Balance', 31.8, 'R', 'Tackle Goat'],
    'Mammoth Tusk': ['BX', 'Balance', 32.5, 'R', 'Tusk Mammoth'], 'Croc Crunch': ['BX', 'Attack', 33.8, 'R', 'Bite Croc'],
    'Shinobi Knife': ['BX', 'Attack', 31.0, 'R', 'Knife Shinobi'], 'Dran Strike': ['BX', 'Attack', 41.2, 'R', 'Strike Dran'],
    'Heavens Ring': ['BX', 'Defense', 37.4, 'R', ''], 'Luster Dragoon': ['BX', 'Attack', null, 'L', ''],
    'Sieg Superion': ['BX', 'Balance', null, 'R', 'Suppress Superion'], 'Horus Shatter': ['BX', '', null, 'R', ''],
    'Dranzer Spiral': ['BX', 'Balance', 27.8, 'R', ''], 'Driger Slash': ['BX', 'Balance', 28.6, 'R', ''],
    'Draciel Shield': ['BX', 'Defense', 28.4, 'R', ''], 'Lightning L-Drago': ['BX', 'Attack', 33.4, 'L', ''],
    'Rock Leone': ['BX', 'Defense', 29.8, 'R', ''], 'Xeno Xcalibur': ['BX', 'Attack', 31.0, 'R', ''],
    'Dragoon Storm': ['BX', 'Attack', 25.2, 'L', ''], 'Storm Spriggan': ['BX', 'Balance', 31.1, 'R', 'Storm Spriggan'],
    'Storm Pegasis': ['BX', 'Attack', 30.8, 'R', 'Storm Pegasis'], 'Victory Valkyrie': ['BX', 'Attack', 33.4, 'R', 'Victory Valkyrie'],
    'Samurai Steel': ['BX', 'Balance', 31.5, 'R', 'Steel Samurai'],
    'Dran Buster': ['UX', 'Attack', 36.8, 'R', 'Buster Dran'], 'Hells Hammer': ['UX', 'Balance', 33.3, 'R', 'Hammer Incendio'],
    'Wizard Rod': ['UX', 'Stamina', 35.3, 'R', 'Wand Wizard'], 'Shinobi Shadow': ['UX', 'Defense', 28.3, 'R', 'Shadow Shinobi'],
    'Leon Crest': ['UX', 'Defense', 34.8, 'R', 'Crest Leon'], 'Phoenix Rudder': ['UX', 'Stamina', 34.5, 'R', 'Rudder Phoenix'],
    'Silver Wolf': ['UX', 'Stamina', 36.7, 'R', 'Sterling Wolf'], 'Samurai Saber': ['UX', 'Attack', 36.4, 'R', 'Saber Samurai'],
    'Knight Mail': ['UX', 'Defense', 36.5, 'R', 'Mail Knight'], 'Ptera Swing': ['UX', 'Stamina', 34.4, 'R', 'Talon Ptera'],
    'Impact Drake': ['UX', 'Attack', 39.0, 'R', 'Impact Drake'], 'Ghost Circle': ['UX', 'Stamina', 26.8, 'R', 'Circle Ghost'],
    'Golem Rock': ['UX', 'Defense', 34.3, 'R', 'Rock Golem'], 'Scorpio Spear': ['UX', 'Balance', 39.7, 'R', 'Spear Scorpio'],
    'Shark Scale': ['UX', 'Attack', 37.6, 'R', 'Scale Shark'], 'Tyranno Roar': ['UX', 'Attack', 36.0, 'R', 'Roar Tyranno'],
    'Clock Mirage': ['UX', 'Stamina', 37.7, 'R', ''], 'Meteor Dragoon': ['UX', 'Attack', 39.0, 'L', 'Meteoroid Dragoon'],
    'Mummy Curse': ['UX', 'Defense', 37.5, 'R', 'Mummy Curse'], 'Aero Pegasus': ['UX', 'Attack', 38.7, 'R', ''],
    'Wyvern Hover': ['UX', 'Defense', 34.9, 'R', 'Hover Wyvern'], 'Orochi Cluster': ['UX', 'Attack', null, 'R', ''],
    'Shark Gill': ['BX', 'Stamina', 29.9, 'R', 'Gill Shark'],
    // Ratchet-integrated blades (Unique Line Expand): no separate ratchet
    'Bullet Griffon': ['UX', 'Balance', 38.5, 'R', 'Rocket Griffon', true], 'Glory Valkyrie': ['UX', 'Attack', 39.5, 'R', 'Glory Valkerion', true],
    'Hells Nether': ['UX', 'Balance', null, 'R', 'Nether Incendio', true], 'Vanish Lucifer': ['UX', '', null, 'R', '', true],
    'Bison Burrow': ['UX', '', null, 'R', '', true],
  };

  // CX lock chips, main blades (classic CX) and metal blades (CX Expand)
  const TT_LOCKS = ['Dran', 'Wizard', 'Perseus', 'Hells', 'Rhino', 'Phoenix', 'Whale', 'Leon', 'Fox', 'Pegasus', 'Cerberus',
    'Sol', 'Wolf', 'Emperor*', 'Bahamut', 'Knight', 'Ragna', 'Unicorn', 'Brachio', 'Croco', 'Valkyrie*', 'Kid'];
  const TT_MAINS = { Brave: 'Courage', Arc: '', Dark: '', Reaper: 'Reaper', Brush: 'Brush', Blast: 'Blast', Flame: 'Flame',
    Eclipse: '', Hunt: '', Might: 'Might', Flare: '', Fang: 'Fang', Volt: '' }; // value = Hasbro name if known
  const TT_METALS = { Blitz: 'Blitz', Fortress: '', Rage: 'Rage', Delta: '', Whip: '', Tread: 'Tread', Force: '' };

  // ---------- Accessories (launchers, stadiums, other gear) ----------
  // name -> [kind, Hasbro name]
  const ACCESSORIES = {
    'Winder Launcher': ['launcher'], 'Long Winder Launcher': ['launcher'], 'String Launcher': ['launcher'], 'String Launcher L (left spin)': ['launcher'],
    'Ripcord Launcher': ['launcher'], 'Launcher Grip': ['gear'], 'Xtreme Stadium': ['stadium'], 'Xtreme Stadium (Red)': ['stadium'],
    'Wide Xtreme Stadium': ['stadium'], 'Infinity Stadium': ['stadium'], 'Double Xtreme Stadium': ['stadium'], 'Storage Box (Evangelion)': ['gear'], 'Clash and Carry Stadium': ['stadium'], 'Drop Attack Stadium': ['stadium'], 'Double Xtreme Motorized Stadium': ['stadium'],
    '3on3 Deck Case': ['gear'], '3on3 Deck Case (Black)': ['gear'], 'Bey Battle Pass': ['gear'],
  };
  TT_LOCKS.push('Dyna');

  // ---------- Takara Tomy products ----------
  // [code, name, beys[], extraParts?, flags?]
  const TT_PRODUCTS = [
    ['BX-01', 'Starter Dran Sword 3-60F', ['Dran Sword|3-60|F']],
    ['BX-02', 'Starter Hells Scythe 4-60T', ['Hells Scythe|4-60|T']],
    ['BX-03', 'Starter Wizard Arrow 4-80B', ['Wizard Arrow|4-80|B']],
    ['BX-04', 'Starter Knight Shield 3-80N', ['Knight Shield|3-80|N']],
    ['BX-05', 'Booster Wizard Arrow 4-80B', ['Wizard Arrow|4-80|B']],
    ['BX-06', 'Booster Knight Shield 3-80N', ['Knight Shield|3-80|N']],
    ['BX-07', 'Start Dash Set', ['Dran Sword|3-60|F'], ['acc:Xtreme Stadium', 'acc:String Launcher', 'acc:Launcher Grip']],
    ['BX-09', 'Bey Battle Pass', [], ['acc:Bey Battle Pass']],
    ['BX-10', 'Xtreme Stadium', [], ['acc:Xtreme Stadium']],
    ['BX-11', 'Launcher Grip', [], ['acc:Launcher Grip']],
    ['BX-12', '3on3 Deck Case', [], ['acc:3on3 Deck Case']],
    ['BX-18', 'String Launcher', [], ['acc:String Launcher']],
    ['BX-08', '3on3 Deck Set', ['Hells Scythe|3-80|B', 'Wizard Arrow|4-60|N', 'Knight Shield|4-80|T']],
    ['BX-13', 'Booster Knight Lance 4-80HN', ['Knight Lance|4-80|HN']],
    ['BX-14', 'Random Booster Vol.1', ['Shark Edge|3-60|LF', 'Shark Edge|4-80|N', 'Dran Sword|3-80|B', 'Hells Scythe|4-80|LF', 'Knight Shield|4-60|LF', 'Wizard Arrow|3-60|T'], null, { random: true }],
    ['BX-15', 'Starter Leon Claw 5-60P', ['Leon Claw|5-60|P']],
    ['BX-16', 'Random Booster Viper Tail Select', ['Viper Tail|5-80|O', 'Viper Tail|4-60|F', 'Viper Tail|3-80|HN'], null, { random: true }],
    ['BX-17', 'Battle Entry Set', ['Dran Sword|3-60|F', 'Wizard Arrow|4-80|B'], ['acc:Xtreme Stadium', 'acc:Winder Launcher', 'acc:Winder Launcher']],
    ['BX-19', 'Booster Rhino Horn 3-80S', ['Rhino Horn|3-80|S']],
    ['BX-20', 'Dran Dagger Deck Set', ['Dran Dagger|4-60|R', 'Knight Shield|5-80|T', 'Shark Edge|3-80|F']],
    ['BX-21', 'Hells Chain Deck Set', ['Hells Chain|5-60|HT', 'Knight Lance|3-60|LF', 'Wizard Arrow|4-80|N']],
    ['BX-22', 'Dran Sword 3-60F Entry Package', ['Dran Sword|3-60|F']],
    ['BX-23', 'Starter Phoenix Wing 9-60GF', ['Phoenix Wing|9-60|GF']],
    ['BX-24', 'Random Booster Vol.2', ['Wyvern Gale|5-80|GB', 'Wyvern Gale|3-60|T', 'Knight Lance|4-60|GB', 'Viper Tail|5-60|F', 'Leon Claw|3-80|HN', 'Wizard Arrow|4-80|GB'], null, { random: true }],
    ['BX-26', 'Booster Unicorn Sting 5-60GP', ['Unicorn Sting|5-60|GP']],
    ['BX-27', 'Random Booster Sphinx Cowl Select', ['Sphinx Cowl|9-80|GN', 'Sphinx Cowl|4-80|HT', 'Sphinx Cowl|5-60|O'], null, { random: true }],
    ['BX-31', 'Random Booster Vol.3', ['Tyranno Beat|4-70|Q', 'Tyranno Beat|3-60|S', 'Dran Dagger|4-70|P', 'Hells Chain|9-80|O', 'Shark Edge|1-60|Q', 'Rhino Horn|5-80|Q'], null, { random: true }],
    ['BX-33', 'Booster Weiss Tiger 3-60U', ['Weiss Tiger|3-60|U']],
    ['BX-34', 'Starter Cobalt Dragoon 2-60C', ['Cobalt Dragoon|2-60|C']],
    ['BX-35', 'Random Booster Vol.4', ['Black Shell|4-60|D', 'Black Shell|9-80|B', 'Unicorn Sting|3-70|D', 'Wizard Rod|1-60|R', 'Phoenix Wing|5-80|H', 'Viper Tail|5-70|D'], null, { random: true }],
    ['BX-36', 'Random Booster Whale Wave Select', ['Whale Wave|5-80|E', 'Whale Wave|4-80|HN', 'Whale Wave|3-80|GB'], null, { random: true }],
    ['BX-37', 'Double Xtreme Stadium Set', ['Bear Scratch|5-60|F'], ['acc:Double Xtreme Stadium', 'acc:Winder Launcher']],
    ['BX-38', 'Booster Crimson Garuda 4-70TP', ['Crimson Garuda|4-70|TP']],
    ['BX-39', 'Random Booster Shelter Drake Select', ['Shelter Drake|7-80|GP', 'Shelter Drake|5-70|O', 'Shelter Drake|3-60|D'], null, { random: true }],
    ['BX-44', 'Booster Tricera Press M-85BS', ['Tricera Press|M-85|BS']],
    ['BX-45', 'Booster Samurai Calibur 6-70M', ['Samurai Calibur|6-70|M']],
    ['BX-46', 'Battle Entry Set ∞', ['Cobalt Drake|9-60|R', 'Goat Tackle|7-70|T'], ['acc:Infinity Stadium', 'acc:Winder Launcher', 'acc:Winder Launcher']],
    ['BX-47', 'String Launcher L (Red)', [], ['acc:String Launcher L (left spin)']],
    ['BX-48', 'Random Booster Vol.9', ['Cobalt Dragoon|9-80|F', 'Shark Edge|4-70|E', 'Mammoth Tusk|7-60|S', 'Hells Scythe|3-85|GB', 'Dran Buster|2-80|Q'], null, { random: true }],
    ['BX-49', 'Starter Dran Strike 4-50FF', ['Dran Strike|4-50|FF']],
    ['BX-50', 'Random Booster Vol.11', ['Heavens Ring|0-80|DS', 'Heavens Ring|6-60|TP', 'Impact Drake|7-55|FB', 'Ghost Circle|M-85|DS', '@Wolf/Flame/D|9-65|L', '@Cerberus/Reaper/B|0-80|WB'], null, { random: true }],
    ['BX-52', 'Starter Luster Dragoon 6-60LC', ['Luster Dragoon|6-60|LC']],
    ['BX-53', 'All-in-One Set', ['Aero Pegasus|3-70|A', 'Wizard Arrow|4-80|B', 'Knight Shield|3-80|N'], ['acc:Xtreme Stadium', 'acc:Ripcord Launcher', 'acc:String Launcher']],
    ['BX-57', '3on3 Deck Case Black Ver.', [], ['acc:3on3 Deck Case (Black)']],
    ['BX-00', 'Xtreme Stadium Red (Takara Tomy Mall)', [], ['acc:Xtreme Stadium (Red)'], { limited: true }],
    ['BX-54', 'Booster Sieg Superion 0-70LP', ['Sieg Superion|0-70|LP']],
    ['BX-55', 'Random Booster Vol.12', ['Horus Shatter|3-85|MO', 'Horus Shatter|1-60|BS', '@Leon/Fang/T|9-65|HT', '@Fox/Blast/R|6-70|A', 'Tricera Press|4-60|DS', 'Clock Mirage|4-55|MO'], null, { random: true }],
    ['BX-00', 'Booster Dranzer Spiral 3-80T', ['Dranzer Spiral|3-80|T']],
    ['BX-00', 'Booster Driger Slash 4-80P', ['Driger Slash|4-80|P']],
    ['BX-00', 'Booster Draciel Shield 7-60D', ['Draciel Shield|7-60|D']],
    ['BX-00', 'Random Booster Lightning L-Drago 1-60F', ['Lightning L-Drago|1-60|F', 'Lightning L-Drago|1-60|F'], null, { random: true }],
    ['BX-00', 'Booster Rock Leone 6-80GN', ['Rock Leone|6-80|GN']],
    ['BX-00', 'Starter Xeno Xcalibur 3-60GF', ['Xeno Xcalibur|3-60|GF']],
    ['BX-00', 'Booster Dragoon Storm 4-60RA', ['Dragoon Storm|4-60|RA']],
    ['BX-00', 'Starter Storm Spriggan 2-70M', ['Storm Spriggan|2-70|M']],
    ['BX-00', 'Starter Storm Pegasis 3-70RA', ['Storm Pegasis|3-70|RA']],
    ['BX-00', 'Mammoth Tusk 2-80E Metal Coat: Black', ['Mammoth Tusk|2-80|E']],
    ['BX-00', 'Croc Crunch 2-60Q', ['Croc Crunch|2-60|Q']],
    ['UX-00', 'Aero Pegasus 3-70A', ['Aero Pegasus|3-70|A']],
    ['UX-00', 'Booster Orochi Cluster 6-60LF', ['Orochi Cluster|6-60|LF']],
    ['UX-00', 'Wyvern Hover 2-80GN', ['Wyvern Hover|2-80|GN']],
    ['UX-00', 'Bison Burrow DB', ['Bison Burrow||DB']],
    ['UX-00', 'Samurai Saber 5-60K Metal Coat: Samurai Blue (Japan National Team)', ['Samurai Saber|5-60|K'], null, { limited: true }],
    ['UX-00', 'Booster Scorpio Spear 0-70Z Metal Coat: Magenta', ['Scorpio Spear|0-70|Z'], null, { limited: true }],
    ['UX-00', 'Bison Burrow DB Metal Coat: White (DMM last prize)', ['Bison Burrow||DB'], null, { limited: true }],
    ['UX-01', 'Starter Dran Buster 1-60A', ['Dran Buster|1-60|A']],
    ['UX-02', 'Starter Hells Hammer 3-70H', ['Hells Hammer|3-70|H']],
    ['UX-03', 'Booster Wizard Rod 5-70DB', ['Wizard Rod|5-70|DB']],
    ['UX-04', 'Battle Entry Set U', ['Dran Buster|1-60|A', 'Wizard Rod|5-70|DB'], ['acc:Xtreme Stadium', 'acc:Winder Launcher', 'acc:Winder Launcher']],
    ['UX-05', 'Random Booster Shinobi Shadow Select', ['Shinobi Shadow|1-80|MN', 'Shinobi Shadow|9-60|LF', 'Shinobi Shadow|3-70|GP'], null, { random: true }],
    ['UX-06', 'Booster Leon Crest 7-60GN', ['Leon Crest|7-60|GN']],
    ['UX-07', 'Phoenix Rudder Deck Set', ['Phoenix Rudder|9-70|G', 'Sphinx Cowl|1-80|GF', 'Wyvern Gale|2-60|S']],
    ['UX-08', 'Starter Silver Wolf 3-80FB', ['Silver Wolf|3-80|FB']],
    ['UX-09', 'Starter Samurai Saber 2-70L', ['Samurai Saber|2-70|L']],
    ['UX-10', 'Customize Set U', ['Knight Mail|3-85|BS'], ['blade:Ptera Swing', 'blade:Hells Hammer', 'blade:Tyranno Beat', 'ratchet:1-60', 'ratchet:7-70', 'bit:B', 'bit:R', 'bit:P', 'bit:MN', 'bit:RA']],
    ['UX-11', 'Starter Impact Drake 9-60LR', ['Impact Drake|9-60|LR']],
    ['UX-12', 'Random Booster Vol.5', ['Ghost Circle|0-80|GB', 'Ghost Circle|4-60|H', 'Shinobi Shadow|3-80|F', 'Leon Claw|0-80|E', 'Phoenix Feather|2-60|N', 'Wyvern Gale|0-80|C'], null, { random: true }],
    ['UX-13', 'Booster Golem Rock 1-60UN', ['Golem Rock|1-60|UN']],
    ['UX-14', 'Starter Scorpio Spear 0-70Z', ['Scorpio Spear|0-70|Z']],
    ['UX-15', 'Shark Scale Deck Set', ['Shark Scale|4-50|UF', 'Tyranno Roar|1-70|L', '@Hells/Brave/J|3-60|GF']],
    ['UX-16', 'Random Booster Clock Mirage Select', ['Clock Mirage|9-65|B'], null, { random: true }],
    ['UX-17', 'Starter Meteor Dragoon 3-70J', ['Meteor Dragoon|3-70|J']],
    ['UX-18', 'Random Booster Vol.8', ['Mummy Curse|7-55|W', 'Mummy Curse|4-60|C', '@Pegasus/Brush/M|3-85|W', '@Sol/Brave/C|9-70|TP', 'Dran Dagger|7-55|G', 'Weiss Tiger|4-80|LR'], null, { random: true }],
    ['UX-19', 'Starter Bullet Griffon H', ['Bullet Griffon||H']],
    ['UX-20', 'Starter Glory Valkyrie LF', ['Glory Valkyrie||LF']],
    ['UX-21', 'Hells Nether Deck Set', ['Hells Nether||Z', 'Silver Wolf|9-70|R', 'Wyvern Hover|8-80|B']],
    ['UX-22', 'Starter Vanish Lucifer WW', ['Vanish Lucifer||WW']],
    ['CX-01', 'Starter Dran Brave S6-60V', ['@Dran/Brave/S|6-60|V']],
    ['CX-02', 'Starter Wizard Arc R4-55LO', ['@Wizard/Arc/R|4-55|LO']],
    ['CX-03', 'Booster Perseus Dark B6-80W', ['@Perseus/Dark/B|6-80|W']],
    ['CX-04', 'Battle Entry Set C', ['@Dran/Brave/S|6-60|V', '@Perseus/Dark/B|6-80|W'], ['acc:Xtreme Stadium', 'acc:Winder Launcher', 'acc:Winder Launcher']],
    ['CX-05', 'Random Booster Vol.6', ['@Hells/Reaper/T|4-70|K', '@Rhino/Reaper/C|4-55|D', '@Hells/Arc/T|3-85|O', 'Leon Crest|9-80|K', 'Phoenix Rudder|4-70|LF', 'Whale Wave|7-60|K'], null, { random: true }],
    ['CX-06', 'Random Booster Fox Brush Select', ['@Fox/Brush/J|9-70|GR', '@Fox/Brush/J|0-80|DB', '@Fox/Brush/J|2-70|U'], null, { random: true }],
    ['CX-07', 'Starter Pegasus Blast ATr', ['@Pegasus/Blast/A||Tr']],
    ['CX-08', 'Random Booster Vol.7', ['@Cerberus/Flame/W|5-80|WB', '@Whale/Flame/M|3-85|HT', '@Cerberus/Dark/W|1-60|F', 'Dran Buster|5-80|MN', 'Black Shell|7-70|WB', 'Cobalt Dragoon|4-55|WB'], null, { random: true }],
    ['CX-09', 'Starter Sol Eclipse D5-70TK', ['@Sol/Eclipse/D|5-70|TK']],
    ['CX-10', 'Booster Wolf Hunt F0-60DB', ['@Wolf/Hunt/F|0-60|DB']],
    ['CX-11', 'Emperor Might Deck Set', ['@Emperor*/Might/H||Op', 'Golem Rock|M-85|HN', 'Shark Gill|5-60|FB']],
    ['CX-12', 'Booster Phoenix Flare Z9-80WW', ['@Phoenix/Flare/Z|9-80|WW']],
    ['CX-13', 'Starter Bahamut Blitz BK1-50I', ['@Bahamut/Blitz/B+K|1-50|I']],
    ['CX-14', 'Starter Knight Fortress GV8-70UN', ['@Knight/Fortress/G+V|8-70|UN']],
    ['CX-15', 'Booster Ragna Rage FE4-55Y', ['@Ragna/Rage/F+E|4-55|Y']],
    ['CX-16', 'Start Dash Set C', ['@Bahamut/Blitz/B+K|1-50|I'], ['acc:Xtreme Stadium', 'acc:String Launcher', 'acc:Launcher Grip']],
    ['CX-17', 'Random Booster Vol.10', ['@Unicorn/Delta/P+O|3-60|GU', '@Unicorn/Delta/P+O|1-80|GR', 'Samurai Saber|9-65|LO', 'Hells Hammer|3-85|GU', 'Tyranno Beat|3-60|N', 'Crimson Garuda|7-80|GU'], null, { random: true }],
    ['CX-18', 'Random Booster Brachio Whip Select', ['@Brachio/Whip/O+W|5-70|Nr'], null, { random: true }],
    ['CX-19', 'Random Booster Croco Tread Select', ['@Croco/Tread/T+Q|5-50|GN'], null, { random: true }],
    ['CX-20', 'Customize Set C', ['@Phoenix/Force/W+H|M-65|MT'], ['blade:Shark Scale', 'blade:Wizard Rod', 'blade:Hells Scythe', 'ratchet:1-70', 'ratchet:8-80', 'bit:K', 'bit:LR', 'bit:HN', 'bit:LO', 'bit:UF']],
    ['CX-00', 'Valkyrie Volt S4-70V', ['@Valkyrie*/Volt/S|4-70|V']],
    ['CX-00', 'Valkyrie Volt S4-70V Gunmetal Ver.', ['@Valkyrie*/Volt/S|4-70|V'], null, { limited: true }],
    ['CX-00', 'Dyna Rage FT3-60T (Ultraman Dyna collab)', ['@Dyna/Rage/F+T|3-60|T'], null, { limited: true, collab: true }],
    ['CX-00', 'Evangelion Deck Set (collab)', ['@EVA-01 /Brave/A|1-70|V', '@EVA-00 /Arc/B|0-70|E', '@EVA-02 /Brush/T|2-70|A'], ['acc:Long Winder Launcher', 'acc:Long Winder Launcher', 'acc:Storage Box (Evangelion)'], { limited: true, collab: true }],
    ['CX-00', 'Leon Fang T4-60A (Red Ver.)', ['@Leon/Fang/T|4-60|A']],
    ['CX-00', 'Kid Hunt K4-70TK', ['@Kid/Hunt/K|4-70|TK']],
  ];

  // ---------- Hasbro ----------
  // Hasbro parts are different moulds and are tracked separately. Hasbro names CX beys "Main Lock".
  // This list is partial: add anything missing from the app with "Add custom part".
  const H_ONLY_BLADES = { 'Stun Medusa': ['BX', '', null, 'R'],
    // Collab tops (Hasbro). Same rules as other blades, own moulds and decoration.
    'Spider-Man': ['BX', '', null, 'R'], 'Venom': ['BX', '', null, 'R'], 'Iron Man': ['BX', '', null, 'R'], 'Thanos': ['BX', '', null, 'R'],
    'The Mandalorian': ['BX', '', null, 'R'], 'Moff Gideon': ['BX', '', null, 'R'], 'Luke Skywalker': ['BX', '', null, 'R'], 'Darth Vader': ['BX', '', null, 'R'],
    'Obi-Wan Kenobi': ['BX', '', null, 'R'], 'General Grievous': ['BX', '', null, 'R'], 'Chewbacca': ['BX', '', null, 'R'], 'Stormtrooper': ['BX', '', null, 'R'],
    'Optimus Primal': ['BX', '', null, 'R'], 'Starscream': ['BX', '', null, 'R'], 'Optimus Prime': ['BX', '', null, 'R'], 'Megatron': ['BX', '', null, 'R'],
    'Captain America': ['BX', 'Stamina', null, 'R'], 'Red Hulk': ['BX', '', null, 'R'],
    'T. Rex': ['BX', 'Stamina', null, 'R'], 'Mosasaurus': ['BX', 'Balance', null, 'R'], 'Spinosaurus': ['BX', 'Attack', null, 'R'], 'Quetzalcoatlus': ['BX', 'Defense', null, 'R'] };
  const H_PRODUCTS = [
    ['F9580', 'Sword Dran 3-60F Starter', ['Sword Dran|3-60|F']],
    ['F9581', 'Scythe Incendio 4-60T Starter', ['Scythe Incendio|4-60|T']],
    ['F9582', 'Arrow Wizard 4-80B Starter', ['Arrow Wizard|4-80|B']],
    ['F9583', 'Helm Knight 3-80N Starter', ['Helm Knight|3-80|N']],
    ['H-SOAR', 'Soar Phoenix 9-60GF Deluxe Launcher Set', ['Soar Phoenix|9-60|GF']],
    ['H-KEEL', 'Keel Shark 3-60LF', ['Keel Shark|3-60|LF']],
    ['H-BUST', 'Buster Dran 1-60A Starter', ['Buster Dran|1-60|A']],
    ['H-HAMM', 'Hammer Incendio 3-70H Starter', ['Hammer Incendio|3-70|H']],
    ['H-WAND', 'Wand Wizard 1-60R Starter', ['Wand Wizard|1-60|R']],
    ['H-SHEL', 'Shelter Drake 7-80GP Starter', ['Shelter Drake|7-80|GP']],
    ['H-SHE2', 'Shelter Drake 5-70O Booster', ['Shelter Drake|5-70|O']],
    ['H-BITE', 'Bite Croc 2-60Q Deluxe Launcher Set', ['Bite Croc|2-60|Q']],
    ['G2350', 'Blast Pegasus A Tr Clip & Rip Launcher Set', ['@Pegasus/Blast/A||Tr']],
    ['G2748', 'Fang Leon T 4-60U Starter', ['@Leon/Fang/T|4-60|U']],
    ['H-REAP', 'Reaper Rhino C 4-55D Starter', ['@Rhino/Reaper/C|4-55|D']],
    ['H-FLAM', 'Flame Cerberus W 5-80WB Starter', ['@Cerberus/Flame/W|5-80|WB']],
    ['G1678', 'Hells Reaper Incendio T4-70K Starter', ['@Hells/Reaper/T|4-70|K']],
    ['H-COUR', 'Courage Dran S 6-60V Starter', ['@Dran/Courage/S|6-60|V']],
    ['H-FEAT', 'Feather Phoenix 2-60N Starter', ['Feather Phoenix|2-60|N']],
    ['H-RUDD', 'Rudder Phoenix 4-70LF Starter', ['Rudder Phoenix|4-70|LF']],
    ['G2738', 'Stun Medusa 9-60GB Starter', ['Stun Medusa|9-60|GB']],
    ['H-RIDG', 'Ridge Triceratops 9-80GN Booster', ['Ridge Triceratops|9-80|GN']],
    ['G2731', 'Scale Shark 4-50UF Booster', ['Scale Shark|4-50|UF']],
    ['G2734', 'Mummy Curse 7-55W Booster', ['Mummy Curse|7-55|W']],
    ['G2758', 'Spear Scorpio 0-70Z & Tail Viper 3-85LO Dual Pack', ['Spear Scorpio|0-70|Z', 'Tail Viper|3-85|LO']],
    ['H-METE', 'Meteoroid Dragoon 3-70J Starter', ['Meteoroid Dragoon|3-70|J']],
    ['H-GRIF', 'Rocket Griffon H Starter', ['Rocket Griffon||H']],
    ['CX-15H', 'Rage Ragna FE4-55Y Booster', ['@Ragna/Rage/F+E|4-55|Y']],
    ['G4572', 'Blitz Bahamut BK 1-50I Starter', ['@Bahamut/Blitz/B+K|1-50|I']],
    ['G4564', 'Nether Incendio Z Starter', ['Nether Incendio||Z']],
    ['G4565', 'Tread Croco TQ5-50GN Starter', ['@Croco/Tread/T+Q|5-50|GN']],
    ['H-XBS', 'Xtreme Battle Set', ['Dagger Dran|4-60|R', 'Tusk Mammoth|3-60|T'], ['acc:Xtreme Stadium', 'acc:Ripcord Launcher', 'acc:Ripcord Launcher']],
    ['BX-32H', 'Wide Beystadium', [], ['acc:Wide Xtreme Stadium']],
    ['H-CCS', 'Clash and Carry Stadium', [], ['acc:Clash and Carry Stadium']],
    ['H-DAB', 'Drop Attack Battle Set', ['Impact Drake|9-60|LR', 'Hover Wyvern|3-85|N'], ['acc:Drop Attack Stadium', 'acc:Ripcord Launcher', 'acc:Ripcord Launcher']],
    ['BX-00H', 'Double Xtreme Motorized Beystadium', [], ['acc:Double Xtreme Motorized Stadium']],
    ['H-MV1', 'Marvel: Spider-Man 3-60F vs. Venom 3-80N', ['Spider-Man|3-60|F', 'Venom|3-80|N'], ['acc:Ripcord Launcher', 'acc:Ripcord Launcher'], { collab: true }],
    ['H-MV2', 'Marvel: Iron Man 4-80B vs. Thanos 4-60B', ['Iron Man|4-80|B', 'Thanos|4-60|B'], ['acc:Ripcord Launcher', 'acc:Ripcord Launcher'], { collab: true }],
    ['H-MV3', 'Marvel: Captain America 4-70GB vs. Red Hulk 1-80R', ['Captain America|4-70|GB', 'Red Hulk|1-80|R'], ['acc:Ripcord Launcher', 'acc:Ripcord Launcher'], { collab: true }],
    ['H-SW1', 'Star Wars: The Mandalorian 3-60F vs. Moff Gideon 3-80N', ['The Mandalorian|3-60|F', 'Moff Gideon|3-80|N'], ['acc:Ripcord Launcher', 'acc:Ripcord Launcher'], { collab: true }],
    ['H-SW2', 'Star Wars: Luke Skywalker 4-80B vs. Darth Vader 4-60B', ['Luke Skywalker|4-80|B', 'Darth Vader|4-60|B'], ['acc:Ripcord Launcher', 'acc:Ripcord Launcher'], { collab: true }],
    ['H-SW3', 'Star Wars: Obi-Wan Kenobi 4-60P vs. General Grievous 3-80HN', ['Obi-Wan Kenobi|4-60|P', 'General Grievous|3-80|HN'], ['acc:Ripcord Launcher', 'acc:Ripcord Launcher'], { collab: true }],
    ['H-SW4', 'Star Wars: Chewbacca 4-80LF vs. Stormtrooper 5-70B', ['Chewbacca|4-80|LF', 'Stormtrooper|5-70|B'], ['acc:Ripcord Launcher', 'acc:Ripcord Launcher'], { collab: true }],
    ['H-TF1', 'Transformers: Optimus Primal 3-60F vs. Starscream 3-80N', ['Optimus Primal|3-60|F', 'Starscream|3-80|N'], ['acc:Ripcord Launcher', 'acc:Ripcord Launcher'], { collab: true }],
    ['H-TF2', 'Transformers: Optimus Prime 4-60P vs. Megatron 4-80B', ['Optimus Prime|4-60|P', 'Megatron|4-80|B'], ['acc:Ripcord Launcher', 'acc:Ripcord Launcher'], { collab: true }],
    ['G1898', 'Jurassic World: T. Rex 1-80GB vs. Mosasaurus 9-60U', ['T. Rex|1-80|GB', 'Mosasaurus|9-60|U'], ['acc:Ripcord Launcher', 'acc:Ripcord Launcher'], { collab: true }],
    ['G1899', 'Jurassic World: Spinosaurus 3-85A vs. Quetzalcoatlus 4-55D', ['Spinosaurus|3-85|A', 'Quetzalcoatlus|4-55|D'], ['acc:Ripcord Launcher', 'acc:Ripcord Launcher'], { collab: true }],
    ['G3607', 'NFL: AFC vs. NFC CX Top Pack', ['@NFC/Arc/R|9-60|LO', '@AFC/Courage/S|6-70|H'], ['lock:NFC', 'lock:AFC', 'acc:Ripcord Launcher', 'acc:Ripcord Launcher'], { collab: true }],
    ['CX-11H', 'X-treme Battlers Pack (Emperor Might Deck Set)', ['@Emperor*/Might/H||Op', 'Rock Golem|M-85|HN', 'Gill Shark|5-60|FB']],
  ];

  // ---------- Build ----------
  const parts = {}; // id -> part
  const slug = s => s.toLowerCase().replace(/\*/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const add = (brand, kind, key, data) => {
    const id = `${brand}:${kind}:${slug(key)}`;
    if (!parts[id]) parts[id] = { id, brand, kind, products: [], ...data };
    return id;
  };

  const hasbroBladeInfo = {};
  for (const [name, d] of Object.entries(TT_BLADES)) if (d[4]) hasbroBladeInfo[d[4]] = d;
  for (const [name, d] of Object.entries(H_ONLY_BLADES)) hasbroBladeInfo[name] = d;

  function blade(brand, name) {
    const d = brand === 'tt' ? TT_BLADES[name] : hasbroBladeInfo[name];
    const integrated = d && d[5];
    return add(brand, integrated ? 'rblade' : 'blade', name, {
      name, line: d ? d[0] : '', type: d ? d[1] : '', weight: brand === 'tt' && d ? d[2] : null,
      spin: d ? d[3] : 'R', alt: brand === 'tt' && d && d[4] ? `Hasbro: ${d[4]}` : '',
    });
  }
  const ratchet = (brand, r) => add(brand, 'ratchet', r, { name: r, weight: brand === 'tt' ? RATCHETS[r] ?? null : null });
  function bit(brand, code) {
    const b = BITS[code] || [code, '', null];
    const rib = b[3] === 'rib';
    return add(brand, rib ? 'rbit' : 'bit', code, { name: b[0], code, type: b[1], weight: brand === 'tt' ? b[2] : null });
  }
  function lock(brand, l) {
    const metal = l.endsWith('*');
    const n = l.replace('*', '');
    return add(brand, 'lock', l, { name: n + (metal ? ' (Metal)' : ''), weight: null });
  }
  const main = (brand, m, isMetal) => add(brand, isMetal ? 'metal' : 'main', m, { name: m, weight: null });
  const assist = (brand, a) => add(brand, 'assist', a, { name: ASSIST[a] || a, code: a, weight: null });
  const acc = (brand, n) => add(brand, (ACCESSORIES[n] || ['gear'])[0], n, { name: n, acc: true, weight: null });
  const over = (brand, o) => add(brand, 'over', o, { name: OVER[o] || o, code: o, weight: null });

  // Display name for a bey string
  function beyName(brand, s) {
    const [head, r, b] = s.split('|');
    const rb = (r && r !== '?' ? r : '') + (b && b !== '?' ? b : '');
    if (!head.startsWith('@')) return `${head} ${rb}`.trim();
    const [l, m, a] = head.slice(1).split('/');
    const letters = (a || '').replace('+', '');
    const lockN = l.replace('*', '');
    if (brand === 'tt') return `${lockN}${m} ${letters}${rb}`.trim();
    return `${m} ${lockN} ${letters}${r ? ' ' + rb : ' ' + b}`.replace(/\s+/g, ' ').trim();
  }

  function beyParts(brand, s) {
    const [head, r, b] = s.split('|');
    const ids = [];
    if (head.startsWith('@')) {
      const [l, m, a] = head.slice(1).split('/');
      const expand = a && a.includes('+');
      const isMetal = expand || (brand === 'tt' ? m in TT_METALS : ['Blitz', 'Rage', 'Tread', 'Fortress', 'Delta', 'Whip', 'Force'].includes(m));
      ids.push(lock(brand, l), main(brand, m, isMetal));
      if (expand) { const [o, as] = a.split('+'); ids.push(over(brand, o), assist(brand, as)); }
      else if (a) ids.push(assist(brand, a));
    } else ids.push(blade(brand, head));
    if (r && r !== '?') ids.push(ratchet(brand, r));
    if (b && b !== '?') ids.push(bit(brand, b));
    return ids;
  }

  const products = [];
  function addProducts(brand, list) {
    list.forEach(([code, name, beys, extra, flags], i) => {
      const id = `${brand}:p:${slug(code + '-' + name)}`;
      const beyList = beys.map(s => ({ name: beyName(brand, s), parts: beyParts(brand, s) }));
      const extraIds = (extra || []).map(e => {
        const [k, v] = e.split(':');
        return k === 'lock' ? lock(brand, v) : k === 'metal' ? main(brand, v, true) : k === 'over' ? over(brand, v)
          : k === 'assist' ? assist(brand, v) : k === 'blade' ? blade(brand, v) : k === 'acc' ? acc(brand, v)
          : k === 'ratchet' ? ratchet(brand, v) : k === 'bit' ? bit(brand, v) : null;
      }).filter(Boolean);
      // Starters come with a launcher
      if (!extraIds.some(x => parts[x].acc) && /starter|deluxe launcher/i.test(name)) extraIds.push(acc(brand, brand === 'tt' ? (/UX-22/.test(code) ? 'Long Winder Launcher' : 'Winder Launcher') : 'Ripcord Launcher'));
      const p = { id, brand, code, name, beys: beyList, extra: extraIds, random: !!(flags && flags.random), partial: !!(flags && flags.partial), limited: !!(flags && flags.limited) || /-00/.test(code), collab: !!(flags && flags.collab), acc: !beyList.length && extraIds.length > 0, order: i };
      products.push(p);
      for (const bey of beyList) for (const pid of bey.parts) if (!parts[pid].products.includes(id)) parts[pid].products.push(id);
      for (const pid of extraIds) if (!parts[pid].products.includes(id)) parts[pid].products.push(id);
    });
  }
  addProducts('tt', TT_PRODUCTS);
  addProducts('hb', H_PRODUCTS);

  // Make sure every known Takara Tomy part exists even if no listed product carries it
  for (const n of Object.keys(TT_BLADES)) blade('tt', n);
  for (const r of Object.keys(RATCHETS)) ratchet('tt', r);
  for (const c of Object.keys(BITS)) bit('tt', c);
  for (const l of TT_LOCKS) lock('tt', l);
  for (const m of Object.keys(TT_MAINS)) main('tt', m, false);
  for (const m of Object.keys(TT_METALS)) main('tt', m, true);
  for (const a of Object.keys(ASSIST)) assist('tt', a);
  for (const o of Object.keys(OVER)) over('tt', o);
  for (const n of Object.keys(ACCESSORIES)) acc('tt', n);

  // Known CX component weights (Takara Tomy)
  const W = { 'tt:lock:dran': 1.74, 'tt:lock:fox': 1.75, 'tt:lock:pegasus': 1.73, 'tt:lock:emperor': 4.69, 'tt:lock:sol': 1.7,
    'tt:lock:hells': 1.74, 'tt:lock:perseus': 1.7, 'tt:lock:wizard': 1.73, 'tt:lock:cerberus': 1.73, 'tt:lock:wolf': 1.71,
    'tt:lock:valkyrie': 5.6, 'tt:lock:phoenix': 1.7, 'tt:main:brave': 31.28, 'tt:main:brush': 30.3, 'tt:main:blast': 32.76,
    'tt:main:might': 33.0, 'tt:main:eclipse': 32.36, 'tt:main:reaper': 28.97, 'tt:main:dark': 30.52, 'tt:main:arc': 29.08,
    'tt:main:flame': 28.47, 'tt:main:hunt': 31.31, 'tt:assist:s': 4.73, 'tt:assist:j': 4.88, 'tt:assist:a': 5.01,
    'tt:assist:h': 7.9, 'tt:assist:d': 5.83, 'tt:assist:t': 5.8, 'tt:assist:b': 5.25, 'tt:assist:r': 4.64, 'tt:assist:w': 7.26,
    'tt:assist:f': 5.77, 'tt:assist:z': 6.68, 'tt:assist:k': 4.88, 'tt:assist:v': 5.38, 'tt:assist:e': 6.04, 'tt:assist:o': 4.43,
    'tt:assist:q': 4.47, 'tt:over:o': 3.66, 'tt:over:p': 3.46, 'tt:over:f': 3.58, 'tt:over:g': 3.32, 'tt:over:b': 3.85, 'tt:over:t': 4.37 };
  for (const [id, w] of Object.entries(W)) if (parts[id] && parts[id].weight == null) parts[id].weight = w;

  return { parts, products, updated: '2026-11-18' };
})();
