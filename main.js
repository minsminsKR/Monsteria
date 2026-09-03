"use strict";

// ---------------------------------------------------------------------------
// Monsteria data
// Add new monster definitions here. UI sprites can later be replaced with PNGs
// without changing the save or gameplay structures.
// ---------------------------------------------------------------------------

const SAVE_KEY = "monsteria-save-v1";
const EVO_STONE_PRICE = 120;

// Projectile VFX definitions for each character line
// Artist assets with magenta (#FF00FF) chroma-key
// Sprites are 1536×1024 canvases - CSS will handle cropping and scaling
const projectileVfxDefinitions = {
  "0": {
    basic: {
      type: "beam",
      spriteSheet: "assets/fx/cyclops-beam.png",
      width: 400,
      height: 100
    },
    skill: {
      type: "beam",
      spriteSheet: "assets/fx/cyclops-beam.png",
      width: 400,
      height: 100
    }
  },
  "1": {
    basic: {
      type: "water",
      spriteSheet: "assets/fx/lovelydoll-water.png",
      width: 350,
      height: 120
    },
    skill: {
      type: "water_wave",
      spriteSheet: "assets/fx/lovelydoll-water.png",
      width: 350,
      height: 120
    }
  },
  "2": {
    basic: {
      type: "claw",
      spriteSheet: "assets/fx/unnyangi-scratch.png",
      width: 200,
      height: 150
    },
    skill: {
      type: "energy_ball",
      spriteSheet: "assets/fx/unnyangi-scratch.png",
      width: 200,
      height: 150
    }
  }
};

