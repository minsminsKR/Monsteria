"use strict";

// ---------------------------------------------------------------------------
// Monsteria data
// Add new monster definitions here. UI sprites can later be replaced with PNGs
// without changing the save or gameplay structures.
// ---------------------------------------------------------------------------

const SAVE_KEY = "monsteria-save-v1";
const EVO_STONE_PRICE = 120;

const monsterDefinitions = {
  "0_1_cyclopse": {
    id: "0_1_cyclopse",
    name: "사이클롭스",
    role: "Rapid eye blaster",
    description: "빠른 황금빛 탄환과 강력한 외눈 광선을 사용하는 복슬복슬한 파트너.",
    skillName: "Cyclops Beam",
    skillCooldown: 1.8,
    projectileSpeed: 620,
    moveSpeed: 205,
    spriteSheet: "assets/monsters/0_1_cyclopse/0_1_cyclopse-spritesheet-game.png",
    colors: { main: "#e5a52f", light: "#fff0a3", dark: "#7b431b", accent: "#c667e3" },
    base: { attack: 8, attackSpeed: 1.55, maxHp: 72, defense: 2, skillDamage: 16 },
    growth: { attack: 4, attackSpeed: 0.13, maxHp: 22, defense: 2, skillDamage: 8 }
  },
  "1_1_lovelydoll": {
    id: "1_1_lovelydoll",
    name: "러블리돌",
    role: "Heavy tear striker",
    description: "거대한 눈물 파도와 묵직한 한 방으로 전장을 휩쓰는 울보 인형.",
    skillName: "Tear Wave",
    skillCooldown: 4.6,
    projectileSpeed: 340,
    moveSpeed: 145,
    spriteSheet: "assets/monsters/1_1_lovelydoll/1_1_lovelydoll-spritesheet-game.png",
    colors: { main: "#d77c56", light: "#ffd39b", dark: "#7a3e38", accent: "#efe0aa" },
    base: { attack: 20, attackSpeed: 0.72, maxHp: 125, defense: 8, skillDamage: 38 },
    growth: { attack: 10, attackSpeed: 0.06, maxHp: 43, defense: 5, skillDamage: 18 }
  },
  "2_1_unnyangi": {
    id: "2_1_unnyangi",
    name: "운냥이",
    role: "All-round cat",
    description: "재빠른 냥펀치와 보랏빛 에너지볼을 사용하는 유쾌한 고양이 파트너.",
    skillName: "Cat Energy Ball",
    skillCooldown: 3.1,
    projectileSpeed: 470,
    moveSpeed: 175,
    spriteSheet: "assets/monsters/2_1_unnyangi/2_1_unnyangi-spritesheet-game.png",
    colors: { main: "#72bd72", light: "#d8f2a8", dark: "#34704a", accent: "#bf88d6" },
    base: { attack: 13, attackSpeed: 1.05, maxHp: 95, defense: 5, skillDamage: 25 },
    growth: { attack: 7, attackSpeed: 0.09, maxHp: 32, defense: 3, skillDamage: 12 }
  },
  "0_2_cyclopsis": {
    id: "0_2_cyclopsis",
    name: "사이클롭시스",
    role: "Rapid eye blaster evolution",
    description: "사이클롭스가 한 단계 성장하여 더 길어진 팔다리와 머리 위에 한 개의 귀여운 뿔이 자라난 사이클롭시스.",
    skillName: "Cyclops Beam V2",
    skillCooldown: 1.6,
    projectileSpeed: 680,
    moveSpeed: 215,
    spriteSheet: "assets/monsters/0_2_cyclopsis/0_2_cyclopsis-spritesheet-game.png",
    colors: { main: "#c98218", light: "#ffef9f", dark: "#633010", accent: "#d57eeb" },
    base: { attack: 22, attackSpeed: 1.85, maxHp: 150, defense: 8, skillDamage: 48 },
    growth: { attack: 8, attackSpeed: 0.18, maxHp: 40, defense: 4, skillDamage: 18 }
  },
  "1_2_cutie": {
    id: "1_2_cutie",
    name: "큐티",
    role: "Cute doll evolution",
    description: "러블리돌의 성숙해진 형태로 귀여움을 잃지 않은 채 비율이 성장한 인형 큐티.",
    skillName: "Tear Wave V2",
    skillCooldown: 4.2,
    projectileSpeed: 380,
    moveSpeed: 155,
    spriteSheet: "assets/monsters/1_2_cutie/1_2_cutie-spritesheet-game.png",
    colors: { main: "#c56038", light: "#ffca8f", dark: "#5d2c27", accent: "#faebbe" },
    base: { attack: 48, attackSpeed: 0.88, maxHp: 270, defense: 22, skillDamage: 96 },
    growth: { attack: 18, attackSpeed: 0.08, maxHp: 78, defense: 10, skillDamage: 35 }
  },
  "2_2_unnyangsam": {
    id: "2_2_unnyangsam",
    name: "운냥삼",
    role: "Speed cat fighter",
    description: "운냥이가 한층 더 민첩하고 강인하게 진화하여 삼색 냥발톱과 빠른 권법을 사용하는 운냥삼.",
    skillName: "Cat Energy Blast V2",
    skillCooldown: 2.8,
    projectileSpeed: 520,
    moveSpeed: 185,
    spriteSheet: "assets/monsters/2_2_unnyangsam/2_2_unnyangsam-spritesheet-game.png",
    colors: { main: "#58ab58", light: "#c2ed82", dark: "#205433", accent: "#ab66c4" },
    base: { attack: 32, attackSpeed: 1.25, maxHp: 200, defense: 14, skillDamage: 68 },
    growth: { attack: 12, attackSpeed: 0.12, maxHp: 58, defense: 6, skillDamage: 24 }
  },
  "0_3_hatefulclops": {
    id: "0_3_hatefulclops",
    name: "혐우클롭스",
    role: "Demonic eye tyrant",
    description: "사이클롭시스가 최종 한계 돌파하여 탄생한 혐우클롭스. 붉은 마기를 휘감고 엄청난 빔 세례를 퍼붓습니다.",
    skillName: "Ultimate Eye Beam",
    skillCooldown: 1.4,
    projectileSpeed: 750,
    moveSpeed: 225,
    spriteSheet: "assets/monsters/0_3_hatefulclops/0_3_hatefulclops-spritesheet-game.png",
    colors: { main: "#b33a27", light: "#ff9c8a", dark: "#4d120a", accent: "#7deef0" },
    base: { attack: 50, attackSpeed: 2.25, maxHp: 320, defense: 20, skillDamage: 110 },
    growth: { attack: 18, attackSpeed: 0.22, maxHp: 75, defense: 8, skillDamage: 38 }
  },
  "1_3_candy": {
    id: "1_3_candy",
    name: "캔디",
    role: "Sweet hammer candy",
    description: "큐티가 달콤하고 파괴적인 요정으로 승화된 캔디. 거대한 사탕 파도와 헤비 해머로 전장을 파괴합니다.",
    skillName: "Candy Wave",
    skillCooldown: 3.8,
    projectileSpeed: 420,
    moveSpeed: 165,
    spriteSheet: "assets/monsters/1_3_candy/1_3_candy-spritesheet-game.png",
    colors: { main: "#e06b9b", light: "#ffd9e8", dark: "#802848", accent: "#fff2be" },
    base: { attack: 95, attackSpeed: 1.05, maxHp: 520, defense: 45, skillDamage: 210 },
    growth: { attack: 35, attackSpeed: 0.10, maxHp: 130, defense: 18, skillDamage: 75 }
  },
  "2_3_unrang": {
    id: "2_3_unrang",
    name: "운랑이",
    role: "Lightning storm beast",
    description: "운냥삼이 마침내 신수의 반열에 들어선 운랑이. 푸른 뇌전을 방출하고 폭풍처럼 적을 몰아칩니다.",
    skillName: "Storm Energy Ball",
    skillCooldown: 2.4,
    projectileSpeed: 580,
    moveSpeed: 195,
    spriteSheet: "assets/monsters/2_3_unrang/2_3_unrang-spritesheet-game.png",
    colors: { main: "#3f8fb5", light: "#b3e5fc", dark: "#12435c", accent: "#ffeb3b" },
    base: { attack: 72, attackSpeed: 1.55, maxHp: 410, defense: 30, skillDamage: 155 },
    growth: { attack: 24, attackSpeed: 0.15, maxHp: 105, defense: 12, skillDamage: 55 }
  }
};

const rockDefinitions = {
  stone: {
    id: "stone",
    name: "Stone Rock",
    tier: 1,
    maxHp: 80,
    gold: [18, 28],
    crystal: [0, 1],
    note: "초반 채굴에 적합한 무른 돌입니다."
  },
  iron: {
    id: "iron",
    name: "Iron Rock",
    tier: 2,
    maxHp: 380,
    gold: [72, 108],
    crystal: [2, 4],
    note: "단단하지만 안정적인 중급 보상을 줍니다."
  },
  crystal: {
    id: "crystal",
    name: "Crystal Rock",
    tier: 3,
    maxHp: 1120,
    gold: [210, 290],
    crystal: [8, 13],
    note: "매우 단단하며 많은 Crystal을 품고 있습니다."
  }
};

const levelRequirements = {
  1: { gold: 100, crystal: 4, chance: 0.85 },
  2: { gold: 200, crystal: 8, chance: 0.80 },
  3: { gold: 400, crystal: 15, chance: 0.75 },
  4: { gold: 700, crystal: 25, chance: 0.70 },
  5: { gold: 1100, crystal: 40, chance: 0.65 },
  6: { gold: 1600, crystal: 60, chance: 0.60 },
  7: { gold: 2200, crystal: 85, chance: 0.55 },
  8: { gold: 2900, crystal: 115, chance: 0.50 },
  9: { gold: 3700, crystal: 150, chance: 0.45 },
  10: { gold: 4600, crystal: 190, chance: 0.40 },
  11: { gold: 5600, crystal: 240, chance: 0.38 },
  12: { gold: 6700, crystal: 300, chance: 0.36 },
  13: { gold: 7900, crystal: 370, chance: 0.34 },
  14: { gold: 9200, crystal: 450, chance: 0.32 },
  15: { gold: 11000, crystal: 550, chance: 0.30 },
  16: { gold: 13000, crystal: 670, chance: 0.28 },
  17: { gold: 15500, crystal: 800, chance: 0.26 },
  18: { gold: 18500, crystal: 950, chance: 0.24 },
  19: { gold: 22000, crystal: 1150, chance: 0.22 }
};

function getMaxLevel(species) {
  return 20;
}

function getMonsterFamilyPrefix(species) {
  if (!species) return "0";
  return species.split("_")[0];
}

function getSpeciesForLevel(familyPrefix, level) {
  if (level >= 15) {
    if (familyPrefix === "0") return "0_3_hatefulclops";
    if (familyPrefix === "1") return "1_3_candy";
    if (familyPrefix === "2") return "2_3_unrang";
  } else if (level >= 5) {
    if (familyPrefix === "0") return "0_2_cyclopsis";
    if (familyPrefix === "1") return "1_2_cutie";
    if (familyPrefix === "2") return "2_2_unnyangsam";
  } else {
    if (familyPrefix === "0") return "0_1_cyclopse";
    if (familyPrefix === "1") return "1_1_lovelydoll";
    if (familyPrefix === "2") return "2_1_unnyangi";
  }
  return null;
}

function getNextEvolution(species) {
  if (species === "0_1_cyclopse") return "0_2_cyclopsis";
  if (species === "0_2_cyclopsis") return "0_3_hatefulclops";
  if (species === "1_1_lovelydoll") return "1_2_cutie";
  if (species === "1_2_cutie") return "1_3_candy";
  if (species === "2_1_unnyangi") return "2_2_unnyangsam";
  if (species === "2_2_unnyangsam") return "2_3_unrang";
  return null;
}

function getMonsterStage(species) {
  if (["0_1_cyclopse", "1_1_lovelydoll", "2_1_unnyangi"].includes(species)) return 1;
  if (["0_2_cyclopsis", "1_2_cutie", "2_2_unnyangsam"].includes(species)) return 2;
  return 3;
}

function getUpgradeAction(monster) {
  const maxLvl = getMaxLevel(monster.species);
  
  if (monster.level < maxLvl) {
    const req = levelRequirements[monster.level];
    return { type: "levelUp", gold: req.gold, crystal: req.crystal, chance: req.chance };
  }
  
  return { type: "max" };
}

const spriteRows = {
  idle: 0,
  walk: 1,
  attack: 2,
  skill: 3,
  hit: 4,
  faint: 5
};

const monsterSpriteImages = {};

function createDefaultGameState() {
  return {
    started: false,
    gold: 0,
    crystal: 0,
    evoStones: 0,
    monsters: [],
    miningMonsterId: null,
    pvpMonsterId: null,
    selectedRock: "stone"
  };
}

let gameState = createDefaultGameState();

const uiState = {
  currentScreen: "starter",
  selectedEvolutionMonsterId: null,
  evolutionResult: ""
};

const miningSpots = [
  { left: "28%", top: "52%", scale: 1.0, zIndex: 52, facing: 1, lunge: "" },
  { left: "68%", top: "40%", scale: 1.0, zIndex: 40, facing: -1, lunge: "" },
  { left: "32%", top: "35%", scale: 1.0, zIndex: 35, facing: 1, lunge: "" },
  { left: "64%", top: "58%", scale: 1.0, zIndex: 58, facing: -1, lunge: "" },
  { left: "48%", top: "66%", scale: 1.0, zIndex: 66, facing: 1, lunge: "" },
  { left: "50%", top: "24%", scale: 1.0, zIndex: 24, facing: -1, lunge: "" },
  { left: "18%", top: "42%", scale: 1.0, zIndex: 42, facing: 1, lunge: "" },
  { left: "80%", top: "48%", scale: 1.0, zIndex: 48, facing: -1, lunge: "" }
];

