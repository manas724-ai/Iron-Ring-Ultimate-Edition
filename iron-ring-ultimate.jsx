import { useState, useEffect, useRef, useCallback } from "react";

// ─── IRON RING UNIVERSE ───────────────────────────────────────────────────────
// 100% original fictional IP — no third-party trademarks
// Created by Dr Manas Swain | Aussi-Nexus Group | ABN 76 947 108 181

const WRESTLERS = {
  men: [
    {
      id: "viper",
      name: "Rex 'The Viper' Malone",
      nickname: "The Texas Rattler",
      stats: { power: 92, speed: 78, stamina: 88, technique: 85, charisma: 99 },
      finisher: "Viper Strike",
      signature: "Rattler Press",
      accent: "#c0392b", theme: "#0a0000",
      price: 0, locked: false, division: "men",
      bio: "The most electrifying brawler in Iron Ring history. No mercy. No apologies.",
      image: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=400&h=500&fit=crop&crop=faces,top",
    },
    {
      id: "phantom",
      name: "Viktor 'The Phantom' Kross",
      nickname: "The Deadwalker",
      stats: { power: 98, speed: 60, stamina: 95, technique: 82, charisma: 97 },
      finisher: "Phantom Driver",
      signature: "Ironclad Chokeslam",
      accent: "#8e44ad", theme: "#0d001a",
      price: 800, locked: true, division: "men",
      bio: "He walks from the darkness. Seven feet of pure destruction.",
      image: "https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=400&h=500&fit=crop&crop=faces,top",
    },
    {
      id: "king",
      name: "Darius 'The King' Stone",
      nickname: "The People's Warlord",
      stats: { power: 88, speed: 82, stamina: 86, technique: 87, charisma: 100 },
      finisher: "Stone Crusher",
      signature: "Royal Elbow",
      accent: "#f39c12", theme: "#1a1200",
      price: 1000, locked: true, division: "men",
      bio: "Can you feel the reign? The most charismatic force in combat sports.",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=500&fit=crop&crop=faces,top",
    },
    {
      id: "heartbreaker",
      name: "Marco 'The Heartbreaker' Cruz",
      nickname: "Mr. Grand Slam",
      stats: { power: 80, speed: 95, stamina: 84, technique: 99, charisma: 96 },
      finisher: "Sweet Superkick",
      signature: "Sky Elbow Drop",
      accent: "#e91e8c", theme: "#1a0010",
      price: 1200, locked: true, division: "men",
      bio: "The showstopper. The main event. The one they all came to see.",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=faces,top",
    },
    {
      id: "inferno",
      name: "Blaze 'Inferno' Redd",
      nickname: "The Red Machine",
      stats: { power: 97, speed: 65, stamina: 90, technique: 78, charisma: 88 },
      finisher: "Inferno Driver",
      signature: "Fire Chokeslam",
      accent: "#e74c3c", theme: "#1a0000",
      price: 900, locked: true, division: "men",
      bio: "Fuelled by rage. Unstoppable by any force on earth.",
      image: "https://images.unsplash.com/photo-1577368211130-4bbd0181ddf0?w=400&h=500&fit=crop&crop=faces,top",
    },
    {
      id: "maniac",
      name: "Cody 'The Maniac' Foxx",
      nickname: "Have a Nice Day!",
      stats: { power: 85, speed: 68, stamina: 99, technique: 80, charisma: 92 },
      finisher: "Mandible Spike",
      signature: "Double-Arm Slam",
      accent: "#85c1e9", theme: "#001a2c",
      price: 700, locked: true, division: "men",
      bio: "The toughest man alive. Unbreakable. Unhinged. Unstoppable.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=faces,top",
    },
  ],
  women: [
    {
      id: "titaness",
      name: "Jade 'Titaness' Power",
      nickname: "The Ninth Wonder",
      stats: { power: 88, speed: 72, stamina: 85, technique: 80, charisma: 90 },
      finisher: "Titan Driver",
      signature: "Power Slam",
      accent: "#85929e", theme: "#0a0d0f",
      price: 0, locked: false, division: "women",
      bio: "The most dominant female competitor in Iron Ring history.",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop&crop=faces,top",
    },
    {
      id: "blaze_queen",
      name: "Tricia 'Blaze' Voss",
      nickname: "Diva of the Decade",
      stats: { power: 72, speed: 95, stamina: 82, technique: 92, charisma: 99 },
      finisher: "Blazebreaker",
      signature: "Lightning Kick",
      accent: "#5dade2", theme: "#00101a",
      price: 600, locked: true, division: "women",
      bio: "Seven-time champion. Flawless technique. The greatest of all time.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop&crop=faces,top",
    },
    {
      id: "altitude",
      name: "Luna 'Altitude' Reeves",
      nickname: "The High-Flying Fury",
      stats: { power: 70, speed: 98, stamina: 80, technique: 90, charisma: 95 },
      finisher: "Altitude Moonsault",
      signature: "Reeves Twist",
      accent: "#e74c3c", theme: "#1a0000",
      price: 700, locked: true, division: "women",
      bio: "No ceiling. No limits. The fastest competitor in the ring.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&crop=faces,top",
    },
    {
      id: "venom_queen",
      name: "Serena 'Venom' Vale",
      nickname: "The Original Queen",
      stats: { power: 78, speed: 80, stamina: 78, technique: 75, charisma: 100 },
      finisher: "Venom Bomb",
      signature: "Vale TKO",
      accent: "#f5cba7", theme: "#1a1000",
      price: 500, locked: true, division: "women",
      bio: "The woman who built the Women's Division from the ground up.",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop&crop=faces,top",
    },
    {
      id: "tempest",
      name: "Zara 'Tempest' Quinn",
      nickname: "Charisma Incarnate",
      stats: { power: 65, speed: 88, stamina: 75, technique: 70, charisma: 98 },
      finisher: "Tempest DDT",
      signature: "Quinn Whip",
      accent: "#76d7c4", theme: "#001a18",
      price: 450, locked: true, division: "women",
      bio: "Lethal speed, devastating charm. She'll smile as she ends you.",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop&crop=faces,top",
    },
  ],
};