// Special projectile for cutie (doll evolution)
const cutieStarVfx = {
  type: "star",
  spriteSheet: "assets/fx/cutie-star.png",
  width: 250,
  height: 100
};

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
    spriteSheet: "assets/monsters/0_3_hatefulclops/0_3_hatefulclops.png",
    isSingleImage: true,
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
    spriteSheet: "assets/monsters/1_3_candy/1_3_candy.png",
    isSingleImage: true,
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
    spriteSheet: "assets/monsters/2_3_unrang/2_3_unrang.png",
    isSingleImage: true,
    colors: { main: "#3f8fb5", light: "#b3e5fc", dark: "#12435c", accent: "#ffeb3b" },
    base: { attack: 72, attackSpeed: 1.55, maxHp: 410, defense: 30, skillDamage: 155 },
    growth: { attack: 24, attackSpeed: 0.15, maxHp: 105, defense: 12, skillDamage: 55 }
  },
  "0_4_goliathclops": {
    id: "0_4_goliathclops",
    name: "골리앗클롭스",
    role: "Laser Titan",
    description: "가슴에 커다란 눈이 생긴 거대한 파괴형 레이저 타이탄.",
    skillName: "Titan Laser Bombard",
    skillCooldown: 1.2,
    projectileSpeed: 820,
    moveSpeed: 235,
    spriteSheet: "assets/monsters/0_4_goliathclops/0_4_goliathclops.png",
    isSingleImage: true,
    colors: { main: "#ffbb00", light: "#ffffff", dark: "#7b431b", accent: "#ff5500" },
    base: { attack: 120, attackSpeed: 2.65, maxHp: 850, defense: 50, skillDamage: 320 },
    growth: { attack: 42, attackSpeed: 0.26, maxHp: 210, defense: 18, skillDamage: 105 }
  },
  "0_5_abyss_monarch": {
    id: "0_5_abyss_monarch",
    name: "어비스모나크",
    role: "Abyss Ray Overlord",
    description: "보랏빛 심연의 불꽃 and 허공의 외눈으로 공간을 파괴하는 종말의 광선 군주.",
    skillName: "Void Cataclysm Beam",
    skillCooldown: 1.0,
    projectileSpeed: 900,
    moveSpeed: 245,
    spriteSheet: "assets/monsters/0_5_abyss_monarch/0_5_abyss_monarch.png",
    isSingleImage: true,
    colors: { main: "#7b1fa2", light: "#000000", dark: "#4a148c", accent: "#aa00ff" },
    base: { attack: 260, attackSpeed: 3.15, maxHp: 1950, defense: 110, skillDamage: 780 },
    growth: { attack: 95, attackSpeed: 0.30, maxHp: 480, defense: 42, skillDamage: 285 }
  },
  "1_4_marionette": {
    id: "1_4_marionette",
    name: "마리오네트",
    role: "Ghost Scissors Queen",
    description: "화려한 드레스와 거대한 크리스탈 가위로 공간을 베는 유령 인형 퀸.",
    skillName: "Spatial Decapitation",
    skillCooldown: 3.2,
    projectileSpeed: 460,
    moveSpeed: 175,
    spriteSheet: "assets/monsters/1_4_marionette/1_4_marionette.png",
    isSingleImage: true,
    colors: { main: "#b3e5fc", light: "#ffffff", dark: "#37474f", accent: "#00b0ff" },
    base: { attack: 210, attackSpeed: 1.25, maxHp: 1350, defense: 95, skillDamage: 540 },
    growth: { attack: 75, attackSpeed: 0.12, maxHp: 340, defense: 38, skillDamage: 195 }
  },
  "1_5_valkyria_doll": {
    id: "1_5_valkyria_doll",
    name: "발키리돌",
    role: "Guardian Aegis Goddess",
    description: "날개 달린 화려한 태엽 천사 갑옷 인형으로 황금 워해머를 휘두르는 수호와 전쟁의 여신.",
    skillName: "Valkyrie Judgement",
    skillCooldown: 2.8,
    projectileSpeed: 500,
    moveSpeed: 185,
    spriteSheet: "assets/monsters/1_5_valkyria_doll/1_5_valkyria_doll.png",
    isSingleImage: true,
    colors: { main: "#ffd700", light: "#ffffff", dark: "#7b431b", accent: "#ffeb3b" },
    base: { attack: 450, attackSpeed: 1.45, maxHp: 3100, defense: 210, skillDamage: 1250 },
    growth: { attack: 165, attackSpeed: 0.14, maxHp: 750, defense: 85, skillDamage: 495 }
  },
  "2_4_unraiju": {
    id: "2_4_unraiju",
    name: "운뇌수",
    role: "Swift Lightning Panther",
    description: "온몸에 황색 전격 갑옷을 두르고 구름 위를 달리는 민첩한 번개 신수.",
    skillName: "Yellow Thunder Dash",
    skillCooldown: 2.0,
    projectileSpeed: 640,
    moveSpeed: 205,
    spriteSheet: "assets/monsters/2_4_unraiju/2_4_unraiju.png",
    isSingleImage: true,
    colors: { main: "#ffeb3b", light: "#ffffff", dark: "#f57f17", accent: "#ffff00" },
    base: { attack: 160, attackSpeed: 1.85, maxHp: 1050, defense: 70, skillDamage: 410 },
    growth: { attack: 56, attackSpeed: 0.18, maxHp: 270, defense: 26, skillDamage: 145 }
  },
  "2_5_kirin_nyang": {
    id: "2_5_kirin_nyang",
    name: "기린냥",
    role: "Celestial Storm Dragon Cat",
    description: "청록빛 용의 비늘과 빛나는 뿔을 지닌, 우레와 태풍을 다스리는 천상의 뇌전 룡묘.",
    skillName: "Kirin Storm Cataclysm",
    skillCooldown: 1.6,
    projectileSpeed: 700,
    moveSpeed: 215,
    spriteSheet: "assets/monsters/2_5_kirin_nyang/2_5_kirin_nyang.png",
    isSingleImage: true,
    colors: { main: "#1de9b6", light: "#ffffff", dark: "#00b0ff", accent: "#00e5ff" },
    base: { attack: 350, attackSpeed: 2.15, maxHp: 2450, defense: 155, skillDamage: 960 },
    growth: { attack: 125, attackSpeed: 0.21, maxHp: 620, defense: 58, skillDamage: 375 }
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

// Populate levels 20 to 49 dynamically
for (let l = 20; l <= 49; l++) {
  levelRequirements[l] = {
    gold: Math.round(22000 * Math.pow(l / 19, 1.6)),
    crystal: Math.round(1150 * Math.pow(l / 19, 1.8)),
    chance: Math.max(0.05, parseFloat((0.22 * Math.pow(19 / l, 0.75)).toFixed(2)))
  };
}

function getMaxLevel(species) {
  return 50;
}

function getMonsterFamilyPrefix(species) {
  if (!species) return "0";
  return species.split("_")[0];
}

function getSpeciesForLevel(familyPrefix, level) {
  if (level >= 40) {
    if (familyPrefix === "0") return "0_5_abyss_monarch";
    if (familyPrefix === "1") return "1_5_valkyria_doll";
    if (familyPrefix === "2") return "2_5_kirin_nyang";
  } else if (level >= 30) {
    if (familyPrefix === "0") return "0_4_goliathclops";
    if (familyPrefix === "1") return "1_4_marionette";
    if (familyPrefix === "2") return "2_4_unraiju";
  } else if (level >= 20) {
    if (familyPrefix === "0") return "0_3_hatefulclops";
    if (familyPrefix === "1") return "1_3_candy";
    if (familyPrefix === "2") return "2_3_unrang";
  } else if (level >= 10) {
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
  if (species === "0_3_hatefulclops") return "0_4_goliathclops";
  if (species === "0_4_goliathclops") return "0_5_abyss_monarch";
  
  if (species === "1_1_lovelydoll") return "1_2_cutie";
  if (species === "1_2_cutie") return "1_3_candy";
  if (species === "1_3_candy") return "1_4_marionette";
  if (species === "1_4_marionette") return "1_5_valkyria_doll";
  
  if (species === "2_1_unnyangi") return "2_2_unnyangsam";
  if (species === "2_2_unnyangsam") return "2_3_unrang";
  if (species === "2_3_unrang") return "2_4_unraiju";
  if (species === "2_4_unraiju") return "2_5_kirin_nyang";
  return null;
}

function getMonsterStage(species) {
  if (["0_1_cyclopse", "1_1_lovelydoll", "2_1_unnyangi"].includes(species)) return 1;
  if (["0_2_cyclopsis", "1_2_cutie", "2_2_unnyangsam"].includes(species)) return 2;
  if (["0_3_hatefulclops", "1_3_candy", "2_3_unrang"].includes(species)) return 3;
  if (["0_4_goliathclops", "1_4_marionette", "2_4_unraiju"].includes(species)) return 4;
  if (["0_5_abyss_monarch", "1_5_valkyria_doll", "2_5_kirin_nyang"].includes(species)) return 5;
  return 1;
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

const automationFamilies = [
  { prefix: "0", label: "사이클롭스", species: "0_1_cyclopse" },
  { prefix: "2", label: "운냥이", species: "2_1_unnyangi" },
  { prefix: "1", label: "러블리돌", species: "1_1_lovelydoll" }
];

function createDefaultAutomationSettings() {
  return {
    families: automationFamilies.reduce((settings, family) => {
      settings[family.prefix] = {
        autoBuy: false,
        autoLevelUp: false,
        targetLevel: 1,
        sellLevel: 0
      };
      return settings;
    }, {})
  };
}

function clampAutomationLevel(value, fallback, allowOff = false) {
  const parsed = Number.parseInt(value, 10);
  if (allowOff && parsed === 0) return 0;
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(getMaxLevel("2_1_unnyangi"), Math.max(1, parsed));
}

function normalizeAutomationSettings(savedSettings = {}) {
  const normalized = createDefaultAutomationSettings();
  automationFamilies.forEach((family) => {
    const savedFamily = savedSettings?.families?.[family.prefix] || {};
    normalized.families[family.prefix].autoBuy = Boolean(savedFamily.autoBuy);
    normalized.families[family.prefix].autoLevelUp = Boolean(savedFamily.autoLevelUp);
    normalized.families[family.prefix].targetLevel = clampAutomationLevel(savedFamily.targetLevel, 1);
    normalized.families[family.prefix].sellLevel = clampAutomationLevel(savedFamily.sellLevel, 0, true);
  });
  return normalized;
}

function getAutomationSettingsForFamily(prefix) {
  if (!gameState.automation) {
    gameState.automation = createDefaultAutomationSettings();
  }
  if (!gameState.automation.families?.[prefix]) {
    gameState.automation = normalizeAutomationSettings(gameState.automation);
  }
  return gameState.automation.families[prefix];
}

function createDefaultGameState() {
  return {
    started: false,
    gold: 0,
    crystal: 0,
    evoStones: 0,
    monsters: [],
    miningMonsterId: null,
    pvpMonsterId: null,
    selectedRock: "stone",
    playerLevel: 1,
    playerXp: 0,
    talentPoints: 0,
    investedTalents: 0,
    automation: createDefaultAutomationSettings(),
    shopTraining: null
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

function getMiningWaitingCenterPosition() {
  const left = "52%";
  const top = "85%";
  return { left, top, ...getDynamicSpotProperties(left, top) };
}

function getMiningSpawnCenterPosition(index = 0) {
  const base = getMiningWaitingCenterPosition();
  const baseLeft = parseFloat(base.left);
  const baseTop = parseFloat(base.top);
  const horizontalStep = 1.1;
  const verticalStep = 4.8;
  const offsets = [
    [0, 0],
    [-horizontalStep, 0],
    [horizontalStep, 0],
    [-horizontalStep / 2, -verticalStep],
    [horizontalStep / 2, -verticalStep],
    [-horizontalStep / 2, verticalStep],
    [horizontalStep / 2, verticalStep],
    [-horizontalStep * 1.5, -verticalStep / 2],
    [horizontalStep * 1.5, verticalStep / 2],
    [-horizontalStep * 2, 0],
    [horizontalStep * 2, 0],
    [0, -verticalStep],
    [0, verticalStep]
  ];
  const [dx, dy] = offsets[index % offsets.length];
  const left = `${(baseLeft + dx).toFixed(2)}%`;
  const top = `${(baseTop + dy).toFixed(2)}%`;
  return { left, top, ...getDynamicSpotProperties(left, top) };
}

function reflowTightMiningSpawnCluster() {
  if (!miningState.monsterPositions) return false;

  const center = getMiningWaitingCenterPosition();
  const centerLeft = parseFloat(center.left);
  const centerTop = parseFloat(center.top);
  let changed = false;

  miningState.monsterPositions.forEach((spot, index) => {
    if (!spot || spot.isMoving) return;
    const left = parseFloat(spot.left);
    const top = parseFloat(spot.top);
    if (Number.isNaN(left) || Number.isNaN(top)) return;
    if (Math.abs(left - centerLeft) > 0.25 || Math.abs(top - centerTop) > 0.25) return;

    const next = getMiningSpawnCenterPosition(index);
    const nextLeft = parseFloat(next.left);
    const nextTop = parseFloat(next.top);
    const needsUpdate =
      Math.abs(left - nextLeft) > 0.01 ||
      Math.abs(top - nextTop) > 0.01 ||
      spot.targetLeft !== next.left ||
      spot.targetTop !== next.top ||
      spot.isTargetingIncinerator ||
      spot.isTargetingAutoEvolver ||
      spot.isAutomationMove;
    if (!needsUpdate) return;

    Object.assign(spot, next, {
      targetLeft: next.left,
      targetTop: next.top,
      isMoving: false,
      isTargetingIncinerator: false,
      isTargetingAutoEvolver: false,
      isAutomationMove: false
    });
    changed = true;
  });

  return changed;
}

function isMiningWaitingZoneSpot(spot) {
  const topPct = parseFloat(spot?.top);
  return !Number.isNaN(topPct) && topPct >= 70;
}

function getStageElementCenterPosition(elementId) {
  const mineStage = $("#mine-stage");
  const target = $(`#${elementId}`);
  if (!mineStage || !target) return null;

  const stageRect = mineStage.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  if (!stageRect.width || !stageRect.height) return null;

  const centerX = targetRect.left + targetRect.width / 2 - stageRect.left;
  const centerY = targetRect.top + targetRect.height / 2 - stageRect.top;
  return {
    left: `${((centerX / stageRect.width) * 100).toFixed(2)}%`,
    top: `${((centerY / stageRect.height) * 100).toFixed(2)}%`
  };
}

function commandMonsterToStageZone(index, zoneId, flags = {}) {
  const spot = miningState.monsterPositions?.[index];
  if (!spot || spot.isMoving) return false;

  const center = getStageElementCenterPosition(zoneId);
  if (!center) return false;

  spot.targetLeft = center.left;
  spot.targetTop = center.top;
  spot.isMoving = true;
  spot.isTargetingIncinerator = Boolean(flags.incinerator);
  spot.isTargetingAutoEvolver = Boolean(flags.levelUp);
  spot.isAutomationMove = Boolean(flags.automation);

  const monster = gameState.monsters[index];
  if (monster) {
    monster.isAutoEvolving = false;
  }

  startMiningMovementLoop();
  return true;
}

function rectsOverlap(a, b) {
  return Boolean(
    a &&
    b &&
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top
  );
}

function getMonsterZoneEntryRect(index, spot) {
  const spotEl = document.getElementById(`mining-spot-${index}`);
  const spriteEl = spotEl?.querySelector(".monster-sprite");
  const spriteRect = (spriteEl || spotEl)?.getBoundingClientRect();
  if (spriteRect?.width && spriteRect?.height) {
    const width = Math.max(18, spriteRect.width * 0.36);
    const height = Math.max(14, spriteRect.height * 0.22);
    return {
      left: spriteRect.left + spriteRect.width / 2 - width / 2,
      right: spriteRect.left + spriteRect.width / 2 + width / 2,
      top: spriteRect.bottom - height,
      bottom: spriteRect.bottom
    };
  }

  const mineStage = $("#mine-stage");
  if (!mineStage || !spot) return null;

  const stageRect = mineStage.getBoundingClientRect();
  const x = stageRect.left + (parseFloat(spot.left) / 100) * stageRect.width;
  const y = stageRect.top + (parseFloat(spot.top) / 100) * stageRect.height;
  return {
    left: x - 10,
    right: x + 10,
    top: y - 8,
    bottom: y + 8
  };
}

function doesMonsterEntryOverlapZone(index, zoneId, spot) {
  const zone = $(`#${zoneId}`);
  if (!zone) return false;

  const zoneRect = zone.getBoundingClientRect();
  return rectsOverlap(getMonsterZoneEntryRect(index, spot), zoneRect);
}

function stopMovingSpotAtCurrentPosition(index, spot) {
  spot.targetLeft = spot.left;
  spot.targetTop = spot.top;
  spot.isMoving = false;
  spot.isTargetingIncinerator = false;
  spot.isTargetingAutoEvolver = false;
  spot.isAutomationMove = false;

  const spotEl = document.getElementById(`mining-spot-${index}`);
  if (!spotEl) return;

  const sprite = spotEl.querySelector(".monster-sprite");
  if (sprite) sprite.classList.remove("is-walking");
  spotEl.style.left = spot.left;
  spotEl.style.top = spot.top;
  spotEl.style.zIndex = spot.zIndex;
}

function placeMonsterOnZoneCenter(index, zoneId) {
  const spot = miningState.monsterPositions?.[index];
  const center = getStageElementCenterPosition(zoneId);
  if (!spot || !center) return false;

  const dynamic = getDynamicSpotProperties(center.left, center.top);
  spot.left = center.left;
  spot.top = center.top;
  spot.targetLeft = center.left;
  spot.targetTop = center.top;
  spot.scale = dynamic.scale;
  spot.zIndex = Math.max(dynamic.zIndex, zoneId === "mine-incinerator" ? 92 : dynamic.zIndex);
  spot.facing = dynamic.facing;
  spot.lunge = dynamic.lunge;
  spot.isMoving = false;
  spot.isTargetingIncinerator = false;
  spot.isTargetingAutoEvolver = false;
  spot.isAutomationMove = false;

  const spotEl = document.getElementById(`mining-spot-${index}`);
  if (spotEl) {
    spotEl.style.left = spot.left;
    spotEl.style.top = spot.top;
    spotEl.style.zIndex = spot.zIndex;
    const sprite = spotEl.querySelector(".monster-sprite");
    if (sprite) sprite.classList.remove("is-walking", "is-attacking");
    const wrapper = spotEl.querySelector(".monster-sprite-wrapper");
    if (wrapper) wrapper.style.transform = spot.facing < 0 ? "scaleX(-1)" : "";
  }

  return true;
}

function resolveMonsterZoneEntry(index, spot) {
  if (!spot?.isMoving) return false;

  if (spot.isTargetingIncinerator && doesMonsterEntryOverlapZone(index, "mine-incinerator", spot)) {
    const wasAutomationMove = Boolean(spot.isAutomationMove);
    placeMonsterOnZoneCenter(index, "mine-incinerator");
    saveMiningPositions();
    incinerateMonster(index, { auto: wasAutomationMove });
    return true;
  }

  if (spot.isTargetingAutoEvolver && doesMonsterEntryOverlapZone(index, "mine-auto-evolver", spot)) {
    const wasAutomationMove = Boolean(spot.isAutomationMove);
    const monster = gameState.monsters[index];
    if (monster) {
      const action = getUpgradeAction(monster);
      if (action.type === "levelUp" && gameState.gold >= action.gold && gameState.crystal >= action.crystal) {
        stopMovingSpotAtCurrentPosition(index, spot);
        attemptMiningZoneLevelUp(index, {
          pinAfter: false,
          showManualToasts: !wasAutomationMove,
          showAutoSuccessToast: false,
          renderAfter: true,
          followUpAutomation: wasAutomationMove
        });
        return true;
      }
    }
  }

  return false;
}

function pinMonsterToLevelUpZone(index) {
  // No-op to avoid teleporting monster to the center of the level-up zone
}

function sendMonsterBackToWaiting(index) {
  const spot = miningState.monsterPositions?.[index];
  if (!spot) return;
  const next = getMiningSpawnCenterPosition(index);
  Object.assign(spot, {
    targetLeft: next.left,
    targetTop: next.top,
    isMoving: true,
    isTargetingIncinerator: false,
    isTargetingAutoEvolver: false,
    isAutomationMove: false
  });
  
  const spotEl = document.getElementById("mining-spot-" + index);
  if (spotEl) {
    const sprite = spotEl.querySelector(".monster-sprite");
    if (sprite) sprite.classList.add("is-walking");
  }

  startMiningMovementLoop();
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
        
        const wasAutomationMove = Boolean(spot.isAutomationMove);
        spot.isAutomationMove = false;

        if (spot.isTargetingIncinerator) {
          spot.isTargetingIncinerator = false;
          setTimeout(() => {
            incinerateMonster(idx, { auto: wasAutomationMove });
          }, 50);
        }
        
        if (spot.isTargetingAutoEvolver) {
          spot.isTargetingAutoEvolver = false;
          attemptMiningZoneLevelUp(idx, {
            pinAfter: false,
            showManualToasts: !wasAutomationMove,
            showAutoSuccessToast: false,
            renderAfter: true,
            followUpAutomation: wasAutomationMove
          });
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

        if (resolveMonsterZoneEntry(idx, spot)) return;
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
  else if (spec === "goliathclops") spec = "0_4_goliathclops";
  else if (spec === "abyss_monarch") spec = "0_5_abyss_monarch";
  
  else if (spec === "bruterock" || spec === "lovelydoll") spec = "1_1_lovelydoll";
  else if (spec === "cutie") spec = "1_2_cutie";
  else if (spec === "candy") spec = "1_3_candy";
  else if (spec === "marionette") spec = "1_4_marionette";
  else if (spec === "valkyria_doll") spec = "1_5_valkyria_doll";
  
  else if (spec === "balancer" || spec === "unnyangi") spec = "2_1_unnyangi";
  else if (spec === "unnyangeoger" || spec === "unnyangsam") spec = "2_2_unnyangsam";
  else if (spec === "unrang") spec = "2_3_unrang";
  else if (spec === "unraiju") spec = "2_4_unraiju";
  else if (spec === "kirin_nyang") spec = "2_5_kirin_nyang";
  
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
    selectedRock: gameState.selectedRock,
    playerLevel: gameState.playerLevel,
    playerXp: gameState.playerXp,
    talentPoints: gameState.talentPoints,
    investedTalents: gameState.investedTalents,
    automation: normalizeAutomationSettings(gameState.automation)
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
      selectedRock: rockDefinitions[saved.selectedRock] ? saved.selectedRock : "stone",
      playerLevel: Math.max(1, Number(saved.playerLevel) || 1),
      playerXp: Math.max(0, Number(saved.playerXp) || 0),
      talentPoints: Math.max(0, Number(saved.talentPoints) || 0),
      investedTalents: Math.max(0, Number(saved.investedTalents) || 0),
      automation: normalizeAutomationSettings(saved.automation)
    };
    syncDisplayResources();
    updatePlayerUi();
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
  if (!definition) return "";
  const isSingle = definition.isSingleImage || false;
  const spriteSheetClass = definition.spriteSheet ? (isSingle ? " is-single-image" : " has-sprite-sheet") : "";
  const spriteSheetStyle = definition.spriteSheet
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
    requestMiningAutomationTick({ allowPurchases: false });
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
  updatePlayerUi();
  checkStandingMonstersEvolution();
}

let isCheckingEvolution = false;
function checkStandingMonstersEvolution() {
  if (isCheckingEvolution) return;
  if (uiState.currentScreen !== "mining" || !miningState.monsterPositions) return;

  isCheckingEvolution = true;
  try {
    gameState.monsters.forEach((monster, index) => {
      const spot = miningState.monsterPositions[index];
      if (!spot || spot.isMoving) return;

      if (doesMonsterEntryOverlapZone(index, "mine-auto-evolver", spot)) {
        const action = getUpgradeAction(monster);
        if (action.type === "levelUp" && gameState.gold >= action.gold && gameState.crystal >= action.crystal) {
          attemptMiningZoneLevelUp(index, {
            pinAfter: false,
            showManualToasts: false,
            showAutoSuccessToast: false,
            renderAfter: true,
            followUpAutomation: false
          });
        }
      }
    });
  } finally {
    isCheckingEvolution = false;
  }
}

function updateResourceDisplaysVisual() {
  const goldEl = $("#gold-display");
  if (goldEl) goldEl.textContent = Math.floor(displayState.gold).toLocaleString();
  
  const crystalEl = $("#crystal-display");
  if (crystalEl) crystalEl.textContent = Math.floor(displayState.crystal).toLocaleString();
  
  const evoEl = $("#evo-stone-display");
  if (evoEl) evoEl.textContent = Math.floor(displayState.evoStones).toLocaleString();
}

function updatePlayerUi() {
  const levelBadge = $("#player-level-badge");
  if (levelBadge) {
    levelBadge.textContent = `LV ${gameState.playerLevel || 1}`;
  }

  const reqXp = Math.round(100 * (gameState.playerLevel || 1) * 1.3);
  const curXp = gameState.playerXp || 0;
  
  const xpText = $("#player-xp-text");
  if (xpText) {
    xpText.textContent = `${curXp} / ${reqXp}`;
  }

  const xpFill = $("#player-xp-fill");
  if (xpFill) {
    const pct = Math.min(100, Math.max(0, (curXp / reqXp) * 100));
    xpFill.style.width = `${pct}%`;
  }

  const talentPointsEl = $("#player-talent-points");
  if (talentPointsEl) {
    talentPointsEl.textContent = gameState.talentPoints || 0;
  }

  const talentStatusEl = $("#player-talent-status");
  if (talentStatusEl) {
    const baseBonus = ((gameState.investedTalents || 0) * 2.0).toFixed(1);
    talentStatusEl.textContent = `Lv ${gameState.investedTalents || 0} (+${baseBonus}%)`;
  }

  const upgradeBtn = $("#upgrade-talent-button");
  if (upgradeBtn) {
    if ((gameState.talentPoints || 0) > 0) {
      upgradeBtn.removeAttribute("disabled");
    } else {
      upgradeBtn.setAttribute("disabled", "true");
    }
  }
}

function addPlayerXp(amount, options = {}) {
  if (amount <= 0) return;
  const { showToastMessages = true } = options;
  gameState.playerXp = (gameState.playerXp || 0) + amount;
  let leveledUp = false;
  
  while (true) {
    const reqXp = Math.round(100 * (gameState.playerLevel || 1) * 1.3);
    if (gameState.playerXp >= reqXp) {
      gameState.playerXp -= reqXp;
      gameState.playerLevel = (gameState.playerLevel || 1) + 1;
      leveledUp = true;
      if (gameState.playerLevel % 10 === 0) {
        gameState.talentPoints = (gameState.talentPoints || 0) + 1;
        if (showToastMessages) {
          showToast(`플레이어 레벨업! LV ${gameState.playerLevel} 달성 (특성 포인트 +1 획득!)`, "success");
        }
      } else {
        if (showToastMessages) {
          showToast(`플레이어 레벨업! LV ${gameState.playerLevel} 달성`, "success");
        }
      }
    } else {
      break;
    }
  }
  
  if (leveledUp) {
    soundManager.play("upgrade");
  }
  
  saveGame();
  updateResourceDisplays();
}

function upgradePlayerTalent() {
  if ((gameState.talentPoints || 0) > 0) {
    gameState.talentPoints -= 1;
    gameState.investedTalents = (gameState.investedTalents || 0) + 1;
    soundManager.play("upgrade");
    showToast(`진화 성공 특성을 강화했습니다! 현재 레벨: ${gameState.investedTalents}`, "success");
    saveGame();
    updateResourceDisplays();
    renderMining();
    if (uiState.currentScreen === "evolution") {
      renderEvolution();
    }
  }
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
  requestAnimationFrame(updateRockHpGaugePosition);

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
  if (!miningState.monsterPositions || miningState.monsterPositions.length !== gameState.monsters.length || gameState.monsters.some((_, index) => !miningState.monsterPositions[index])) {
    const savedMap = loadMiningPositions() || {};
    miningState.monsterPositions = gameState.monsters.map((monster, index) => {
      if (savedMap[monster.id]) {
        const pos = savedMap[monster.id];
        pos.scale = 1.0;
        pos.zIndex = Math.round(parseFloat(pos.top));
        return pos;
      }
      
      return getMiningSpawnCenterPosition(index);
    });
  }

  if (reflowTightMiningSpawnCluster()) {
    saveMiningPositions();
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
      const isFainted = monster.isIncinerating ? " is-fainted" : "";
      const isWalkingClass = spot.isMoving && !monster.isIncinerating ? " is-walking" : "";
      const facingStyle = spot.facing < 0 ? "transform: scaleX(-1);" : "";
      const transformStyle = `transform: translate(-50%, -72px) scale(${spot.scale});`;
      const combinedStyle = `left: ${spot.left}; top: ${spot.top}; z-index: ${spot.zIndex}; ${transformStyle}`;
      return `
        <div id="mining-spot-${index}" class="mining-monster-spot${isSelected}${isFainted}" style="${combinedStyle}">
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

  renderMiningAutomationPanel();
  updateMiningUi();
}

function renderMiningAutomationPanel() {
  const panel = $("#mining-automation-panel");
  if (!panel) return;

  const rows = automationFamilies.map((family) => {
    const settings = getAutomationSettingsForFamily(family.prefix);
    const familyMonsters = gameState.monsters.filter((monster) => getMonsterFamilyPrefix(monster.species) === family.prefix);
    const highestLevel = familyMonsters.reduce((max, monster) => Math.max(max, monster.level), 0);
    return `
      <div class="automation-family-row">
        <div class="automation-family-head">
          <div class="automation-family-sprite">${monsterSpriteMarkup(family.species, 1)}</div>
          <div>
            <strong>${family.label}</strong>
            <span>${familyMonsters.length}마리 / 최고 LV ${highestLevel || "-"}</span>
          </div>
        </div>
        <div class="automation-field automation-buy-field">
          <span>구매</span>
          <button type="button" class="automation-buy-toggle ${settings.autoBuy ? "active" : ""}" aria-pressed="${settings.autoBuy ? "true" : "false"}" data-automation-family="${family.prefix}" data-automation-field="autoBuy">
            ${settings.autoBuy ? "ON" : "OFF"}
          </button>
        </div>
        <div class="automation-field automation-levelup-field">
          <span>진화</span>
          <button type="button" class="automation-levelup-toggle ${settings.autoLevelUp ? "active" : ""}" aria-pressed="${settings.autoLevelUp ? "true" : "false"}" data-automation-family="${family.prefix}" data-automation-field="autoLevelUp">
            ${settings.autoLevelUp ? "ON" : "OFF"}
          </button>
        </div>
        <label class="automation-field">
          <span>목표 LV</span>
          <input type="number" min="1" max="50" step="1" value="${settings.targetLevel}" data-automation-family="${family.prefix}" data-automation-field="targetLevel">
        </label>
        <label class="automation-field">
          <span>판매 LV</span>
          <input type="number" min="0" max="50" step="1" value="${settings.sellLevel}" data-automation-family="${family.prefix}" data-automation-field="sellLevel">
        </label>
      </div>
    `;
  }).join("");

  panel.innerHTML = `
    <div class="automation-panel-head">
      <strong>자동 구매 및 레벨업 / 자동 판매</strong>
      <div id="automation-status" class="automation-status"></div>
    </div>
    <div class="automation-settings-list">${rows}</div>
  `;
  updateAutomationStatus();
}

function updateAutomationStatus() {
  const status = $("#automation-status");
  if (status) {
    const activeBuyTargets = automationFamilies.filter((family) => getAutomationSettingsForFamily(family.prefix).autoBuy).length;
    const activeLevelTargets = automationFamilies.filter((family) => getAutomationSettingsForFamily(family.prefix).autoLevelUp).length;
    const activeSaleTargets = automationFamilies.filter((family) => getAutomationSettingsForFamily(family.prefix).sellLevel > 0).length;
    status.innerHTML = `
      <span>자동 구매</span><strong>${activeBuyTargets} 계열</strong>
      <span>자동 레벨업</span><strong>${activeLevelTargets} 계열</strong>
      <span>자동 판매</span><strong>${activeSaleTargets} 계열</strong>
    `;
  }
}

function updateAutomationSettingFromInput(input, shouldRender = false) {
  const family = input.dataset.automationFamily;
  const field = input.dataset.automationField;
  const settings = getAutomationSettingsForFamily(family);
  if (field === "autoBuy") {
    const nextAutoBuy = input.tagName === "BUTTON" ? !settings.autoBuy : Boolean(input.checked);
    settings.autoBuy = nextAutoBuy;
    if (input.tagName === "BUTTON") {
      input.classList.toggle("active", nextAutoBuy);
      input.textContent = nextAutoBuy ? "ON" : "OFF";
      input.setAttribute("aria-pressed", nextAutoBuy ? "true" : "false");
    }
    saveGame();
    updateAutomationStatus();
    requestMiningAutomationTick({ allowPurchases: nextAutoBuy });
    return;
  }
  if (field === "autoLevelUp") {
    const nextAutoLevelUp = input.tagName === "BUTTON" ? !settings.autoLevelUp : Boolean(input.checked);
    settings.autoLevelUp = nextAutoLevelUp;
    if (input.tagName === "BUTTON") {
      input.classList.toggle("active", nextAutoLevelUp);
      input.textContent = nextAutoLevelUp ? "ON" : "OFF";
      input.setAttribute("aria-pressed", nextAutoLevelUp ? "true" : "false");
    }
    saveGame();
    updateAutomationStatus();
    requestMiningAutomationTick({ allowPurchases: false });
    return;
  }
  if (input.value === "") return;

  const allowOff = field === "sellLevel";
  const fallback = field === "targetLevel" ? settings.targetLevel : settings.sellLevel;
  const nextValue = clampAutomationLevel(input.value, fallback, allowOff);
  settings[field] = nextValue;
  input.value = nextValue;
  saveGame();

  if (shouldRender) {
    renderMiningAutomationPanel();
  } else {
    updateAutomationStatus();
  }
  requestMiningAutomationTick({ allowPurchases: false });
}

function updateRockHpGaugePosition() {
  if (uiState.currentScreen !== "mining") return;

  const rockTarget = $("#rock-target");
  const hp = $(".rock-floating-hp");
  const sprite = $("#rock-sprite .rock-sprite");
  const stage = $("#mine-stage");
  if (!rockTarget || !hp || !sprite || !stage) return;

  const targetRect = rockTarget.getBoundingClientRect();
  const spriteRect = sprite.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();
  const hpHeight = hp.offsetHeight || 16;
  const gap = 8;

  const centerX = spriteRect.left + spriteRect.width / 2 - targetRect.left;
  const preferredTop = spriteRect.top - targetRect.top - hpHeight - gap;
  const minTop = stageRect.top - targetRect.top + 6;
  const top = Math.max(minTop, preferredTop);
  const width = Math.max(112, Math.min(190, Math.round(spriteRect.width * 1.28)));

  hp.style.left = `${centerX}px`;
  hp.style.top = `${top}px`;
  hp.style.width = `${width}px`;
  hp.style.transform = "translateX(-50%)";
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
  updateRockHpGaugePosition();
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

  const topPct = parseFloat(spot.top);
  const isWaiting = (!isNaN(topPct) && topPct >= 70) || spot.isTargetingIncinerator || spot.isTargetingAutoEvolver;

  if (uiState.currentScreen === "mining" && spotElement && !isWaiting) {
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
    shootMiningProjectile(spotElement, spot, currentMonster.species);
  }

  const currentGeneration = miningState.generation;
  setTimeout(() => {
    if (miningState.active && !miningState.respawning && currentGeneration === miningState.generation) {
      const verifiedMonster = getMonsterById(monsterId);
      if (verifiedMonster && !isWaiting) {
        applyMiningDamage(verifiedMonster.stats.attack);
      }
    }
  }, 220);

  const attackInterval = Math.round(1000 / currentMonster.stats.attackSpeed);
  miningState.timers[monsterId] = setTimeout(() => {
    runMonsterAttackLoop(monsterId);
  }, attackInterval);
}

function shootMiningProjectile(spotElement, spot, species) {
  if (document.hidden) return;
  if (uiState.currentScreen !== "mining") return;
  const projectileLayer = $("#projectile-layer");
  if (!projectileLayer || !spotElement || !spot) return;

  const proj = document.createElement("span");
  proj.className = `mine-projectile-3d ${species ? 'species-' + species : ""}`;

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

function getMonsterPurchasePrice(species) {
  if (species === "0_1_cyclopse") return 400;
  if (species === "1_1_lovelydoll") return 600;
  if (species === "2_1_unnyangi") return 500;
  return 0;
}

function incinerateMonster(index, options = {}) {
  const monster = gameState.monsters[index];
  if (!monster) return;

  if (gameState.monsters.length <= 1) {
    monster.isAutomationSelling = false;
    if (!options.auto) {
      showToast("최소 한 마리의 몬스터는 보유해야 합니다.", "error");
    }
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
  placeMonsterOnZoneCenter(index, "mine-incinerator");
  saveMiningPositions();

  const refund = getMonsterSellValue(monster);

  if (miningState.timers[monster.id]) {
    clearTimeout(miningState.timers[monster.id]);
    delete miningState.timers[monster.id];
  }

  soundManager.play("break");

  gameState.gold += refund;
  const xpGain = monster.level * 5;
  addPlayerXp(xpGain, { showToastMessages: !options.auto });

  const spotElement = $(`#mining-spot-${index}`);
  if (spotElement) {
    spotElement.classList.add("is-fainted");
    const sprite = spotElement.querySelector(".monster-sprite");
    if (sprite) {
      sprite.style.animation = "monster-sprite-faint 1s steps(6) forwards, monster-fade-out 1s linear forwards";
    }
  }

  if (!options.auto) {
    showToast(`${monster.name}이 소각되었습니다. +${refund} Gold`, "success");
  }

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
    if (options.auto) {
      requestMiningAutomationTick({ allowPurchases: false });
    }
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

// Shop chrome background with magenta chroma-key removed
let shopChromeBgUrl = null;

function applyChromaKey(imageSrc, chromaKeyColor = [255, 0, 255]) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        if (r === chromaKeyColor[0] && g === chromaKeyColor[1] && b === chromaKeyColor[2]) {
          data[i + 3] = 0;
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL());
    };
    img.src = imageSrc;
  });
}


const fxImageCache = {};
const fxImgElCache = {};

function getChromaFxUrl(src) {
  if (fxImageCache[src]) {
    return Promise.resolve(fxImageCache[src]);
  }
  return applyChromaKey(src).then((dataUrl) => {
    fxImageCache[src] = dataUrl;
    return dataUrl;
  });
}

function getChromaFxImage(src) {
  if (fxImgElCache[src]) {
    return Promise.resolve(fxImgElCache[src]);
  }
  return getChromaFxUrl(src).then((dataUrl) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      fxImgElCache[src] = img;
      resolve(img);
    };
    img.src = dataUrl;
  }));
}