const miningState = {
  active: false,
  respawning: false,
  type: "stone",
  hp: rockDefinitions.stone.maxHp,
  maxHp: rockDefinitions.stone.maxHp,
  generation: 0,
  timers: {},
  respawnTimer: null,
  selectedMonsterIndex: null,
  monsterPositions: null
};

function clearMiningTimers() {
  Object.values(miningState.timers).forEach(clearTimeout);
  miningState.timers = {};
}

function saveMiningPositions() {
  if (!miningState.monsterPositions) return;
  const positionsMap = {};
  gameState.monsters.forEach((monster, index) => {
    const pos = miningState.monsterPositions[index];
    if (pos) {
      positionsMap[monster.id] = pos;
    }
  });
  localStorage.setItem("monsteria-mining-positions", JSON.stringify(positionsMap));
}

function loadMiningPositions() {
  const saved = localStorage.getItem("monsteria-mining-positions");
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch (e) {
    return null;
  }
}

function getDynamicSpotProperties(leftPercent, topPercent) {
  const x = parseFloat(leftPercent);
  const y = parseFloat(topPercent);

  let scale = 1.0;
  let zIndex = Math.round(y);
  let facing = x < 50 ? 1 : -1;
  let lunge = "";

  return { scale, zIndex, facing, lunge };
}

let miningMovementRaf = null;
let lastMiningMoveTime = 0;

function startMiningMovementLoop() {
  if (uiState.currentScreen !== "mining") {
    miningMovementRaf = null;
    return;
  }
  if (miningMovementRaf) return;
  
  lastMiningMoveTime = performance.now();
  
  const tick = (now) => {
    if (uiState.currentScreen !== "mining") {
      miningMovementRaf = null;
      return;
    }
    let anyMoving = false;
    const mineStage = $("#mine-stage");
    if (!mineStage) {
      miningMovementRaf = null;
      return;
    }
    const rect = mineStage.getBoundingClientRect();
    let dt = (now - lastMiningMoveTime) / 1000;
    lastMiningMoveTime = now;
    
    if (dt > 0.1) dt = 0.1;

    gameState.monsters.forEach((monster, idx) => {
      const spot = miningState.monsterPositions && miningState.monsterPositions[idx];
      if (!spot || !spot.isMoving) return;
      
      anyMoving = true;
      
      const curX = parseFloat(spot.left);
      const curY = parseFloat(spot.top);
      const tarX = parseFloat(spot.targetLeft);
      const tarY = parseFloat(spot.targetTop);
      
      const curXpx = (curX / 100) * rect.width;
      const curYpx = (curY / 100) * rect.height;
      const tarXpx = (tarX / 100) * rect.width;
      const tarYpx = (tarY / 100) * rect.height;
      
      const dx = tarXpx - curXpx;
      const dy = tarYpx - curYpx;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const speed = monsterDefinitions[monster.species].moveSpeed || 150;
      const moveDist = speed * dt;
      
      if (dist <= moveDist) {
        spot.left = spot.targetLeft;
        spot.top = spot.targetTop;
        spot.isMoving = false;
        spot.facing = tarX < curX ? -1 : 1;
        spot.zIndex = Math.round(tarY);
        
        const spotEl = document.getElementById("mining-spot-" + idx);
        if (spotEl) {
          const sprite = spotEl.querySelector(".monster-sprite");
          if (sprite) sprite.classList.remove("is-walking");
          
          spotEl.style.left = spot.left;
          spotEl.style.top = spot.top;
          spotEl.style.zIndex = spot.zIndex;
          const wrapper = spotEl.querySelector(".monster-sprite-wrapper");
          if (wrapper) {
            wrapper.style.transform = spot.facing < 0 ? "scaleX(-1)" : "";
          }
        }
        saveMiningPositions();
        
        if (spot.isTargetingIncinerator) {
          spot.isTargetingIncinerator = false;
          setTimeout(() => {
            incinerateMonster(idx);
          }, 50);
        }
      } else {
        const nxPx = curXpx + (dx / dist) * moveDist;
        const nyPx = curYpx + (dy / dist) * moveDist;
        
        spot.left = ((nxPx / rect.width) * 100).toFixed(2) + "%";
        spot.top = ((nyPx / rect.height) * 100).toFixed(2) + "%";
        spot.facing = tarX < curX ? -1 : 1;
        spot.zIndex = Math.round(parseFloat(spot.top));
        
        const spotEl = document.getElementById("mining-spot-" + idx);
        if (spotEl) {
          spotEl.style.left = spot.left;
          spotEl.style.top = spot.top;
          spotEl.style.zIndex = spot.zIndex;
          const wrapper = spotEl.querySelector(".monster-sprite-wrapper");
          if (wrapper) {
            wrapper.style.transform = spot.facing < 0 ? "scaleX(-1)" : "";
          }
          const sprite = spotEl.querySelector(".monster-sprite");
          if (sprite && !sprite.classList.contains("is-walking")) {
            sprite.classList.add("is-walking");
          }
        }
      }
    });
    
    if (anyMoving) {
      miningMovementRaf = requestAnimationFrame(tick);
    } else {
      miningMovementRaf = null;
    }
  };
  
  miningMovementRaf = requestAnimationFrame(tick);
}

const pvpState = {
  active: false,
  over: false,
  rafId: null,
  lastTime: 0,
  elapsed: 0,
  keys: new Set(),
  mouse: { x: 400, y: 240 },
  playerTeam: [],
  enemyTeam: [],
  projectiles: [],
  particles: [],
  floaters: [],
  lastBasic: -Infinity,
  lastSkill: -Infinity,
  aiLastShot: -Infinity
};

const $ = (selector) => document.querySelector(selector);

// ---------------------------------------------------------------------------
// Stat and save helpers
// ---------------------------------------------------------------------------

function getMonsterStats(species, level) {
  const definition = monsterDefinitions[species];
  const steps = Math.max(0, level - 1);
  return {
    attack: definition.base.attack + definition.growth.attack * steps,
    attackSpeed: Number((definition.base.attackSpeed + definition.growth.attackSpeed * steps).toFixed(2)),
    maxHp: definition.base.maxHp + definition.growth.maxHp * steps,
    defense: definition.base.defense + definition.growth.defense * steps,
    skillName: definition.skillName,
    skillDamage: definition.base.skillDamage + definition.growth.skillDamage * steps,
    skillCooldown: definition.skillCooldown,
    projectileSpeed: definition.projectileSpeed
  };
}

function createMonster(species) {
  return {
    id: `monster_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    species,
    name: monsterDefinitions[species].name,
    level: 1,
    stats: getMonsterStats(species, 1)
  };
}

function normalizeMonster(savedMonster) {
  let spec = savedMonster.species || "";
  if (spec === "swiftling" || spec === "cyclopse") spec = "0_1_cyclopse";
  else if (spec === "cyclopsis") spec = "0_2_cyclopsis";
  else if (spec === "hatefulclops") spec = "0_3_hatefulclops";
  else if (spec === "bruterock" || spec === "lovelydoll") spec = "1_1_lovelydoll";
  else if (spec === "cutie") spec = "1_2_cutie";
  else if (spec === "candy") spec = "1_3_candy";
  else if (spec === "balancer" || spec === "unnyangi") spec = "2_1_unnyangi";
  else if (spec === "unnyangeoger" || spec === "unnyangsam") spec = "2_2_unnyangsam";
  else if (spec === "unrang") spec = "2_3_unrang";
  
  const species = monsterDefinitions[spec] ? spec : "2_1_unnyangi";
  const maxLvl = getMaxLevel(species);
  const level = Math.min(maxLvl, Math.max(1, Number(savedMonster.level) || 1));
  const savedStats = savedMonster.species === "swiftling" ? {} : (savedMonster.stats || {});
  return {
    id: savedMonster.id || `monster_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    species,
    name: savedMonster.name || monsterDefinitions[species].name,
    level,
    stats: { ...getMonsterStats(species, level), ...savedStats }
  };
}

function getMonsterById(id) {
  return gameState.monsters.find((monster) => monster.id === id) || null;
}

function getMiningMonster() {
  return getMonsterById(gameState.miningMonsterId) || gameState.monsters[0] || null;
}

function getPvpMonster() {
  return getMonsterById(gameState.pvpMonsterId) || gameState.monsters[0] || null;
}

function saveGame() {
  if (!gameState.started) {
    return;
  }

  const saveData = {
    started: gameState.started,
    gold: gameState.gold,
    crystal: gameState.crystal,
    evoStones: gameState.evoStones,
    monsters: gameState.monsters,
    miningMonsterId: gameState.miningMonsterId,
    pvpMonsterId: gameState.pvpMonsterId,
    selectedRock: gameState.selectedRock
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
}

function loadGame() {
  const rawSave = localStorage.getItem(SAVE_KEY);
  if (!rawSave) {
    return;
  }

  try {
    const saved = JSON.parse(rawSave);
    if (!saved.started || !Array.isArray(saved.monsters) || saved.monsters.length === 0) {
      return;
    }

    const monsters = saved.monsters.map(normalizeMonster);
    
    // Save migration: correct species and stats based on current level rules
    monsters.forEach((monster) => {
      const prefix = getMonsterFamilyPrefix(monster.species);
      const correctSpecies = getSpeciesForLevel(prefix, monster.level);
      if (correctSpecies && correctSpecies !== monster.species) {
        monster.species = correctSpecies;
        monster.name = monsterDefinitions[correctSpecies].name;
      }
      monster.stats = getMonsterStats(monster.species, monster.level);
    });

    const validIds = new Set(monsters.map((monster) => monster.id));

    gameState = {
      started: true,
      gold: Math.max(0, Number(saved.gold) || 0),
      crystal: Math.max(0, Number(saved.crystal) || 0),
      evoStones: Math.max(0, Number(saved.evoStones) || 0),
      monsters,
      miningMonsterId: validIds.has(saved.miningMonsterId) ? saved.miningMonsterId : monsters[0].id,
      pvpMonsterId: validIds.has(saved.pvpMonsterId) ? saved.pvpMonsterId : monsters[0].id,
      selectedRock: rockDefinitions[saved.selectedRock] ? saved.selectedRock : "stone"
    };
    syncDisplayResources();
  } catch (error) {
    console.warn("Monsteria save could not be loaded.", error);
    localStorage.removeItem(SAVE_KEY);
  }
}

function resetSave() {
  const accepted = window.confirm("Monsteria의 모든 저장 데이터를 초기화할까요?");
  if (!accepted) {
    return;
  }

  stopMining();
  stopPvp();
  if (window.soundManager && typeof window.soundManager.resetBgm === "function") {
    window.soundManager.resetBgm();
  }
  localStorage.removeItem(SAVE_KEY);
  gameState = createDefaultGameState();
  uiState.currentScreen = "starter";
  uiState.selectedEvolutionMonsterId = null;
  uiState.evolutionResult = "";
  resetMiningRock("stone");
  syncDisplayResources();
  updateResourceDisplays();
  showStarterScreen();
  showToast("저장 데이터가 초기화되었습니다.", "success");
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function monsterSpriteMarkup(species, level, extraClass = "") {
  const definition = monsterDefinitions[species];
  const spriteSheetClass = definition?.spriteSheet ? " has-sprite-sheet" : "";
  const spriteSheetStyle = definition?.spriteSheet
    ? ` style="--monster-sprite-sheet: url('${definition.spriteSheet}')"`
    : "";
  const stage = getMonsterStage(species);

  return `<div class="monster-sprite ${species} stage${stage} lv${level}${spriteSheetClass} ${extraClass}"${spriteSheetStyle} aria-hidden="true"></div>`;
}

function preloadMonsterSpriteImages() {
  Object.values(monsterDefinitions).forEach((definition) => {
    if (!definition.spriteSheet || monsterSpriteImages[definition.id]) {
      return;
    }
    const image = new Image();
    image.src = definition.spriteSheet;
    monsterSpriteImages[definition.id] = image;
  });
}

function statsMarkup(monster) {
  return `
    <div class="stat-grid">
      <div class="stat"><span>ATK</span><strong>${monster.stats.attack}</strong></div>
      <div class="stat"><span>SPD</span><strong>${monster.stats.attackSpeed}/s</strong></div>
      <div class="stat"><span>HP</span><strong>${monster.stats.maxHp}</strong></div>
      <div class="stat"><span>DEF</span><strong>${monster.stats.defense}</strong></div>
      <div class="stat"><span>SKILL</span><strong>${monster.stats.skillName}</strong></div>
      <div class="stat"><span>DMG</span><strong>${monster.stats.skillDamage}</strong></div>
    </div>
  `;
}

function renderStarterOptions() {
  const container = $("#starter-options");
  const starterIds = ["0_1_cyclopse", "1_1_lovelydoll", "2_1_unnyangi"];
  container.innerHTML = Object.values(monsterDefinitions)
    .filter((def) => starterIds.includes(def.id))
    .map((definition) => {
      const preview = { stats: getMonsterStats(definition.id, 1) };
      return `
        <article class="starter-card pixel-panel">
          <div class="sprite-stage">${monsterSpriteMarkup(definition.id, 1)}</div>
          <h3>${definition.name}</h3>
          <p class="role">${definition.role} / ${definition.skillName}</p>
          <p class="description">${definition.description}</p>
          ${statsMarkup(preview)}
          <button class="primary-button" data-starter="${definition.id}">Choose ${definition.name}</button>
        </article>
      `;
    }).join("");
}

function showStarterScreen() {
  $("#game-header").classList.add("is-hidden");
  $("#game-nav").classList.add("is-hidden");
  document.querySelectorAll(".screen").forEach((screen) => screen.classList.remove("active"));
  $("#starter-screen").classList.add("active");
  uiState.currentScreen = "starter";
  soundManager.play("bgm_main");
}

function showGameUi() {
  $("#game-header").classList.remove("is-hidden");
  $("#game-nav").classList.remove("is-hidden");
  $("#starter-screen").classList.remove("active");
  updateResourceDisplays();
}

function showScreen(screenName) {
  if (!gameState.started) {
    showStarterScreen();
    return;
  }

  if (pvpState.active && screenName !== "pvp") {
    stopPvp();
  }

  const target = $(`#${screenName}-screen`);
  if (!target) {
    return;
  }

  uiState.currentScreen = screenName;
  document.querySelectorAll(".screen").forEach((screen) => screen.classList.remove("active"));
  target.classList.add("active");
  document.querySelectorAll(".game-nav [data-screen]").forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === screenName);
  });

  renderScreen(screenName);

  if (screenName === "mining") {
    startMining();
  }

  // Handle BGM changes during screen navigation
  if (screenName !== "pvp") {
    soundManager.play("bgm_main");
  }
}

