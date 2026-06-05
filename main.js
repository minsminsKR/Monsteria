"use strict";

// ---------------------------------------------------------------------------
// Monsteria data
// Add new monster definitions here. UI sprites can later be replaced with PNGs
// without changing the save or gameplay structures.
// ---------------------------------------------------------------------------

const SAVE_KEY = "monsteria-save-v1";
const EVO_STONE_PRICE = 120;

const monsterDefinitions = {
  cyclopse: {
    id: "cyclopse",
    name: "사이클롭스",
    role: "Rapid eye blaster",
    description: "빠른 황금빛 탄환과 강력한 외눈 광선을 사용하는 복슬복슬한 파트너.",
    skillName: "Cyclops Beam",
    skillCooldown: 1.8,
    projectileSpeed: 620,
    moveSpeed: 205,
    spriteSheet: "assets/monsters/cyclopse/cyclopse-spritesheet-game.png",
    colors: { main: "#e5a52f", light: "#fff0a3", dark: "#7b431b", accent: "#c667e3" },
    base: { attack: 8, attackSpeed: 1.55, maxHp: 72, defense: 2, skillDamage: 16 },
    growth: { attack: 4, attackSpeed: 0.13, maxHp: 22, defense: 2, skillDamage: 8 }
  },
  bruterock: {
    id: "bruterock",
    name: "Lovely Doll",
    role: "Heavy tear striker",
    description: "거대한 눈물 파도와 묵직한 한 방으로 전장을 휩쓰는 울보 인형.",
    skillName: "Tear Wave",
    skillCooldown: 4.6,
    projectileSpeed: 340,
    moveSpeed: 145,
    spriteSheet: "assets/monsters/bruterock/bruterock-spritesheet-game.png",
    colors: { main: "#d77c56", light: "#ffd39b", dark: "#7a3e38", accent: "#efe0aa" },
    base: { attack: 20, attackSpeed: 0.72, maxHp: 125, defense: 8, skillDamage: 38 },
    growth: { attack: 10, attackSpeed: 0.06, maxHp: 43, defense: 5, skillDamage: 18 }
  },
  balancer: {
    id: "balancer",
    name: "운냥이",
    role: "All-round cat",
    description: "재빠른 냥펀치와 보랏빛 에너지볼을 사용하는 유쾌한 고양이 파트너.",
    skillName: "Cat Energy Ball",
    skillCooldown: 3.1,
    projectileSpeed: 470,
    moveSpeed: 175,
    spriteSheet: "assets/monsters/balancer/balancer-spritesheet-game.png",
    colors: { main: "#72bd72", light: "#d8f2a8", dark: "#34704a", accent: "#bf88d6" },
    base: { attack: 13, attackSpeed: 1.05, maxHp: 95, defense: 5, skillDamage: 25 },
    growth: { attack: 7, attackSpeed: 0.09, maxHp: 32, defense: 3, skillDamage: 12 }
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

const evolutionRequirements = {
  1: { stones: 1, crystal: 4, chance: 0.7 },
  2: { stones: 2, crystal: 14, chance: 0.4 }
};

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
  if (miningMovementRaf) return;
  
  lastMiningMoveTime = performance.now();
  
  const tick = (now) => {
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
  player: null,
  ai: null,
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
  const migratedSpecies = savedMonster.species === "swiftling" ? "cyclopse" : savedMonster.species;
  const species = monsterDefinitions[migratedSpecies] ? migratedSpecies : "balancer";
  const level = Math.min(3, Math.max(1, Number(savedMonster.level) || 1));
  const savedStats = savedMonster.species === "swiftling" ? {} : (savedMonster.stats || {});
  return {
    id: savedMonster.id || `monster_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    species,
    name: monsterDefinitions[species].name,
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
  localStorage.removeItem(SAVE_KEY);
  gameState = createDefaultGameState();
  uiState.currentScreen = "starter";
  uiState.selectedEvolutionMonsterId = null;
  uiState.evolutionResult = "";
  resetMiningRock("stone");
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

  return `<div class="monster-sprite ${species} lv${level}${spriteSheetClass} ${extraClass}"${spriteSheetStyle} aria-hidden="true"></div>`;
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
  container.innerHTML = Object.values(monsterDefinitions).map((definition) => {
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

  if (screenName === "pvp" && miningState.active) {
    stopMining("PVP 테스트 입장으로 채굴이 일시 정지되었습니다.");
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
}

function renderScreen(screenName) {
  updateResourceDisplays();
  if (screenName === "mining") renderMining();
  if (screenName === "monsters") renderMonsters();
  if (screenName === "shop") renderShop();
  if (screenName === "evolution") renderEvolution();
  if (screenName === "pvp" && !pvpState.active) renderPvpSetup();
}

function updateResourceDisplays() {
  $("#gold-display").textContent = Math.floor(gameState.gold).toLocaleString();
  $("#crystal-display").textContent = Math.floor(gameState.crystal).toLocaleString();
  $("#evo-stone-display").textContent = Math.floor(gameState.evoStones).toLocaleString();

  $("#shop-gold").textContent = Math.floor(gameState.gold).toLocaleString();
  $("#shop-crystal").textContent = Math.floor(gameState.crystal).toLocaleString();
  $("#shop-stones").textContent = Math.floor(gameState.evoStones).toLocaleString();
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
          <div class="unit-nameplate" style="margin-top: 4px; padding: 2px 4px; font-size: 8px;">
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

  if (miningState.active) {
    return;
  }

  miningState.active = true;
  updateMiningUi("자동 채굴이 시작되었습니다.");
  
  clearMiningTimers();
  gameState.monsters.forEach((monster, index) => {
    scheduleMonsterAttack(monster, index);
  });
}

function stopMining(message) {
  miningState.active = false;
  clearMiningTimers();
  updateMiningUi(message);
}

function scheduleMonsterAttack(monster, index) {
  if (!miningState.active || miningState.respawning) return;
  const attackInterval = Math.round(1000 / monster.stats.attackSpeed);
  const initialDelay = index * 200; // stagger starting attacks slightly

  miningState.timers[index] = setTimeout(() => {
    runMonsterAttackLoop(monster, index);
  }, initialDelay);
}

function runMonsterAttackLoop(monster, index) {
  if (!miningState.active || miningState.respawning) return;

  const currentMonster = gameState.monsters[index];
  if (!currentMonster) return;

  const spot = (miningState.monsterPositions && miningState.monsterPositions[index]) || miningSpots[index % miningSpots.length];
  const spotElement = $(`#mining-spot-${index}`);

  if (spotElement) {
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
      applyMiningDamage(currentMonster.stats.attack);
    }
  }, 220);

  const attackInterval = Math.round(1000 / currentMonster.stats.attackSpeed);
  miningState.timers[index] = setTimeout(() => {
    runMonsterAttackLoop(monster, index);
  }, attackInterval);
}

function shootMiningProjectile(spotElement, spot) {
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
  miningState.hp = Math.max(0, miningState.hp - damage);
  spawnDamageNumber(damage);

  const rockUnit = $("#rock-target");
  rockUnit.classList.remove("is-hit");
  void rockUnit.offsetWidth;
  rockUnit.classList.add("is-hit");
  setTimeout(() => rockUnit.classList.remove("is-hit"), 220);

  updateMiningUi(`${rockDefinitions[miningState.type].name}에 ${damage} 피해!`);
  if (miningState.hp <= 0) {
    breakMiningRock();
  }
}

function spawnDamageNumber(damage) {
  const number = document.createElement("span");
  number.className = "damage-number";
  number.textContent = `-${damage}`;
  number.style.left = `${46 + Math.random() * 8}%`;
  number.style.top = `${36 + Math.random() * 8}%`;
  $("#damage-layer").appendChild(number);
  setTimeout(() => number.remove(), 800);
}

function breakMiningRock() {
  const rock = rockDefinitions[miningState.type];
  const goldReward = randomInt(rock.gold[0], rock.gold[1]);
  const crystalReward = randomInt(rock.crystal[0], rock.crystal[1]);
  const generation = miningState.generation;

  miningState.respawning = true;
  clearMiningTimers();
  gameState.gold += goldReward;
  gameState.crystal += crystalReward;
  saveGame();
  updateResourceDisplays();

  $("#rock-target").classList.add("is-breaking");
  updateMiningUi(`${rock.name} 파괴! +${goldReward} Gold, +${crystalReward} Crystal`);

  clearTimeout(miningState.respawnTimer);
  miningState.respawnTimer = setTimeout(() => {
    if (generation !== miningState.generation) {
      return;
    }
    miningState.hp = rock.maxHp;
    miningState.maxHp = rock.maxHp;
    miningState.respawning = false;
    $("#rock-target").classList.remove("is-breaking");
    updateMiningUi(`${rock.name}이 다시 생성되었습니다.`);
    if (miningState.active) {
      gameState.monsters.forEach((monster, index) => {
        scheduleMonsterAttack(monster, index);
      });
    }
  }, 850);
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

  // 1. Evo Stone Card
  let html = `
    <div class="pixel-panel product-card">
      <div class="evo-stone-art"><span></span></div>
      <div class="product-copy">
        <p class="eyebrow">SUPPLY</p>
        <h2>Evolution Stone</h2>
        <p>몬스터의 진화 시도에 사용되는 신비로운 돌입니다.</p>
        <div class="price-tag"><span>PRICE</span><strong>120 Gold</strong></div>
        <div class="product-actions">
          <button class="primary-button" data-buy-stones="1">Buy 1</button>
          <button class="secondary-button" data-buy-stones="5">Buy 5</button>
        </div>
      </div>
    </div>
  `;

  // 2. 3 Monster Cards to buy
  const monstersToBuy = [
    { species: "cyclopse", price: 400 },
    { species: "balancer", price: 500 },
    { species: "bruterock", price: 600 }
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

  const price = species === "cyclopse" ? 400 : species === "bruterock" ? 600 : 500;

  if (gameState.gold < price) {
    showToast(`Gold가 부족합니다. ${price.toLocaleString()} Gold가 필요합니다.`, "error");
    return;
  }

  gameState.gold -= price;
  const newMonster = createMonster(species);
  gameState.monsters.push(newMonster);
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

  $("#evolution-monster-list").innerHTML = gameState.monsters.map((monster) => `
    <button class="evolution-list-button ${monster.id === uiState.selectedEvolutionMonsterId ? "active" : ""}" data-select-evolution="${monster.id}">
      ${monsterSpriteMarkup(monster.species, monster.level)}
      <span><strong>${monster.name}</strong>LV${monster.level} / ${monster.level >= 3 ? "MAX" : `${Math.round(evolutionRequirements[monster.level].chance * 100)}% chance`}</span>
    </button>
  `).join("");

  const monster = getMonsterById(uiState.selectedEvolutionMonsterId);
  if (!monster) {
    $("#evolution-sprite").innerHTML = "";
    $("#evolution-details").innerHTML = "<p>보유 몬스터가 없습니다.</p>";
    $("#evolve-button").disabled = true;
    return;
  }

  $("#evolution-sprite").innerHTML = monsterSpriteMarkup(monster.species, monster.level);
  $("#evolution-result").textContent = uiState.evolutionResult || "재료를 확인한 뒤 진화를 시도하세요.";

  if (monster.level >= 3) {
    $("#evolution-details").innerHTML = `
      <h2>${monster.name} / LV3 MAX</h2>
      <p>이 몬스터는 최종 레벨에 도달했습니다.</p>
      ${statsMarkup(monster)}
    `;
    $("#evolve-button").disabled = true;
    $("#evolve-button").textContent = "MAX LEVEL";
    return;
  }

  const requirement = evolutionRequirements[monster.level];
  const nextStats = getMonsterStats(monster.species, monster.level + 1);
  $("#evolution-details").innerHTML = `
    <h2>${monster.name} / LV${monster.level} → LV${monster.level + 1}</h2>
    <div class="evolution-costs">
      <div>SUCCESS<strong>${Math.round(requirement.chance * 100)}%</strong></div>
      <div>EVO STONE<strong>${requirement.stones} required</strong></div>
      <div>CRYSTAL<strong>${requirement.crystal} required</strong></div>
    </div>
    <p>성공 시 ATK ${monster.stats.attack} → ${nextStats.attack}, HP ${monster.stats.maxHp} → ${nextStats.maxHp}, SKILL ${monster.stats.skillDamage} → ${nextStats.skillDamage}</p>
  `;
  $("#evolve-button").disabled = false;
  $("#evolve-button").textContent = "Attempt Evolution";
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
  if (!monster || monster.level >= 3) {
    return;
  }

  const requirement = evolutionRequirements[monster.level];
  if (gameState.evoStones < requirement.stones || gameState.crystal < requirement.crystal) {
    uiState.evolutionResult = `재료 부족: Evolution Stone ${requirement.stones}개와 Crystal ${requirement.crystal}개가 필요합니다.`;
    renderEvolution();
    animateEvolutionResult(false);
    showToast("진화 재료가 부족합니다.", "error");
    return;
  }

  gameState.evoStones -= requirement.stones;
  gameState.crystal -= requirement.crystal;
  const succeeded = Math.random() < requirement.chance;

  if (succeeded) {
    monster.level += 1;
    monster.stats = getMonsterStats(monster.species, monster.level);
    uiState.evolutionResult = `SUCCESS! ${monster.name}이 LV${monster.level}(으)로 진화했습니다.`;
  } else {
    uiState.evolutionResult = `FAILED. ${monster.name}의 레벨은 LV${monster.level}로 유지됩니다.`;
  }

  saveGame();
  updateResourceDisplays();
  renderEvolution();
  animateEvolutionResult(succeeded);
  showToast(uiState.evolutionResult, succeeded ? "success" : "error");
}

function animateEvolutionResult(succeeded) {
  const chamber = $("#evolution-chamber");
  chamber.classList.remove("evolution-success", "evolution-fail");
  void chamber.offsetWidth;
  chamber.classList.add(succeeded ? "evolution-success" : "evolution-fail");
  setTimeout(() => chamber.classList.remove("evolution-success", "evolution-fail"), 1000);
}

// ---------------------------------------------------------------------------
// Canvas PVP test mode
// ---------------------------------------------------------------------------

function renderPvpSetup() {
  const monster = getPvpMonster();
  $("#pvp-setup").classList.remove("is-hidden");
  $("#pvp-battle").classList.add("is-hidden");

  if (!monster) {
    $("#pvp-monster-card").innerHTML = "<p>선택된 몬스터가 없습니다.</p>";
    $("#start-pvp-button").disabled = true;
    return;
  }

  $("#start-pvp-button").disabled = false;
  $("#pvp-monster-card").innerHTML = `
    <div class="pvp-partner-card">
      <div>${monsterSpriteMarkup(monster.species, monster.level)}</div>
      <div>
        <h3>${monster.name} LV${monster.level}</h3>
        <p class="muted">${monsterDefinitions[monster.species].role} / Skill: ${monster.stats.skillName}</p>
        ${statsMarkup(monster)}
      </div>
    </div>
  `;
}

function startPvp() {
  const monster = getPvpMonster();
  if (!monster || pvpState.active) {
    return;
  }

  stopMining();
  const dummyLevel = monster.level;
  const dummyStats = getMonsterStats("balancer", dummyLevel);

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
  pvpState.player = {
    side: "player",
    species: monster.species,
    name: monster.name,
    level: monster.level,
    x: 130,
    y: 240,
    radius: 15,
    moveSpeed: monsterDefinitions[monster.species].moveSpeed,
    hp: monster.stats.maxHp,
    maxHp: monster.stats.maxHp,
    defense: monster.stats.defense,
    attack: monster.stats.attack,
    attackSpeed: monster.stats.attackSpeed,
    skillDamage: monster.stats.skillDamage,
    skillCooldown: monster.stats.skillCooldown,
    projectileSpeed: monster.stats.projectileSpeed,
    facing: 1,
    moving: false,
    animationState: "idle",
    animationStarted: 0,
    animationDuration: 0,
    animationUntil: 0
  };
  pvpState.ai = {
    side: "ai",
    species: "balancer",
    name: `Dummy ${monsterDefinitions.balancer.name}`,
    level: dummyLevel,
    x: 670,
    y: 240,
    radius: 15,
    moveSpeed: 112 + dummyLevel * 7,
    hp: dummyStats.maxHp,
    maxHp: dummyStats.maxHp,
    defense: dummyStats.defense,
    attack: dummyStats.attack,
    attackSpeed: dummyStats.attackSpeed,
    skillDamage: dummyStats.skillDamage,
    skillCooldown: dummyStats.skillCooldown,
    projectileSpeed: 310 + dummyLevel * 20,
    facing: -1,
    moving: false,
    animationState: "idle",
    animationStarted: 0,
    animationDuration: 0,
    animationUntil: 0
  };

  $("#pvp-setup").classList.add("is-hidden");
  $("#pvp-battle").classList.remove("is-hidden");
  $("#battle-result-overlay").classList.add("is-hidden");
  $("#battle-player-name").textContent = `${monster.name} LV${monster.level}`;
  $("#battle-ai-name").textContent = `Dummy ${monsterDefinitions.balancer.name} LV${dummyLevel}`;
  $("#battle-skill-name").textContent = monster.stats.skillName;
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
  if (!pvpState.over) {
    updatePlayerMovement(dt);
    updateAi(dt);
    updateProjectiles(dt);
  }
  updatePvpEffects(dt);
}

function updatePlayerMovement(dt) {
  let dx = 0;
  let dy = 0;
  if (pvpState.keys.has("w")) dy -= 1;
  if (pvpState.keys.has("s")) dy += 1;
  if (pvpState.keys.has("a")) dx -= 1;
  if (pvpState.keys.has("d")) dx += 1;

  pvpState.player.moving = dx !== 0 || dy !== 0;
  if (pvpState.player.moving) {
    const length = Math.hypot(dx, dy);
    pvpState.player.x += (dx / length) * pvpState.player.moveSpeed * dt;
    pvpState.player.y += (dy / length) * pvpState.player.moveSpeed * dt;
    if (dx !== 0) {
      pvpState.player.facing = Math.sign(dx);
    }
    clampActor(pvpState.player);
  }
}

function updateAi(dt) {
  const ai = pvpState.ai;
  const player = pvpState.player;
  const dx = player.x - ai.x;
  const dy = player.y - ai.y;
  const distance = Math.max(1, Math.hypot(dx, dy));
  let movement = 0;

  if (distance > 185) movement = 1;
  if (distance < 105) movement = -0.75;

  ai.moving = movement !== 0;
  ai.facing = dx >= 0 ? 1 : -1;
  ai.x += (dx / distance) * ai.moveSpeed * movement * dt;
  ai.y += (dy / distance) * ai.moveSpeed * movement * dt;

  // A slight orbit keeps the test dummy from moving in one perfectly straight line.
  if (distance < 300) {
    ai.x += (-dy / distance) * 24 * Math.sin(pvpState.elapsed / 500) * dt;
    ai.y += (dx / distance) * 24 * Math.sin(pvpState.elapsed / 500) * dt;
  }
  clampActor(ai);

  const shotInterval = Math.max(820, 1450 - ai.level * 100);
  if (distance < 440 && pvpState.elapsed - pvpState.aiLastShot >= shotInterval) {
    pvpState.aiLastShot = pvpState.elapsed;
    fireProjectile(ai, player.x, player.y, false, "ai");
  }
}

function updateProjectiles(dt) {
  for (let index = pvpState.projectiles.length - 1; index >= 0; index -= 1) {
    const projectile = pvpState.projectiles[index];
    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;
    projectile.life -= dt;

    const target = projectile.owner === "player" ? pvpState.ai : pvpState.player;
    if (Math.hypot(projectile.x - target.x, projectile.y - target.y) <= projectile.radius + target.radius) {
      damageActor(target, projectile.damage, projectile.owner);
      spawnHitEffect(projectile.x, projectile.y, projectile.color);
      pvpState.projectiles.splice(index, 1);
      continue;
    }

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

function firePlayerProjectile(isSkill) {
  if (!pvpState.active || pvpState.over) {
    return;
  }

  const player = pvpState.player;
  if (isSkill) {
    const cooldownMs = player.skillCooldown * 1000;
    if (pvpState.elapsed - pvpState.lastSkill < cooldownMs) {
      return;
    }
    pvpState.lastSkill = pvpState.elapsed;
  } else {
    const cooldownMs = 1000 / player.attackSpeed;
    if (pvpState.elapsed - pvpState.lastBasic < cooldownMs) {
      return;
    }
    pvpState.lastBasic = pvpState.elapsed;
  }

  fireProjectile(player, pvpState.mouse.x, pvpState.mouse.y, isSkill, "player");
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
  const finalDamage = Math.max(1, Math.round(rawDamage - actor.defense));
  actor.hp = Math.max(0, actor.hp - finalDamage);
  pvpState.floaters.push({
    x: actor.x,
    y: actor.y - 30,
    text: `-${finalDamage}`,
    color: source === "player" ? "#fff4a3" : "#ffd1c2",
    life: 0.75
  });

  if (actor.hp <= 0) {
    triggerActorAnimation(actor, "faint", 950);
    endBattle(actor.side === "ai");
  } else {
    triggerActorAnimation(actor, "hit", 420);
  }
}

function triggerActorAnimation(actor, state, duration) {
  actor.animationState = state;
  actor.animationStarted = pvpState.elapsed;
  actor.animationDuration = duration;
  actor.animationUntil = pvpState.elapsed + duration;
}

function spawnHitEffect(x, y, color) {
  for (let index = 0; index < 8; index += 1) {
    const angle = (Math.PI * 2 * index) / 8;
    pvpState.particles.push({
      x,
      y,
      vx: Math.cos(angle) * 65,
      vy: Math.sin(angle) * 65,
      color,
      life: 0.35
    });
  }
}

function endBattle(victory) {
  if (pvpState.over) {
    return;
  }
  pvpState.over = true;
  $("#battle-result-title").textContent = victory ? "VICTORY" : "DEFEAT";
  $("#battle-result-copy").textContent = victory
    ? "AI 더미 몬스터를 쓰러뜨렸습니다."
    : "트레이닝 더미에게 패배했습니다. 다시 도전해 보세요.";
  $("#battle-result-overlay").classList.remove("is-hidden");
}

function clampActor(actor) {
  actor.x = Math.max(34, Math.min(766, actor.x));
  actor.y = Math.max(44, Math.min(446, actor.y));
}

function updateBattleHud() {
  if (!pvpState.player || !pvpState.ai) {
    return;
  }
  $("#battle-player-hp").textContent = `HP ${Math.ceil(pvpState.player.hp)} / ${pvpState.player.maxHp}`;
  $("#battle-ai-hp").textContent = `HP ${Math.ceil(pvpState.ai.hp)} / ${pvpState.ai.maxHp}`;
  const remaining = Math.max(0, pvpState.player.skillCooldown * 1000 - (pvpState.elapsed - pvpState.lastSkill));
  $("#battle-skill-cooldown").textContent = remaining <= 0 ? "READY" : `${(remaining / 1000).toFixed(1)}s`;
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

  drawArena(context);
  drawActor(context, pvpState.player);
  drawActor(context, pvpState.ai);
  pvpState.projectiles.forEach((projectile) => drawPvpProjectile(context, projectile));
  pvpState.particles.forEach((particle) => {
    context.fillStyle = particle.color;
    context.fillRect(Math.round(particle.x) - 3, Math.round(particle.y) - 3, 6, 6);
  });
  pvpState.floaters.forEach((floater) => {
    context.fillStyle = floater.color;
    context.font = "bold 16px monospace";
    context.textAlign = "center";
    context.fillText(floater.text, Math.round(floater.x), Math.round(floater.y));
  });
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

  const shadowWidth = Math.round(spriteRenderSize * 0.56);
  const shadowHeight = Math.round(spriteRenderSize * 0.1);
  context.fillStyle = "rgba(28,43,47,0.28)";
  context.fillRect(
    x - Math.round(shadowWidth / 2),
    y + Math.round(spriteRenderSize * 0.2),
    shadowWidth,
    shadowHeight
  );

  if (spriteImage?.complete && spriteImage.naturalWidth > 0) {
    drawSpriteSheetActor(context, actor, spriteImage, spriteRenderSize);
  } else {
    drawFallbackActor(context, actor, definition, spriteRenderSize);
  }

  const hpTop = definition.spriteSheet ? y - Math.round(spriteRenderSize * 0.61) : y - 47;
  const hpPercent = Math.max(0, actor.hp / actor.maxHp);
  context.fillStyle = "#172033";
  context.fillRect(x - 28, hpTop, 56, 8);
  context.fillStyle = hpPercent > 0.35 ? "#64cc69" : "#d95754";
  context.fillRect(x - 26, hpTop + 2, Math.round(52 * hpPercent), 4);
  context.fillStyle = "#fff8dc";
  context.font = "bold 9px monospace";
  context.textAlign = "center";
  context.fillText(actor.side === "player" ? "YOU" : "DUMMY", x, hpTop - 6);
}

function getMonsterSpriteRenderSize(level) {
  const levelScale = level === 3 ? 1.17 : level === 2 ? 1.08 : 1;
  return 64 * levelScale;
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
  const sizeBonus = (actor.species === "bruterock" ? 4 : 0) * scale;

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
  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || button.disabled) {
      return;
    }

    if (button.dataset.screen) showScreen(button.dataset.screen);
    if (button.dataset.starter) selectStarter(button.dataset.starter);
    if (button.dataset.rockTier) selectRockTier(button.dataset.rockTier);
    if (button.dataset.buyStones) buyEvolutionStones(button.dataset.buyStones);
    if (button.dataset.selectMining) selectMiningMonster(button.dataset.selectMining);
    if (button.dataset.selectPvp) selectPvpMonster(button.dataset.selectPvp);
    if (button.dataset.selectEvolution) selectEvolutionMonster(button.dataset.selectEvolution);
    if (button.dataset.buyMonster) buyMonster(button.dataset.buyMonster);
  });

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

      const leftPercent = ((clickX / rect.width) * 100).toFixed(2) + "%";
      const topPercent = ((clickY / rect.height) * 100).toFixed(2) + "%";

      const idx = miningState.selectedMonsterIndex;
      if (miningState.monsterPositions && miningState.monsterPositions[idx]) {
        const spot = miningState.monsterPositions[idx];
        spot.targetLeft = leftPercent;
        spot.targetTop = topPercent;
        spot.isMoving = true;

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
  canvas.addEventListener("mousedown", (event) => {
    updatePvpMouse(event);
    if (event.button === 0) firePlayerProjectile(false);
    if (event.button === 2) firePlayerProjectile(true);
  });
  canvas.addEventListener("contextmenu", (event) => event.preventDefault());

  window.addEventListener("keydown", (event) => {
    if (!pvpState.active) {
      return;
    }
    const key = event.key.toLowerCase();
    if (["w", "a", "s", "d", "escape"].includes(key)) {
      event.preventDefault();
    }
    if (key === "escape") {
      exitPvp();
      return;
    }
    pvpState.keys.add(key);
  });

  window.addEventListener("keyup", (event) => {
    pvpState.keys.delete(event.key.toLowerCase());
  });

  window.addEventListener("blur", () => pvpState.keys.clear());
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