function playShopFx(kind) {
  const paths = {
    buy: "assets/fx/shop-buy.png",
    feed: "assets/fx/shop-feed.png",
    sell: "assets/fx/shop-sell.png"
  };
  const src = paths[kind];
  if (!src) return;
  const host = document.querySelector(".shop-chrome-container") || document.querySelector("#shop-products-grid");
  if (!host) return;
  getChromaFxUrl(src).then((url) => {
    const el = document.createElement("div");
    el.className = `shop-fx-burst shop-fx-${kind}`;
    el.style.backgroundImage = `url("${url}")`;
    host.appendChild(el);
    requestAnimationFrame(() => el.classList.add("is-on"));
    window.setTimeout(() => el.remove(), 720);
  });
}

function renderShop() {
  updateResourceDisplays();

  const grid = $("#shop-products-grid");
  if (!grid) return;

  const trainingMonster = gameState.shopTraining;
  const buyOptions = [
    { species: "0_1_cyclopse", price: 320, name: "사이클롭스" },
    { species: "2_1_unnyangi", price: 280, name: "운냥이" },
    { species: "1_1_lovelydoll", price: 300, name: "러블리돌" }
  ];

  if (!shopChromeBgUrl) {
    // Full painted gothic shop UI (no magenta key)
    shopChromeBgUrl = 'assets/ui/shop-raise-sell.png';
  }

  let html = `
    <div class="shop-chrome-container" style="background-image: url('${shopChromeBgUrl}');">
      <div class="shop-interactive-overlay">
        <div class="shop-section shop-buy-section">
  `;

  buyOptions.forEach((opt) => {
    const canAfford = gameState.gold >= opt.price;
    const disabled = trainingMonster ? "disabled" : "";
    html += `
      <div class="caged-monster">
        <div class="cage-sprite">
          ${monsterSpriteMarkup(opt.species, 1)}
        </div>
        <div class="cage-price">
          <span class="gold-icon">💰</span>
          <strong>${opt.price}</strong>
        </div>
        <button class="gothic-button buy-button ${!canAfford || trainingMonster ? 'disabled' : ''}" 
                data-shop-buy="${opt.species}"
                ${!canAfford || trainingMonster ? 'disabled' : ''}>
          구입
        </button>
      </div>
    `;
  });

  html += `
        </div>
        <div class="shop-section shop-train-section">
  `;

  if (trainingMonster) {
    const maxExp = 100;
    const expPercent = (trainingMonster.exp / maxExp) * 100;
    const feedCost = 50;
    const canFeed = gameState.gold >= feedCost;
    const sellReady = trainingMonster.level >= 5;

    html += `
      <div class="training-monster-display">
        <div class="training-sprite">
          ${monsterSpriteMarkup(trainingMonster.species, trainingMonster.level)}
        </div>
        <div class="training-info">
          <div class="training-level">LV ${trainingMonster.level}</div>
          <div class="exp-bar-container">
            <span class="exp-label">EXP</span>
            <div class="exp-bar">
              <div class="exp-fill" style="width: ${expPercent}%"></div>
            </div>
          </div>
          <div class="food-bowl">🍖</div>
        </div>
      </div>
      <button class="gothic-button feed-button ${!canFeed ? 'disabled' : ''}" 
              data-shop-feed="true"
              ${!canFeed ? 'disabled' : ''}>
        먹이주기 (${feedCost}G)
      </button>
      ${sellReady ? '<div class="ready-badge">판매 준비 완료!</div>' : ''}
    `;
  } else {
    html += `
      <div class="empty-training">
        <div class="empty-icon">🏺</div>
        <p>육성 중인 몬스터가 없습니다</p>
        <p class="muted">왼쪽에서 몬스터를 구입하세요</p>
      </div>
    `;
  }

  html += `
        </div>
        <div class="shop-section shop-sell-section">
  `;

  if (trainingMonster) {
    const sellValue = getMonsterSellValue(trainingMonster);
    html += `
      <div class="sell-monster-display">
        <div class="sell-sprite">
          ${monsterSpriteMarkup(trainingMonster.species, trainingMonster.level)}
        </div>
        <div class="sell-value">
          <span class="gold-icon">💰</span>
          <strong>${sellValue}</strong>
        </div>
      </div>
      <button class="gothic-button sell-button" data-shop-sell="true">
        판매
      </button>
    `;
  } else {
    html += `
      <div class="empty-sell">
        <div class="empty-icon">📦</div>
        <p>판매할 몬스터가 없습니다</p>
      </div>
    `;
  }

  html += `
        </div>
      </div>
    </div>
    
    <div class="shop-guide">
      <p><strong>💡 경제 루프:</strong> 저렴한 몬스터 구입 → 먹이로 레벨업 → 높은 가격에 판매 → 반복</p>
    </div>
  `;

  grid.innerHTML = html;
}