function renderScreen(screenName) {
  updateResourceDisplays();
  if (screenName === "mining") renderMining();
  if (screenName === "monsters") renderMonsters();
  if (screenName === "shop") renderShop();
  if (screenName === "evolution") renderEvolution();
  if (screenName === "pvp" && !pvpState.active) renderPvpSetup();
}

const displayState = {
  gold: 0,
  crystal: 0,
  evoStones: 0
};

const rollingTargetState = {
  gold: 0,
  crystal: 0,
  evoStones: 0
};

function syncDisplayResources() {
  displayState.gold = gameState.gold;
  displayState.crystal = gameState.crystal;
  displayState.evoStones = gameState.evoStones;

  rollingTargetState.gold = gameState.gold;
  rollingTargetState.crystal = gameState.crystal;
  rollingTargetState.evoStones = gameState.evoStones;
}

let resourceAnimationLoop = null;

function startResourceRollingLoop() {
  if (resourceAnimationLoop) return;
  const tick = () => {
    let changed = false;
    if (displayState.gold < rollingTargetState.gold) {
      const diff = rollingTargetState.gold - displayState.gold;
      displayState.gold += Math.max(1, Math.ceil(diff * 0.12));
      if (displayState.gold > rollingTargetState.gold) displayState.gold = rollingTargetState.gold;
      changed = true;
    } else if (displayState.gold > rollingTargetState.gold) {
      displayState.gold = rollingTargetState.gold;
      changed = true;
    }
    if (displayState.crystal < rollingTargetState.crystal) {
      const diff = rollingTargetState.crystal - displayState.crystal;
      displayState.crystal += Math.max(1, Math.ceil(diff * 0.12));
      if (displayState.crystal > rollingTargetState.crystal) displayState.crystal = rollingTargetState.crystal;
      changed = true;
    } else if (displayState.crystal > rollingTargetState.crystal) {
      displayState.crystal = rollingTargetState.crystal;
      changed = true;
    }
    if (displayState.evoStones < rollingTargetState.evoStones) {
      const diff = rollingTargetState.evoStones - displayState.evoStones;
      displayState.evoStones += Math.max(1, Math.ceil(diff * 0.12));
      if (displayState.evoStones > rollingTargetState.evoStones) displayState.evoStones = rollingTargetState.evoStones;
      changed = true;
    } else if (displayState.evoStones > rollingTargetState.evoStones) {
      displayState.evoStones = rollingTargetState.evoStones;
      changed = true;
    }
    if (changed) {
      updateResourceDisplaysVisual();
    }
    resourceAnimationLoop = requestAnimationFrame(tick);
  };
  resourceAnimationLoop = requestAnimationFrame(tick);
}

function updateResourceDisplays() {
  if (gameState.gold < rollingTargetState.gold) {
    rollingTargetState.gold = gameState.gold;
  }
  if (gameState.crystal < rollingTargetState.crystal) {
    rollingTargetState.crystal = gameState.crystal;
  }
  if (gameState.evoStones < rollingTargetState.evoStones) {
    rollingTargetState.evoStones = gameState.evoStones;
  }

  startResourceRollingLoop();
  
  const shopGold = $("#shop-gold");
  if (shopGold) shopGold.textContent = Math.floor(gameState.gold).toLocaleString();
  
  const shopCrystal = $("#shop-crystal");
  if (shopCrystal) shopCrystal.textContent = Math.floor(gameState.crystal).toLocaleString();
  
  const shopStones = $("#shop-stones");
  if (shopStones) shopStones.textContent = Math.floor(gameState.evoStones).toLocaleString();
  
  updateResourceDisplaysVisual();
}

function updateResourceDisplaysVisual() {
  const goldEl = $("#gold-display");
  if (goldEl) goldEl.textContent = Math.floor(displayState.gold).toLocaleString();
  
  const crystalEl = $("#crystal-display");
  if (crystalEl) crystalEl.textContent = Math.floor(displayState.crystal).toLocaleString();
  
  const evoEl = $("#evo-stone-display");
  if (evoEl) evoEl.textContent = Math.floor(displayState.evoStones).toLocaleString();
}

function selectStarter(species) {
  if (!monsterDefinitions[species] || gameState.started) {
    return;
  }

  const monster = createMonster(species);
  gameState = {
    ...createDefaultGameState(),
    started: true,
    monsters: [monster],
    miningMonsterId: monster.id,
    pvpMonsterId: monster.id
  };
  uiState.selectedEvolutionMonsterId = monster.id;
  resetMiningRock("stone");
  saveGame();
  showGameUi();
  showScreen("mining");
  showToast(`${monster.name}와 함께 Monsteria를 시작합니다!`, "success");
}

// ---------------------------------------------------------------------------
// Mining
// ---------------------------------------------------------------------------

function resetMiningRock(type = gameState.selectedRock) {
  const rock = rockDefinitions[type] || rockDefinitions.stone;
  clearTimeout(miningState.respawnTimer);
  miningState.respawnTimer = null;
  miningState.type = rock.id;
  miningState.hp = rock.maxHp;
  miningState.maxHp = rock.maxHp;
  miningState.respawning = false;
  miningState.generation += 1;
  $("#rock-target")?.classList.remove("is-breaking", "is-hit");
}

function renderMining() {
  const rock = rockDefinitions[gameState.selectedRock];

  if (miningState.type !== rock.id) {
    resetMiningRock(rock.id);
  }

  $("#rock-sprite").innerHTML = `<div class="rock-sprite ${rock.id}" aria-hidden="true"></div>`;
  $("#rock-name").textContent = rock.name;

  $("#rock-tier-buttons").innerHTML = Object.values(rockDefinitions).map((definition) => `
    <button class="tier-button ${definition.id === gameState.selectedRock ? "active" : ""}" data-rock-tier="${definition.id}">
      <span class="tier-dot" style="background:${definition.id === "stone" ? "#9a9a87" : definition.id === "iron" ? "#697486" : "#5eb9ce"}"></span>
      <strong>${definition.name}</strong>
      <small>HP ${definition.maxHp.toLocaleString()} / TIER ${definition.tier}</small>
    </button>
  `).join("");

  $("#rock-info").innerHTML = `
    <div class="rock-data-list">
      <div class="rock-data-item"><span>Tier</span><strong>${rock.tier}</strong></div>
      <div class="rock-data-item"><span>Max HP</span><strong>${rock.maxHp.toLocaleString()}</strong></div>
      <div class="rock-data-item"><span>Gold</span><strong>${rock.gold[0]}-${rock.gold[1]}</strong></div>
      <div class="rock-data-item"><span>Crystal</span><strong>${rock.crystal[0]}-${rock.crystal[1]}</strong></div>
      <p class="muted">${rock.note}</p>
    </div>
  `;
  $("#rock-reward-preview").innerHTML = `${rock.gold[0]}-${rock.gold[1]} Gold<br>${rock.crystal[0]}-${rock.crystal[1]} Crystal`;

  // Initialize or align monster positions
  if (!miningState.monsterPositions || miningState.monsterPositions.length !== gameState.monsters.length) {
    const savedMap = loadMiningPositions() || {};
    miningState.monsterPositions = gameState.monsters.map((monster, index) => {
      if (savedMap[monster.id]) {
        const pos = savedMap[monster.id];
        pos.scale = 1.0;
        pos.zIndex = Math.round(parseFloat(pos.top));
        return pos;
      }
      const defaultSpot = miningSpots[index % miningSpots.length];
      return {
        left: defaultSpot.left,
        top: defaultSpot.top,
        scale: 1.0,
        zIndex: Math.round(parseFloat(defaultSpot.top)),
        facing: defaultSpot.facing,
        lunge: defaultSpot.lunge
      };
    });
  }

  if (miningState.monsterPositions && miningState.monsterPositions.some(p => p.isMoving)) {
    startMiningMovementLoop();
  }

  // Render all owned monsters in the mining stage in a 3D layout
  const container = $("#mining-monsters-container");
  if (container) {
    container.innerHTML = gameState.monsters.map((monster, index) => {
      const spot = miningState.monsterPositions[index];
      const isSelected = miningState.selectedMonsterIndex === index ? " selected" : "";
      const isWalkingClass = spot.isMoving ? " is-walking" : "";
      const facingStyle = spot.facing < 0 ? "transform: scaleX(-1);" : "";
      const transformStyle = `transform: translate(-50%, -72px) scale(${spot.scale});`;
      const combinedStyle = `left: ${spot.left}; top: ${spot.top}; z-index: ${spot.zIndex}; ${transformStyle}`;
      return `
        <div id="mining-spot-${index}" class="mining-monster-spot${isSelected}" style="${combinedStyle}">
          <div class="monster-sprite-wrapper" style="${facingStyle}">
            ${monsterSpriteMarkup(monster.species, monster.level, isWalkingClass)}
          </div>
          <div class="unit-nameplate" style="margin-top: 4px; padding: 2px 4px; font-size: 11px;">
            ${monster.name} LV${monster.level}
          </div>
        </div>
      `;
    }).join("");
  }

  // Update status summary text
  $("#mining-monster-summary").textContent = `OWNED PARTNERS: ${gameState.monsters.length} / ACTIVE MINERS WORK TOGETHER`;

  updateMiningUi();
}

function updateMiningUi(message) {
  if (uiState.currentScreen !== "mining") {
    return;
  }
  const rock = rockDefinitions[miningState.type];
  const hpPercent = Math.max(0, (miningState.hp / miningState.maxHp) * 100);
  $("#rock-hp-label").textContent = rock ? rock.name : "Rock HP";
  $("#rock-hp-text").textContent = `${Math.ceil(miningState.hp).toLocaleString()} / ${miningState.maxHp.toLocaleString()}`;
  $("#rock-hp-fill").style.width = `${hpPercent}%`;
  $("#mine-toggle-button").textContent = miningState.active ? "Pause Mining" : "Start Mining";
  $("#attack-state-text").textContent = miningState.respawning ? "Respawning" : miningState.active ? "Auto Attack" : "Ready";
  $("#rock-target").disabled = miningState.respawning;
  $(".click-hint").classList.toggle("is-hidden", miningState.active || miningState.respawning);
  if (message) {
    $("#mine-message").textContent = message;
  }
}

function selectRockTier(type) {
  if (!rockDefinitions[type] || gameState.selectedRock === type) {
    return;
  }

  const wasActive = miningState.active;
  stopMining();
  gameState.selectedRock = type;
  resetMiningRock(type);
  saveGame();
  renderMining();

  if (wasActive) {
    startMining();
  } else {
    $("#mine-message").textContent = `${rockDefinitions[type].name}을 선택했습니다. 돌을 클릭해 공격하세요.`;
  }
}

function toggleMining() {
  if (miningState.active) {
    stopMining("채굴을 일시 정지했습니다.");
  } else {
    startMining();
  }
}

function startMining() {
  if (gameState.monsters.length === 0 || miningState.respawning) {
    return;
  }

  miningState.active = true;
  updateMiningUi("자동 채굴이 시작되었습니다.");
  
  gameState.monsters.forEach((monster) => {
    scheduleMonsterAttack(monster);
  });
}

function stopMining(message) {
  miningState.active = false;
  clearMiningTimers();
  updateMiningUi(message);
}

function scheduleMonsterAttack(monster) {
  if (!miningState.active || miningState.respawning) return;
  if (miningState.timers[monster.id]) return;

  const initialDelay = Math.random() * 200;

  miningState.timers[monster.id] = setTimeout(() => {
    runMonsterAttackLoop(monster.id);
  }, initialDelay);
}

