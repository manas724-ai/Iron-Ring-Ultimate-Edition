import { useState, useEffect, useRef, useCallback } from "react";

// ─── WRESTLER DATA ────────────────────────────────────────────────────────────
const WRESTLERS = {
  men: [
    {
      id: "stone_cold",
      name: "Stone Cold Steve Austin",
      nickname: "The Texas Rattlesnake",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&crop=face",
      stats: { power: 92, speed: 78, stamina: 88, technique: 85, charisma: 99 },
      finisher: "Stone Cold Stunner",
      signature: "Lou Thesz Press",
      theme: "#000000",
      accent: "#c0392b",
      price: 0,
      locked: false,
      division: "men",
      bio: "Hell Yeah! The most popular superstar in WWF history.",
    },
    {
      id: "undertaker",
      name: "The Undertaker",
      nickname: "The Deadman",
      image: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=400&h=500&fit=crop&crop=face",
      stats: { power: 98, speed: 60, stamina: 95, technique: 82, charisma: 97 },
      finisher: "Tombstone Piledriver",
      signature: "Chokeslam",
      theme: "#1a0533",
      accent: "#6c3483",
      price: 800,
      locked: true,
      division: "men",
      bio: "Rest In Peace. The phenom of the WWF.",
    },
    {
      id: "rock",
      name: "The Rock",
      nickname: "The People's Champion",
      image: "https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=400&h=500&fit=crop&crop=face",
      stats: { power: 88, speed: 82, stamina: 86, technique: 87, charisma: 100 },
      finisher: "Rock Bottom",
      signature: "People's Elbow",
      theme: "#7d6608",
      accent: "#f4d03f",
      price: 1000,
      locked: true,
      division: "men",
      bio: "Can you SMELL what The Rock is cooking?",
    },
    {
      id: "hbk",
      name: "Shawn Michaels",
      nickname: "The Heartbreak Kid",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=500&fit=crop&crop=face",
      stats: { power: 80, speed: 95, stamina: 84, technique: 99, charisma: 96 },
      finisher: "Sweet Chin Music",
      signature: "Flying Elbow Drop",
      theme: "#922b21",
      accent: "#f1948a",
      price: 1200,
      locked: true,
      division: "men",
      bio: "Mr. WrestleMania. The Showstopper.",
    },
    {
      id: "kane",
      name: "Kane",
      nickname: "The Big Red Machine",
      image: "https://images.unsplash.com/photo-1577368211130-4bbd0181ddf0?w=400&h=500&fit=crop&crop=face",
      stats: { power: 97, speed: 65, stamina: 90, technique: 78, charisma: 88 },
      finisher: "Tombstone Piledriver",
      signature: "Chokeslam",
      theme: "#641e16",
      accent: "#e74c3c",
      price: 900,
      locked: true,
      division: "men",
      bio: "The masked monster. Brother of darkness.",
    },
    {
      id: "mankind",
      name: "Mankind",
      nickname: "Have a Nice Day!",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&crop=face",
      stats: { power: 85, speed: 68, stamina: 99, technique: 80, charisma: 92 },
      finisher: "Mandible Claw",
      signature: "Double Arm DDT",
      theme: "#2e4053",
      accent: "#85c1e9",
      price: 700,
      locked: true,
      division: "men",
      bio: "Hardcore legend. Toughest man alive.",
    },
  ],
  women: [
    {
      id: "chyna",
      name: "Chyna",
      nickname: "The Ninth Wonder of the World",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=500&fit=crop&crop=face",
      stats: { power: 88, speed: 72, stamina: 85, technique: 80, charisma: 90 },
      finisher: "Pedigree",
      signature: "Low Blow",
      theme: "#1c2833",
      accent: "#85929e",
      price: 0,
      locked: false,
      division: "women",
      bio: "The most powerful woman in wrestling history.",
    },
    {
      id: "trish",
      name: "Trish Stratus",
      nickname: "Diva of the Decade",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop&crop=face",
      stats: { power: 72, speed: 95, stamina: 82, technique: 92, charisma: 99 },
      finisher: "Stratusfaction",
      signature: "Chick Kick",
      theme: "#154360",
      accent: "#5dade2",
      price: 600,
      locked: true,
      division: "women",
      bio: "Seven-time Women's Champion. The GOAT.",
    },
    {
      id: "lita",
      name: "Lita",
      nickname: "The High-Flying Queen",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&crop=face",
      stats: { power: 70, speed: 98, stamina: 80, technique: 90, charisma: 95 },
      finisher: "Litasault",
      signature: "Twist of Fate",
      theme: "#7b241c",
      accent: "#e74c3c",
      price: 700,
      locked: true,
      division: "women",
      bio: "Fastest diva alive. High risk, high reward.",
    },
    {
      id: "sable",
      name: "Sable",
      nickname: "The Original Diva",
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop&crop=face",
      stats: { power: 78, speed: 80, stamina: 78, technique: 75, charisma: 100 },
      finisher: "Sable Bomb",
      signature: "TKO",
      theme: "#784212",
      accent: "#f5cba7",
      price: 500,
      locked: true,
      division: "women",
      bio: "The woman who put WWF Divas on the map.",
    },
    {
      id: "torrie",
      name: "Torrie Wilson",
      nickname: "Charismatic Crafty",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop&crop=face",
      stats: { power: 65, speed: 88, stamina: 75, technique: 70, charisma: 98 },
      finisher: "Spinning DDT",
      signature: "Wilson Whip",
      theme: "#0e6655",
      accent: "#76d7c4",
      price: 450,
      locked: true,
      division: "women",
      bio: "Agile, dangerous, and devastatingly charismatic.",
    },
  ],
};