function shopBuyMonster(species) {
  if (gameState.shopTraining) {
    showToast("이미 육성 중인 몬스터가 있습니다!", "error");
    return;
  }

  const prices = {
    "0_1_cyclopse": 320,
    "2_1_unnyangi": 280,
    "1_1_lovelydoll": 300
  };
  
  const price = prices[species];
  if (!price) return;

  if (gameState.gold < price) {
    showToast(`Gold가 부족합니다. ${price} Gold가 필요합니다.`, "error");
    return;
  }

  gameState.gold -= price;
  gameState.shopTraining = {
    species: species,
    level: 1,
    exp: 0
  };

  soundManager.play("buy");
  playShopFx("buy");
  showToast(`몬스터를 구입했습니다! 먹이를 주어 레벨업하세요.`, "success");
  saveGame();
  renderShop();
}

function shopFeedMonster() {
  if (!gameState.shopTraining) return;

  const feedCost = 50;
  if (gameState.gold < feedCost) {
    showToast(`Gold가 부족합니다. ${feedCost} Gold가 필요합니다.`, "error");
    return;
  }

  gameState.gold -= feedCost;
  gameState.shopTraining.exp += 30;

  const maxExp = 100;
  while (gameState.shopTraining.exp >= maxExp) {
    gameState.shopTraining.exp -= maxExp;
    gameState.shopTraining.level++;
    soundManager.play("skill");
    showToast(`레벨 업! (LV ${gameState.shopTraining.level})`, "success");
  }

  soundManager.play("click");
  playShopFx("feed");
  saveGame();
  renderShop();
}