function runMonsterAttackLoop(monsterId) {
  if (!miningState.active || miningState.respawning) {
    delete miningState.timers[monsterId];
    return;
  }

  const currentMonster = getMonsterById(monsterId);
  if (!currentMonster) {
    delete miningState.timers[monsterId];
    return;
  }

  const index = gameState.monsters.findIndex(m => m.id === monsterId);
  if (index === -1) {
    delete miningState.timers[monsterId];
    return;
  }

  const spot = (miningState.monsterPositions && miningState.monsterPositions[index]) || miningSpots[index % miningSpots.length];
  const spotElement = $(`#mining-spot-${index}`);

  if (uiState.currentScreen === "mining" && spotElement) {
    // Face the central rock (placed at 50% left)
    const xPct = parseFloat(spot.left);
    if (!isNaN(xPct)) {
      if (xPct < 48) {
        spot.facing = 1;
      } else if (xPct > 52) {
        spot.facing = -1;
      }
    }

    // Apply facing direction to the DOM wrapper immediately
    const wrapper = spotElement.querySelector(".monster-sprite-wrapper");
    if (wrapper) {
      wrapper.style.transform = spot.facing < 0 ? "scaleX(-1)" : "";
    }

    const sprite = spotElement.querySelector(".monster-sprite");
    if (sprite) {
      sprite.classList.add("is-attacking");
      setTimeout(() => sprite.classList.remove("is-attacking"), 420);
    }
    shootMiningProjectile(spotElement, spot);
  }

  const currentGeneration = miningState.generation;
  setTimeout(() => {
    if (miningState.active && !miningState.respawning && currentGeneration === miningState.generation) {
      const verifiedMonster = getMonsterById(monsterId);
      if (verifiedMonster) {
        applyMiningDamage(verifiedMonster.stats.attack);
      }
    }
  }, 220);

  const attackInterval = Math.round(1000 / currentMonster.stats.attackSpeed);
  miningState.timers[monsterId] = setTimeout(() => {
    runMonsterAttackLoop(monsterId);
  }, attackInterval);
}

function shootMiningProjectile(spotElement, spot) {
  if (document.hidden) return;
  if (uiState.currentScreen !== "mining") return;
  const projectileLayer = $("#projectile-layer");
  if (!projectileLayer || !spotElement || !spot) return;

  const proj = document.createElement("span");
  proj.className = "mine-projectile-3d";

  // Calculate center of the monster sprite relative to the top-left of the spot
  const dx = Math.round(48 * spot.scale);
  const dy = Math.round(48 * spot.scale);

  proj.style.left = `calc(${spot.left} + ${dx}px)`;
  proj.style.top = `calc(${spot.top} + ${dy}px)`;
  projectileLayer.appendChild(proj);

  void proj.offsetWidth; // Force layout

  proj.style.transition = "left 220ms linear, top 220ms linear";
  proj.style.left = "50%";
  proj.style.top = "48%";

  setTimeout(() => {
    proj.remove();
  }, 220);
}

function applyMiningDamage(damage) {
  const isCrit = Math.random() < 0.10;
  const finalDamage = isCrit ? Math.round(damage * 1.5) : damage;

  if (uiState.currentScreen === "mining") {
    if (isCrit) {
      soundManager.play("break"); // Heavier critical hit sound
      spawnDamageNumber(finalDamage, true);
      spawnMiningDebris($("#rock-target"), miningState.type);

      // Mine Stage screen shake
      const mineStage = $("#mine-stage");
      if (mineStage) {
        mineStage.classList.remove("shake-effect");
        void mineStage.offsetWidth; // trigger reflow
        mineStage.classList.add("shake-effect");
        setTimeout(() => mineStage.classList.remove("shake-effect"), 200);
      }
    } else {
      soundManager.play("hit");
      spawnDamageNumber(finalDamage, false);
      spawnMiningDebris($("#rock-target"), miningState.type);
    }
  }
  miningState.hp = Math.max(0, miningState.hp - finalDamage);

  if (uiState.currentScreen === "mining") {
    const rockUnit = $("#rock-target");
    rockUnit.classList.remove("is-hit");
    void rockUnit.offsetWidth;
    rockUnit.classList.add("is-hit");
    setTimeout(() => rockUnit.classList.remove("is-hit"), 220);
  }

  updateMiningUi(`${rockDefinitions[miningState.type].name}에 ${finalDamage}${isCrit ? ' 크리티컬!' : ''} 피해!`);
  if (miningState.hp <= 0) {
    breakMiningRock();
  }
}

function spawnDamageNumber(damage, isCrit) {
  if (document.hidden) return;
  const number = document.createElement("span");
  number.className = isCrit ? "damage-number critical" : "damage-number";
  number.textContent = isCrit ? `-${damage}!` : `-${damage}`;
  number.style.left = `${46 + Math.random() * 8}%`;
  number.style.top = `${36 + Math.random() * 8}%`;
  $("#damage-layer").appendChild(number);
  setTimeout(() => number.remove(), 800);
}

function breakMiningRock() {
  if (uiState.currentScreen === "mining") {
    soundManager.play("break");
    setTimeout(() => {
      if (uiState.currentScreen === "mining") {
        soundManager.play("loot");
      }
    }, 220);
  }

  const rock = rockDefinitions[miningState.type];
  const goldReward = randomInt(rock.gold[0], rock.gold[1]);
  const crystalReward = randomInt(rock.crystal[0], rock.crystal[1]);
  const generation = miningState.generation;

  miningState.respawning = true;
  clearMiningTimers();

  if (goldReward > 0) {
    spawnResourceParticles("gold", goldReward, $("#rock-target"));
  }
  if (crystalReward > 0) {
    spawnResourceParticles("crystal", crystalReward, $("#rock-target"));
  }

  gameState.gold += goldReward;
  gameState.crystal += crystalReward;
  saveGame();
  updateResourceDisplays();

  if (uiState.currentScreen === "mining") {
    $("#rock-target").classList.add("is-breaking");
  }
  updateMiningUi(`${rock.name} 파괴! +${goldReward} Gold, +${crystalReward} Crystal`);

  clearTimeout(miningState.respawnTimer);
  miningState.respawnTimer = setTimeout(() => {
    if (generation !== miningState.generation) {
      return;
    }
    miningState.hp = rock.maxHp;
    miningState.maxHp = rock.maxHp;
    miningState.respawning = false;
    if (uiState.currentScreen === "mining") {
      $("#rock-target").classList.remove("is-breaking");
    }
    updateMiningUi(`${rock.name}이 다시 생성되었습니다.`);
    if (miningState.active) {
      gameState.monsters.forEach((monster) => {
        scheduleMonsterAttack(monster);
      });
    }
  }, 850);
}

function getMonsterRefundValue(species) {
  if (species.startsWith("0_")) return Math.round(400 * 0.7); // Cyclops family
  if (species.startsWith("2_")) return Math.round(500 * 0.7); // Unnyangi family
  if (species.startsWith("1_")) return Math.round(600 * 0.7); // Lovely Doll family
  return 0;
}

function incinerateMonster(index) {
  const monster = gameState.monsters[index];
  if (!monster) return;

  if (gameState.monsters.length <= 1) {
    showToast("최소 한 마리의 몬스터는 보유해야 합니다.", "error");
    const spot = miningState.monsterPositions[index];
    if (spot) {
      spot.left = "78%";
      spot.top = "78%";
      spot.isMoving = false;
      spot.isTargetingIncinerator = false;
      renderMining();
    }
    return;
  }

  if (monster.isIncinerating) return;
  monster.isIncinerating = true;

  const refund = getMonsterRefundValue(monster.species);

  // Clear attack timers immediately
  if (miningState.timers[monster.id]) {
    clearTimeout(miningState.timers[monster.id]);
    delete miningState.timers[monster.id];
  }

  // Play incinerate sound
  soundManager.play("break");

  // Refund gold immediately
  gameState.gold += refund;
  updateResourceDisplays();

  // Apply the CSS animation classes to the DOM element
  const spotElement = $(`#mining-spot-${index}`);
  if (spotElement) {
    spotElement.classList.add("is-fainted");
    const sprite = spotElement.querySelector(".monster-sprite");
    if (sprite) {
      sprite.style.animation = "monster-sprite-faint 1s steps(6) forwards, monster-fade-out 1s linear forwards";
    }
  }

  showToast(`${monster.name}이 소각되었습니다. +${refund} Gold`, "success");

  // Defer removal of data until animation finishes (1s)
  setTimeout(() => {
    const currIdx = gameState.monsters.findIndex(m => m.id === monster.id);
    if (currIdx === -1) return;

    if (gameState.miningMonsterId === monster.id) {
      gameState.miningMonsterId = gameState.monsters.find(m => m.id !== monster.id)?.id || null;
    }
    if (gameState.pvpMonsterId === monster.id) {
      gameState.pvpMonsterId = gameState.monsters.find(m => m.id !== monster.id)?.id || null;
    }
    if (uiState.pvpTeamIds) {
      uiState.pvpTeamIds = uiState.pvpTeamIds.filter(id => id !== monster.id);
    }
    if (uiState.selectedEvolutionMonsterId === monster.id) {
      uiState.selectedEvolutionMonsterId = gameState.monsters.find(m => m.id !== monster.id)?.id || null;
    }

    gameState.monsters.splice(currIdx, 1);
    if (miningState.monsterPositions) {
      miningState.monsterPositions.splice(currIdx, 1);
    }

    miningState.selectedMonsterIndex = null;

    saveGame();
    saveMiningPositions();
    renderMining();
  }, 1000);
}

// ---------------------------------------------------------------------------
// Monster management and shop
// ---------------------------------------------------------------------------

function renderMonsters() {
  $("#monster-list").innerHTML = gameState.monsters.map((monster) => {
    const definition = monsterDefinitions[monster.species];
    const isMining = monster.id === gameState.miningMonsterId;
    const isPvp = monster.id === gameState.pvpMonsterId;
    return `
      <article class="monster-management-card pixel-panel">
        <div class="monster-card-visual">${monsterSpriteMarkup(monster.species, monster.level)}</div>
        <div class="monster-card-copy">
          <h2>${monster.name}</h2>
          <span class="level-badge">LV${monster.level} / ${definition.role}</span>
          ${statsMarkup(monster)}
        </div>
        <div class="monster-card-actions">
          ${isMining ? '<span class="selection-badge">MINING ACTIVE</span>' : ""}
          ${isPvp ? '<span class="selection-badge">PVP ACTIVE</span>' : ""}
          <button class="primary-button" data-select-mining="${monster.id}" ${isMining ? "disabled" : ""}>Use for Mining</button>
          <button class="secondary-button" data-select-pvp="${monster.id}" ${isPvp ? "disabled" : ""}>Use for PVP</button>
        </div>
      </article>
    `;
  }).join("");
}

function selectMiningMonster(monsterId) {
  const monster = getMonsterById(monsterId);
  if (!monster) {
    return;
  }
  gameState.miningMonsterId = monster.id;
  stopMining();
  saveGame();
  renderScreen(uiState.currentScreen);
  showToast(`${monster.name}을 채굴 파트너로 선택했습니다.`, "success");
}

function selectPvpMonster(monsterId) {
  const monster = getMonsterById(monsterId);
  if (!monster) {
    return;
  }
  gameState.pvpMonsterId = monster.id;
  saveGame();
  renderScreen(uiState.currentScreen);
  showToast(`${monster.name}을 PVP 파트너로 선택했습니다.`, "success");
}