const ARENAS = [
  { id: "ironring", name: "Iron Ring Monday Night", desc: "New York — The Home of Champions", color: "#c0392b", bg: "linear-gradient(135deg,#1a0000 0%,#3d0000 50%,#1a0000 100%)", crowd: 95, price: 0, locked: false },
  { id: "grandslam", name: "The Grand Slam", desc: "The Grandest Stage of Them All", color: "#f39c12", bg: "linear-gradient(135deg,#0d0d0d 0%,#2c1a00 50%,#0d0d0d 100%)", crowd: 100, price: 500, locked: true },
  { id: "summerbrawl", name: "Summer Brawl", desc: "The Biggest Party of the Year", color: "#27ae60", bg: "linear-gradient(135deg,#001a0d 0%,#003d1a 50%,#001a0d 100%)", crowd: 90, price: 400, locked: true },
  { id: "irongauntlet", name: "The Iron Gauntlet", desc: "30 Fighters. One Ring. One Legend.", color: "#2980b9", bg: "linear-gradient(135deg,#000d1a 0%,#001a3d 50%,#000d1a 100%)", crowd: 92, price: 400, locked: true },
  { id: "steeltomb", name: "The Steel Tomb", desc: "No Escape. No Mercy. No Exit.", color: "#8e44ad", bg: "linear-gradient(135deg,#0d001a 0%,#1a003d 50%,#0d001a 100%)", crowd: 88, price: 600, locked: true },
  { id: "dominion", name: "Night of Dominion", desc: "Where Legends Are Made or Broken.", color: "#e67e22", bg: "linear-gradient(135deg,#1a0a00 0%,#3d1a00 50%,#1a0a00 100%)", crowd: 87, price: 350, locked: true },
];

const DIFFICULTIES = [
  { id: "rookie",   name: "Rookie",     desc: "Learning the ropes",       mult: 0.6, coinMult: 0.5,  color: "#27ae60" },
  { id: "contender",name: "Contender",  desc: "Balanced challenge",        mult: 1.0, coinMult: 1.0,  color: "#f39c12" },
  { id: "champion", name: "Champion",   desc: "Brutal & unforgiving",      mult: 1.5, coinMult: 1.8,  color: "#e74c3c" },
  { id: "legend",   name: "Legend",     desc: "Inhuman. Pure suffering.",   mult: 2.2, coinMult: 3.0,  color: "#8e44ad" },
];

const CROWD_LINES = {
  hit:      ["YEAHHH!", "HOLY MOLY!", "THIS IS AWESOME!", "LET'S GO!", "OHHHHH!", "GET HIM!", "YEAH BABY!", "COME ON!"],
  finisher: ["OH MY GOD!", "HE'S DONE!", "FINISH IT!", "THAT'S THE ONE!", "ONE! TWO! THREE!", "UNBELIEVABLE!", "HOLY SMOKES!"],
  miss:     ["OHHH NOOO!", "COME ON!", "GET UP!", "BOO!", "MISSED IT!", "SO CLOSE!"],
  taunt:    ["IRON RING! IRON RING!", "LET'S GO CHAMP!", "YOU SUCK!", "BORING!", "DO SOMETHING!"],
  low:      ["GET UP!", "FIGHT BACK!", "YOU CAN DO IT!", "DON'T QUIT!", "COMEBACK TIME!"],
  combo:    ["COMBO!", "RELENTLESS!", "CAN'T STOP HIM!", "MACHINE!"],
};