function shopSellMonster() {
  if (!gameState.shopTraining) return;

  const sellValue = getMonsterSellValue(gameState.shopTraining);
  gameState.gold += sellValue;

  soundManager.play("loot");
  playShopFx("sell");
  showToast(`몬스터를 ${sellValue} Gold에 판매했습니다!`, "success");
  
  gameState.shopTraining = null;
  saveGame();
  renderShop();
}

function getMonsterSellValue(monster) {
  const basePrices = {
    "0_1_cyclopse": 320,
    "2_1_unnyangi": 280,
    "1_1_lovelydoll": 300
  };
  
  const basePrice = basePrices[monster.species] || 300;
  const levelBonus = (monster.level - 1) * 80;
  return Math.round(basePrice * 1.5 + levelBonus);
}

function addMiningPositionForMonster(monster, index = gameState.monsters.length - 1) {
  if (!monster) return;
  if (!miningState.monsterPositions) {
    miningState.monsterPositions = [];
  }

  gameState.monsters.forEach((_, monsterIndex) => {
    if (monsterIndex >= index) return;
    if (miningState.monsterPositions[monsterIndex]) return;

    miningState.monsterPositions[monsterIndex] = getMiningSpawnCenterPosition(monsterIndex);
  });

  const existing = miningState.monsterPositions[index];
  if (existing) return;

  miningState.monsterPositions[index] = getMiningSpawnCenterPosition(index);
}