function renderShop() {
  updateResourceDisplays();

  const grid = $("#shop-products-grid");
  if (!grid) return;

  // 1. Evo Stone Card (Removed)
  let html = ``;

  // 2. 3 Monster Cards to buy
  const monstersToBuy = [
    { species: "0_1_cyclopse", price: 400 },
    { species: "2_1_unnyangi", price: 500 },
    { species: "1_1_lovelydoll", price: 600 }
  ];

  monstersToBuy.forEach((item) => {
    const definition = monsterDefinitions[item.species];
    html += `
      <div class="pixel-panel product-card monster-product">
        <div class="product-sprite-stage">
          ${monsterSpriteMarkup(item.species, 1)}
        </div>
        <div class="product-copy">
          <p class="eyebrow">PARTNER</p>
          <h2>${definition.name}</h2>
          <p>${definition.role} - ${definition.description}</p>
          <div class="price-tag"><span>PRICE</span><strong>${item.price} Gold</strong></div>
          <div class="product-actions">
            <button class="primary-button wide-button" data-buy-monster="${item.species}">Adopt ${definition.name}</button>
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

function buyMonster(species) {
  const definition = monsterDefinitions[species];
  if (!definition) return;

  const price = species === "0_1_cyclopse" ? 400 : species === "1_1_lovelydoll" ? 600 : 500;

  if (gameState.gold < price) {
    showToast(`Gold가 부족합니다. ${price.toLocaleString()} Gold가 필요합니다.`, "error");
    return;
  }

  gameState.gold -= price;
  soundManager.play("buy");
  const newMonster = createMonster(species);
  gameState.monsters.push(newMonster);
  if (miningState.active) {
    scheduleMonsterAttack(newMonster);
  }
  saveGame();
  updateResourceDisplays();
  renderShop();
  showToast(`${definition.name}을(를) 영입했습니다!`, "success");
}

function buyEvolutionStones(quantity) {
  const amount = Math.max(1, Number(quantity) || 1);
  const price = amount * EVO_STONE_PRICE;

  if (gameState.gold < price) {
    showToast(`Gold가 부족합니다. ${price.toLocaleString()} Gold가 필요합니다.`, "error");
    return;
  }

  gameState.gold -= price;
  soundManager.play("buy");
  spawnResourceParticles("evoStone", amount, document.activeElement || document.body);
  gameState.evoStones += amount;
  saveGame();
  updateResourceDisplays();
  showToast(`Evolution Stone ${amount}개를 구매했습니다.`, "success");
}

// ---------------------------------------------------------------------------
// Evolution
// ---------------------------------------------------------------------------

function renderEvolution() {
  if (!getMonsterById(uiState.selectedEvolutionMonsterId)) {
    uiState.selectedEvolutionMonsterId = gameState.monsters[0]?.id || null;
  }

  $("#evolution-monster-list").innerHTML = gameState.monsters.map((monster) => {
    const action = getUpgradeAction(monster);
    let label = "";
    if (action.type === "levelUp") {
      label = `LV Up (${Math.round(action.chance * 100)}%)`;
    } else {
      label = "MAX";
    }
    return `
      <button class="evolution-list-button ${monster.id === uiState.selectedEvolutionMonsterId ? "active" : ""}" data-select-evolution="${monster.id}">
        ${monsterSpriteMarkup(monster.species, monster.level)}
        <span><strong>${monster.name}</strong>LV${monster.level} / ${label}</span>
      </button>
    `;
  }).join("");

  const monster = getMonsterById(uiState.selectedEvolutionMonsterId);
  if (!monster) {
    $("#evolution-sprite").innerHTML = "";
    $("#evolution-details").innerHTML = "<p>보유 몬스터가 없습니다.</p>";
    $("#evolve-button").disabled = true;
    return;
  }

  $("#evolution-sprite").innerHTML = monsterSpriteMarkup(monster.species, monster.level);
  $("#evolution-result").textContent = uiState.evolutionResult || "재료를 확인한 뒤 성장을 시도하세요.";

  const action = getUpgradeAction(monster);
  if (action.type === "levelUp") {
    const nextLevel = monster.level + 1;
    const prefix = getMonsterFamilyPrefix(monster.species);
    const nextSpecies = getSpeciesForLevel(prefix, nextLevel);
    
    let evolutionNotice = "";
    let nextStats;
    
    if (nextSpecies && nextSpecies !== monster.species) {
      const nextDef = monsterDefinitions[nextSpecies];
      nextStats = getMonsterStats(nextSpecies, nextLevel);
      evolutionNotice = `<p style="color: #ffa726; font-weight: bold; animation: pulse 1s infinite alternate;">★ 레벨업 성공 시, 즉시 [${nextDef.name}] (Stage ${getMonsterStage(nextSpecies)})으로 자동 진화합니다! ★</p>`;
    } else {
      nextStats = getMonsterStats(monster.species, nextLevel);
    }
    
    $("#evolution-details").innerHTML = `
      <h2>${monster.name} / LV${monster.level} → LV${nextLevel}</h2>
      <div class="evolution-costs">
        <div>SUCCESS<strong>${Math.round(action.chance * 100)}%</strong></div>
        <div>GOLD<strong>${action.gold.toLocaleString()} required</strong></div>
        <div>CRYSTAL<strong>${action.crystal} required</strong></div>
      </div>
      ${evolutionNotice}
      <p>성공 시 ATK ${monster.stats.attack} → ${nextStats.attack}, HP ${monster.stats.maxHp} → ${nextStats.maxHp}, SKILL ${monster.stats.skillDamage} → ${nextStats.skillDamage}</p>
    `;
    $("#evolve-button").disabled = false;
    $("#evolve-button").textContent = "Attempt Level Up";
  } else {
    $("#evolution-details").innerHTML = `
      <h2>${monster.name} / MAX</h2>
      <p>이 몬스터는 최종 진화 단계 및 레벨에 도달했습니다.</p>
      ${statsMarkup(monster)}
    `;
    $("#evolve-button").disabled = true;
    $("#evolve-button").textContent = "MAX LEVEL & TIER";
  }
}

function selectEvolutionMonster(monsterId) {
  if (!getMonsterById(monsterId)) {
    return;
  }
  uiState.selectedEvolutionMonsterId = monsterId;
  uiState.evolutionResult = "";
  renderEvolution();
}

function attemptEvolution() {
  const monster = getMonsterById(uiState.selectedEvolutionMonsterId);
  if (!monster) return;

  const action = getUpgradeAction(monster);
  if (action.type === "max") {
    return;
  }

  if (gameState.gold < action.gold || gameState.crystal < action.crystal) {
    uiState.evolutionResult = `재료 부족: Gold ${action.gold.toLocaleString()}개와 Crystal ${action.crystal.toLocaleString()}개가 필요합니다.`;
    renderEvolution();
    animateEvolutionResult(false);
    showToast("레벨업 재료가 부족합니다.", "error");
    return;
  }

  gameState.gold -= action.gold;
  gameState.crystal -= action.crystal;
  const succeeded = Math.random() < action.chance;

  if (succeeded) {
    monster.level += 1;
    const prefix = getMonsterFamilyPrefix(monster.species);
    const nextSpecies = getSpeciesForLevel(prefix, monster.level);
    
    let evolved = false;
    if (nextSpecies && nextSpecies !== monster.species) {
      monster.species = nextSpecies;
      monster.name = monsterDefinitions[nextSpecies].name;
      evolved = true;
    }
    
    monster.stats = getMonsterStats(monster.species, monster.level);
    
    if (evolved) {
      uiState.evolutionResult = `SUCCESS! ${monster.name}(으)로 진화하면서 LV${monster.level}이 되었습니다!`;
    } else {
      uiState.evolutionResult = `SUCCESS! ${monster.name}이 LV${monster.level}(으)로 레벨업했습니다.`;
    }
  } else {
    uiState.evolutionResult = `FAILED. ${monster.name}의 레벨업에 실패했습니다.`;
  }

  saveGame();
  updateResourceDisplays();
  renderEvolution();
  animateEvolutionResult(succeeded);
  showToast(uiState.evolutionResult, succeeded ? "success" : "error");
}

function animateEvolutionResult(succeeded) {
  soundManager.play("charge");
  
  const chamber = $("#evolution-chamber");
  chamber.classList.remove("evolution-success", "evolution-fail");
  void chamber.offsetWidth;
  chamber.classList.add(succeeded ? "evolution-success" : "evolution-fail");
  
  setTimeout(() => {
    if (succeeded) {
      soundManager.play("success");
    } else {
      soundManager.play("fail");
    }
  }, 800);

  setTimeout(() => chamber.classList.remove("evolution-success", "evolution-fail"), 1000);
}

// ---------------------------------------------------------------------------
// Canvas PVP test mode
// ---------------------------------------------------------------------------

function togglePvpTeamMember(monsterId) {
  if (!uiState.pvpTeamIds) {
    uiState.pvpTeamIds = [];
  }
  const index = uiState.pvpTeamIds.indexOf(monsterId);
  if (index >= 0) {
    uiState.pvpTeamIds.splice(index, 1);
  } else {
    if (uiState.pvpTeamIds.length < 3) {
      uiState.pvpTeamIds.push(monsterId);
    }
  }
  renderPvpSetup();
}

function renderPvpSetup() {
  $("#pvp-setup").classList.remove("is-hidden");
  $("#pvp-battle").classList.add("is-hidden");

  if (!gameState.monsters || gameState.monsters.length === 0) {
    $("#pvp-monster-card").innerHTML = "<p>보유한 몬스터가 없습니다. 상점에서 영입하세요.</p>";
    $("#start-pvp-button").disabled = true;
    return;
  }

  // Initialize selected PVP team array if not exists
  if (!uiState.pvpTeamIds) {
    uiState.pvpTeamIds = [];
    const activePvpId = gameState.pvpMonsterId || gameState.monsters[0]?.id;
    if (activePvpId) {
      uiState.pvpTeamIds.push(activePvpId);
    }
  }

  // Render the team selection grid
  let html = `
    <div class="pvp-team-builder">
      <h3>Select Team Members (Max 3)</h3>
      <div class="pvp-team-slots">
  `;

  // Render 3 slots
  for (let i = 0; i < 3; i++) {
    const selectedId = uiState.pvpTeamIds[i];
    const monster = selectedId ? getMonsterById(selectedId) : null;
    if (monster) {
      html += `
        <div class="pvp-team-slot active" data-slot="${i}">
          ${monsterSpriteMarkup(monster.species, monster.level)}
          <span class="slot-name">${monster.name} LV${monster.level}</span>
          <button class="remove-slot-btn" data-remove-id="${monster.id}">×</button>
        </div>
      `;
    } else {
      html += `
        <div class="pvp-team-slot empty" data-slot="${i}">
          <span class="slot-plus">+</span>
          <span class="slot-label">Empty Slot</span>
        </div>
      `;
    }
  }

  html += `
      </div>
      <div class="pixel-divider"></div>
      <h3>Your Monsters</h3>
      <div class="pvp-roster-list">
  `;

  // Render roster list
  gameState.monsters.forEach((monster) => {
    const isSelected = uiState.pvpTeamIds.includes(monster.id);
    const definition = monsterDefinitions[monster.species];
    const isMaxReached = uiState.pvpTeamIds.length >= 3;
    const isDisabled = !isSelected && isMaxReached;

    html += `
      <div class="pvp-roster-card pixel-panel ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}">
        <div class="roster-visual">${monsterSpriteMarkup(monster.species, monster.level)}</div>
        <div class="roster-info">
          <strong>${monster.name}</strong>
          <span class="muted">LV${monster.level} / ${definition.role}</span>
        </div>
        <button class="roster-select-btn primary-button" 
                data-toggle-id="${monster.id}" 
                ${isDisabled ? "disabled" : ""}>
          ${isSelected ? "Remove" : "Select"}
        </button>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  $("#pvp-monster-card").innerHTML = html;

  // Validate "Enter Arena" button
  const hasMembers = uiState.pvpTeamIds.length >= 1;
  $("#start-pvp-button").disabled = !hasMembers;
}

function startPvp() {
  if (pvpState.active) return;
  if (!uiState.pvpTeamIds || uiState.pvpTeamIds.length === 0) {
    const activePvpId = gameState.pvpMonsterId || gameState.monsters[0]?.id;
    uiState.pvpTeamIds = activePvpId ? [activePvpId] : [];
  }
  
  if (uiState.pvpTeamIds.length === 0) return;

  soundManager.play("bgm_battle");
  
  pvpState.active = true;
  pvpState.over = false;
  pvpState.lastTime = performance.now();
  pvpState.elapsed = 0;
  pvpState.projectiles = [];
  pvpState.particles = [];
  pvpState.floaters = [];
  pvpState.keys.clear();
  pvpState.lastBasic = -Infinity;
  pvpState.lastSkill = -Infinity;
  pvpState.aiLastShot = -Infinity;

  // Initialize playerTeam in triangle layout
  let playerYPositions = [240];
  if (uiState.pvpTeamIds.length === 2) {
    playerYPositions = [190, 290];
  } else if (uiState.pvpTeamIds.length === 3) {
    playerYPositions = [140, 240, 340];
  }
  pvpState.playerTeam = uiState.pvpTeamIds.map((id, index) => {
    const m = getMonsterById(id);
    const def = monsterDefinitions[m.species];
    return {
      id: m.id,
      side: "player",
      species: m.species,
      name: m.name,
      level: m.level,
      x: 130 - (index % 2) * 35,
      y: playerYPositions[index],
      radius: 22,
      moveSpeed: def.moveSpeed * 0.9,
      hp: m.stats.maxHp,
      maxHp: m.stats.maxHp,
      defense: m.stats.defense,
      attack: m.stats.attack,
      attackSpeed: m.stats.attackSpeed,
      skillDamage: m.stats.skillDamage,
      skillCooldown: m.stats.skillCooldown,
      projectileSpeed: m.stats.projectileSpeed,
      facing: 1,
      moving: false,
      fainted: false,
      lastBasicAttackTime: Math.random() * -500,
      lastSkillAttackTime: Math.random() * -1000,
      animationState: "idle",
      animationStarted: 0,
      animationDuration: 0,
      animationUntil: 0,
      targetStrategy: ["closest", "weakest", "random"][index % 3],
      angleOffset: ((index % 3) - 1) * 0.45,
      dashTimeRemaining: 0,
      lastDashTime: -Infinity,
      dashVx: 0,
      dashVy: 0,
      afterimages: []
    };
  });

  // Calculate average level of player team to scale enemies
  let totalLevel = 0;
  pvpState.playerTeam.forEach(actor => totalLevel += actor.level);
  const avgLevel = Math.max(1, Math.round(totalLevel / pvpState.playerTeam.length));
  
  // Initialize enemyTeam (2_1_unnyangi, 0_1_cyclopse, 1_1_lovelydoll)
  const enemyYPositions = [140, 240, 340];
  const enemySpecies = ["2_1_unnyangi", "0_1_cyclopse", "1_1_lovelydoll"];
  pvpState.enemyTeam = enemySpecies.map((species, index) => {
    const stats = getMonsterStats(species, avgLevel);
    const def = monsterDefinitions[species];
    return {
      id: "enemy-" + index,
      side: "enemy",
      species: species,
      name: "Dummy " + def.name,
      level: avgLevel,
      x: 670 + (index % 2) * 35,
      y: enemyYPositions[index],
      radius: 22,
      moveSpeed: (def.moveSpeed || 110) * 0.9,
      hp: stats.maxHp,
      maxHp: stats.maxHp,
      defense: stats.defense,
      attack: stats.attack,
      attackSpeed: stats.attackSpeed,
      skillDamage: stats.skillDamage,
      skillCooldown: stats.skillCooldown,
      projectileSpeed: stats.projectileSpeed || 320,
      facing: -1,
      moving: false,
      fainted: false,
      lastBasicAttackTime: Math.random() * -500,
      lastSkillAttackTime: Math.random() * -1000,
      animationState: "idle",
      animationStarted: 0,
      animationDuration: 0,
      animationUntil: 0,
      targetStrategy: ["closest", "weakest", "random"][index % 3],
      angleOffset: ((index % 3) - 1) * 0.45,
      dashTimeRemaining: 0,
      lastDashTime: -Infinity,
      dashVx: 0,
      dashVy: 0,
      afterimages: []
    };
  });

  $("#pvp-setup").classList.add("is-hidden");
  $("#pvp-battle").classList.remove("is-hidden");
  $("#battle-result-overlay").classList.add("is-hidden");
  $("#battle-player-name").textContent = "Player Team";
  $("#battle-ai-name").textContent = "AI Team";
  $("#battle-skill-name").textContent = "AUTO COMBAT";
  updateBattleHud();
  pvpState.rafId = requestAnimationFrame(pvpFrame);
}

function stopPvp() {
  if (pvpState.rafId) {
    cancelAnimationFrame(pvpState.rafId);
  }
  pvpState.active = false;
  pvpState.over = false;
  pvpState.rafId = null;
  pvpState.keys.clear();
  $("#battle-result-overlay").classList.add("is-hidden");
}

function exitPvp() {
  stopPvp();
  showScreen("mining");
}

function pvpFrame(timestamp) {
  if (!pvpState.active) {
    return;
  }

  const dt = Math.min(0.035, (timestamp - pvpState.lastTime) / 1000 || 0);
  pvpState.lastTime = timestamp;
  pvpState.elapsed += dt * 1000;
  updatePvp(dt);
  drawPvp();
  updateBattleHud();
  pvpState.rafId = requestAnimationFrame(pvpFrame);
}

function updatePvp(dt) {
  if (pvpState.shakeTime > 0) {
    pvpState.shakeTime -= dt;
  }
  if (!pvpState.over) {
    updateAutomatedBattle(dt);
    updateProjectiles(dt);
  }
  updatePvpEffects(dt);
}

function updateAutomatedBattle(dt) {
  const allActors = [...pvpState.playerTeam, ...pvpState.enemyTeam];
  
  allActors.forEach((actor) => {
    if (actor.fainted) return;
    
    // Find target based on individual targetStrategy
    const enemies = actor.side === "player" ? pvpState.enemyTeam : pvpState.playerTeam;
    const livingEnemies = enemies.filter(enemy => !enemy.fainted);
    let targetEnemy = null;
    let minDist = Infinity;
    
    if (livingEnemies.length > 0) {
      if (actor.targetStrategy === "weakest") {
        // Target weakest (lowest HP)
        let minHp = Infinity;
        livingEnemies.forEach((enemy) => {
          if (enemy.hp < minHp) {
            minHp = enemy.hp;
            targetEnemy = enemy;
          }
        });
      } else if (actor.targetStrategy === "random") {
        // Deterministic target offset using seed to distribute focus
        const idx = (actor.id.charCodeAt(actor.id.length - 1) || 0) % livingEnemies.length;
        targetEnemy = livingEnemies[idx];
      } else {
        // Default: closest
        livingEnemies.forEach((enemy) => {
          const d = Math.hypot(enemy.x - actor.x, enemy.y - actor.y);
          if (d < minDist) {
            minDist = d;
            targetEnemy = enemy;
          }
        });
      }
    }
    
    if (!targetEnemy) {
      if (livingEnemies.length > 0) {
        targetEnemy = livingEnemies[0];
      } else {
        actor.moving = false;
        return;
      }
    }
    
    // Recalculate distance to current target
    minDist = Math.hypot(targetEnemy.x - actor.x, targetEnemy.y - actor.y);
    
    // Check if dash cooldown is active and if a projectile is close (within 60px) and approaching
    if (actor.dashTimeRemaining <= 0 && pvpState.elapsed - actor.lastDashTime >= 4000) {
      let closeProj = null;
      let minDistToProj = Infinity;
      
      pvpState.projectiles.forEach((proj) => {
        if (proj.owner === actor.side) return;
        const dist = Math.hypot(actor.x - proj.x, actor.y - proj.y);
        if (dist < 60 && dist < minDistToProj) {
          const px = actor.x - proj.x;
          const py = actor.y - proj.y;
          const dot = proj.vx * px + proj.vy * py;
          if (dot > 0) { // approaching
            minDistToProj = dist;
            closeProj = proj;
          }
        }
      });
      
      if (closeProj) {
        // Trigger Dash!
        const pSpeed = Math.hypot(closeProj.vx, closeProj.vy) || 1;
        const dxPerp = -closeProj.vy / pSpeed;
        const dyPerp = closeProj.vx / pSpeed;
        
        // Choose perpendicular direction pointing towards center of arena
        const centerDx = 400 - actor.x;
        const centerDy = 240 - actor.y;
        const sign = (dxPerp * centerDx + dyPerp * centerDy) >= 0 ? 1 : -1;
        
        actor.dashTimeRemaining = 0.15; // 150ms dash duration
        actor.lastDashTime = pvpState.elapsed;
        actor.dashVx = dxPerp * sign * actor.moveSpeed * 2.5;
        actor.dashVy = dyPerp * sign * actor.moveSpeed * 2.5;
        actor.afterimages = [];
        
        // Play swoosh sound (shoot SFX)
        soundManager.play("shoot");
      }
    }
    
    // Handle movement depending on whether actor is currently dashing
    if (actor.dashTimeRemaining > 0) {
      // Dash movement
      actor.afterimages.push({ x: actor.x, y: actor.y, facing: actor.facing });
      if (actor.afterimages.length > 2) {
        actor.afterimages.shift();
      }
      
      actor.moving = true;
      actor.x += actor.dashVx * dt;
      actor.y += actor.dashVy * dt;
      actor.dashTimeRemaining -= dt;
      
      // Face towards target even when dashing
      actor.facing = (targetEnemy.x - actor.x) >= 0 ? 1 : -1;
      clampActor(actor);
    } else {
      // Normal movement AI
      actor.afterimages = [];
      
      const dx = targetEnemy.x - actor.x;
      const dy = targetEnemy.y - actor.y;
      
      // Offset base direction by individual angle offset to spread out approach angles
      const baseAngle = Math.atan2(dy, dx);
      const angle = baseAngle + (actor.angleOffset || 0);
      
      const orbitAngle = angle + Math.PI / 2;
      const orbitX = Math.cos(orbitAngle);
      const orbitY = Math.sin(orbitAngle);
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);
      
      // 1. Role-based movement vector (baseX, baseY)
      let baseX = 0;
      let baseY = 0;
      
      if (minDist < 180) {
        // All monsters backpedal when target is within 180px (Comfort Zone)
        baseX = -dirX;
        baseY = -dirY;
      } else {
        if (actor.species === "0_1_cyclopse") {
          // Cyclopse (Ranged): Comfort Zone 250px - 320px
          if (minDist > 320) {
            baseX = dirX;
            baseY = dirY;
          } else if (minDist < 250) {
            baseX = -dirX;
            baseY = -dirY;
          } else {
            baseX = orbitX * 0.7;
            baseY = orbitY * 0.7;
          }
        } else if (actor.species === "1_1_lovelydoll") {
          // Lovelydoll (Tanker): Comfort Zone 180px - 220px
          if (minDist > 220) {
            baseX = dirX;
            baseY = dirY;
          } else {
            baseX = orbitX * 0.5;
            baseY = orbitY * 0.5;
          }
        } else {
          // Unnyangi / Others: Comfort Zone 210px - 270px
          if (minDist > 270) {
            baseX = dirX;
            baseY = dirY;
          } else if (minDist < 210) {
            baseX = -dirX;
            baseY = -dirY;
          } else {
            baseX = orbitX * 0.8;
            baseY = orbitY * 0.8;
          }
        }
      }
      
      // 2. Evasion AI: evade incoming hostile projectiles (sensing range: 100px)
      let evadeX = 0;
      let evadeY = 0;
      
      pvpState.projectiles.forEach((proj) => {
        if (proj.owner === actor.side) return; // skip friendly
        
        const px = actor.x - proj.x;
        const py = actor.y - proj.y;
        const pDist = Math.hypot(px, py);
        
        if (pDist < 100) {
          const dot = proj.vx * px + proj.vy * py;
          if (dot > 0) { // approaching
            const pSpeed = Math.hypot(proj.vx, proj.vy) || 1;
            const perpX = -proj.vy / pSpeed;
            const perpY = proj.vx / pSpeed;
            
            // Dodge towards center of the arena to avoid boundaries
            const centerDx = 400 - actor.x;
            const centerDy = 240 - actor.y;
            const sign = (perpX * centerDx + perpY * centerDy) >= 0 ? 1 : -1;
            
            const weight = (100 - pDist) / 100;
            evadeX += perpX * sign * weight * 1.5;
            evadeY += perpY * sign * weight * 1.5;
          }
        }
      });
      
      // 3. Random Weaving: micro noise to break locking orbits
      const noiseFreqX = 3.5;
      const noiseFreqY = 2.8;
      const actorSeed = (actor.id.charCodeAt(actor.id.length - 2) || 0) + 1;
      const noiseX = Math.sin((pvpState.elapsed / 1000) * noiseFreqX + actorSeed) * 0.25;
      const noiseY = Math.cos((pvpState.elapsed / 1000) * noiseFreqY + actorSeed) * 0.25;
      
      const totalX = baseX + evadeX + noiseX;
      const totalY = baseY + evadeY + noiseY;
      
      const moveLen = Math.hypot(totalX, totalY);
      if (moveLen > 0.05) {
        actor.moving = true;
        actor.x += (totalX / moveLen) * actor.moveSpeed * dt;
        actor.y += (totalY / moveLen) * actor.moveSpeed * dt;
      } else {
        actor.moving = false;
      }
      
      actor.facing = (targetEnemy.x - actor.x) >= 0 ? 1 : -1;
      clampActor(actor);
    }
    
    // Auto Attack AI
    // Basic attack
    const basicCd = 1000 / actor.attackSpeed;
    if (pvpState.elapsed - actor.lastBasicAttackTime >= basicCd && minDist <= 320) {
      actor.lastBasicAttackTime = pvpState.elapsed;
      fireProjectile(actor, targetEnemy.x, targetEnemy.y, false, actor.side);
      if (actor.side === "player") {
        soundManager.play("shoot");
      }
    }
    
    // Skill attack
    const skillCd = actor.skillCooldown * 1000;
    if (pvpState.elapsed - actor.lastSkillAttackTime >= skillCd && minDist <= 360) {
      actor.lastSkillAttackTime = pvpState.elapsed;
      fireProjectile(actor, targetEnemy.x, targetEnemy.y, true, actor.side);
      if (actor.side === "player") {
        soundManager.play("skill");
      }
    }
  });
  
  // Resolve circle collisions between all pairs of living actors
  for (let i = 0; i < allActors.length; i++) {
    const a1 = allActors[i];
    if (a1.fainted) continue;
    
    for (let j = i + 1; j < allActors.length; j++) {
      const a2 = allActors[j];
      if (a2.fainted) continue;
      
      const dx = a2.x - a1.x;
      const dy = a2.y - a1.y;
      const dist = Math.hypot(dx, dy);
      const minDistBetween = a1.radius + a2.radius;
      
      if (dist < minDistBetween) {
        const overlap = minDistBetween - dist;
        const pushX = (dist > 0 ? dx / dist : 1) * (overlap / 2);
        const pushY = (dist > 0 ? dy / dist : 0) * (overlap / 2);
        
        a1.x -= pushX;
        a1.y -= pushY;
        a2.x += pushX;
        a2.y += pushY;
        
        clampActor(a1);
        clampActor(a2);
      }
    }
  }
}

function updateProjectiles(dt) {
  for (let index = pvpState.projectiles.length - 1; index >= 0; index -= 1) {
    const projectile = pvpState.projectiles[index];
    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;
    projectile.life -= dt;

    const targets = projectile.owner === "player" ? pvpState.enemyTeam : pvpState.playerTeam;
    let hit = false;
    for (let tIdx = 0; tIdx < targets.length; tIdx++) {
      const target = targets[tIdx];
      if (target.fainted) continue;
      
      if (Math.hypot(projectile.x - target.x, projectile.y - target.y) <= projectile.radius + target.radius) {
        const isCrit = damageActor(target, projectile.damage, projectile.owner);
        spawnHitEffect(projectile.x, projectile.y, projectile.color, isCrit);
        pvpState.projectiles.splice(index, 1);
        hit = true;
        break;
      }
    }
    
    if (hit) continue;

    if (projectile.life <= 0 || projectile.x < 20 || projectile.x > 780 || projectile.y < 20 || projectile.y > 460) {
      pvpState.projectiles.splice(index, 1);
    }
  }
}

function updatePvpEffects(dt) {
  pvpState.particles.forEach((particle) => {
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.life -= dt;
  });
  pvpState.floaters.forEach((floater) => {
    floater.y -= 34 * dt;
    floater.life -= dt;
  });
  pvpState.particles = pvpState.particles.filter((particle) => particle.life > 0);
  pvpState.floaters = pvpState.floaters.filter((floater) => floater.life > 0);
}

function fireProjectile(actor, targetX, targetY, isSkill, owner) {
  const dx = targetX - actor.x;
  const dy = targetY - actor.y;
  const length = Math.max(1, Math.hypot(dx, dy));
  const speed = isSkill ? actor.projectileSpeed * 0.9 : actor.projectileSpeed;
  const definition = monsterDefinitions[actor.species];

  actor.facing = dx >= 0 ? 1 : -1;
  triggerActorAnimation(actor, isSkill ? "skill" : "attack", isSkill ? 560 : 420);
  pvpState.projectiles.push({
    owner,
    isSkill,
    x: actor.x + (dx / length) * 18,
    y: actor.y + (dy / length) * 18,
    vx: (dx / length) * speed,
    vy: (dy / length) * speed,
    radius: isSkill ? 10 : 6,
    damage: isSkill ? actor.skillDamage : actor.attack,
    color: isSkill ? definition.colors.accent : definition.colors.light,
    life: 2.2
  });
}

function damageActor(actor, rawDamage, source) {
  const isCrit = Math.random() < 0.10;
  const multiplier = isCrit ? 1.5 : 1.0;
  const finalDamage = Math.max(1, Math.round((rawDamage * multiplier) - actor.defense));
  actor.hp = Math.max(0, actor.hp - finalDamage);

  if (isCrit) {
    soundManager.play("break"); // Heavier strike sound for critical hits
    pvpState.shakeTime = 0.20;  // 200ms screen shake duration in PVP
    pvpState.floaters.push({
      x: actor.x,
      y: actor.y - 35,
      text: `-${finalDamage}!`,
      color: "#ffaa00",
      isCrit: true,
      life: 0.85
    });
  } else {
    soundManager.play("hurt");
    pvpState.floaters.push({
      x: actor.x,
      y: actor.y - 30,
      text: `-${finalDamage}`,
      color: source === "player" ? "#fff4a3" : "#ffd1c2",
      isCrit: false,
      life: 0.75
    });
  }

  if (actor.hp <= 0) {
    actor.fainted = true;
    triggerActorAnimation(actor, "faint", 950);
    checkBattleEnd();
  } else {
    triggerActorAnimation(actor, "hit", 420);
  }
  
  return isCrit;
}

function checkBattleEnd() {
  const playerAlive = pvpState.playerTeam.some(actor => !actor.fainted);
  const enemyAlive = pvpState.enemyTeam.some(actor => !actor.fainted);

  if (!playerAlive && pvpState.active && !pvpState.over) {
    endBattle(false);
  } else if (!enemyAlive && pvpState.active && !pvpState.over) {
    endBattle(true);
  }
}

function triggerActorAnimation(actor, state, duration) {
  actor.animationState = state;
  actor.animationStarted = pvpState.elapsed;
  actor.animationDuration = duration;
  actor.animationUntil = pvpState.elapsed + duration;
}

function spawnHitEffect(x, y, color, isCrit) {
  const count = isCrit ? 16 : 8;
  for (let index = 0; index < count; index += 1) {
    const angle = (Math.PI * 2 * index) / count;
    const speed = isCrit ? 95 : 65;
    pvpState.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color,
      life: isCrit ? 0.45 : 0.35
    });
  }
}