const ARENAS = [
  { id: "raw", name: "Monday Night Raw", desc: "New York City — The Home of Raw", color: "#c0392b", bg: "linear-gradient(135deg,#1a0000 0%,#3d0000 50%,#1a0000 100%)", crowd: 95, price: 0, locked: false },
  { id: "wrestlemania", name: "WrestleMania", desc: "The Grandest Stage of Them All", color: "#f39c12", bg: "linear-gradient(135deg,#0d0d0d 0%,#2c1a00 50%,#0d0d0d 100%)", crowd: 100, price: 500, locked: true },
  { id: "summerslam", name: "SummerSlam", desc: "The Biggest Party of the Summer", color: "#27ae60", bg: "linear-gradient(135deg,#001a0d 0%,#003d1a 50%,#001a0d 100%)", crowd: 90, price: 400, locked: true },
  { id: "rumble", name: "Royal Rumble", desc: "30 Men. One Ring. One Winner.", color: "#2980b9", bg: "linear-gradient(135deg,#000d1a 0%,#001a3d 50%,#000d1a 100%)", crowd: 92, price: 400, locked: true },
  { id: "hellcell", name: "Hell in a Cell", desc: "No Escape. No Mercy.", color: "#8e44ad", bg: "linear-gradient(135deg,#0d001a 0%,#1a003d 50%,#0d001a 100%)", crowd: 88, price: 600, locked: true },
  { id: "survivor", name: "Survivor Series", desc: "Tradition. Survival. Dominance.", color: "#e67e22", bg: "linear-gradient(135deg,#1a0a00 0%,#3d1a00 50%,#1a0a00 100%)", crowd: 87, price: 350, locked: true },
];

const DIFFICULTIES = [
  { id: "easy", name: "Rookie", desc: "For beginners", mult: 0.6, coinMult: 0.5, color: "#27ae60" },
  { id: "medium", name: "Contender", desc: "Balanced challenge", mult: 1.0, coinMult: 1.0, color: "#f39c12" },
  { id: "hard", name: "Champion", desc: "Brutal competition", mult: 1.5, coinMult: 1.8, color: "#e74c3c" },
  { id: "legend", name: "Legend", desc: "Inhuman difficulty", mult: 2.2, coinMult: 3.0, color: "#8e44ad" },
];

const CROWD_LINES = {
  hit: ["YEAHHH!", "HOLY SHIT!", "THIS IS AWESOME!", "LET'S GO!", "OHHHHH!", "GET HIM!", "YEAH BABY!"],
  finisher: ["OH MY GOD!", "HE'S DEAD!", "FINISH HIM!", "THAT'S IT!", "ONE TWO THREE!", "HOLY SHIT! HOLY SHIT!"],
  miss: ["OHHH NOOO!", "COME ON!", "GET UP!", "BOO!", "YOU SUCK!"],
  taunt: ["WHAT?!", "WHAT?!", "WHAT?!", "WHAT?!", "AUSTIN! AUSTIN! AUSTIN!"],
  player_low: ["GET UP!", "FIGHT BACK!", "YOU CAN DO IT!", "DON'T QUIT!"],
};