const clamp = (v, mn, mx) => Math.max(mn, Math.min(mx, v));
const rand  = (mn, mx) => Math.floor(Math.random() * (mx - mn + 1)) + mn;
const pick  = arr => arr[rand(0, arr.length - 1)];
const allW  = () => [...WRESTLERS.men, ...WRESTLERS.women];

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function IronRing() {
  const [screen,      setScreen]      = useState("splash");
  const [coins,       setCoins]       = useState(1500);
  const [unlocked,    setUnlocked]    = useState({ wrestlers: ["viper","titaness"], arenas: ["ironring"] });
  const [player,      setPlayer]      = useState(null);
  const [arena,       setArena]       = useState(ARENAS[0]);
  const [difficulty,  setDifficulty]  = useState(DIFFICULTIES[1]);
  const [gameState,   setGameState]   = useState(null);
  const [division,    setDivision]    = useState("men");
  const [shopTab,     setShopTab]     = useState("wrestlers");
  const [matchLog,    setMatchLog]    = useState([]);
  const [crowd,       setCrowd]       = useState("");
  const [shake,       setShake]       = useState(false);
  const [note,        setNote]        = useState(null);
  const crowdT = useRef(null);
  const tickT  = useRef(null);

  const notify = (msg, type="info") => { setNote({msg,type}); setTimeout(()=>setNote(null),2500); };
  const showCrowd = useCallback(lines => {
    setCrowd(pick(lines));
    clearTimeout(crowdT.current);
    crowdT.current = setTimeout(()=>setCrowd(""), 1800);
  },[]);
  const boom = () => { setShake(true); setTimeout(()=>setShake(false),350); };

  const CSS = `
    @keyframes glow{0%,100%{text-shadow:0 0 20px #c0392b,0 0 40px #c0392b}50%{text-shadow:0 0 50px #e74c3c,0 0 100px #c0392b}}
    @keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes crowdPop{0%{transform:scale(0.4) translateY(20px);opacity:0}25%{transform:scale(1.2);opacity:1}100%{transform:scale(1);opacity:1}}
    @keyframes finPulse{0%,100%{box-shadow:0 0 10px #f39c12,inset 0 0 10px rgba(243,156,18,0.2)}50%{box-shadow:0 0 40px #f39c12,0 0 80px #e74c3c,inset 0 0 20px rgba(243,156,18,0.4)}}
    @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-10px)}40%{transform:translateX(10px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
    @keyframes hpFlash{0%{filter:brightness(3)}100%{filter:brightness(1)}}
    .btn{transition:all 0.15s ease;cursor:pointer;}
    .btn:hover{transform:scale(1.04);filter:brightness(1.25);}
    .btn:active{transform:scale(0.94);}
    .card{transition:all 0.2s ease;}
    .card:hover{transform:translateY(-4px);}
  `;

  // ── MATCH ENGINE ────────────────────────────────────────────────────────────
  const startMatch = (p, opp, ar, diff) => {
    setGameState({
      p:   { ...p,   hp:100, maxHp:100, momentum:0, combo:0 },
      opp: { ...opp, hp:100, maxHp:100, momentum:0, combo:0 },
      ar, diff, timer:180, phase:"fight", coinsEarned:0,
    });
    setMatchLog([]);
    setScreen("match");
  };

  const dmg = (atk, def, diff, base=[8,18]) => {
    const raw  = rand(base[0], base[1]);
    const stat = (atk.stats.power - def.stats.stamina) * 0.12;
    return clamp(Math.round((raw + stat) * diff.mult), 2, 40);
  };

  const doAction = useCallback(action => {
    if (!gameState || gameState.phase !== "fight") return;
    setGameState(prev => {
      if (!prev || prev.phase !== "fight") return prev;
      let p   = { ...prev.p };
      let opp = { ...prev.opp };
      let log = "";

      if (action === "strike") {
        const d = dmg(p, opp, prev.diff);
        opp.hp  = clamp(opp.hp - d, 0, 100);
        p.momentum = clamp(p.momentum + 10, 0, 100);
        p.combo    = (p.combo||0) + 1;
        log = `${p.name.split("'")[0]} strikes for ${d} damage!`;
        if (p.combo >= 3) { showCrowd(CROWD_LINES.combo); }
        else showCrowd(CROWD_LINES.hit);
        boom();
      } else if (action === "grapple") {
        const d = dmg(p, opp, prev.diff, [12,24]);
        opp.hp  = clamp(opp.hp - d, 0, 100);
        p.momentum = clamp(p.momentum + 18, 0, 100);
        p.combo = 0;
        log = `${p.name.split("'")[0]} grapples for ${d} damage!`;
        showCrowd(CROWD_LINES.hit);
        boom();
      } else if (action === "finisher") {
        if (p.momentum >= 100) {
          const d = rand(38, 58);
          opp.hp  = clamp(opp.hp - d, 0, 100);
          p.momentum = 0; p.combo = 0;
          log = `💥 ${p.finisher} CONNECTS — ${d} DAMAGE!`;
          showCrowd(CROWD_LINES.finisher);
          boom();
        } else {
          log = "Build momentum to 100% first!";
        }
      } else if (action === "taunt") {
        p.momentum = clamp(p.momentum + 28, 0, 100);
        log = `${p.name.split("'")[0]} taunts — momentum +28!`;
        showCrowd(CROWD_LINES.taunt);
      } else if (action === "rest") {
        const h = rand(6,14);
        p.hp = clamp(p.hp + h, 0, 100);
        p.combo = 0;
        log = `${p.name.split("'")[0]} recovers +${h} HP.`;
      }

      // AI ── scales with difficulty and opponent's own momentum
      if (opp.hp > 0 && action !== "rest") {
        const aggr = clamp(Math.round(30 + prev.diff.mult*18 + (100-opp.hp)*0.4), 10, 90);
        if (rand(1,100) < aggr) {
          const d2 = dmg(opp, p, prev.diff);
          p.hp = clamp(p.hp - d2, 0, 100);
          opp.momentum = clamp(opp.momentum + 14, 0, 100);
          log += ` | ${opp.name.split("'")[0]} counters for ${d2}!`;
          // AI finisher
          if (opp.momentum >= 100 && rand(1,100) < 45) {
            const fd = rand(32,55);
            p.hp = clamp(p.hp - fd, 0, 100);
            opp.momentum = 0;
            log += ` 💀 ${opp.finisher}! −${fd}!`;
            showCrowd(CROWD_LINES.finisher);
          }
        }
      }

      if (p.hp <= 25) showCrowd(CROWD_LINES.low);

      const phase = opp.hp <= 0 ? "win" : p.hp <= 0 ? "lose" : "fight";
      setMatchLog(ml => [...ml.slice(-9), log]);
      return { ...prev, p, opp, phase };
    });
  }, [gameState, showCrowd]);

  // Timer
  useEffect(() => {
    if (!gameState || gameState.phase !== "fight") return;
    tickT.current = setTimeout(() => {
      setGameState(prev => {
        if (!prev || prev.phase !== "fight") return prev;
        const t = prev.timer - 1;
        if (t <= 0) return { ...prev, timer:0, phase: prev.p.hp > prev.opp.hp ? "win" : "lose" };
        return { ...prev, timer: t };
      });
    }, 1000);
    return () => clearTimeout(tickT.current);
  }, [gameState]);

  // Coin reward on win
  useEffect(() => {
    if (gameState?.phase === "win") {
      const earned = Math.round(rand(150,320) * (difficulty?.coinMult||1));
      setCoins(c => c + earned);
      setGameState(prev => prev ? { ...prev, coinsEarned: earned } : prev);
      notify(`+${earned} coins earned!`, "success");
    }
  }, [gameState?.phase]);

  const buy = (item, type) => {
    if (coins < item.price) { notify("Not enough coins!", "error"); return; }
    setCoins(c => c - item.price);
    setUnlocked(u => ({ ...u, [type]: [...u[type], item.id] }));
    notify(`${item.name} unlocked! 🔓`, "success");
  };

  // ── SHARED STYLES ──────────────────────────────────────────────────────────
  const base = { background:"#0a0a0a", minHeight:"100vh", fontFamily:"'Impact','Arial Black',sans-serif" };

  const NoteBar = () => note ? (
    <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background: note.type==="success"?"#27ae60":note.type==="error"?"#e74c3c":"#2980b9", color:"#fff", padding:"12px 28px", zIndex:9999, fontSize:16, letterSpacing:2, borderRadius:2, whiteSpace:"nowrap" }}>
      {note.msg}
    </div>
  ) : null;

  const CrowdBanner = () => crowd ? (
    <div style={{ position:"fixed", top:"48%", left:"50%", transform:"translate(-50%,-50%)", fontSize:"clamp(22px,5vw,52px)", color:"#fff", textShadow:"0 0 30px #c0392b,0 0 60px #e74c3c", zIndex:300, animation:"crowdPop 0.35s ease", pointerEvents:"none", textAlign:"center", maxWidth:"80vw", letterSpacing:4 }}>
      {crowd}
    </div>
  ) : null;

  // ── SPLASH ─────────────────────────────────────────────────────────────────
  if (screen === "splash") return (
    <div style={{ ...base, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", overflow:"hidden", position:"relative" }}>
      <style>{CSS}</style>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center,#1a0000 0%,#000 70%)" }} />
      <div style={{ position:"relative", zIndex:10, textAlign:"center", animation:"slideUp 0.8s ease" }}>
        <div style={{ fontSize:12, letterSpacing:10, color:"#c0392b", marginBottom:10 }}>AUSSI-NEXUS GROUP PRESENTS</div>
        <h1 style={{ fontSize:"clamp(52px,12vw,108px)", color:"#fff", margin:0, lineHeight:0.85, animation:"glow 2s infinite" }}>IRON RING</h1>
        <div style={{ fontSize:"clamp(16px,4vw,28px)", color:"#c0392b", letterSpacing:6, marginTop:10 }}>ULTIMATE EDITION</div>
        <div style={{ width:140, height:3, background:"linear-gradient(90deg,transparent,#c0392b,transparent)", margin:"22px auto" }} />
        <div style={{ color:"#444", fontSize:12, marginBottom:44, letterSpacing:3 }}>11 FIGHTERS · 6 ARENAS · CAREER MODE · TOURNAMENT</div>
        <button className="btn" onClick={()=>setScreen("menu")} style={{ background:"linear-gradient(135deg,#c0392b,#7b241c)", color:"#fff", border:"none", padding:"18px 64px", fontSize:22, letterSpacing:5, cursor:"pointer", clipPath:"polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)" }}>
          ENTER THE RING
        </button>
        <div style={{ marginTop:22, color:"#333", fontSize:12, letterSpacing:3 }}>🪙 {coins.toLocaleString()} COINS</div>
        <div style={{ marginTop:10, color:"#222", fontSize:10, letterSpacing:2 }}>© {new Date().getFullYear()} AUSSI-NEXUS GROUP | ABN 76 947 108 181</div>
      </div>
    </div>
  );

  // ── MAIN MENU ──────────────────────────────────────────────────────────────
  if (screen === "menu") return (
    <div style={{ ...base, position:"relative", overflow:"hidden" }}>
      <style>{CSS}</style>
      <NoteBar/>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 50% 0%,#2a0000 0%,#000 65%)" }} />
      <div style={{ position:"relative", zIndex:10, maxWidth:920, margin:"0 auto", padding:"28px 18px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:36 }}>
          <div>
            <h1 style={{ color:"#fff", margin:0, fontSize:44, animation:"glow 2s infinite" }}>IRON RING</h1>
            <div style={{ color:"#c0392b", fontSize:11, letterSpacing:4 }}>ULTIMATE EDITION · AUSSI-NEXUS GROUP</div>
          </div>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid #2a2a2a", padding:"10px 22px", color:"#f39c12", fontSize:22, letterSpacing:2 }}>🪙 {coins.toLocaleString()}</div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:18 }}>
          {[
            { label:"QUICK MATCH",   icon:"⚡", desc:"Jump straight into the fight",      go:"pick" },
            { label:"CAREER MODE",   icon:"🏆", desc:"Rise from Rookie to Legend",         go:"career" },
            { label:"TOURNAMENT",    icon:"👑", desc:"Steel Cage Champions bracket",        go:"tournament" },
            { label:"SHOP",          icon:"🛒", desc:"Unlock fighters & arenas",            go:"shop" },
          ].map(m => (
            <button key={m.label} className="btn" onClick={()=>setScreen(m.go)} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid #1f1f1f", padding:"26px 22px", textAlign:"left", cursor:"pointer", color:"#fff" }}>
              <div style={{ fontSize:34, marginBottom:8 }}>{m.icon}</div>
              <div style={{ fontSize:20, letterSpacing:3 }}>{m.label}</div>
              <div style={{ fontSize:12, color:"#555", marginTop:4, fontFamily:"Arial", fontWeight:"normal", letterSpacing:0 }}>{m.desc}</div>
            </button>
          ))}
        </div>

        <div style={{ marginBottom:8, color:"#333", fontSize:11, letterSpacing:3 }}>SELECT ARENA</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
          {ARENAS.map(a => {
            const owned = unlocked.arenas.includes(a.id);
            return (
              <div key={a.id} className="card" onClick={()=>{ if(owned) setArena(a); else notify("Locked! Buy in Shop.","error"); }} style={{ background:a.bg, border:`1px solid ${arena?.id===a.id ? a.color:"#1a1a1a"}`, padding:"14px 12px", cursor:"pointer", opacity:owned?1:0.38 }}>
                <div style={{ color:a.color, fontSize:12, letterSpacing:2 }}>{a.name}</div>
                <div style={{ color:"#444", fontSize:10, fontFamily:"Arial", fontWeight:"normal", letterSpacing:0, marginTop:3 }}>{a.desc}</div>
                {!owned && <div style={{ color:"#f39c12", fontSize:10, marginTop:5 }}>🔒 {a.price}🪙</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ── FIGHTER PICKER ─────────────────────────────────────────────────────────
  if (screen === "pick") return (
    <div style={{ ...base, padding:20 }}>
      <style>{CSS}</style>
      <NoteBar/>
      <div style={{ maxWidth:920, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:28 }}>
          <button className="btn" onClick={()=>setScreen("menu")} style={{ background:"none", border:"1px solid #2a2a2a", color:"#777", padding:"8px 16px", cursor:"pointer", fontSize:13 }}>← BACK</button>
          <h2 style={{ color:"#fff", margin:0, fontSize:26, letterSpacing:4 }}>CHOOSE YOUR FIGHTER</h2>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:18 }}>
          {["men","women"].map(d=>(
            <button key={d} className="btn" onClick={()=>setDivision(d)} style={{ background:division===d?"#c0392b":"rgba(255,255,255,0.04)", border:`1px solid ${division===d?"#c0392b":"#222"}`, color:"#fff", padding:"10px 24px", cursor:"pointer", fontSize:15, letterSpacing:3 }}>
              {d==="men"?"MEN'S DIVISION":"WOMEN'S DIVISION"}
            </button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:12, marginBottom:28 }}>
          {WRESTLERS[division].map(w=>{
            const owned = unlocked.wrestlers.includes(w.id);
            const sel   = player?.id === w.id;
            return (
              <div key={w.id} className="card" onClick={()=>owned && setPlayer(w)} style={{ background:sel?`${w.theme}dd`:"rgba(255,255,255,0.025)", border:`2px solid ${sel?w.accent:owned?"#2a2a2a":"#111"}`, padding:14, position:"relative", overflow:"hidden", cursor:owned?"pointer":"default" }}>
                {!owned && <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.72)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, zIndex:2 }}>🔒</div>}
                <img src={w.image} alt={w.name} style={{ width:"100%", height:130, objectFit:"cover", objectPosition:"top", marginBottom:10, filter:"contrast(1.15) saturate(1.25)" }} onError={e=>e.target.style.display="none"} />
                <div style={{ color:w.accent, fontSize:12, letterSpacing:1, lineHeight:1.3 }}>{w.name}</div>
                <div style={{ color:"#444", fontSize:9, marginTop:2, fontFamily:"Arial", fontWeight:"normal", letterSpacing:0 }}>{w.nickname}</div>
                <div style={{ display:"flex", gap:3, marginTop:7, flexWrap:"wrap" }}>
                  {[["PWR",w.stats.power],["SPD",w.stats.speed],["STA",w.stats.stamina]].map(([k,v])=>(
                    <div key={k} style={{ background:"rgba(255,255,255,0.05)", padding:"2px 5px", fontSize:8, color:"#666", letterSpacing:1 }}>{k} {v}</div>
                  ))}
                </div>
                <div style={{ color:"#c0392b", fontSize:9, marginTop:6, letterSpacing:1 }}>⚡ {w.finisher}</div>
              </div>
            );
          })}
        </div>

        {player && (
          <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid #1f1f1f", padding:18, marginBottom:18 }}>
            <div style={{ color:"#888", fontSize:12, letterSpacing:3, marginBottom:12 }}>SELECT DIFFICULTY</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
              {DIFFICULTIES.map(d=>(
                <button key={d.id} className="btn" onClick={()=>setDifficulty(d)} style={{ background:difficulty?.id===d.id?`${d.color}22`:"rgba(255,255,255,0.02)", border:`2px solid ${difficulty?.id===d.id?d.color:"#1a1a1a"}`, color:difficulty?.id===d.id?d.color:"#444", padding:"14px 6px", cursor:"pointer", textAlign:"center" }}>
                  <div style={{ fontSize:15, letterSpacing:2 }}>{d.name}</div>
                  <div style={{ fontSize:9, marginTop:4, fontFamily:"Arial", fontWeight:"normal", letterSpacing:0 }}>{d.desc}</div>
                  <div style={{ fontSize:10, marginTop:5, color:"#f39c12" }}>x{d.coinMult} coins</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {player && difficulty && (
          <div style={{ textAlign:"center" }}>
            <button className="btn" onClick={()=>{
              const pool = allW().filter(w=>w.id!==player.id);
              startMatch(player, pool[rand(0,pool.length-1)], arena, difficulty);
            }} style={{ background:"linear-gradient(135deg,#c0392b,#7b241c)", color:"#fff", border:"none", padding:"18px 64px", fontSize:20, letterSpacing:4, cursor:"pointer", clipPath:"polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%)" }}>
              ENTER THE RING ⚡
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ── MATCH ──────────────────────────────────────────────────────────────────
  if (screen === "match" && gameState) {
    const { p, opp, timer, phase, coinsEarned } = gameState;
    const tColor = timer<=30?"#e74c3c":timer<=60?"#f39c12":"#2ecc71";

    if (phase === "win" || phase === "lose") {
      const win = phase==="win";
      return (
        <div style={{ ...base, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center" }}>
          <style>{CSS}</style>
          <div style={{ animation:"slideUp 0.55s ease" }}>
            <div style={{ fontSize:90, marginBottom:10 }}>{win?"🏆":"💀"}</div>
            <h1 style={{ fontSize:72, color:win?"#f39c12":"#e74c3c", margin:0, animation:"glow 2s infinite" }}>{win?"WINNER!":"DEFEATED"}</h1>
            <div style={{ color:"#fff", fontSize:22, marginTop:10, letterSpacing:4 }}>{win?p.name:opp.name}</div>
            {win && coinsEarned>0 && <div style={{ color:"#f39c12", fontSize:20, marginTop:18, letterSpacing:3 }}>+{coinsEarned} COINS 🪙</div>}
            <div style={{ color:"#555", fontSize:15, marginTop:18, fontFamily:"Arial", fontWeight:"normal" }}>
              {win?`Defeated ${opp.name} — ${p.hp}% HP remaining`:`${opp.name} wins with ${opp.hp}% HP remaining`}
            </div>
            <div style={{ display:"flex", gap:12, marginTop:32, justifyContent:"center" }}>
              <button className="btn" onClick={()=>{ setScreen("pick"); setGameState(null); }} style={{ background:"linear-gradient(135deg,#c0392b,#7b241c)", color:"#fff", border:"none", padding:"16px 40px", fontSize:17, letterSpacing:3, cursor:"pointer" }}>REMATCH</button>
              <button className="btn" onClick={()=>{ setScreen("menu"); setGameState(null); }} style={{ background:"rgba(255,255,255,0.06)", color:"#fff", border:"1px solid #2a2a2a", padding:"16px 40px", fontSize:17, letterSpacing:3, cursor:"pointer" }}>MENU</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ ...base, transform:shake?"translateX(7px)":"none", transition:"transform 0.08s", userSelect:"none", animation:shake?"shake 0.35s ease":"none" }}>
        <style>{CSS}</style>
        <CrowdBanner/>
        <div style={{ maxWidth:920, margin:"0 auto", padding:"14px 14px 100px" }}>
          {/* Header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div style={{ color:gameState.ar.color||"#c0392b", fontSize:12, letterSpacing:3 }}>{gameState.ar.name.toUpperCase()}</div>
            <div style={{ fontSize:36, color:tColor, letterSpacing:5, animation:timer<=10?"pulse 0.5s infinite":"none" }}>
              {String(Math.floor(timer/60)).padStart(2,"0")}:{String(timer%60).padStart(2,"0")}
            </div>
            <div style={{ color:"#444", fontSize:11, letterSpacing:2 }}>{gameState.diff.name.toUpperCase()}</div>
          </div>

          {/* Fighters */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 60px 1fr", gap:10, marginBottom:18, alignItems:"center" }}>
            {[[p,"#c0392b",false],[opp,"#8e44ad",true]].map(([f,ac,enemy],fi)=>(
              <div key={fi} style={{ background:"rgba(0,0,0,0.55)", border:`1px solid ${f.accent||ac}`, padding:12 }}>
                <div style={{ color:f.accent||ac, fontSize:14, letterSpacing:1, marginBottom:6, lineHeight:1.2 }}>{f.name}</div>
                <img src={f.image} alt={f.name} style={{ width:"100%", height:115, objectFit:"cover", objectPosition:"top", marginBottom:10, filter:`contrast(1.18) saturate(1.3)${enemy?" hue-rotate(160deg)":""}` }} onError={e=>e.target.style.display="none"} />
                {/* HP */}
                <div style={{ height:15, background:"#0d0d0d", marginBottom:5, position:"relative", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${f.hp}%`, background:f.hp>50?"#27ae60":f.hp>25?"#f39c12":"#e74c3c", transition:"width 0.25s ease,background 0.25s" }} />
                  <span style={{ position:"absolute", top:0, left:5, fontSize:9, lineHeight:"15px", color:"#fff" }}>HP {f.hp}%</span>
                </div>
                {/* Momentum */}
                <div style={{ height:9, background:"#0d0d0d", position:"relative", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${f.momentum}%`, background:"linear-gradient(90deg,#f39c12,#e74c3c)", transition:"width 0.25s", animation:f.momentum>=100?"finPulse 1s infinite":"none" }} />
                  <span style={{ position:"absolute", top:0, left:5, fontSize:8, lineHeight:"9px", color:"#fff" }}>MOMENTUM {f.momentum}%</span>
                </div>
                {!enemy && p.combo>=3 && <div style={{ color:"#f39c12", fontSize:9, marginTop:4, letterSpacing:2, animation:"pulse 0.6s infinite" }}>🔥 COMBO x{p.combo}</div>}
              </div>
            ))}
            <div style={{ textAlign:"center", color:"#c0392b", fontSize:26, letterSpacing:1, fontWeight:"bold" }}>VS</div>
          </div>

          {/* Log */}
          <div style={{ background:"rgba(0,0,0,0.75)", border:"1px solid #111", padding:10, marginBottom:14, maxHeight:95, overflowY:"auto" }}>
            {[...matchLog].reverse().slice(0,5).map((l,i)=>(
              <div key={i} style={{ color:i===0?"#ddd":"#444", fontSize:11, marginBottom:3, fontFamily:"Arial", fontWeight:"normal", letterSpacing:0, lineHeight:1.45 }}>{l}</div>
            ))}
          </div>

          {/* Action bar */}
          <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"rgba(0,0,0,0.96)", borderTop:"1px solid #111", padding:"10px 14px", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, maxWidth:920, margin:"0 auto" }}>
            {[
              { action:"strike",   label:"👊 STRIKE",  bg:"linear-gradient(135deg,#922b21,#641e16)", border:"#e74c3c" },
              { action:"grapple",  label:"💪 GRAPPLE", bg:"linear-gradient(135deg,#1a5276,#154360)", border:"#2980b9" },
              { action:"taunt",    label:"🎤 TAUNT",   bg:"linear-gradient(135deg,#1e8449,#145a32)", border:"#27ae60" },
              { action:"rest",     label:"💨 REST",    bg:"linear-gradient(135deg,#2c2c2c,#1a1a1a)", border:"#444" },
            ].map(b=>(
              <button key={b.action} className="btn" onClick={()=>doAction(b.action)} style={{ background:b.bg, color:"#fff", border:`1px solid ${b.border}`, padding:"14px 4px", cursor:"pointer", fontSize:13, letterSpacing:1 }}>{b.label}</button>
            ))}
            <button className="btn" onClick={()=>doAction("finisher")} style={{ gridColumn:"1/-1", background:p.momentum>=100?"linear-gradient(135deg,#d4ac0d,#9a7d0a)":"rgba(255,255,255,0.03)", color:p.momentum>=100?"#000":"#333", border:`1px solid ${p.momentum>=100?"#f39c12":"#1a1a1a"}`, padding:"13px", cursor:p.momentum>=100?"pointer":"not-allowed", fontSize:14, letterSpacing:2, animation:p.momentum>=100?"finPulse 1s infinite":"none" }}>
              ⚡ {p.momentum>=100 ? `${p.finisher.toUpperCase()} — READY!` : `FINISHER — ${p.momentum}% / 100%`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── SHOP ───────────────────────────────────────────────────────────────────
  if (screen === "shop") return (
    <div style={{ ...base, padding:20 }}>
      <style>{CSS}</style>
      <NoteBar/>
      <div style={{ maxWidth:920, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:22 }}>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <button className="btn" onClick={()=>setScreen("menu")} style={{ background:"none", border:"1px solid #2a2a2a", color:"#777", padding:"8px 16px", cursor:"pointer", fontSize:13 }}>← BACK</button>
            <h2 style={{ color:"#fff", margin:0, fontSize:26, letterSpacing:4 }}>SHOP</h2>
          </div>
          <div style={{ color:"#f39c12", fontSize:22, letterSpacing:2 }}>🪙 {coins.toLocaleString()}</div>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          {["wrestlers","arenas"].map(t=>(
            <button key={t} className="btn" onClick={()=>setShopTab(t)} style={{ background:shopTab===t?"#c0392b":"rgba(255,255,255,0.04)", border:`1px solid ${shopTab===t?"#c0392b":"#222"}`, color:"#fff", padding:"10px 24px", cursor:"pointer", fontSize:15, letterSpacing:3 }}>{t.toUpperCase()}</button>
          ))}
        </div>

        {shopTab==="wrestlers" && ["men","women"].map(div=>(
          <div key={div} style={{ marginBottom:28 }}>
            <h3 style={{ color:"#c0392b", letterSpacing:4, marginBottom:12, fontSize:16 }}>{div==="men"?"MEN'S DIVISION":"WOMEN'S DIVISION"}</h3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:12 }}>
              {WRESTLERS[div].map(w=>{
                const owned = unlocked.wrestlers.includes(w.id);
                return (
                  <div key={w.id} className="card" style={{ background:owned?"rgba(39,174,96,0.04)":"rgba(255,255,255,0.02)", border:`1px solid ${owned?"#1e8449":"#1a1a1a"}`, padding:14, opacity:owned?0.75:1 }}>
                    <img src={w.image} alt={w.name} style={{ width:"100%", height:120, objectFit:"cover", objectPosition:"top", marginBottom:10, filter:owned?"grayscale(0.2)":"contrast(1.1)" }} onError={e=>e.target.style.display="none"} />
                    <div style={{ color:owned?"#27ae60":w.accent, fontSize:13, letterSpacing:1 }}>{w.name}</div>
                    <div style={{ color:"#444", fontSize:9, marginBottom:6, fontFamily:"Arial", fontWeight:"normal", letterSpacing:0 }}>{w.nickname}</div>
                    <div style={{ color:"#c0392b", fontSize:10, marginBottom:10 }}>⚡ {w.finisher}</div>
                    {owned ? (
                      <div style={{ color:"#27ae60", fontSize:12, letterSpacing:2 }}>✅ OWNED</div>
                    ) : (
                      <button className="btn" onClick={()=>buy(w,"wrestlers")} style={{ width:"100%", background:coins>=w.price?"linear-gradient(135deg,#c0392b,#7b241c)":"rgba(255,255,255,0.04)", color:coins>=w.price?"#fff":"#333", border:"none", padding:"10px", cursor:coins>=w.price?"pointer":"not-allowed", fontSize:14, letterSpacing:2 }}>
                        🪙 {w.price.toLocaleString()}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {shopTab==="arenas" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12 }}>
            {ARENAS.map(a=>{
              const owned = unlocked.arenas.includes(a.id);
              return (
                <div key={a.id} className="card" style={{ background:a.bg, border:`1px solid ${owned?a.color:"#1a1a1a"}`, padding:20 }}>
                  <div style={{ color:a.color, fontSize:17, letterSpacing:3, marginBottom:4 }}>{a.name}</div>
                  <div style={{ color:"#555", fontSize:11, marginBottom:8, fontFamily:"Arial", fontWeight:"normal" }}>{a.desc}</div>
                  <div style={{ color:"#666", fontSize:10, marginBottom:12 }}>👥 Crowd Intensity: {a.crowd}%</div>
                  {owned ? (
                    <div style={{ color:"#27ae60", fontSize:13, letterSpacing:2 }}>✅ OWNED</div>
                  ) : (
                    <button className="btn" onClick={()=>buy(a,"arenas")} style={{ width:"100%", background:coins>=a.price?`linear-gradient(135deg,${a.color},#000)`:"rgba(255,255,255,0.04)", color:coins>=a.price?"#fff":"#333", border:"none", padding:"10px", cursor:coins>=a.price?"pointer":"not-allowed", fontSize:14, letterSpacing:2 }}>
                      🪙 {a.price.toLocaleString()}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  // ── CAREER ─────────────────────────────────────────────────────────────────
  if (screen === "career") {
    const levels = [
      { n:1, title:"Jobber",             reward:100,  opp:WRESTLERS.men[5],    diff:DIFFICULTIES[0] },
      { n:2, title:"Enhancement Talent", reward:160,  opp:WRESTLERS.women[4],  diff:DIFFICULTIES[0] },
      { n:3, title:"Mid-Card Grinder",   reward:220,  opp:WRESTLERS.men[4],    diff:DIFFICULTIES[1] },
      { n:4, title:"Upper-Mid Card",     reward:300,  opp:WRESTLERS.women[2],  diff:DIFFICULTIES[1] },
      { n:5, title:"Main Eventer",       reward:400,  opp:WRESTLERS.men[3],    diff:DIFFICULTIES[2] },
      { n:6, title:"Iron Ring Champion", reward:550,  opp:WRESTLERS.women[1],  diff:DIFFICULTIES[2] },
      { n:7, title:"Living Legend",      reward:750,  opp:WRESTLERS.men[1],    diff:DIFFICULTIES[3] },
      { n:8, title:"Immortal",           reward:1100, opp:WRESTLERS.men[2],    diff:DIFFICULTIES[3] },
    ];
    return (
      <div style={{ ...base, padding:20 }}>
        <style>{CSS}</style>
        <NoteBar/>
        <div style={{ maxWidth:920, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:28 }}>
            <button className="btn" onClick={()=>setScreen("menu")} style={{ background:"none", border:"1px solid #2a2a2a", color:"#777", padding:"8px 16px", cursor:"pointer", fontSize:13 }}>← BACK</button>
            <h2 style={{ color:"#fff", margin:0, fontSize:26, letterSpacing:4 }}>CAREER MODE</h2>
          </div>
          {!player && <div style={{ color:"#c0392b", fontSize:14, letterSpacing:2, marginBottom:16 }}>⚠ Select a fighter first in Quick Match, then return here.</div>}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {levels.map(lvl=>(
              <div key={lvl.n} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid #1a1a1a", padding:18, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ color:"#c0392b", fontSize:10, letterSpacing:3 }}>LEVEL {lvl.n}</div>
                  <div style={{ color:"#fff", fontSize:18, letterSpacing:2 }}>{lvl.title}</div>
                  <div style={{ color:"#555", fontSize:11, marginTop:3, fontFamily:"Arial", fontWeight:"normal" }}>vs {lvl.opp.name}</div>
                  <div style={{ color:"#f39c12", fontSize:11, marginTop:3 }}>🪙 +{lvl.reward} · {lvl.diff.name}</div>
                </div>
                <button className="btn" onClick={()=>{
                  const p2use = player || WRESTLERS.men[0];
                  startMatch(p2use, lvl.opp, arena, lvl.diff);
                }} style={{ background:"linear-gradient(135deg,#c0392b,#7b241c)", color:"#fff", border:"none", padding:"12px 18px", cursor:"pointer", fontSize:13, letterSpacing:2, whiteSpace:"nowrap" }}>FIGHT</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── TOURNAMENT ─────────────────────────────────────────────────────────────
  if (screen === "tournament") return (
    <div style={{ ...base, padding:20 }}>
      <style>{CSS}</style>
      <NoteBar/>
      <div style={{ maxWidth:920, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:18, marginBottom:28 }}>
          <button className="btn" onClick={()=>setScreen("menu")} style={{ background:"none", border:"1px solid #2a2a2a", color:"#777", padding:"8px 16px", cursor:"pointer", fontSize:13 }}>← BACK</button>
          <h2 style={{ color:"#fff", margin:0, fontSize:26, letterSpacing:4 }}>STEEL CAGE CHAMPIONS</h2>
        </div>
        <div style={{ color:"#555", fontSize:13, marginBottom:22, fontFamily:"Arial", fontWeight:"normal" }}>Win your semi-final to advance. 3× coins in the Final.</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
          {[[WRESTLERS.men[0],WRESTLERS.women[0]],[WRESTLERS.men[2],WRESTLERS.women[1]]].map(([a,b],i)=>(
            <div key={i} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid #1a1a1a", padding:20 }}>
              <div style={{ color:"#c0392b", fontSize:11, letterSpacing:3, marginBottom:14 }}>SEMI-FINAL {i+1}</div>
              {[a,b].map((f,fi)=>(
                <div key={fi} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:fi===0?12:0 }}>
                  <img src={f.image} alt={f.name} style={{ width:48, height:48, objectFit:"cover", objectPosition:"top", borderRadius:"50%", border:`2px solid ${f.accent}` }} onError={e=>e.target.style.display="none"} />
                  <div>
                    <div style={{ color:f.accent, fontSize:13, letterSpacing:1 }}>{f.name}</div>
                    <div style={{ color:"#444", fontSize:9, fontFamily:"Arial", fontWeight:"normal" }}>{f.division==="men"?"Men's":"Women's"} Division</div>
                  </div>
                  {fi===0 && <div style={{ color:"#c0392b", fontSize:20, marginLeft:"auto" }}>VS</div>}
                </div>
              ))}
              <button className="btn" onClick={()=>{
                const p2use = player||a;
                startMatch(p2use, b, arena, DIFFICULTIES[2]);
              }} style={{ width:"100%", marginTop:16, background:"linear-gradient(135deg,#c0392b,#7b241c)", color:"#fff", border:"none", padding:"12px", cursor:"pointer", fontSize:13, letterSpacing:2 }}>ENTER MATCH</button>
            </div>
          ))}
        </div>
        <div style={{ background:"linear-gradient(135deg,#2c1a00,#1a0d00)", border:"1px solid #f39c12", padding:22, textAlign:"center" }}>
          <div style={{ color:"#f39c12", fontSize:22, letterSpacing:5 }}>👑 THE FINAL</div>
          <div style={{ color:"#555", marginTop:8, fontFamily:"Arial", fontWeight:"normal", fontSize:13 }}>Win both semi-finals to unlock · 3× coin multiplier</div>
        </div>
      </div>
    </div>
  );

  return null;
}