function endBattle(victory) {
  if (pvpState.over) {
    return;
  }
  pvpState.over = true;
  soundManager.stopBgm();
  if (victory) {
    soundManager.play("victory");
  } else {
    soundManager.play("defeat");
  }

  $("#battle-result-title").textContent = victory ? "VICTORY" : "DEFEAT";
  $("#battle-result-copy").textContent = victory
    ? "적군 AI 팀을 모두 쓰러뜨렸습니다!"
    : "아군 팀이 모두 쓰러졌습니다. 다시 도전해 보세요.";
  $("#battle-result-overlay").classList.remove("is-hidden");
}

function clampActor(actor) {
  actor.x = Math.max(34, Math.min(766, actor.x));
  actor.y = Math.max(44, Math.min(446, actor.y));
}

function updateBattleHud() {
  if (!pvpState.playerTeam || !pvpState.enemyTeam) {
    return;
  }
  const playerAliveCount = pvpState.playerTeam.filter(a => !a.fainted).length;
  const playerTotal = pvpState.playerTeam.length;
  const playerHpSum = pvpState.playerTeam.reduce((sum, a) => sum + (a.fainted ? 0 : a.hp), 0);
  const playerMaxHpSum = pvpState.playerTeam.reduce((sum, a) => sum + a.maxHp, 0);

  const enemyAliveCount = pvpState.enemyTeam.filter(a => !a.fainted).length;
  const enemyTotal = pvpState.enemyTeam.length;
  const enemyHpSum = pvpState.enemyTeam.reduce((sum, a) => sum + (a.fainted ? 0 : a.hp), 0);
  const enemyMaxHpSum = pvpState.enemyTeam.reduce((sum, a) => sum + a.maxHp, 0);

  $("#battle-player-hp").textContent = `Alive: ${playerAliveCount}/${playerTotal} | HP ${Math.ceil(playerHpSum)} / ${playerMaxHpSum}`;
  $("#battle-ai-hp").textContent = `Alive: ${enemyAliveCount}/${enemyTotal} | HP ${Math.ceil(enemyHpSum)} / ${enemyMaxHpSum}`;
}