// ─── UTILITY ──────────────────────────────────────────────────────────────────
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[rand(0, arr.length - 1)];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function WWFGame() {
  const [screen, setScreen] = useState("splash");
  const [coins, setCoins] = useState(1500);
  const [unlockedWrestlers, setUnlockedWrestlers] = useState(["stone_cold", "chyna"]);
  const [unlockedArenas, setUnlockedArenas] = useState(["raw"]);
  const [selectedWrestler, setSelectedWrestler] = useState(null);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [selectedArena, setSelectedArena] = useState(ARENAS[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(DIFFICULTIES[1]);
  const [gameState, setGameState] = useState(null);
  const [crowdMessage, setCrowdMessage] = useState("");
  const [shakeScreen, setShakeScreen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [division, setDivision] = useState("men");
  const [shopTab, setShopTab] = useState("wrestlers");
  const [matchLog, setMatchLog] = useState([]);
  const [splashDone, setSplashDone] = useState(false);

  const crowdRef = useRef(null);
  const matchInterval = useRef(null);

  const allWrestlers = [...WRESTLERS.men, ...WRESTLERS.women];

  const notify = (msg, type = "info") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2500);
  };

  const showCrowd = useCallback((lines) => {
    const msg = pick(lines);
    setCrowdMessage(msg);
    clearTimeout(crowdRef.current);
    crowdRef.current = setTimeout(() => setCrowdMessage(""), 1800);
  }, []);

  const triggerShake = () => {
    setShakeScreen(true);
    setTimeout(() => setShakeScreen(false), 400);
  };

  // ─── MATCH ENGINE ──────────────────────────────────────────────────────────
  const startMatch = (player, opponent, arena, diff) => {
    const pStats = player.stats;
    const oStats = opponent.stats;
    const diffMult = diff.mult;

    setGameState({
      player: { ...player, hp: 100, maxHp: 100, momentum: 0, stunned: false },
      opponent: { ...opponent, hp: 100, maxHp: 100, momentum: 0, stunned: false },
      arena,
      diff,
      timer: 180,
      phase: "fighting",
      round: 1,
      pCoins: 0,
      lastAction: null,
      finisherReady: false,
      oppFinisherReady: false,
    });
    setMatchLog([]);
    setScreen("match");
  };

  const calcDamage = (attacker, defender, move, diff) => {
    const base = rand(8, 18);
    const statBonus = (attacker.stats.power - defender.stats.stamina) * 0.1;
    const dmg = Math.max(3, Math.round((base + statBonus) * diff.mult));
    return clamp(dmg, 2, 35);
  };

  const doAction = useCallback((action) => {
    if (!gameState || gameState.phase !== "fighting") return;

    setGameState(prev => {
      if (!prev || prev.phase !== "fighting") return prev;
      let p = { ...prev.player };
      let o = { ...prev.opponent };
      let log = "";
      let newFinisher = prev.finisherReady;
      let newOppFinisher = prev.oppFinisherReady;

      if (action === "strike") {
        const dmg = calcDamage(p, o, "strike", prev.diff);
        o.hp = clamp(o.hp - dmg, 0, 100);
        p.momentum = clamp(p.momentum + 10, 0, 100);
        log = `${p.name} strikes for ${dmg} damage!`;
        showCrowd(CROWD_LINES.hit);
        triggerShake();
      } else if (action === "grapple") {
        const dmg = calcDamage(p, o, "grapple", prev.diff) + 5;
        o.hp = clamp(o.hp - dmg, 0, 100);
        p.momentum = clamp(p.momentum + 15, 0, 100);
        log = `${p.name} hits a vicious grapple for ${dmg} damage!`;
        showCrowd(CROWD_LINES.hit);
        triggerShake();
      } else if (action === "finisher") {
        if (p.momentum >= 100) {
          const dmg = rand(35, 55);
          o.hp = clamp(o.hp - dmg, 0, 100);
          p.momentum = 0;
          newFinisher = false;
          log = `💥 ${p.name} hits the ${p.finisher} for MASSIVE ${dmg} damage!`;
          showCrowd(CROWD_LINES.finisher);
          triggerShake();
        } else {
          log = `Finisher not ready! Build momentum first.`;
        }
      } else if (action === "taunt") {
        p.momentum = clamp(p.momentum + 25, 0, 100);
        log = `${p.name} taunts the crowd! Momentum +25`;
        showCrowd(CROWD_LINES.taunt);
      } else if (action === "rest") {
        p.hp = clamp(p.hp + rand(5, 12), 0, 100);
        log = `${p.name} catches their breath. HP +${rand(5, 12)}`;
      }

      // AI opponent counter
      let aiDmg = 0;
      if (o.hp > 0 && action !== "rest") {
        const aiRoll = rand(1, 100);
        const aiAggression = clamp(Math.round((100 - o.hp) * 0.5 + prev.diff.mult * 20), 10, 85);

        if (aiRoll < aiAggression) {
          aiDmg = calcDamage(o, p, "counter", prev.diff);
          p.hp = clamp(p.hp - aiDmg, 0, 100);
          o.momentum = clamp(o.momentum + 12, 0, 100);
          log += ` | ${o.name} counters for ${aiDmg}!`;
          if (o.momentum >= 100 && rand(1, 100) < 40) {
            const finDmg = rand(30, 50);
            p.hp = clamp(p.hp - finDmg, 0, 100);
            o.momentum = 0;
            log += ` 💀 ${o.name} hits the ${o.finisher}! ${finDmg} damage!`;
            showCrowd(CROWD_LINES.finisher);
          }
        }
      }

      if (p.hp <= 30) showCrowd(CROWD_LINES.player_low);

      const phase = o.hp <= 0 ? "player_win" : p.hp <= 0 ? "player_lose" : "fighting";

      setMatchLog(ml => [...ml.slice(-8), log]);

      return {
        ...prev,
        player: p,
        opponent: o,
        phase,
        finisherReady: p.momentum >= 100,
        oppFinisherReady: o.momentum >= 100,
        lastAction: action,
      };
    });
  }, [gameState, showCrowd]);

  // Timer tick
  useEffect(() => {
    if (!gameState || gameState.phase !== "fighting") return;
    matchInterval.current = setTimeout(() => {
      setGameState(prev => {
        if (!prev || prev.phase !== "fighting") return prev;
        const newTimer = prev.timer - 1;
        if (newTimer <= 0) {
          const winner = prev.player.hp > prev.opponent.hp ? "player_win" : "player_lose";
          return { ...prev, timer: 0, phase: winner };
        }
        return { ...prev, timer: newTimer };
      });
    }, 1000);
    return () => clearTimeout(matchInterval.current);
  }, [gameState]);

  // Award coins on win
  useEffect(() => {
    if (gameState?.phase === "player_win") {
      const earned = Math.round(rand(150, 300) * (selectedDifficulty?.coinMult || 1));
      setCoins(c => c + earned);
      setGameState(prev => ({ ...prev, pCoins: earned }));
      notify(`+${earned} coins earned!`, "success");
    }
  }, [gameState?.phase]);

  const buyItem = (item, type) => {
    if (coins < item.price) { notify("Not enough coins!", "error"); return; }
    setCoins(c => c - item.price);
    if (type === "wrestler") setUnlockedWrestlers(prev => [...prev, item.id]);
    if (type === "arena") setUnlockedArenas(prev => [...prev, item.id]);
    notify(`${item.name} unlocked!`, "success");
  };

  // ─── SCREENS ───────────────────────────────────────────────────────────────

  if (screen === "splash") {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Impact', 'Arial Black', sans-serif", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, #1a0000 0%, #000 70%)", animation: "pulse 3s ease-in-out infinite" }} />
        <style>{`
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
          @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
          @keyframes glow { 0%,100%{text-shadow:0 0 20px #c0392b,0 0 40px #c0392b} 50%{text-shadow:0 0 40px #e74c3c,0 0 80px #e74c3c,0 0 120px #c0392b} }
          @keyframes slideUp { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }
          @keyframes fadeIn { from{opacity:0} to{opacity:1} }
          @keyframes hpBar { from{width:100%} to{width:var(--hp)} }
          @keyframes crowdPop { 0%{transform:scale(0.5) translateY(20px);opacity:0} 20%{transform:scale(1.2) translateY(-5px);opacity:1} 100%{transform:scale(1) translateY(0);opacity:1} }
          @keyframes finReady { 0%,100%{box-shadow:0 0 10px #f39c12} 50%{box-shadow:0 0 30px #f39c12, 0 0 60px #e74c3c} }
          @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          .btn-action { transition: all 0.15s ease; cursor: pointer; }
          .btn-action:hover { transform: scale(1.05); filter: brightness(1.2); }
          .btn-action:active { transform: scale(0.95); }
        `}</style>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", animation: "slideUp 0.8s ease" }}>
          <div style={{ fontSize: 14, letterSpacing: 8, color: "#c0392b", marginBottom: 8, animation: "fadeIn 1s ease 0.3s both" }}>ATTITUDE ERA PRESENTS</div>
          <h1 style={{ fontSize: "clamp(48px,10vw,96px)", color: "#fff", margin: 0, lineHeight: 0.9, animation: "glow 2s ease-in-out infinite" }}>WWF RAW</h1>
          <div style={{ fontSize: "clamp(18px,4vw,32px)", color: "#c0392b", letterSpacing: 4, marginTop: 8 }}>ULTIMATE EDITION</div>
          <div style={{ width: 120, height: 3, background: "linear-gradient(90deg,transparent,#c0392b,transparent)", margin: "20px auto" }} />
          <div style={{ color: "#666", fontSize: 13, marginBottom: 40, letterSpacing: 2 }}>OVER 10 SUPERSTARS · 6 ARENAS · FULL CAREER MODE</div>
          <button className="btn-action" onClick={() => setScreen("menu")} style={{ background: "linear-gradient(135deg,#c0392b,#7b241c)", color: "#fff", border: "none", padding: "18px 60px", fontSize: 22, letterSpacing: 4, cursor: "pointer", clipPath: "polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)" }}>
            ENTER THE RING
          </button>
          <div style={{ marginTop: 20, color: "#444", fontSize: 12, letterSpacing: 2 }}>COINS: {coins} 🪙</div>
        </div>
      </div>
    );
  }

  if (screen === "menu") {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'Impact','Arial Black',sans-serif", position: "relative", overflow: "hidden" }}>
        <style>{`@keyframes glow{0%,100%{text-shadow:0 0 20px #c0392b,0 0 40px #c0392b}50%{text-shadow:0 0 40px #e74c3c,0 0 80px #e74c3c,0 0 120px #c0392b}} .btn-action{transition:all 0.15s;cursor:pointer;} .btn-action:hover{transform:scale(1.03);filter:brightness(1.2);} .btn-action:active{transform:scale(0.97);}`}</style>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,#2a0000 0%,#000 60%)" }} />
        {notification && (
          <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: notification.type === "success" ? "#27ae60" : notification.type === "error" ? "#e74c3c" : "#2980b9", color: "#fff", padding: "12px 24px", borderRadius: 4, zIndex: 9999, fontSize: 16, letterSpacing: 2, fontFamily: "Impact,sans-serif" }}>
            {notification.msg}
          </div>
        )}
        <div style={{ position: "relative", zIndex: 10, maxWidth: 900, margin: "0 auto", padding: "30px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
            <div>
              <h1 style={{ color: "#fff", margin: 0, fontSize: 40, animation: "glow 2s infinite" }}>WWF RAW</h1>
              <div style={{ color: "#c0392b", fontSize: 12, letterSpacing: 3 }}>ULTIMATE EDITION</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #333", padding: "10px 20px", color: "#f39c12", fontSize: 20, letterSpacing: 2 }}>
              🪙 {coins.toLocaleString()}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            {[
              { label: "QUICK MATCH", icon: "⚡", desc: "Jump straight into the action", screen: "select_mode" },
              { label: "CAREER MODE", icon: "🏆", desc: "Rise from Rookie to Legend", screen: "career" },
              { label: "TOURNAMENT", icon: "👑", desc: "King of the Ring bracket", screen: "tournament" },
              { label: "SHOP", icon: "🛒", desc: "Unlock superstars & arenas", screen: "shop" },
            ].map(item => (
              <button key={item.label} className="btn-action" onClick={() => setScreen(item.screen)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #222", padding: "28px 24px", textAlign: "left", cursor: "pointer", color: "#fff" }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 22, letterSpacing: 3, color: "#fff" }}>{item.label}</div>
                <div style={{ fontSize: 13, color: "#666", marginTop: 4, fontFamily: "Arial,sans-serif", fontWeight: "normal", letterSpacing: 0 }}>{item.desc}</div>
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {ARENAS.map(a => (
              <div key={a.id} onClick={() => { setSelectedArena(a); if (!unlockedArenas.includes(a.id)) { notify("Arena locked! Buy in shop.", "error"); } }} style={{ background: a.bg, border: `1px solid ${selectedArena?.id === a.id ? a.color : "#222"}`, padding: "16px 12px", cursor: "pointer", opacity: unlockedArenas.includes(a.id) ? 1 : 0.4, transition: "all 0.2s" }}>
                <div style={{ color: a.color, fontSize: 13, letterSpacing: 2, marginBottom: 4 }}>{a.name}</div>
                <div style={{ color: "#555", fontSize: 10, fontFamily: "Arial", fontWeight: "normal", letterSpacing: 0 }}>{a.desc}</div>
                {!unlockedArenas.includes(a.id) && <div style={{ color: "#f39c12", fontSize: 10, marginTop: 4 }}>🔒 {a.price} coins</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (screen === "select_mode") {
    const availableWrestlers = allWrestlers.filter(w => unlockedWrestlers.includes(w.id));
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'Impact','Arial Black',sans-serif", padding: 20 }}>
        <style>{`.btn-action{transition:all 0.15s;cursor:pointer;} .btn-action:hover{transform:scale(1.03);filter:brightness(1.2);} .card-sel{transition:all 0.2s;cursor:pointer;border:2px solid #222;} .card-sel:hover{border-color:#c0392b;transform:translateY(-3px);}`}</style>
        {notification && <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: "#27ae60", color: "#fff", padding: "12px 24px", zIndex: 9999, fontSize: 16, letterSpacing: 2 }}>{notification.msg}</div>}

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 30 }}>
            <button className="btn-action" onClick={() => setScreen("menu")} style={{ background: "none", border: "1px solid #333", color: "#999", padding: "8px 16px", cursor: "pointer", fontSize: 14 }}>← BACK</button>
            <h2 style={{ color: "#fff", margin: 0, fontSize: 28, letterSpacing: 4 }}>SELECT YOUR SUPERSTAR</h2>
          </div>

          {/* Division toggle */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {["men", "women"].map(d => (
              <button key={d} className="btn-action" onClick={() => setDivision(d)} style={{ background: division === d ? "#c0392b" : "rgba(255,255,255,0.05)", border: `1px solid ${division === d ? "#c0392b" : "#333"}`, color: "#fff", padding: "10px 24px", cursor: "pointer", fontSize: 16, letterSpacing: 3 }}>
                {d === "men" ? "MEN'S DIVISION" : "WOMEN'S DIVISION"}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12, marginBottom: 30 }}>
            {WRESTLERS[division].map(w => {
              const owned = unlockedWrestlers.includes(w.id);
              const selected = selectedWrestler?.id === w.id;
              return (
                <div key={w.id} className="card-sel" onClick={() => owned && setSelectedWrestler(w)} style={{ background: selected ? `${w.theme}cc` : "rgba(255,255,255,0.03)", border: `2px solid ${selected ? w.accent : owned ? "#333" : "#1a1a1a"}`, padding: 16, opacity: owned ? 1 : 0.5, position: "relative", overflow: "hidden" }}>
                  {!owned && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🔒</div>}
                  <img src={w.image} alt={w.name} style={{ width: "100%", height: 140, objectFit: "cover", objectPosition: "top", marginBottom: 10, filter: "contrast(1.1) saturate(1.2)" }} onError={e => { e.target.style.display = "none"; }} />
                  <div style={{ color: w.accent, fontSize: 13, letterSpacing: 2, lineHeight: 1.2 }}>{w.name}</div>
                  <div style={{ color: "#555", fontSize: 10, marginTop: 2, fontFamily: "Arial", fontWeight: "normal", letterSpacing: 0 }}>{w.nickname}</div>
                  <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                    {Object.entries(w.stats).slice(0, 3).map(([k, v]) => (
                      <div key={k} style={{ background: "rgba(255,255,255,0.05)", padding: "2px 6px", fontSize: 9, color: "#888", letterSpacing: 1 }}>{k.toUpperCase()} {v}</div>
                    ))}
                  </div>
                  <div style={{ color: "#c0392b", fontSize: 10, marginTop: 6, letterSpacing: 1 }}>⚡ {w.finisher}</div>
                </div>
              );
            })}
          </div>

          {selectedWrestler && (
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #333", padding: 20, marginBottom: 20 }}>
              <h3 style={{ color: "#fff", margin: "0 0 16px", letterSpacing: 3 }}>SELECT DIFFICULTY</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {DIFFICULTIES.map(d => (
                  <button key={d.id} className="btn-action" onClick={() => setSelectedDifficulty(d)} style={{ background: selectedDifficulty?.id === d.id ? d.color + "33" : "rgba(255,255,255,0.03)", border: `2px solid ${selectedDifficulty?.id === d.id ? d.color : "#222"}`, color: selectedDifficulty?.id === d.id ? d.color : "#555", padding: "14px 8px", cursor: "pointer", textAlign: "center" }}>
                    <div style={{ fontSize: 16, letterSpacing: 2 }}>{d.name}</div>
                    <div style={{ fontSize: 10, marginTop: 4, fontFamily: "Arial", fontWeight: "normal", letterSpacing: 0 }}>{d.desc}</div>
                    <div style={{ fontSize: 10, marginTop: 4, color: "#f39c12" }}>x{d.coinMult} coins</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedWrestler && selectedDifficulty && (
            <div style={{ textAlign: "center" }}>
              <button className="btn-action" onClick={() => {
                const available = allWrestlers.filter(w => w.id !== selectedWrestler.id);
                const opp = available[rand(0, available.length - 1)];
                setSelectedOpponent(opp);
                startMatch(selectedWrestler, opp, selectedArena, selectedDifficulty);
              }} style={{ background: "linear-gradient(135deg,#c0392b,#7b241c)", color: "#fff", border: "none", padding: "18px 60px", fontSize: 20, letterSpacing: 4, cursor: "pointer", clipPath: "polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)" }}>
                ENTER THE RING ⚡
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (screen === "match" && gameState) {
    const { player, opponent, timer, phase, finisherReady, pCoins } = gameState;
    const arena = gameState.arena;
    const pHpPct = player.hp;
    const oHpPct = opponent.hp;
    const timerColor = timer <= 30 ? "#e74c3c" : timer <= 60 ? "#f39c12" : "#27ae60";

    if (phase === "player_win" || phase === "player_lose") {
      const win = phase === "player_win";
      return (
        <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'Impact','Arial Black',sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <style>{`@keyframes glow{0%,100%{text-shadow:0 0 20px #c0392b}50%{text-shadow:0 0 60px #e74c3c}} @keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}} .btn-action{transition:all 0.15s;cursor:pointer;} .btn-action:hover{transform:scale(1.05);filter:brightness(1.2);}`}</style>
          <div style={{ animation: "slideUp 0.6s ease" }}>
            <div style={{ fontSize: 80, marginBottom: 10 }}>{win ? "🏆" : "💀"}</div>
            <h1 style={{ fontSize: 64, color: win ? "#f39c12" : "#e74c3c", margin: 0, animation: "glow 2s infinite" }}>{win ? "WINNER!" : "DEFEATED"}</h1>
            <div style={{ color: "#fff", fontSize: 24, marginTop: 10, letterSpacing: 3 }}>{win ? player.name : opponent.name}</div>
            {win && pCoins > 0 && <div style={{ color: "#f39c12", fontSize: 20, marginTop: 16, letterSpacing: 2 }}>+{pCoins} COINS EARNED 🪙</div>}
            <div style={{ marginTop: 30, fontSize: 16, color: "#666", fontFamily: "Arial", fontWeight: "normal", letterSpacing: 0 }}>
              {win ? `You defeated ${opponent.name} with ${player.hp}% HP remaining!` : `${opponent.name} defeated you with ${opponent.hp}% HP remaining!`}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 30, justifyContent: "center" }}>
              <button className="btn-action" onClick={() => { setScreen("select_mode"); setGameState(null); }} style={{ background: "linear-gradient(135deg,#c0392b,#7b241c)", color: "#fff", border: "none", padding: "16px 40px", fontSize: 18, letterSpacing: 3, cursor: "pointer" }}>REMATCH</button>
              <button className="btn-action" onClick={() => { setScreen("menu"); setGameState(null); }} style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid #333", padding: "16px 40px", fontSize: 18, letterSpacing: 3, cursor: "pointer" }}>MAIN MENU</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ background: arena.bg || "#0a0a0a", minHeight: "100vh", fontFamily: "'Impact','Arial Black',sans-serif", transform: shakeScreen ? "translateX(6px)" : "none", transition: "transform 0.1s", userSelect: "none" }}>
        <style>{`
          @keyframes crowdPop{0%{transform:scale(0.5) translateY(20px);opacity:0}30%{transform:scale(1.15);opacity:1}100%{transform:scale(1);opacity:1}}
          @keyframes finReady{0%,100%{box-shadow:0 0 12px #f39c12}50%{box-shadow:0 0 40px #f39c12,0 0 80px #e74c3c}}
          @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}
          .btn-action{transition:all 0.15s;cursor:pointer;} .btn-action:hover{transform:scale(1.05);filter:brightness(1.2);} .btn-action:active{transform:scale(0.93);}
        `}</style>

        {/* Crowd chant */}
        {crowdMessage && (
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "clamp(24px,5vw,48px)", color: "#fff", fontFamily: "Impact", letterSpacing: 4, textShadow: "0 0 30px #c0392b,0 0 60px #e74c3c", zIndex: 200, animation: "crowdPop 0.4s ease", pointerEvents: "none", textAlign: "center", maxWidth: "80vw" }}>
            {crowdMessage}
          </div>
        )}

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 16px 100px" }}>
          {/* Header: timer + arena */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ color: arena.color || "#c0392b", fontSize: 13, letterSpacing: 3 }}>{arena.name.toUpperCase()}</div>
            <div style={{ fontSize: 32, color: timerColor, letterSpacing: 4, animation: timer <= 10 ? "pulse 0.5s infinite" : "none" }}>
              {String(Math.floor(timer / 60)).padStart(2, "0")}:{String(timer % 60).padStart(2, "0")}
            </div>
            <div style={{ color: "#555", fontSize: 12, letterSpacing: 2 }}>{gameState.diff?.name}</div>
          </div>

          {/* Fighter cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", gap: 12, marginBottom: 20, alignItems: "center" }}>
            {/* Player */}
            <div style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${player.accent || "#c0392b"}`, padding: 14 }}>
              <div style={{ color: player.accent || "#c0392b", fontSize: 16, letterSpacing: 2, marginBottom: 4 }}>{player.name}</div>
              <img src={player.image} alt={player.name} style={{ width: "100%", height: 120, objectFit: "cover", objectPosition: "top", marginBottom: 10, filter: "contrast(1.15) saturate(1.3)" }} onError={e => e.target.style.display = "none"} />
              {/* HP Bar */}
              <div style={{ height: 16, background: "#111", marginBottom: 6, position: "relative", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pHpPct}%`, background: pHpPct > 50 ? "#27ae60" : pHpPct > 25 ? "#f39c12" : "#e74c3c", transition: "width 0.3s ease, background 0.3s" }} />
                <span style={{ position: "absolute", top: 0, left: 6, fontSize: 10, lineHeight: "16px", color: "#fff" }}>HP {player.hp}%</span>
              </div>
              {/* Momentum Bar */}
              <div style={{ height: 10, background: "#111", position: "relative", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${player.momentum}%`, background: "linear-gradient(90deg,#f39c12,#e74c3c)", transition: "width 0.3s", animation: player.momentum >= 100 ? "finReady 1s infinite" : "none" }} />
                <span style={{ position: "absolute", top: 0, left: 6, fontSize: 9, lineHeight: "10px", color: "#fff" }}>MOMENTUM {player.momentum}%</span>
              </div>
            </div>

            <div style={{ textAlign: "center", color: "#c0392b", fontSize: 28, letterSpacing: 2 }}>VS</div>

            {/* Opponent */}
            <div style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${opponent.accent || "#555"}`, padding: 14 }}>
              <div style={{ color: opponent.accent || "#aaa", fontSize: 16, letterSpacing: 2, marginBottom: 4 }}>{opponent.name}</div>
              <img src={opponent.image} alt={opponent.name} style={{ width: "100%", height: 120, objectFit: "cover", objectPosition: "top", marginBottom: 10, filter: "contrast(1.15) saturate(1.3) hue-rotate(180deg)" }} onError={e => e.target.style.display = "none"} />
              <div style={{ height: 16, background: "#111", marginBottom: 6, position: "relative", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${oHpPct}%`, background: oHpPct > 50 ? "#c0392b" : oHpPct > 25 ? "#e67e22" : "#f39c12", transition: "width 0.3s ease, background 0.3s" }} />
                <span style={{ position: "absolute", top: 0, left: 6, fontSize: 10, lineHeight: "16px", color: "#fff" }}>HP {opponent.hp}%</span>
              </div>
              <div style={{ height: 10, background: "#111", position: "relative", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${opponent.momentum}%`, background: "linear-gradient(90deg,#8e44ad,#e74c3c)", transition: "width 0.3s", animation: opponent.momentum >= 100 ? "pulse 0.5s infinite" : "none" }} />
                <span style={{ position: "absolute", top: 0, left: 6, fontSize: 9, lineHeight: "10px", color: "#fff" }}>MOMENTUM {opponent.momentum}%</span>
              </div>
            </div>
          </div>

          {/* Match log */}
          <div style={{ background: "rgba(0,0,0,0.7)", border: "1px solid #1a1a1a", padding: 12, marginBottom: 16, maxHeight: 100, overflowY: "auto" }}>
            {matchLog.slice(-5).reverse().map((line, i) => (
              <div key={i} style={{ color: i === 0 ? "#fff" : "#555", fontSize: 12, marginBottom: 3, fontFamily: "Arial", fontWeight: "normal", letterSpacing: 0, lineHeight: 1.4 }}>{line}</div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.95)", borderTop: "1px solid #1a1a1a", padding: "12px 16px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, maxWidth: 900, margin: "0 auto" }}>
            <button className="btn-action" onClick={() => doAction("strike")} style={{ background: "linear-gradient(135deg,#922b21,#641e16)", color: "#fff", border: "1px solid #e74c3c", padding: "14px 8px", cursor: "pointer", fontSize: 14, letterSpacing: 2 }}>
              👊 STRIKE
            </button>
            <button className="btn-action" onClick={() => doAction("grapple")} style={{ background: "linear-gradient(135deg,#1a5276,#154360)", color: "#fff", border: "1px solid #2980b9", padding: "14px 8px", cursor: "pointer", fontSize: 14, letterSpacing: 2 }}>
              💪 GRAPPLE
            </button>
            <button className="btn-action" onClick={() => doAction("taunt")} style={{ background: "linear-gradient(135deg,#1e8449,#145a32)", color: "#fff", border: "1px solid #27ae60", padding: "14px 8px", cursor: "pointer", fontSize: 14, letterSpacing: 2 }}>
              🎤 TAUNT
            </button>
            <button className="btn-action" onClick={() => doAction("finisher")} style={{ background: player.momentum >= 100 ? "linear-gradient(135deg,#d4ac0d,#b7950b)" : "rgba(255,255,255,0.03)", color: player.momentum >= 100 ? "#000" : "#444", border: `1px solid ${player.momentum >= 100 ? "#f39c12" : "#222"}`, padding: "14px 8px", cursor: player.momentum >= 100 ? "pointer" : "not-allowed", fontSize: 12, letterSpacing: 1, animation: player.momentum >= 100 ? "finReady 1s infinite" : "none" }}>
              ⚡ {player.finisher?.split(" ").slice(0, 2).join(" ") || "FINISHER"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "shop") {
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'Impact','Arial Black',sans-serif", padding: 20 }}>
        <style>{`.btn-action{transition:all 0.15s;cursor:pointer;} .btn-action:hover{transform:scale(1.03);filter:brightness(1.2);} .card-shop{transition:all 0.2s;} .card-shop:hover{transform:translateY(-3px);}`}</style>
        {notification && <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: notification.type === "success" ? "#27ae60" : "#e74c3c", color: "#fff", padding: "12px 24px", zIndex: 9999, fontSize: 16, letterSpacing: 2 }}>{notification.msg}</div>}
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button className="btn-action" onClick={() => setScreen("menu")} style={{ background: "none", border: "1px solid #333", color: "#999", padding: "8px 16px", cursor: "pointer", fontSize: 14 }}>← BACK</button>
              <h2 style={{ color: "#fff", margin: 0, fontSize: 28, letterSpacing: 4 }}>SHOP</h2>
            </div>
            <div style={{ color: "#f39c12", fontSize: 22, letterSpacing: 2 }}>🪙 {coins.toLocaleString()}</div>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {["wrestlers", "arenas"].map(t => (
              <button key={t} className="btn-action" onClick={() => setShopTab(t)} style={{ background: shopTab === t ? "#c0392b" : "rgba(255,255,255,0.05)", border: `1px solid ${shopTab === t ? "#c0392b" : "#333"}`, color: "#fff", padding: "10px 24px", cursor: "pointer", fontSize: 16, letterSpacing: 3 }}>
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {shopTab === "wrestlers" && (
            <div>
              {["men", "women"].map(div => (
                <div key={div} style={{ marginBottom: 30 }}>
                  <h3 style={{ color: "#c0392b", letterSpacing: 4, marginBottom: 12, fontSize: 18 }}>{div === "men" ? "MEN'S DIVISION" : "WOMEN'S DIVISION"}</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
                    {WRESTLERS[div].filter(w => !unlockedWrestlers.includes(w.id)).map(w => (
                      <div key={w.id} className="card-shop" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid #222`, padding: 16 }}>
                        <img src={w.image} alt={w.name} style={{ width: "100%", height: 130, objectFit: "cover", objectPosition: "top", marginBottom: 10, filter: "grayscale(0.3) contrast(1.1)" }} onError={e => e.target.style.display = "none"} />
                        <div style={{ color: w.accent, fontSize: 14, letterSpacing: 2 }}>{w.name}</div>
                        <div style={{ color: "#555", fontSize: 10, marginBottom: 8, fontFamily: "Arial", fontWeight: "normal", letterSpacing: 0 }}>{w.nickname}</div>
                        <div style={{ color: "#c0392b", fontSize: 11, marginBottom: 12 }}>⚡ {w.finisher}</div>
                        <button className="btn-action" onClick={() => buyItem(w, "wrestler")} style={{ width: "100%", background: coins >= w.price ? "linear-gradient(135deg,#c0392b,#7b241c)" : "rgba(255,255,255,0.05)", color: coins >= w.price ? "#fff" : "#444", border: "none", padding: "10px", cursor: coins >= w.price ? "pointer" : "not-allowed", fontSize: 14, letterSpacing: 2 }}>
                          🪙 {w.price.toLocaleString()}
                        </button>
                      </div>
                    ))}
                    {WRESTLERS[div].filter(w => unlockedWrestlers.includes(w.id)).map(w => (
                      <div key={w.id} className="card-shop" style={{ background: "rgba(39,174,96,0.05)", border: "1px solid #1e8449", padding: 16, opacity: 0.7 }}>
                        <img src={w.image} alt={w.name} style={{ width: "100%", height: 130, objectFit: "cover", objectPosition: "top", marginBottom: 10 }} onError={e => e.target.style.display = "none"} />
                        <div style={{ color: "#27ae60", fontSize: 14, letterSpacing: 2 }}>{w.name}</div>
                        <div style={{ color: "#27ae60", fontSize: 11, marginTop: 8, letterSpacing: 2 }}>✅ OWNED</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {shopTab === "arenas" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 12 }}>
              {ARENAS.map(a => {
                const owned = unlockedArenas.includes(a.id);
                return (
                  <div key={a.id} className="card-shop" style={{ background: a.bg, border: `1px solid ${owned ? a.color : "#222"}`, padding: 20 }}>
                    <div style={{ color: a.color, fontSize: 18, letterSpacing: 3, marginBottom: 4 }}>{a.name}</div>
                    <div style={{ color: "#666", fontSize: 12, marginBottom: 8, fontFamily: "Arial", fontWeight: "normal", letterSpacing: 0 }}>{a.desc}</div>
                    <div style={{ color: "#888", fontSize: 11, marginBottom: 12 }}>👥 Crowd: {a.crowd}%</div>
                    {owned ? (
                      <div style={{ color: "#27ae60", fontSize: 14, letterSpacing: 2 }}>✅ OWNED</div>
                    ) : (
                      <button className="btn-action" onClick={() => buyItem(a, "arena")} style={{ width: "100%", background: coins >= a.price ? `linear-gradient(135deg,${a.color},#000)` : "rgba(255,255,255,0.05)", color: coins >= a.price ? "#fff" : "#444", border: "none", padding: "10px", cursor: coins >= a.price ? "pointer" : "not-allowed", fontSize: 14, letterSpacing: 2 }}>
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
  }

  if (screen === "career") {
    const careerLevels = [
      { level: 1, name: "Jobber", reward: 100, opp: WRESTLERS.men[5] },
      { level: 2, name: "Enhancement Talent", reward: 150, opp: WRESTLERS.women[4] },
      { level: 3, name: "Mid-Carder", reward: 200, opp: WRESTLERS.men[4] },
      { level: 4, name: "Upper-Mid Card", reward: 280, opp: WRESTLERS.women[2] },
      { level: 5, name: "Main Eventer", reward: 380, opp: WRESTLERS.men[3] },
      { level: 6, name: "Champion", reward: 500, opp: WRESTLERS.women[1] },
      { level: 7, name: "Legend", reward: 700, opp: WRESTLERS.men[1] },
      { level: 8, name: "Immortal", reward: 1000, opp: WRESTLERS.men[2] },
    ];
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'Impact','Arial Black',sans-serif", padding: 20 }}>
        <style>{`.btn-action{transition:all 0.15s;cursor:pointer;} .btn-action:hover{transform:scale(1.03);filter:brightness(1.2);}`}</style>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 30 }}>
            <button className="btn-action" onClick={() => setScreen("menu")} style={{ background: "none", border: "1px solid #333", color: "#999", padding: "8px 16px", cursor: "pointer", fontSize: 14 }}>← BACK</button>
            <h2 style={{ color: "#fff", margin: 0, fontSize: 28, letterSpacing: 4 }}>CAREER MODE</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {careerLevels.map((lvl, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #222", padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: "#c0392b", fontSize: 11, letterSpacing: 3 }}>LEVEL {lvl.level}</div>
                  <div style={{ color: "#fff", fontSize: 20, letterSpacing: 2 }}>{lvl.name}</div>
                  <div style={{ color: "#666", fontSize: 12, marginTop: 4, fontFamily: "Arial", fontWeight: "normal", letterSpacing: 0 }}>vs {lvl.opp.name}</div>
                  <div style={{ color: "#f39c12", fontSize: 12, marginTop: 4 }}>🪙 +{lvl.reward} coins</div>
                </div>
                <button className="btn-action" onClick={() => {
                  if (!selectedWrestler) { notify("Select a wrestler first!", "error"); setScreen("select_mode"); return; }
                  const diff = DIFFICULTIES[Math.min(Math.floor(i / 2), 3)];
                  startMatch(selectedWrestler || allWrestlers[0], lvl.opp, selectedArena, diff);
                }} style={{ background: "linear-gradient(135deg,#c0392b,#7b241c)", color: "#fff", border: "none", padding: "12px 20px", cursor: "pointer", fontSize: 14, letterSpacing: 2 }}>
                  FIGHT
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (screen === "tournament") {
    const bracket = [
      { match: 1, p1: WRESTLERS.men[0], p2: WRESTLERS.women[0], winner: null },
      { match: 2, p1: WRESTLERS.men[2], p2: WRESTLERS.women[1], winner: null },
    ];
    return (
      <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'Impact','Arial Black',sans-serif", padding: 20 }}>
        <style>{`.btn-action{transition:all 0.15s;cursor:pointer;} .btn-action:hover{transform:scale(1.03);filter:brightness(1.2);}`}</style>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 30 }}>
            <button className="btn-action" onClick={() => setScreen("menu")} style={{ background: "none", border: "1px solid #333", color: "#999", padding: "8px 16px", cursor: "pointer", fontSize: 14 }}>← BACK</button>
            <h2 style={{ color: "#fff", margin: 0, fontSize: 28, letterSpacing: 4 }}>KING OF THE RING</h2>
          </div>
          <div style={{ color: "#666", marginBottom: 20, fontFamily: "Arial", fontWeight: "normal", fontSize: 14 }}>Win your semi-final to advance to the final. 3x coin multiplier for the champion!</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {bracket.map((b, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #222", padding: 20 }}>
                <div style={{ color: "#c0392b", fontSize: 12, letterSpacing: 3, marginBottom: 12 }}>SEMI-FINAL {b.match}</div>
                {[b.p1, b.p2].map((f, fi) => (
                  <div key={fi} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: fi === 0 ? 10 : 0 }}>
                    <img src={f.image} alt={f.name} style={{ width: 50, height: 50, objectFit: "cover", objectPosition: "top", borderRadius: "50%", border: `2px solid ${f.accent}` }} onError={e => e.target.style.display = "none"} />
                    <div>
                      <div style={{ color: f.accent, fontSize: 14, letterSpacing: 1 }}>{f.name}</div>
                      <div style={{ color: "#555", fontSize: 10, fontFamily: "Arial", fontWeight: "normal" }}>{f.division === "men" ? "Men's" : "Women's"} Division</div>
                    </div>
                    {fi === 0 && <div style={{ color: "#c0392b", fontSize: 20, margin: "0 auto" }}>VS</div>}
                  </div>
                ))}
                <button className="btn-action" onClick={() => {
                  if (!selectedWrestler) { setScreen("select_mode"); return; }
                  startMatch(selectedWrestler || b.p1, b.p2, selectedArena, DIFFICULTIES[2]);
                }} style={{ width: "100%", marginTop: 16, background: "linear-gradient(135deg,#c0392b,#7b241c)", color: "#fff", border: "none", padding: "12px", cursor: "pointer", fontSize: 14, letterSpacing: 2 }}>
                  ENTER MATCH
                </button>
              </div>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg,#2c1a00,#1a0d00)", border: "1px solid #f39c12", padding: 20, marginTop: 20, textAlign: "center" }}>
            <div style={{ color: "#f39c12", fontSize: 24, letterSpacing: 4 }}>👑 FINAL</div>
            <div style={{ color: "#666", marginTop: 8, fontFamily: "Arial", fontWeight: "normal", fontSize: 14 }}>Win both semi-finals to unlock the Final match</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