function buyMonster(species) {
  const definition = monsterDefinitions[species];
  if (!definition) return;

  const price = getMonsterPurchasePrice(species);

  if (gameState.gold < price) {
    showToast(`Gold가 부족합니다. ${price.toLocaleString()} Gold가 필요합니다.`, "error");
    return;
  }

  gameState.gold -= price;
  if (gameState._cheatInfiniteResources) { gameState.gold = 999999999; gameState.crystal = 999999999; }
  soundManager.play("buy");
  const newMonster = createMonster(species);
  gameState.monsters.push(newMonster);
  addMiningPositionForMonster(newMonster, gameState.monsters.length - 1);
  if (miningState.active) {
    scheduleMonsterAttack(newMonster);
  }
  saveGame();
  saveMiningPositions();
  updateResourceDisplays();
  renderShop();
  if (uiState.currentScreen === "mining") {
    renderMining();
    requestMiningAutomationTick({ allowPurchases: false });
  }
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
  if (gameState._cheatInfiniteResources) { gameState.gold = 999999999; gameState.crystal = 999999999; }
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
      label = `LV Up (${Math.round(Math.min(1.0, action.chance + getEvolutionChanceBonus(monster.level)) * 100)}%)`;
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
        <div>SUCCESS<strong>${Math.round(Math.min(1.0, action.chance + getEvolutionChanceBonus(monster.level)) * 100)}%${gameState.investedTalents > 0 ? ` <span style="font-size:11px; color:#52c41a; font-weight:normal;">(+${Math.round(getEvolutionChanceBonus(monster.level) * 100)}%)</span>` : ''}</strong></div>
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

function getUpgradeAction(monster) {
  const maxLvl = getMaxLevel(monster.species);
  
  if (monster.level < maxLvl) {
    const req = levelRequirements[monster.level];
    return { type: "levelUp", gold: req.gold, crystal: req.crystal, chance: req.chance };
  }
  
  return { type: "max" };
}

function getEvolutionChanceBonus(level) {
  const talents = gameState.investedTalents || 0;
  if (level <= 10) return talents * 0.02;
  if (level <= 20) return talents * 0.01;
  if (level <= 30) return talents * 0.003;
  if (level <= 40) return talents * 0.002;
  return talents * 0.001;
}

function attemptEvolution() {
  const monster = getMonsterById(uiState.selectedEvolutionMonsterId);
  if (!monster) return;

  const action = getUpgradeAction(monster);
  if (action.type === "max") {
    return;
  }

  const finalChance = Math.min(1.0, action.chance + getEvolutionChanceBonus(monster.level));

  if (gameState.gold < action.gold || gameState.crystal < action.crystal) {
    uiState.evolutionResult = `재료 부족: Gold ${action.gold.toLocaleString()}개와 Crystal ${action.crystal.toLocaleString()}개가 필요합니다.`;
    renderEvolution();
    animateEvolutionResult(false);
    showToast("레벨업 재료가 부족합니다.", "error");
    return;
  }

  gameState.gold -= action.gold;
  gameState.crystal -= action.crystal;
  if (gameState._cheatInfiniteResources) { gameState.gold = 999999999; gameState.crystal = 999999999; }
  const succeeded = Math.random() < finalChance;

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

function triggerLevelUpZoneVisualEffect(monsterIndex, succeeded) {
  const spotEl = document.getElementById(`mining-spot-${monsterIndex}`);
  if (!spotEl) return;
  
  const className = succeeded ? "level-up-success" : "level-up-fail";
  spotEl.classList.remove("level-up-success", "level-up-fail");
  void spotEl.offsetWidth; // Trigger reflow
  spotEl.classList.add(className);
  
  setTimeout(() => {
    spotEl.classList.remove(className);
  }, 800);
}

function attemptMiningZoneLevelUp(index, options = {}) {
  const {
    pinAfter = false,
    showManualToasts = true,
    showAutoSuccessToast = false,
    renderAfter = true,
    followUpAutomation = false
  } = options;
  const monster = gameState.monsters[index];
  if (!monster) return { attempted: false, reason: "missing" };

  const action = getUpgradeAction(monster);
  let shouldShowEffect = false;
  let effectSucceeded = false;

  if (action.type === "max") {
    if (pinAfter) {
      pinMonsterToLevelUpZone(index);
      saveMiningPositions();
    }
    sendMonsterBackToWaiting(index);
    saveMiningPositions();
    if (showManualToasts) {
      showToast(`${monster.name}은(는) 이미 최대 레벨입니다.`, "info");
    }
    saveGame();
    if (renderAfter && uiState.currentScreen === "mining") renderMining();
    return { attempted: false, reason: "max" };
  }

  if (gameState.gold < action.gold || gameState.crystal < action.crystal) {
    // Monster stays in place — checkStandingMonstersEvolution will retry when resources arrive
    saveGame();
    if (renderAfter && uiState.currentScreen === "mining") renderMining();
    return { attempted: false, reason: "materials" };
  }

  gameState.gold -= action.gold;
  gameState.crystal -= action.crystal;
  if (gameState._cheatInfiniteResources) {
    gameState.gold = 999999999;
    gameState.crystal = 999999999;
  }
  
  const finalChance = Math.min(1.0, action.chance + getEvolutionChanceBonus(monster.level));
  const succeeded = Math.random() < finalChance;
  shouldShowEffect = true;
  effectSucceeded = succeeded;

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
    soundManager.play("upgrade");
    
    if (evolved) {
      if (showManualToasts || showAutoSuccessToast) {
        showToast(`${showManualToasts ? "성공" : "자동"}! ${monster.name}(으)로 진화하며 LV${monster.level}이 되었습니다!`, "success");
      }
    } else {
      if (showManualToasts || showAutoSuccessToast) {
        showToast(`${showManualToasts ? "성공" : "자동"}! ${monster.name} LV${monster.level} 레벨업!`, "success");
      }
    }
  } else {
    soundManager.play("break");
    if (showManualToasts) {
      showToast(`${monster.name} 레벨업 실패!`, "error");
    }
  }

  if (pinAfter) {
    pinMonsterToLevelUpZone(index);
    saveMiningPositions();
  }

  const nextAction = getUpgradeAction(monster);
  const prefix = getMonsterFamilyPrefix(monster.species);
  const settings = getAutomationSettingsForFamily(prefix);
  const targetLevel = settings.targetLevel;
  
  const reachedTarget = monster.level >= targetLevel;
  const isMax = nextAction.type === "max";

  if (reachedTarget || isMax) {
    sendMonsterBackToWaiting(index);
    saveMiningPositions();
  }

  saveGame();
  updateResourceDisplays();
  if (renderAfter && uiState.currentScreen === "mining") renderMining();
  if (shouldShowEffect) {
    triggerLevelUpZoneVisualEffect(index, effectSucceeded);
  }
  if (followUpAutomation) {
    requestMiningAutomationTick({ allowPurchases: false });
  }
  return { attempted: true, succeeded, monsterId: monster.id, level: monster.level };
}

function isMonsterBusyForAutomation(index) {
  const monster = gameState.monsters[index];
  const spot = miningState.monsterPositions?.[index];
  return Boolean(
    monster?.isIncinerating ||
    monster?.isAutomationSelling ||
    spot?.isMoving ||
    spot?.isTargetingIncinerator ||
    spot?.isTargetingAutoEvolver
  );
}

function getAutoSaleLevel(monster) {
  const prefix = getMonsterFamilyPrefix(monster.species);
  return getAutomationSettingsForFamily(prefix).sellLevel;
}

function shouldAutoSellMonster(monster) {
  const sellLevel = getAutoSaleLevel(monster);
  return sellLevel > 0 && monster.level >= sellLevel;
}

function isMonsterPendingSale(index) {
  const monster = gameState.monsters[index];
  const spot = miningState.monsterPositions?.[index];
  return Boolean(
    monster?.isIncinerating ||
    monster?.isAutomationSelling ||
    spot?.isTargetingIncinerator
  );
}

let miningAutomationRequestTimer = null;
let miningAutomationRequestAllowsPurchases = false;
function requestMiningAutomationTick(options = {}) {
  miningAutomationRequestAllowsPurchases = miningAutomationRequestAllowsPurchases || Boolean(options.allowPurchases);
  if (miningAutomationRequestTimer) return;

  miningAutomationRequestTimer = setTimeout(() => {
    const allowPurchases = miningAutomationRequestAllowsPurchases;
    miningAutomationRequestTimer = null;
    miningAutomationRequestAllowsPurchases = false;
    runMiningAutomationTick({ allowPurchases });
  }, 0);
}

function runAutomationPurchases(maxPurchases = 6) {
  let purchased = 0;
  const enabledFamilies = automationFamilies.filter((family) => getAutomationSettingsForFamily(family.prefix).autoBuy);
  if (enabledFamilies.length === 0) return 0;

  while (purchased < maxPurchases) {
    let boughtThisPass = false;

    for (const family of enabledFamilies) {
      if (purchased >= maxPurchases) break;

      const price = getMonsterPurchasePrice(family.species);
      if (price <= 0 || gameState.gold < price) continue;

      gameState.gold -= price;
      if (gameState._cheatInfiniteResources) { gameState.gold = 999999999; gameState.crystal = 999999999; }
      const monster = createMonster(family.species);
      gameState.monsters.push(monster);
      addMiningPositionForMonster(monster, gameState.monsters.length - 1);
      if (miningState.active) {
        scheduleMonsterAttack(monster);
      }

      purchased += 1;
      boughtThisPass = true;
    }

    if (!boughtThisPass) break;
  }

  if (purchased > 0) {
    soundManager.play("buy");
    saveGame();
    saveMiningPositions();
    updateResourceDisplays();
    renderMining();
  }

  return purchased;
}

function runMiningAutomationTick(options = {}) {
  const { allowPurchases = true } = options;
  if (!gameState.started || uiState.currentScreen !== "mining") return;
  if (!miningState.monsterPositions || gameState.monsters.length === 0) return;

  if (allowPurchases) {
    runAutomationPurchases(6);
  }

  let pendingSaleCount = gameState.monsters.reduce((count, _, index) => count + (isMonsterPendingSale(index) ? 1 : 0), 0);
  let remainingSellCommands = Math.max(0, gameState.monsters.length - pendingSaleCount - 1);
  gameState.monsters.forEach((monster, index) => {
    if (remainingSellCommands <= 0) return;
    const spot = miningState.monsterPositions?.[index];
    if (!spot || !isMiningWaitingZoneSpot(spot)) return;
    if (isMonsterBusyForAutomation(index) || !shouldAutoSellMonster(monster)) return;

    monster.isAutomationSelling = true;
    const commanded = commandMonsterToStageZone(index, "mine-incinerator", {
      incinerator: true,
      automation: true
    });
    if (commanded) {
      remainingSellCommands -= 1;
      pendingSaleCount += 1;
    } else {
      monster.isAutomationSelling = false;
    }
  });

  let reservedGold = gameState.gold;
  let reservedCrystal = gameState.crystal;
  gameState.monsters.forEach((monster, index) => {
    const spot = miningState.monsterPositions?.[index];
    if (!spot || !isMiningWaitingZoneSpot(spot)) return;
    if (isMonsterBusyForAutomation(index) || shouldAutoSellMonster(monster)) return;

    const prefix = getMonsterFamilyPrefix(monster.species);
    const settings = getAutomationSettingsForFamily(prefix);
    if (!settings.autoLevelUp) return;
    const targetLevel = settings.targetLevel;
    if (monster.level >= targetLevel) return;

    const action = getUpgradeAction(monster);
    if (action.type !== "levelUp") return;
    if (reservedGold < action.gold || reservedCrystal < action.crystal) return;

    const commanded = commandMonsterToStageZone(index, "mine-auto-evolver", {
      levelUp: true,
      automation: true
    });
    if (commanded) {
      reservedGold -= action.gold;
      reservedCrystal -= action.crystal;
    }
  });
}

let miningAutomationInterval = null;
function startMiningAutomationLoop() {
  if (miningAutomationInterval) return;
  miningAutomationInterval = setInterval(runMiningAutomationTick, 1000);
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
  preloadProjectileFx();
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
  
  const family = getMonsterFamilyPrefix(actor.species);
  const vfxType = isSkill ? "skill" : "basic";
  const vfxDef = projectileVfxDefinitions[family]?.[vfxType] || projectileVfxDefinitions["0"].basic;

  actor.facing = dx >= 0 ? 1 : -1;
  triggerActorAnimation(actor, isSkill ? "skill" : "attack", isSkill ? 560 : 420);
  pvpState.projectiles.push({
    owner,
    isSkill,
    species: actor.species,
    family,
    vfxType,
    vfxDef,
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

  const hitLife = isCrit ? 0.45 : 0.28;
  pvpState.particles.push({
    kind: "hitSprite",
    x,
    y,
    vx: 0,
    vy: 0,
    color,
    life: hitLife,
    maxLife: hitLife,
    scale: isCrit ? 1.35 : 1.0
  });
  getChromaFxImage("assets/fx/combat-hit.png");
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
    if (particle.kind === "hitSprite") {
      const img = fxImgElCache["assets/fx/combat-hit.png"];
      if (!img) return;
      const t = Math.max(0, Math.min(1, particle.life / Math.max(0.001, particle.maxLife || 0.28)));
      const size = 110 * (particle.scale || 1) * (0.75 + 0.35 * t);
      context.save();
      context.globalAlpha = t;
      context.drawImage(img, Math.round(particle.x - size / 2), Math.round(particle.y - size / 2), size, size);
      context.restore();
      return;
    }
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

function drawActorSpriteOnly(context, actor, image, renderSize, state, frame, isAfterimage = false, customX = null, customY = null, customFacing = null) {
  const definition = monsterDefinitions[actor.species];
  const isSingleImage = !!definition?.isSingleImage;
  const x = customX !== null ? customX : Math.round(actor.x);
  const y = customY !== null ? customY : Math.round(actor.y);
  const facing = customFacing !== null ? customFacing : actor.facing;

  context.save();
  context.translate(x, y);
  context.scale(facing < 0 ? -1 : 1, 1);

  if (isSingleImage) {
    let animState = state;
    let elapsed = pvpState.elapsed;
    let animationStarted = actor.animationStarted;
    let animationDuration = actor.animationDuration;
    let hp = actor.hp;

    if (isAfterimage) {
      animState = "walk";
    }

    let dx = 0;
    let dy = 0;
    let rotate = 0;
    let sx = 1.0;
    let sy = 1.0;
    let opacity = 1.0;

    if (hp <= 0 && !isAfterimage) {
      const faintProgress = Math.min(1.0, (elapsed - animationStarted) / Math.max(1, animationDuration || 400));
      rotate = -Math.PI / 2 * faintProgress;
      dy = renderSize * 0.2 * faintProgress;
      opacity = 1.0 - faintProgress;
    } else if (animState === "hit" && !isAfterimage) {
      const hitTime = elapsed - animationStarted;
      dx = Math.sin(hitTime * 0.08) * (renderSize * 0.12) * Math.max(0, 1 - hitTime / 300);
    } else if ((animState === "attack" || animState === "skill") && !isAfterimage) {
      const progress = Math.max(0, Math.min(0.999, (elapsed - animationStarted) / Math.max(1, animationDuration)));
      const lungeDist = renderSize * 0.45;
      if (progress < 0.3) {
        dx = (progress / 0.3) * lungeDist;
      } else if (progress < 0.7) {
        dx = lungeDist;
      } else {
        dx = ((1.0 - progress) / 0.3) * lungeDist;
      }
      sx = 1.15;
      sy = 0.9;
    } else if (animState === "walk") {
      const bob = Math.sin(elapsed * 0.012) * (renderSize * 0.04);
      dy = bob;
      rotate = Math.sin(elapsed * 0.012) * 0.06;
    } else {
      const breath = Math.sin(elapsed * 0.005) * 0.03;
      sy = 1 + breath;
      sx = 1 - breath;
    }

    const pivotY = renderSize * 0.3;
    context.translate(dx, dy + pivotY);
    if (rotate !== 0) context.rotate(rotate);
    context.scale(sx, sy);
    context.translate(0, -pivotY);

    if (opacity < 1.0) {
      context.globalAlpha *= opacity;
    }

    context.drawImage(
      image,
      0, 0, image.naturalWidth, image.naturalHeight,
      -renderSize / 2, -renderSize * 0.7, renderSize, renderSize
    );
  } else {
    // Sprite sheet
    const frameSize = 96;
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
  }
  context.restore();
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
        let state = actor.moving ? "walk" : "idle";
        let frame = Math.floor(pvpState.elapsed / (state === "walk" ? 115 : 190)) % 6;
        if (actor.animationUntil > pvpState.elapsed || actor.hp <= 0) {
          state = actor.animationState;
          const progress = Math.max(0, Math.min(0.999, (pvpState.elapsed - actor.animationStarted) / Math.max(1, actor.animationDuration)));
          frame = actor.hp <= 0 && pvpState.elapsed >= actor.animationUntil ? 5 : Math.floor(progress * 6);
        }
        drawActorSpriteOnly(context, actor, spriteImage, spriteRenderSize, state, frame, true, imgX, imgY, img.facing);
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
  let state = actor.moving ? "walk" : "idle";
  let frame = Math.floor(pvpState.elapsed / (state === "walk" ? 115 : 190)) % 6;

  if (actor.animationUntil > pvpState.elapsed || actor.hp <= 0) {
    state = actor.animationState;
    const progress = Math.max(0, Math.min(0.999, (pvpState.elapsed - actor.animationStarted) / Math.max(1, actor.animationDuration)));
    frame = actor.hp <= 0 && pvpState.elapsed >= actor.animationUntil ? 5 : Math.floor(progress * 6);
  }

  drawActorSpriteOnly(context, actor, image, renderSize, state, frame, false, Math.round(actor.x), Math.round(actor.y), actor.facing);
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


function preloadProjectileFx() {
  const sheets = new Set();
  Object.values(projectileVfxDefinitions).forEach((family) => {
    Object.values(family).forEach((def) => {
      if (def && def.spriteSheet) sheets.add(def.spriteSheet);
    });
  });
  if (cutieStarVfx && cutieStarVfx.spriteSheet) sheets.add(cutieStarVfx.spriteSheet);
  sheets.forEach((src) => getChromaFxImage(src));
}

function drawPvpProjectile(context, projectile) {
  const x = Math.round(projectile.x);
  const y = Math.round(projectile.y);
  const species = projectile.species || "";
  const isSkill = projectile.isSkill;
  
  const vfxDef = projectile.vfxDef;
  if (vfxDef && vfxDef.spriteSheet) {
    const img = fxImgElCache[vfxDef.spriteSheet];
    if (!img) {
      getChromaFxImage(vfxDef.spriteSheet);
      // Fallback until chroma cache is ready
      context.save();
      context.fillStyle = projectile.color || "#ffd54f";
      context.beginPath();
      context.arc(x, y, isSkill ? 10 : 6, 0, Math.PI * 2);
      context.fill();
      context.restore();
      return;
    }

    context.save();

    const angle = Math.atan2(projectile.vy, projectile.vx);
    context.translate(x, y);
    context.rotate(angle);

    const width = vfxDef.width || 100;
    const height = vfxDef.height || 50;
    const scale = 0.3;
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    try {
      context.drawImage(img, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
    } catch (e) {
      context.fillStyle = projectile.color || "#ffd54f";
      context.fillRect(-10, -10, 20, 20);
    }

    context.restore();
    return;
  }
  
  const radius = isSkill ? 12 : 6;
  const angle = Math.atan2(projectile.vy, projectile.vx);

  const setGlow = (color, blur) => {
    context.shadowColor = color;
    context.shadowBlur = blur;
  };
  const resetGlow = () => {
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
  };

  context.save();

  // 1. Cyclops (0_*) - Lasers
  if (species.startsWith("0_")) {
    if (species === "0_1_cyclopse") {
      // Stage 1: Small yellow sphere
      context.beginPath();
      context.arc(x, y, radius + 2, 0, Math.PI * 2);
      context.fillStyle = "#172033";
      context.fill();

      const grad = context.createRadialGradient(x - 1.5, y - 1.5, 1, x, y, radius);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.3, "#fff0a3");
      grad.addColorStop(1, "#c98218");
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = grad;
      context.fill();

    } else if (species === "0_2_cyclopsis") {
      // Stage 2: Orange laser capsule & Glow
      setGlow("#ff8800", isSkill ? 14 : 8);
      context.translate(x, y);
      context.rotate(angle);
      
      const width = isSkill ? 32 : 20;
      const height = isSkill ? 12 : 8;

      // Stroke
      context.fillStyle = "#172033";
      context.beginPath();
      context.roundRect(-width/2 - 2, -height/2 - 2, width + 4, height + 4, height/2 + 2);
      context.fill();

      // Orange gradient fill
      const grad = context.createLinearGradient(-width/2, 0, width/2, 0);
      grad.addColorStop(0, "#ffbb00");
      grad.addColorStop(0.5, "#ff6600");
      grad.addColorStop(1, "#cc3300");

      context.fillStyle = grad;
      context.beginPath();
      context.roundRect(-width/2, -height/2, width, height, height/2);
      context.fill();

      // White core
      context.fillStyle = "#ffffff";
      context.beginPath();
      context.roundRect(-width/4, -height/4, width/2, height/2, height/4);
      context.fill();

    } else if (species === "0_3_hatefulclops") {
      // Stage 3: Thick demonic laser beam capsule (Red outline, White core, intense red glow)
      setGlow("#ff0055", isSkill ? 24 : 14);
      context.translate(x, y);
      context.rotate(angle);
      
      const width = isSkill ? 40 : 28;
      const height = isSkill ? 18 : 12;

      // Outer Red/Dark stroke
      context.fillStyle = "#172033";
      context.beginPath();
      context.roundRect(-width/2 - 3, -height/2 - 3, width + 6, height + 6, height/2 + 3);
      context.fill();

      // Red fill
      context.fillStyle = "#ff0055";
      context.beginPath();
      context.roundRect(-width/2 - 1, -height/2 - 1, width + 2, height + 2, height/2 + 1);
      context.fill();

      // Pure White core
      context.fillStyle = "#ffffff";
      context.beginPath();
      context.roundRect(-width/2 + 3, -height/3, width - 6, (height * 2)/3, height/3);
      context.fill();

    } else if (species === "0_4_goliathclops") {
      // Stage 4: Golden plasma orb with orange glow and outer energy ring
      setGlow("#ffa500", isSkill ? 28 : 16);
      context.translate(x, y);
      
      const r = radius * 1.5;
      const angleRot = (projectile.life * 12) % (Math.PI * 2);
      context.rotate(angleRot);

      // Draw background ring
      context.strokeStyle = "#ff5500";
      context.lineWidth = 3;
      context.beginPath();
      context.ellipse(0, 0, r + 4, (r + 4) * 0.4, 0, 0, Math.PI * 2);
      context.stroke();

      // Black outline
      context.beginPath();
      context.arc(0, 0, r + 2.5, 0, Math.PI * 2);
      context.fillStyle = "#172033";
      context.fill();

      // Main golden gradient fill
      const grad = context.createRadialGradient(-2, -2, 1, 0, 0, r);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.3, "#ffcc00");
      grad.addColorStop(1, "#d47a00");
      context.beginPath();
      context.arc(0, 0, r, 0, Math.PI * 2);
      context.fillStyle = grad;
      context.fill();

    } else if (species === "0_5_abyss_monarch") {
      // Stage 5: Void Black Hole: Intense dark purple corona swirling around a black core
      setGlow("#aa00ff", isSkill ? 32 : 20);
      context.translate(x, y);
      
      const r = radius * 1.7;
      const spin = (projectile.life * -15) % (Math.PI * 2);
      context.rotate(spin);

      // Swirling corona paths (4 arcs)
      context.strokeStyle = "rgba(170, 0, 255, 0.75)";
      context.lineWidth = 4;
      for (let i = 0; i < 4; i++) {
        context.beginPath();
        context.arc(0, 0, r - 2, i * Math.PI / 2, (i + 1) * Math.PI / 2 - 0.2);
        context.stroke();
      }

      // Outer outline
      context.beginPath();
      context.arc(0, 0, r / 1.5 + 2, 0, Math.PI * 2);
      context.fillStyle = "#172033";
      context.fill();

      // Black Hole core (Black center with purple rim)
      const grad = context.createRadialGradient(0, 0, 1, 0, 0, r / 1.5);
      grad.addColorStop(0, "#000000");
      grad.addColorStop(0.7, "#1a0033");
      grad.addColorStop(1, "#7b1fa2");
      context.beginPath();
      context.arc(0, 0, r / 1.5, 0, Math.PI * 2);
      context.fillStyle = grad;
      context.fill();
    }

  // 2. LovelyDoll (1_*) - Tears/Candies
  } else if (species.startsWith("1_")) {
    if (species === "1_1_lovelydoll") {
      // Stage 1: Small teardrop
      context.translate(x, y);
      context.rotate(angle);
      
      context.fillStyle = "#172033";
      context.beginPath();
      context.arc(-2, 0, radius + 2, Math.PI/2, -Math.PI/2);
      context.lineTo(radius * 1.5 + 2, 0);
      context.closePath();
      context.fill();

      const grad = context.createRadialGradient(-2, 0, 1, -2, 0, radius);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.4, "#7cd5ff");
      grad.addColorStop(1, "#3fa5ff");

      context.fillStyle = grad;
      context.beginPath();
      context.arc(-2, 0, radius, Math.PI/2, -Math.PI/2);
      context.lineTo(radius * 1.5, 0);
      context.closePath();
      context.fill();

    } else if (species === "1_2_cutie") {
      // Stage 2: Blue tear with long tail trail
      resetGlow();
      const tailLength = isSkill ? 40 : 25;
      const tailGrad = context.createLinearGradient(x, y, x - Math.cos(angle) * tailLength, y - Math.sin(angle) * tailLength);
      tailGrad.addColorStop(0, "rgba(63, 165, 255, 0.7)");
      tailGrad.addColorStop(0.5, "rgba(63, 165, 255, 0.3)");
      tailGrad.addColorStop(1, "rgba(63, 165, 255, 0)");

      context.strokeStyle = tailGrad;
      context.lineWidth = isSkill ? 10 : 6;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(x, y);
      context.lineTo(x - Math.cos(angle) * tailLength, y - Math.sin(angle) * tailLength);
      context.stroke();

      // Main tear drop body
      context.translate(x, y);
      context.rotate(angle);

      const r = radius * 1.1;

      context.fillStyle = "#172033";
      context.beginPath();
      context.arc(-3, 0, r + 2, Math.PI/2, -Math.PI/2);
      context.lineTo(r * 1.6 + 2, 0);
      context.closePath();
      context.fill();

      const bodyGrad = context.createRadialGradient(-3, 0, 1, -3, 0, r);
      bodyGrad.addColorStop(0, "#ffffff");
      bodyGrad.addColorStop(0.4, "#3fa5ff");
      bodyGrad.addColorStop(1, "#0066cc");

      context.fillStyle = bodyGrad;
      context.beginPath();
      context.arc(-3, 0, r, Math.PI/2, -Math.PI/2);
      context.lineTo(r * 1.6, 0);
      context.closePath();
      context.fill();

    } else if (species === "1_3_candy") {
      // Stage 3: High-speed spinning candy wheel with pink/white swirls
      setGlow("#ff66a3", isSkill ? 16 : 10);
      context.translate(x, y);
      
      const spinAngle = (projectile.life * 22) % (Math.PI * 2);
      context.rotate(spinAngle);

      const r = radius * 1.4;

      // Stroke outer
      context.beginPath();
      context.arc(0, 0, r + 2.5, 0, Math.PI * 2);
      context.fillStyle = "#172033";
      context.fill();

      // Pink background disk
      context.beginPath();
      context.arc(0, 0, r, 0, Math.PI * 2);
      context.fillStyle = "#ff66a3";
      context.fill();

      // White spiral rays (6 segments)
      context.fillStyle = "#ffffff";
      for (let i = 0; i < 6; i++) {
        context.beginPath();
        context.moveTo(0, 0);
        const startRad = (i * Math.PI * 2) / 6;
        const endRad = startRad + (Math.PI * 2) / 12;
        context.arc(0, 0, r, startRad, endRad);
        context.closePath();
        context.fill();
      }

      // Center candy gem
      context.beginPath();
      context.arc(0, 0, r / 3.5, 0, Math.PI * 2);
      context.fillStyle = "#ffffff";
      context.fill();

      context.beginPath();
      context.arc(0, 0, r / 5, 0, Math.PI * 2);
      context.fillStyle = "#ff0066";
      context.fill();

    } else if (species === "1_4_marionette") {
      // Stage 4: Spinning crystal cross-cutting blades (Cyan / Ghostly Blue)
      setGlow("#00b0ff", isSkill ? 20 : 12);
      context.translate(x, y);
      
      const spinAngle = (projectile.life * 18) % (Math.PI * 2);
      context.rotate(spinAngle);

      const r = radius * 1.5;

      const drawBlade = (angleOffset) => {
        context.save();
        context.rotate(angleOffset);
        
        context.fillStyle = "#172033";
        context.beginPath();
        context.arc(0, -r * 0.4, r * 0.6 + 2.5, 0, Math.PI, true);
        context.closePath();
        context.fill();

        const grad = context.createLinearGradient(0, -r, 0, 0);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.5, "#80d8ff");
        grad.addColorStop(1, "#00b0ff");
        context.fillStyle = grad;
        context.beginPath();
        context.arc(0, -r * 0.4, r * 0.6, 0, Math.PI, true);
        context.closePath();
        context.fill();

        context.restore();
      };

      drawBlade(0);
      drawBlade(Math.PI);

      context.beginPath();
      context.arc(0, 0, 4.5, 0, Math.PI * 2);
      context.fillStyle = "#172033";
      context.fill();
      context.beginPath();
      context.arc(0, 0, 2.5, 0, Math.PI * 2);
      context.fillStyle = "#ff5252";
      context.fill();

    } else if (species === "1_5_valkyria_doll") {
      // Stage 5: Holy warhammer spinning with golden wings trails
      setGlow("#ffeb3b", isSkill ? 30 : 18);
      context.translate(x, y);
      
      const spinAngle = (projectile.life * 15) % (Math.PI * 2);
      context.rotate(spinAngle);

      const r = radius * 1.6;

      context.fillStyle = "rgba(255, 255, 255, 0.4)";
      context.beginPath();
      context.ellipse(-r * 0.4, 0, r * 0.6, r * 0.25, Math.PI / 6, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = "#5d4037";
      context.lineWidth = 4;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(0, -r * 0.5);
      context.lineTo(0, r * 0.75);
      context.stroke();

      context.fillStyle = "#172033";
      context.beginPath();
      context.roundRect(-r * 0.7 - 2, -r * 0.4 - 2, r * 1.4 + 4, r * 0.5 + 4, 3);
      context.fill();

      const grad = context.createLinearGradient(-r * 0.7, 0, r * 0.7, 0);
      grad.addColorStop(0, "#ffd700");
      grad.addColorStop(0.5, "#fff2be");
      grad.addColorStop(1, "#c59f00");
      context.fillStyle = grad;
      context.beginPath();
      context.roundRect(-r * 0.7, -r * 0.4, r * 1.4, r * 0.5, 2);
      context.fill();

      context.fillStyle = "#00e5ff";
      context.beginPath();
      context.arc(0, -r * 0.15, 3.5, 0, Math.PI * 2);
      context.fill();
    }

  // 3. Unnyangi (2_*) - Paws/Lightning
  } else if (species.startsWith("2_")) {
    if (species === "2_1_unnyangi") {
      // Stage 1: Small green sphere
      context.beginPath();
      context.arc(x, y, radius + 2, 0, Math.PI * 2);
      context.fillStyle = "#172033";
      context.fill();

      const grad = context.createRadialGradient(x - 1.5, y - 1.5, 1, x, y, radius);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.3, "#6fe26f");
      grad.addColorStop(1, "#205433");
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = grad;
      context.fill();

    } else if (species === "2_2_unnyangsam") {
      // Stage 2: Spinning green cat paw emblem
      context.translate(x, y);
      const spinAngle = (projectile.life * 10) % (Math.PI * 2);
      context.rotate(spinAngle);

      const r = radius * 1.3;

      const drawPaw = (ctx, padR, toeR) => {
        ctx.beginPath();
        ctx.arc(0, r * 0.15, padR, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(-r * 0.65, -r * 0.15, toeR, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(-r * 0.25, -r * 0.55, toeR, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(r * 0.25, -r * 0.55, toeR, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(r * 0.65, -r * 0.15, toeR, 0, Math.PI * 2);
        ctx.fill();
      };

      context.fillStyle = "#172033";
      drawPaw(context, r * 0.5 + 2.5, r * 0.22 + 2);

      context.fillStyle = "#58ab58";
      drawPaw(context, r * 0.5, r * 0.22);

      context.fillStyle = "#c2ed82";
      context.beginPath();
      context.arc(0, r * 0.15, r * 0.25, 0, Math.PI * 2);
      context.fill();

    } else if (species === "2_3_unrang") {
      // Stage 3: Electric lightning ball
      const r = radius * 1.4;
      
      resetGlow();
      context.strokeStyle = "rgba(100, 220, 255, 0.85)";
      context.lineWidth = 1.5;
      
      const sparkCount = isSkill ? 5 : 3;
      for (let i = 0; i < sparkCount; i++) {
        const baseAngle = Math.random() * Math.PI * 2;
        const length = r * (1.1 + Math.random() * 0.8);
        const midX = x + Math.cos(baseAngle) * (length * 0.5) + (Math.random() - 0.5) * 6;
        const midY = y + Math.sin(baseAngle) * (length * 0.5) + (Math.random() - 0.5) * 6;
        const endX = x + Math.cos(baseAngle) * length;
        const endY = y + Math.sin(baseAngle) * length;

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(midX, midY);
        context.lineTo(endX, endY);
        context.stroke();
      }

      setGlow("#3cd3ff", isSkill ? 18 : 12);
      
      context.beginPath();
      context.arc(x, y, r + 2, 0, Math.PI * 2);
      context.fillStyle = "#172033";
      context.fill();

      const grad = context.createRadialGradient(x, y, 1, x, y, r);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.4, "#3cd3ff");
      grad.addColorStop(1, "#0066cc");
      
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2);
      context.fillStyle = grad;
      context.fill();

    } else if (species === "2_4_unraiju") {
      // Stage 4: Yellow electric lightning spark ball
      const r = radius * 1.6;
      
      resetGlow();
      context.strokeStyle = "rgba(255, 235, 59, 0.9)";
      context.lineWidth = 2.0;
      
      const sparkCount = isSkill ? 7 : 4;
      for (let i = 0; i < sparkCount; i++) {
        const baseAngle = Math.random() * Math.PI * 2;
        const length = r * (1.2 + Math.random() * 0.7);
        const midX = x + Math.cos(baseAngle) * (length * 0.45) + (Math.random() - 0.5) * 8;
        const midY = y + Math.sin(baseAngle) * (length * 0.45) + (Math.random() - 0.5) * 8;
        const endX = x + Math.cos(baseAngle) * length;
        const endY = y + Math.sin(baseAngle) * length;

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(midX, midY);
        context.lineTo(endX, endY);
        context.stroke();
      }

      setGlow("#ffff00", isSkill ? 24 : 15);
      
      context.beginPath();
      context.arc(x, y, r + 2.5, 0, Math.PI * 2);
      context.fillStyle = "#172033";
      context.fill();

      const grad = context.createRadialGradient(x, y, 1, x, y, r);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.3, "#ffeb3b");
      grad.addColorStop(1, "#f57f17");
      
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2);
      context.fillStyle = grad;
      context.fill();

    } else if (species === "2_5_kirin_nyang") {
      // Stage 5: Celestial Turquoise Dragon Lightning Sphere
      const r = radius * 1.8;
      
      resetGlow();
      context.strokeStyle = "rgba(29, 233, 182, 0.95)";
      context.lineWidth = 2.0;
      
      const sparkCount = isSkill ? 9 : 5;
      for (let i = 0; i < sparkCount; i++) {
        const baseAngle = Math.random() * Math.PI * 2;
        const length = r * (1.3 + Math.random() * 0.8);
        const mid1X = x + Math.cos(baseAngle) * (length * 0.3) + (Math.random() - 0.5) * 6;
        const mid1Y = y + Math.sin(baseAngle) * (length * 0.3) + (Math.random() - 0.5) * 6;
        const mid2X = x + Math.cos(baseAngle) * (length * 0.65) + (Math.random() - 0.5) * 6;
        const mid2Y = y + Math.sin(baseAngle) * (length * 0.65) + (Math.random() - 0.5) * 6;
        const endX = x + Math.cos(baseAngle) * length;
        const endY = y + Math.sin(baseAngle) * length;

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(mid1X, mid1Y);
        context.lineTo(mid2X, mid2Y);
        context.lineTo(endX, endY);
        context.stroke();
      }

      setGlow("#00e5ff", isSkill ? 32 : 20);
      
      context.beginPath();
      context.arc(x, y, r + 3, 0, Math.PI * 2);
      context.fillStyle = "#172033";
      context.fill();

      const grad = context.createRadialGradient(x, y, 1, x, y, r);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.3, "#1de9b6");
      grad.addColorStop(0.7, "#00b0ff");
      grad.addColorStop(1, "#006064");
      
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2);
      context.fillStyle = grad;
      context.fill();
    }

  } else {
    const size = isSkill ? 18 : 10;
    context.fillStyle = "#172033";
    context.fillRect(x - size / 2 - 2, y - size / 2 - 2, size + 4, size + 4);
    context.fillStyle = projectile.color;
    context.fillRect(x - size / 2, y - size / 2, size, size);
    context.fillStyle = "#ffffff";
    context.fillRect(x - size / 4, y - size / 4, Math.max(3, size / 3), Math.max(3, size / 3));
  }

  context.restore();
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

    if (button.dataset.automationFamily && (button.dataset.automationField === "autoBuy" || button.dataset.automationField === "autoLevelUp")) {
      updateAutomationSettingFromInput(button, false);
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
    if (button.dataset.shopBuy) shopBuyMonster(button.dataset.shopBuy);
    if (button.dataset.shopFeed) shopFeedMonster();
    if (button.dataset.shopSell) shopSellMonster();
    if (button.dataset.toggleId) togglePvpTeamMember(button.dataset.toggleId);
    if (button.dataset.removeId) togglePvpTeamMember(button.dataset.removeId);
  });

  document.addEventListener("input", (event) => {
    const input = event.target.closest("[data-automation-family][data-automation-field]");
    if (!input) return;
    updateAutomationSettingFromInput(input, false);
  });

  document.addEventListener("change", (event) => {
    const input = event.target.closest("[data-automation-family][data-automation-field]");
    if (!input) return;
    updateAutomationSettingFromInput(input, true);
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

  // Cheat: infinite gold/crystal toggle on brand-gem click
  const brandGem = document.querySelector(".brand-gem");
  if (brandGem) {
    brandGem.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (gameState._cheatInfiniteResources) {
        gameState._cheatInfiniteResources = false;
        gameState.gold = 0;
        gameState.crystal = 0;
        brandGem.style.background = "";
        brandGem.style.boxShadow = "";
      } else {
        gameState._cheatInfiniteResources = true;
        gameState.gold = 999999999;
        gameState.crystal = 999999999;
        brandGem.style.background = "#ffd700";
        brandGem.style.boxShadow = "inset 6px 6px 0 #fff8a0, inset -6px -6px 0 #c59f00, 4px 4px 0 var(--paper-dark), 0 0 12px #ffd700";
      }
      syncDisplayResources();
      updateResourceDisplays();
      saveGame();
      if (uiState.currentScreen === "mining") renderMining();
    });
  }

  $("#reset-save-button").addEventListener("click", resetSave);
  $("#rock-target").addEventListener("click", startMining);
  $("#mine-toggle-button").addEventListener("click", toggleMining);
  $("#evolve-button").addEventListener("click", attemptEvolution);
  $("#start-pvp-button").addEventListener("click", startPvp);
  $("#exit-pvp-button").addEventListener("click", exitPvp);
  $("#battle-return-button").addEventListener("click", exitPvp);

  const upgradeTalentBtn = $("#upgrade-talent-button");
  if (upgradeTalentBtn) {
    upgradeTalentBtn.addEventListener("click", upgradePlayerTalent);
  }

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

      const clickedAutoEvolver = event.target.closest("#mine-auto-evolver");
      const evoEl = $("#mine-auto-evolver");
      let targetIsAutoEvolver = clickedAutoEvolver ? true : false;

      if (!targetIsAutoEvolver && evoEl) {
        const evoRect = evoEl.getBoundingClientRect();
        const ex0 = evoRect.left - rect.left;
        const ex1 = evoRect.right - rect.left;
        const ey0 = evoRect.top - rect.top;
        const ey1 = evoRect.bottom - rect.top;

        if (clickX >= ex0 && clickX <= ex1 && clickY >= ey0 && clickY <= ey1) {
          targetIsAutoEvolver = true;
        }
      }

      if (targetIsIncinerator) targetIsAutoEvolver = false;
      if (targetIsAutoEvolver) targetIsIncinerator = false;

      let leftPercent, topPercent;
      if (targetIsIncinerator && incEl) {
        const incRect = incEl.getBoundingClientRect();
        const incCenterX = (incRect.left + incRect.width / 2) - rect.left;
        const incCenterY = (incRect.top + incRect.height / 2) - rect.top;
        leftPercent = ((incCenterX / rect.width) * 100).toFixed(2) + "%";
        topPercent = ((incCenterY / rect.height) * 100).toFixed(2) + "%";
      } else if (targetIsAutoEvolver && evoEl) {
        const evoRect = evoEl.getBoundingClientRect();
        const evoCenterX = (evoRect.left + evoRect.width / 2) - rect.left;
        const evoCenterY = (evoRect.top + evoRect.height / 2) - rect.top;
        leftPercent = ((evoCenterX / rect.width) * 100).toFixed(2) + "%";
        topPercent = ((evoCenterY / rect.height) * 100).toFixed(2) + "%";
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
        spot.isTargetingAutoEvolver = targetIsAutoEvolver;
        spot.isAutomationMove = false;

        const monster = gameState.monsters[idx];
        if (monster) {
          monster.isAutoEvolving = false;
        }

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
  window.addEventListener("resize", () => {
    if (uiState.currentScreen === "mining") {
      updateRockHpGaugePosition();
    }
  });
  window.addEventListener("beforeunload", saveGame);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showToast(message, type = "") {
  // Toast notifications disabled by user request
}

function init() {
  preloadMonsterSpriteImages();
  renderStarterOptions();
  bindEvents();
  loadGame();
  syncDisplayResources();
  startResourceRollingLoop();
  startMiningAutomationLoop();
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

function spawnResourceGainPopup(targetEl, amount, type) {
  if (!targetEl || amount <= 0 || document.hidden) return;

  const rect = targetEl.getBoundingClientRect();
  const popup = document.createElement("span");
  popup.className = `resource-gain-popup ${type === "crystal" ? "crystal" : "gold"}`;
  popup.textContent = `+${amount.toLocaleString()}`;
  popup.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 18}px`;
  popup.style.top = `${rect.top + rect.height / 2}px`;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 900);
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

  let landedParticles = 0;
  let landedTotal = 0;
  
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
          landedParticles += 1;
          landedTotal += particleValue;
          if (landedParticles === particlesCount) {
            spawnResourceGainPopup(targetEl, landedTotal, type);
          }
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