function drawPvp() {
  const canvas = $("#pvp-canvas");
  const context = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  // Resize canvas backing store to match DPR
  const targetWidth = 800 * dpr;
  const targetHeight = 480 * dpr;
  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }

  // Reset transform and scale to support High-DPI rendering
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.scale(dpr, dpr);

  context.imageSmoothingEnabled = true;
  context.webkitImageSmoothingEnabled = true;
  context.mozImageSmoothingEnabled = true;
  context.msImageSmoothingEnabled = true;

  context.save();
  // Apply viewport screen shake if active
  if (pvpState.shakeTime > 0) {
    const dx = (Math.random() - 0.5) * 8;
    const dy = (Math.random() - 0.5) * 8;
    context.translate(dx, dy);
  }

  drawArena(context);

  // Depth sort all living/faded actors. Fainted actors are drawn first (on the bottom),
  // then living actors, and each group is sorted by their Y position.
  const allActors = [...pvpState.playerTeam, ...pvpState.enemyTeam];
  allActors.sort((a, b) => {
    if (a.fainted !== b.fainted) {
      return a.fainted ? -1 : 1;
    }
    return a.y - b.y;
  });

  allActors.forEach((actor) => {
    drawActor(context, actor);
  });

  pvpState.projectiles.forEach((projectile) => drawPvpProjectile(context, projectile));
  pvpState.particles.forEach((particle) => {
    context.fillStyle = particle.color;
    context.fillRect(Math.round(particle.x) - 3, Math.round(particle.y) - 3, 6, 6);
  });
  pvpState.floaters.forEach((floater) => {
    context.fillStyle = floater.color;
    if (floater.isCrit) {
      context.font = "900 24px monospace";
      context.strokeStyle = "#000000";
      context.lineWidth = 4;
      context.strokeText(floater.text, Math.round(floater.x), Math.round(floater.y));
    } else {
      context.font = "bold 16px monospace";
    }
    context.textAlign = "center";
    context.fillText(floater.text, Math.round(floater.x), Math.round(floater.y));
  });

  context.restore();
}

function drawArena(context) {
  context.fillStyle = "#75ad68";
  context.fillRect(0, 0, 800, 480);

  for (let y = 24; y < 480; y += 32) {
    for (let x = 24; x < 800; x += 32) {
      context.fillStyle = (x / 32 + y / 32) % 2 === 0 ? "#80b872" : "#72a966";
      context.fillRect(x, y, 6, 6);
    }
  }

  context.fillStyle = "#27334a";
  context.fillRect(0, 0, 800, 18);
  context.fillRect(0, 462, 800, 18);
  context.fillRect(0, 0, 18, 480);
  context.fillRect(782, 0, 18, 480);
  context.fillStyle = "#d9c58f";
  for (let x = 22; x < 780; x += 32) {
    context.fillRect(x, 5, 20, 8);
    context.fillRect(x, 467, 20, 8);
  }
  for (let y = 22; y < 460; y += 32) {
    context.fillRect(5, y, 8, 20);
    context.fillRect(787, y, 8, 20);
  }

  context.strokeStyle = "rgba(255,255,255,0.22)";
  context.lineWidth = 4;
  context.setLineDash([12, 12]);
  context.strokeRect(86, 70, 628, 340);
  context.setLineDash([]);

  drawArenaStone(context, 88, 87);
  drawArenaStone(context, 706, 394);
  drawArenaStone(context, 92, 392);
  drawArenaStone(context, 708, 88);
}

function drawArenaStone(context, x, y) {
  context.fillStyle = "#46566a";
  context.fillRect(x - 12, y - 8, 24, 17);
  context.fillStyle = "#718092";
  context.fillRect(x - 8, y - 8, 13, 5);
  context.fillStyle = "#303d50";
  context.fillRect(x + 5, y - 2, 7, 11);
}

function drawActor(context, actor) {
  const definition = monsterDefinitions[actor.species];
  const x = Math.round(actor.x);
  const y = Math.round(actor.y);
  const spriteImage = monsterSpriteImages[actor.species];
  const spriteRenderSize = getMonsterSpriteRenderSize(actor.level);

  let opacity = 1.0;

  // Draw afterimage trails first if currently dashing
  if (actor.afterimages && actor.afterimages.length > 0) {
    actor.afterimages.forEach((img, idx) => {
      const trailAlpha = idx === 0 ? 0.2 : 0.4;
      context.save();
      context.globalAlpha = opacity * trailAlpha;
      
      const imgX = Math.round(img.x);
      const imgY = Math.round(img.y);
      
      const shadowWidth = Math.round(spriteRenderSize * 0.56);
      const shadowHeight = Math.round(spriteRenderSize * 0.1);
      context.fillStyle = "rgba(28,43,47,0.15)";
      context.fillRect(
        imgX - Math.round(shadowWidth / 2),
        imgY + Math.round(spriteRenderSize * 0.2),
        shadowWidth,
        shadowHeight
      );

      if (spriteImage?.complete && spriteImage.naturalWidth > 0) {
        context.save();
        context.translate(imgX, imgY);
        context.scale(img.facing < 0 ? -1 : 1, 1);
        
        let state = actor.moving ? "walk" : "idle";
        let frame = Math.floor(pvpState.elapsed / (state === "walk" ? 115 : 190)) % 6;
        if (actor.animationUntil > pvpState.elapsed || actor.hp <= 0) {
          state = actor.animationState;
          const progress = Math.max(0, Math.min(0.999, (pvpState.elapsed - actor.animationStarted) / Math.max(1, actor.animationDuration)));
          frame = actor.hp <= 0 && pvpState.elapsed >= actor.animationUntil ? 5 : Math.floor(progress * 6);
        }
        
        context.drawImage(
          spriteImage,
          frame * 96,
          spriteRows[state] * 96,
          96,
          96,
          -spriteRenderSize / 2,
          -spriteRenderSize * 0.7,
          spriteRenderSize,
          spriteRenderSize
        );
        context.restore();
      } else {
        drawFallbackActor(context, { ...actor, x: imgX, y: imgY, facing: img.facing }, definition, spriteRenderSize);
      }
      context.restore();
    });
  }

  context.save();
  context.globalAlpha = opacity;

  // Draw shadow
  const shadowWidth = Math.round(spriteRenderSize * 0.56);
  const shadowHeight = Math.round(spriteRenderSize * 0.1);
  context.fillStyle = "rgba(28,43,47,0.28)";
  context.fillRect(
    x - Math.round(shadowWidth / 2),
    y + Math.round(spriteRenderSize * 0.2),
    shadowWidth,
    shadowHeight
  );

  // Draw sprite
  if (spriteImage?.complete && spriteImage.naturalWidth > 0) {
    drawSpriteSheetActor(context, actor, spriteImage, spriteRenderSize);
  } else {
    drawFallbackActor(context, actor, definition, spriteRenderSize);
  }

  // Draw HP bar if not fainted
  if (!actor.fainted) {
    const hpTop = definition.spriteSheet ? y - Math.round(spriteRenderSize * 0.61) : y - 47;
    const hpPercent = Math.max(0, actor.hp / actor.maxHp);
    const isPlayer = actor.side === "player";
    
    context.fillStyle = "#172033";
    context.fillRect(x - 28, hpTop, 56, 8);
    context.fillStyle = isPlayer ? "#52c41a" : "#f5222d";
    context.fillRect(x - 26, hpTop + 2, Math.round(52 * hpPercent), 4);
    
    context.fillStyle = isPlayer ? "#85e085" : "#ff8080";
    context.font = "bold 9px monospace";
    context.textAlign = "center";
    context.fillText(actor.name, x, hpTop - 6);
  }

  context.restore();
}

function getMonsterSpriteRenderSize(level) {
  let scale = 1.0;
  if (level === 2) scale = 1.08;
  else if (level === 3) scale = 1.17;
  else if (level === 4) scale = 1.25;
  else if (level === 5) scale = 1.33;
  else if (level === 6) scale = 1.41;
  else if (level === 7) scale = 1.48;
  else if (level === 8) scale = 1.55;
  else if (level === 9) scale = 1.62;
  else if (level >= 10) scale = 1.70;
  return 64 * scale;
}

function drawSpriteSheetActor(context, actor, image, renderSize) {
  const frameSize = 96;
  let state = actor.moving ? "walk" : "idle";
  let frame = Math.floor(pvpState.elapsed / (state === "walk" ? 115 : 190)) % 6;

  if (actor.animationUntil > pvpState.elapsed || actor.hp <= 0) {
    state = actor.animationState;
    const progress = Math.max(0, Math.min(0.999, (pvpState.elapsed - actor.animationStarted) / Math.max(1, actor.animationDuration)));
    frame = actor.hp <= 0 && pvpState.elapsed >= actor.animationUntil ? 5 : Math.floor(progress * 6);
  }

  context.save();
  context.translate(Math.round(actor.x), Math.round(actor.y));
  context.scale(actor.facing < 0 ? -1 : 1, 1);
  context.drawImage(
    image,
    frame * frameSize,
    spriteRows[state] * frameSize,
    frameSize,
    frameSize,
    -renderSize / 2,
    -renderSize * 0.7,
    renderSize,
    renderSize
  );
  context.restore();
}

function drawFallbackActor(context, actor, definition, renderSize) {
  const x = Math.round(actor.x);
  const y = Math.round(actor.y);
  const scale = renderSize / 96;
  const sizeBonus = (actor.species === "1_1_lovelydoll" ? 4 : 0) * scale;

  context.fillStyle = definition.colors.dark;
  context.fillRect(
    x - Math.round((22 + sizeBonus) * scale),
    y - Math.round(18 * scale),
    Math.round((44 + sizeBonus * 2) * scale),
    Math.round(37 * scale)
  );
  context.fillStyle = definition.colors.main;
  context.fillRect(
    x - Math.round((18 + sizeBonus) * scale),
    y - Math.round(22 * scale),
    Math.round((36 + sizeBonus * 2) * scale),
    Math.round(36 * scale)
  );
  context.fillStyle = definition.colors.light;
  context.fillRect(
    x - Math.round((13 + sizeBonus) * scale),
    y - Math.round(18 * scale),
    Math.round(14 * scale),
    Math.round(7 * scale)
  );
  context.fillStyle = definition.colors.accent;
  context.fillRect(
    x - Math.round((17 + sizeBonus) * scale),
    y - Math.round(29 * scale),
    Math.round(9 * scale),
    Math.round(10 * scale)
  );
  context.fillRect(
    x + Math.round((8 + sizeBonus) * scale),
    y - Math.round(29 * scale),
    Math.round(9 * scale),
    Math.round(10 * scale)
  );
  context.fillStyle = definition.colors.dark;
  context.fillRect(
    x - Math.round((17 + sizeBonus) * scale),
    y + Math.round(13 * scale),
    Math.round(10 * scale),
    Math.round(10 * scale)
  );
  context.fillRect(
    x + Math.round((7 + sizeBonus) * scale),
    y + Math.round(13 * scale),
    Math.round(10 * scale),
    Math.round(10 * scale)
  );
  context.fillStyle = "#172033";
  context.fillRect(
    x - Math.round(10 * scale),
    y - Math.round(7 * scale),
    Math.round(5 * scale),
    Math.round(7 * scale)
  );
  context.fillRect(
    x + Math.round(6 * scale),
    y - Math.round(7 * scale),
    Math.round(5 * scale),
    Math.round(7 * scale)
  );
}

function drawPvpProjectile(context, projectile) {
  const x = Math.round(projectile.x);
  const y = Math.round(projectile.y);
  const size = projectile.isSkill ? 18 : 10;
  context.fillStyle = "#172033";
  context.fillRect(x - size / 2 - 2, y - size / 2 - 2, size + 4, size + 4);
  context.fillStyle = projectile.color;
  context.fillRect(x - size / 2, y - size / 2, size, size);
  context.fillStyle = "#ffffff";
  context.fillRect(x - size / 4, y - size / 4, Math.max(3, size / 3), Math.max(3, size / 3));
}

function updatePvpMouse(event) {
  const canvas = $("#pvp-canvas");
  const rect = canvas.getBoundingClientRect();
  pvpState.mouse.x = ((event.clientX - rect.left) / rect.width) * 800;
  pvpState.mouse.y = ((event.clientY - rect.top) / rect.height) * 480;
}

// ---------------------------------------------------------------------------
// General UI events and utilities
// ---------------------------------------------------------------------------

function bindEvents() {
  // Global button hovers (debounced by last element to avoid repeating sounds)
  let lastHoveredButton = null;
  document.addEventListener("mouseover", (event) => {
    const button = event.target.closest("button");
    if (button && !button.disabled) {
      if (button !== lastHoveredButton) {
        soundManager.play("hover");
        lastHoveredButton = button;
      }
    } else {
      lastHoveredButton = null;
    }
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || button.disabled) {
      return;
    }

    // Play click sound for all button clicks except the mute button itself
    if (button.id !== "mute-toggle-button") {
      soundManager.play("click");
    }

    if (button.dataset.screen) showScreen(button.dataset.screen);
    if (button.dataset.starter) selectStarter(button.dataset.starter);
    if (button.dataset.rockTier) selectRockTier(button.dataset.rockTier);
    if (button.dataset.buyStones) buyEvolutionStones(button.dataset.buyStones);
    if (button.dataset.selectMining) selectMiningMonster(button.dataset.selectMining);
    if (button.dataset.selectPvp) selectPvpMonster(button.dataset.selectPvp);
    if (button.dataset.selectEvolution) selectEvolutionMonster(button.dataset.selectEvolution);
    if (button.dataset.buyMonster) buyMonster(button.dataset.buyMonster);
    if (button.dataset.toggleId) togglePvpTeamMember(button.dataset.toggleId);
    if (button.dataset.removeId) togglePvpTeamMember(button.dataset.removeId);
  });

  // Mute button setup
  const muteBtn = $("#mute-toggle-button");
  if (muteBtn) {
    muteBtn.classList.toggle("muted", soundManager.muted);
    muteBtn.addEventListener("click", () => {
      const isMuted = soundManager.toggleMute();
      muteBtn.classList.toggle("muted", isMuted);
      // Play a click sound only if we just unmuted
      if (!isMuted) {
        soundManager.play("click");
      }
    });
  }

  $("#reset-save-button").addEventListener("click", resetSave);
  $("#rock-target").addEventListener("click", startMining);
  $("#mine-toggle-button").addEventListener("click", toggleMining);
  $("#evolve-button").addEventListener("click", attemptEvolution);
  $("#start-pvp-button").addEventListener("click", startPvp);
  $("#exit-pvp-button").addEventListener("click", exitPvp);
  $("#battle-return-button").addEventListener("click", exitPvp);

  const mineStage = $("#mine-stage");
  if (mineStage) {
    mineStage.addEventListener("contextmenu", (event) => {
      if (miningState.selectedMonsterIndex === null) return;
      event.preventDefault();

      const rect = mineStage.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      const clickedIncinerator = event.target.closest("#mine-incinerator");
      const incEl = $("#mine-incinerator");
      let targetIsIncinerator = clickedIncinerator ? true : false;

      if (!targetIsIncinerator && incEl) {
        const incRect = incEl.getBoundingClientRect();
        const ix0 = incRect.left - rect.left;
        const ix1 = incRect.right - rect.left;
        const iy0 = incRect.top - rect.top;
        const iy1 = incRect.bottom - rect.top;

        if (clickX >= ix0 && clickX <= ix1 && clickY >= iy0 && clickY <= iy1) {
          targetIsIncinerator = true;
        }
      }

      let leftPercent, topPercent;
      if (targetIsIncinerator && incEl) {
        const incRect = incEl.getBoundingClientRect();
        const incCenterX = (incRect.left + incRect.width / 2) - rect.left;
        const incCenterY = (incRect.top + incRect.height / 2) - rect.top;
        leftPercent = ((incCenterX / rect.width) * 100).toFixed(2) + "%";
        topPercent = ((incCenterY / rect.height) * 100).toFixed(2) + "%";
      } else {
        leftPercent = ((clickX / rect.width) * 100).toFixed(2) + "%";
        topPercent = ((clickY / rect.height) * 100).toFixed(2) + "%";
      }

      const idx = miningState.selectedMonsterIndex;
      if (miningState.monsterPositions && miningState.monsterPositions[idx]) {
        const spot = miningState.monsterPositions[idx];
        spot.targetLeft = leftPercent;
        spot.targetTop = topPercent;
        spot.isMoving = true;
        spot.isTargetingIncinerator = targetIsIncinerator;

        startMiningMovementLoop();
      }
    });

    mineStage.addEventListener("click", (event) => {
      const spot = event.target.closest(".mining-monster-spot");
      if (spot) {
        event.stopPropagation();
        const idx = parseInt(spot.id.replace("mining-spot-", ""));
        miningState.selectedMonsterIndex = (miningState.selectedMonsterIndex === idx) ? null : idx;
        renderMining();
      } else {
        const rock = event.target.closest("#rock-target");
        if (!rock && event.target.closest("#mine-stage")) {
          if (miningState.selectedMonsterIndex !== null) {
            miningState.selectedMonsterIndex = null;
            renderMining();
          }
        }
      }
    });
  }

  const canvas = $("#pvp-canvas");
  canvas.addEventListener("mousemove", updatePvpMouse);
  canvas.addEventListener("contextmenu", (event) => event.preventDefault());

  window.addEventListener("keydown", (event) => {
    if (!pvpState.active) {
      return;
    }
    const key = event.key.toLowerCase();
    if (key === "escape") {
      event.preventDefault();
      exitPvp();
      return;
    }
  });

  window.addEventListener("blur", () => {});
  window.addEventListener("beforeunload", saveGame);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showToast(message, type = "") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  $("#toast-container").appendChild(toast);
  setTimeout(() => toast.remove(), 3100);
}

function init() {
  preloadMonsterSpriteImages();
  renderStarterOptions();
  bindEvents();
  loadGame();
  syncDisplayResources();
  startResourceRollingLoop();

  if (gameState.started) {
    resetMiningRock(gameState.selectedRock);
    uiState.selectedEvolutionMonsterId = gameState.monsters[0]?.id || null;
    showGameUi();
    showScreen("mining");
  } else {
    showStarterScreen();
  }
}

init();

// Particle & sound helper functions
let lastLootSoundTime = 0;
function playLootSoundDebounced() {
  const now = performance.now();
  if (now - lastLootSoundTime >= 65) {
    soundManager.play("loot");
    lastLootSoundTime = now;
  }
}

function spawnResourceParticles(type, totalReward, startEl) {
  const targetKey = type === "evoStone" ? "evoStones" : type;
  
  if (document.hidden) {
    rollingTargetState[targetKey] = gameState[targetKey];
    return;
  }
  if (!startEl) return;
  
  // Decide particle count
  let particlesCount = Math.min(12, Math.max(3, totalReward));
  if (type === "gold") {
    particlesCount = Math.min(12, Math.max(3, Math.floor(totalReward / 3)));
  }
  
  // Calculate value split per particle
  const baseValue = Math.floor(totalReward / particlesCount);
  const remainder = totalReward % particlesCount;
  
  const startRect = startEl.getBoundingClientRect();
  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;
  
  let targetId = "gold-display";
  let emoji = "🪙";
  if (type === "crystal") {
    targetId = "crystal-display";
    emoji = "💎";
  } else if (type === "evoStone") {
    targetId = "evo-stone-display";
    emoji = "🔮";
  }
  
  const targetEl = document.getElementById(targetId);
  if (!targetEl) return;
  
  for (let i = 0; i < particlesCount; i++) {
    const particleValue = (i === particlesCount - 1) ? (baseValue + remainder) : baseValue;
    const particle = document.createElement("div");
    particle.className = "resource-particle";
    particle.textContent = emoji;
    
    let px = startX + (Math.random() - 0.5) * 32;
    let py = startY + (Math.random() - 0.5) * 32;
    
    particle.style.left = `${px}px`;
    particle.style.top = `${py}px`;
    document.body.appendChild(particle);
    
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
    const speed = 150 + Math.random() * 150;
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed;
    
    let state = "parabolic";
    let elapsed = 0;
    
    const tick = (now) => {
      if (!particle.parentNode) return;
      const dt = 0.016;
      elapsed += dt;
      
      const targetRect = targetEl.getBoundingClientRect();
      const tx = targetRect.left + targetRect.width / 2;
      const ty = targetRect.top + targetRect.height / 2;
      
      if (state === "parabolic") {
        vy += 420 * dt;
        px += vx * dt;
        py += vy * dt;
        
        particle.style.transform = `rotate(${elapsed * 400}deg)`;
        
        if (elapsed >= 0.35) {
          state = "magnet";
        }
      } else {
        const dx = tx - px;
        const dy = ty - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 12) {
          particle.remove();
          playLootSoundDebounced();
          rollingTargetState[targetKey] += particleValue;
          return;
        }
        
        const pullSpeed = 460 + (elapsed - 0.35) * 450;
        px += (dx / dist) * pullSpeed * dt;
        py += (dy / dist) * pullSpeed * dt;
        
        particle.style.transform = "";
      }
      
      particle.style.left = `${px}px`;
      particle.style.top = `${py}px`;
      
      requestAnimationFrame(tick);
    };
    
    requestAnimationFrame(tick);
  }
}

function spawnMiningDebris(startEl, rockType) {
  if (document.hidden) return;
  if (!startEl) return;
  const rect = startEl.getBoundingClientRect();
  const container = $("#mine-stage");
  if (!container) return;
  
  const containerRect = container.getBoundingClientRect();
  const startX = (rect.left + rect.width / 2) - containerRect.left;
  const startY = (rect.top + rect.height / 2) - containerRect.top;
  
  let colors = ["#8c8c8c", "#a6a6a6", "#595959"];
  if (rockType === "iron") {
    colors = ["#d38d58", "#8c583c", "#a06440", "#555b5c"];
  } else if (rockType === "crystal") {
    colors = ["#5eb9ce", "#a874d0", "#bcf5e7", "#35618c"];
  }
  
  const debrisCount = 4 + Math.floor(Math.random() * 4);
  
  for (let i = 0; i < debrisCount; i++) {
    const deb = document.createElement("span");
    deb.className = "mining-debris";
    deb.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    const sz = 3 + Math.floor(Math.random() * 4);
    deb.style.width = `${sz}px`;
    deb.style.height = `${sz}px`;
    
    let px = startX + (Math.random() - 0.5) * 20;
    let py = startY + (Math.random() - 0.5) * 20;
    
    deb.style.left = `${px}px`;
    deb.style.top = `${py}px`;
    
    container.appendChild(deb);
    
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
    const speed = 70 + Math.random() * 120;
    let vx = Math.cos(angle) * speed;
    let vy = Math.sin(angle) * speed;
    
    let elapsed = 0;
    const lifeTime = 0.45 + Math.random() * 0.25;
    
    const tick = (now) => {
      if (!deb.parentNode) return;
      const dt = 0.016;
      elapsed += dt;
      
      if (elapsed >= lifeTime) {
        deb.remove();
        return;
      }
      
      vy += 350 * dt;
      px += vx * dt;
      py += vy * dt;
      
      deb.style.left = `${px}px`;
      deb.style.top = `${py}px`;
      
      if (elapsed > lifeTime * 0.65) {
        const alpha = (lifeTime - elapsed) / (lifeTime * 0.35);
        deb.style.opacity = Math.max(0, alpha);
      }
      
      requestAnimationFrame(tick);
    };
    
    requestAnimationFrame(tick);
  }
}
