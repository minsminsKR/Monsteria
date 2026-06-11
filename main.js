"use strict";

// ---------------------------------------------------------------------------
// Monsteria data
// Add new monster definitions here. UI sprites can later be replaced with PNGs
// without changing the save or gameplay structures.
// ---------------------------------------------------------------------------

const SAVE_KEY = "monsteria-save-v1";
const EVO_STONE_PRICE = 120;
const SPRITE_ASSET_VERSION = "20260611-goliath-row3-align";
const MAX_MINING_DEBRIS_PARTICLES = 72;
const MAX_RESOURCE_PARTICLES = 48;

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
    spriteSheet: "assets/monsters/0_4_goliathclops/0_4_goliathclops-spritesheet-game.png",
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
    spriteSheet: "assets/monsters/0_5_abyss_monarch/0_5_abyss_monarch-spritesheet-game.png",
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
    spriteSheet: "assets/monsters/1_4_marionette/1_4_marionette-spritesheet-game.png",
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
    spriteSheet: "assets/monsters/1_5_valkyria_doll/1_5_valkyria_doll-spritesheet-game.png",
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
    spriteSheet: "assets/monsters/2_4_unraiju/2_4_unraiju-spritesheet-game.png",
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
    spriteSheet: "assets/monsters/2_5_kirin_nyang/2_5_kirin_nyang-spritesheet-game.png",
    colors: { main: "#1de9b6", light: "#ffffff", dark: "#00b0ff", accent: "#00e5ff" },
    base: { attack: 350, attackSpeed: 2.15, maxHp: 2450, defense: 155, skillDamage: 960 },
    growth: { attack: 125, attackSpeed: 0.21, maxHp: 620, defense: 58, skillDamage: 375 }
  },
  "0_6_cosmic_overlord": {
    id: "0_6_cosmic_overlord",
    name: "코스믹오버로드",
    role: "Singularity God-Eye",
    description: "어비스모나크가 우주 그 자체를 삼킨 궁극의 형태. 은하를 꿰뚫는 특이점 광선으로 시공간을 소멸시키는 절대자.",
    skillName: "Singularity Annihilation",
    skillCooldown: 0.8,
    projectileSpeed: 980,
    moveSpeed: 255,
    spriteSheet: "assets/monsters/0_6_cosmic_overlord/0_6_cosmic_overlord-spritesheet-game.png",
    colors: { main: "#311b92", light: "#b388ff", dark: "#12005e", accent: "#00e5ff" },
    base: { attack: 540, attackSpeed: 3.45, maxHp: 4200, defense: 240, skillDamage: 1650 },
    growth: { attack: 190, attackSpeed: 0.32, maxHp: 980, defense: 88, skillDamage: 580 }
  },
  "1_6_seraph_valkyria": {
    id: "1_6_seraph_valkyria",
    name: "세라프발키리아",
    role: "Celestial Aegis Archangel",
    description: "발키리돌이 천상의 빛으로 승천한 6익 대천사. 황금 성창과 심판의 깃털 폭풍으로 전장을 정화하는 수호신.",
    skillName: "Celestial Judgement",
    skillCooldown: 2.4,
    projectileSpeed: 560,
    moveSpeed: 195,
    spriteSheet: "assets/monsters/1_6_seraph_valkyria/1_6_seraph_valkyria-spritesheet-game.png",
    colors: { main: "#fff8e1", light: "#ffffff", dark: "#ff8f00", accent: "#ffd700" },
    base: { attack: 920, attackSpeed: 1.62, maxHp: 6600, defense: 460, skillDamage: 2600 },
    growth: { attack: 330, attackSpeed: 0.15, maxHp: 1550, defense: 175, skillDamage: 1020 }
  },
  "2_6_divine_kirin": {
    id: "2_6_divine_kirin",
    name: "신수기린황",
    role: "Heavenly Thunder Sovereign",
    description: "기린냥이 하늘의 신수로 각성한 뇌제(雷帝). 천둥의 관을 쓰고 창세의 뇌전 폭풍을 부리는 폭풍의 황제.",
    skillName: "Heavenly Thunder Genesis",
    skillCooldown: 1.3,
    projectileSpeed: 780,
    moveSpeed: 225,
    spriteSheet: "assets/monsters/2_6_divine_kirin/2_6_divine_kirin-spritesheet-game.png",
    colors: { main: "#00e5ff", light: "#ffffff", dark: "#006064", accent: "#ffd54f" },
    base: { attack: 720, attackSpeed: 2.35, maxHp: 5200, defense: 330, skillDamage: 2000 },
    growth: { attack: 260, attackSpeed: 0.23, maxHp: 1280, defense: 120, skillDamage: 780 }
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

// Populate ultimate levels 50 to 59 (stage 6 zone) with a steeper cost curve
for (let l = 50; l <= 59; l++) {
  levelRequirements[l] = {
    gold: Math.round(22000 * Math.pow(l / 19, 1.9)),
    crystal: Math.round(1150 * Math.pow(l / 19, 2.1)),
    chance: Math.max(0.03, parseFloat((0.22 * Math.pow(19 / l, 0.85)).toFixed(2)))
  };
}

function getMaxLevel(species) {
  return 60;
}

function getMonsterFamilyPrefix(species) {
  if (!species) return "0";
  return species.split("_")[0];
}

function getSpeciesForLevel(familyPrefix, level) {
  if (level >= 50) {
    if (familyPrefix === "0") return "0_6_cosmic_overlord";
    if (familyPrefix === "1") return "1_6_seraph_valkyria";
    if (familyPrefix === "2") return "2_6_divine_kirin";
  } else if (level >= 40) {
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
  if (species === "0_5_abyss_monarch") return "0_6_cosmic_overlord";
  
  if (species === "1_1_lovelydoll") return "1_2_cutie";
  if (species === "1_2_cutie") return "1_3_candy";
  if (species === "1_3_candy") return "1_4_marionette";
  if (species === "1_4_marionette") return "1_5_valkyria_doll";
  if (species === "1_5_valkyria_doll") return "1_6_seraph_valkyria";
  
  if (species === "2_1_unnyangi") return "2_2_unnyangsam";
  if (species === "2_2_unnyangsam") return "2_3_unrang";
  if (species === "2_3_unrang") return "2_4_unraiju";
  if (species === "2_4_unraiju") return "2_5_kirin_nyang";
  if (species === "2_5_kirin_nyang") return "2_6_divine_kirin";
  return null;
}

function getMonsterStage(species) {
  if (["0_1_cyclopse", "1_1_lovelydoll", "2_1_unnyangi"].includes(species)) return 1;
  if (["0_2_cyclopsis", "1_2_cutie", "2_2_unnyangsam"].includes(species)) return 2;
  if (["0_3_hatefulclops", "1_3_candy", "2_3_unrang"].includes(species)) return 3;
  if (["0_4_goliathclops", "1_4_marionette", "2_4_unraiju"].includes(species)) return 4;
  if (["0_5_abyss_monarch", "1_5_valkyria_doll", "2_5_kirin_nyang"].includes(species)) return 5;
  if (["0_6_cosmic_overlord", "1_6_seraph_valkyria", "2_6_divine_kirin"].includes(species)) return 6;
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

// ---------------------------------------------------------------------------
// Achievements
// ---------------------------------------------------------------------------

const achievementDefinitions = [
  { id: "first_evolution", name: "첫 진화", description: "몬스터를 처음으로 진화시키기", reward: 50, check: (s) => (s.stats?.evolutions || 0) >= 1 },
  { id: "evolution_master", name: "진화 마스터", description: "누적 진화 25회 달성", reward: 300, check: (s) => (s.stats?.evolutions || 0) >= 25 },
  { id: "ultimate_form", name: "궁극의 존재", description: "6단계 궁극진화 몬스터 획득", reward: 1000, check: (s) => (s.collection || []).some((species) => getMonsterStage(species) >= 6) },
  { id: "collector_9", name: "수집가", description: "도감에 몬스터 9종 등록", reward: 200, check: (s) => (s.collection || []).length >= 9 },
  { id: "collector_18", name: "몬스터 박사", description: "도감 18종 완성", reward: 1500, check: (s) => (s.collection || []).length >= 18 },
  { id: "tower_10", name: "탑 등반가", description: "무한의 탑 10층 클리어", reward: 250, check: (s) => (s.tower?.highestFloor || 0) >= 10 },
  { id: "tower_25", name: "탑 정복자", description: "무한의 탑 25층 클리어", reward: 800, check: (s) => (s.tower?.highestFloor || 0) >= 25 },
  { id: "tower_50", name: "하늘 위의 존재", description: "무한의 탑 50층 클리어", reward: 2500, check: (s) => (s.tower?.highestFloor || 0) >= 50 },
  { id: "gold_100k", name: "골드 부자", description: "누적 100,000 골드 획득", reward: 150, check: (s) => (s.stats?.goldEarned || 0) >= 100000 },
  { id: "gold_1m", name: "골드 재벌", description: "누적 1,000,000 골드 획득", reward: 600, check: (s) => (s.stats?.goldEarned || 0) >= 1000000 },
  { id: "incinerate_10", name: "소각 기술자", description: "몬스터 10마리 소각", reward: 100, check: (s) => (s.stats?.incinerated || 0) >= 10 },
  { id: "incinerate_100", name: "불꽃의 거장", description: "몬스터 100마리 소각", reward: 500, check: (s) => (s.stats?.incinerated || 0) >= 100 },
  { id: "rocks_500", name: "광부의 길", description: "바위 500개 파괴", reward: 200, check: (s) => (s.stats?.rocksBroken || 0) >= 500 },
  { id: "max_level", name: "한계 돌파", description: "몬스터를 LV60까지 성장시키기", reward: 2000, check: (s) => s.monsters.some((monster) => monster.level >= 60) }
];

function checkAchievements() {
  if (!gameState.started) return;
  if (!Array.isArray(gameState.achievements)) gameState.achievements = [];

  let unlockedAny = false;
  achievementDefinitions.forEach((achievement) => {
    if (gameState.achievements.includes(achievement.id)) return;
    if (!achievement.check(gameState)) return;

    gameState.achievements.push(achievement.id);
    gameState.crystal += achievement.reward;
    unlockedAny = true;
    showToast(`업적 달성! [${achievement.name}] +${achievement.reward} Crystal`, "legendary");
    soundManager.play("achievement");
  });

  if (unlockedAny) {
    saveGame();
    updateResourceDisplays();
    if (uiState.currentScreen === "codex") renderCodex();
  }
}

function recordSpeciesDiscovery(species) {
  if (!monsterDefinitions[species]) return false;
  if (!Array.isArray(gameState.collection)) gameState.collection = [];
  if (gameState.collection.includes(species)) return false;

  gameState.collection.push(species);
  const stage = getMonsterStage(species);
  showToast(`도감 등록! [${monsterDefinitions[species].name}] (Stage ${stage})`, stage >= 5 ? "legendary" : "info");
  checkAchievements();
  return true;
}

function trackStat(key, amount = 1) {
  if (!gameState.stats) {
    gameState.stats = { goldEarned: 0, incinerated: 0, evolutions: 0, rocksBroken: 0 };
  }
  gameState.stats[key] = (gameState.stats[key] || 0) + amount;
}

// ---------------------------------------------------------------------------
// Evolution cutscene
// ---------------------------------------------------------------------------

let evolutionCutsceneTimer = null;

function playEvolutionCutscene(monster) {
  const overlay = $("#evolution-cutscene");
  if (!overlay || document.hidden) return;

  const stage = getMonsterStage(monster.species);
  const isUltimate = stage >= 6;

  clearTimeout(evolutionCutsceneTimer);
  overlay.classList.remove("is-hidden", "is-ultimate");
  if (isUltimate) overlay.classList.add("is-ultimate");

  const title = $("#cutscene-title");
  if (title) title.textContent = isUltimate ? "★ ULTIMATE EVOLUTION ★" : "EVOLUTION!";
  const nameEl = $("#cutscene-name");
  if (nameEl) nameEl.textContent = `${monster.name} — STAGE ${stage}`;

  const spriteWrap = $("#cutscene-sprite");
  if (spriteWrap) {
    spriteWrap.innerHTML = monsterSpriteMarkup(monster.species, monster.level);
    spriteWrap.classList.remove("revealed");
    void spriteWrap.offsetWidth;
  }

  const particleLayer = overlay.querySelector(".cutscene-particles");
  if (particleLayer) {
    particleLayer.innerHTML = "";
    const particleCount = isUltimate ? 38 : 22;
    for (let index = 0; index < particleCount; index += 1) {
      const particle = document.createElement("span");
      const angle = Math.random() * Math.PI * 2;
      const distance = 90 + Math.random() * 220;
      particle.style.setProperty("--px", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--py", `${Math.sin(angle) * distance}px`);
      particle.style.animationDelay = `${620 + Math.random() * 520}ms`;
      if (isUltimate) particle.classList.add("cosmic");
      particleLayer.appendChild(particle);
    }
  }

  soundManager.play("charge");
  setTimeout(() => {
    if (overlay.classList.contains("is-hidden")) return;
    spriteWrap?.classList.add("revealed");
    soundManager.play(isUltimate ? "victory" : "success");
  }, 720);

  evolutionCutsceneTimer = setTimeout(() => {
    overlay.classList.add("is-hidden");
  }, isUltimate ? 3400 : 2500);

  overlay.onclick = () => {
    clearTimeout(evolutionCutsceneTimer);
    overlay.classList.add("is-hidden");
  };
}

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
    tower: { highestFloor: 0 },
    collection: [],
    achievements: [],
    stats: { goldEarned: 0, incinerated: 0, evolutions: 0, rocksBroken: 0 },
    lastSeen: 0
  };
}

let gameState = createDefaultGameState();

const uiState = {
  currentScreen: "starter",
  selectedEvolutionMonsterId: null,
  selectedCodexSpecies: null,
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

  const monster = gameState.monsters[index];
  if (flags.levelUp && flags.automation && monster && !shouldRunAutomatedLevelUp(monster)) {
    return false;
  }

  const center = getStageElementCenterPosition(zoneId);
  if (!center) return false;

  spot.targetLeft = center.left;
  spot.targetTop = center.top;
  spot.isMoving = true;
  spot.isTargetingIncinerator = Boolean(flags.incinerator);
  spot.isTargetingAutoEvolver = Boolean(flags.levelUp);
  spot.isAutomationMove = Boolean(flags.automation);

  if (monster) {
    monster.isAutoEvolving = false;
  }

  startMiningMovementLoop();
  if (flags.levelUp) updateEvolverZoneStatus();
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
      if (wasAutomationMove && !shouldRunAutomatedLevelUp(monster)) {
        stopMovingSpotAtCurrentPosition(index, spot);
        saveMiningPositions();
        updateEvolverZoneStatus();
        return true;
      }

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

function spawnTeleportBurst(left, top) {
  // Bursts live on the stage itself so renderMining() rebuilds don't wipe them
  const stage = $("#mine-stage");
  if (!stage) return;

  const burst = document.createElement("div");
  burst.className = "teleport-burst";
  burst.style.left = left;
  burst.style.top = top;
  stage.appendChild(burst);
  setTimeout(() => burst.remove(), 520);
}

function teleportMonsterToWaiting(index) {
  const spot = miningState.monsterPositions?.[index];
  if (!spot) return null;

  const fromPosition = { left: spot.left, top: spot.top };

  const next = getMiningSpawnCenterPosition(index);
  Object.assign(spot, next, {
    targetLeft: next.left,
    targetTop: next.top,
    isMoving: false,
    isTargetingIncinerator: false,
    isTargetingAutoEvolver: false,
    isAutomationMove: false
  });

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

  saveMiningPositions();
  return fromPosition;
}

function playTeleportVisuals(index, fromPosition) {
  if (fromPosition) spawnTeleportBurst(fromPosition.left, fromPosition.top);

  const spot = miningState.monsterPositions?.[index];
  if (spot) spawnTeleportBurst(spot.left, spot.top);

  const spotEl = document.getElementById(`mining-spot-${index}`);
  if (spotEl) {
    spotEl.classList.remove("teleport-in");
    void spotEl.offsetWidth;
    spotEl.classList.add("teleport-in");
    setTimeout(() => spotEl.classList.remove("teleport-in"), 620);
  }

  soundManager.play("teleport");
}

// Level-up loop: attempt -> teleport to waiting -> walk back to the zone -> repeat
const AUTOMATED_LEVEL_UP_MOVE_MULTIPLIER = 2.5;
const levelUpLoopTimers = new Map(); // monsterId -> timeout id

function cancelLevelUpLoop(monsterId) {
  const timer = levelUpLoopTimers.get(monsterId);
  if (timer) {
    clearTimeout(timer);
    levelUpLoopTimers.delete(monsterId);
  }
}

function shouldRunAutomatedLevelUp(monster) {
  if (!monster) return false;
  const settings = getAutomationSettingsForFamily(getMonsterFamilyPrefix(monster.species));
  return Boolean(settings.autoLevelUp && monster.level < settings.targetLevel);
}

function cancelAutomatedLevelUpForFamily(familyPrefix) {
  let stoppedAnyMove = false;

  gameState.monsters.forEach((monster, index) => {
    if (getMonsterFamilyPrefix(monster.species) !== familyPrefix) return;

    monster.isAutoEvolving = false;
    cancelLevelUpLoop(monster.id);

    const spot = miningState.monsterPositions?.[index];
    if (spot?.isTargetingAutoEvolver && spot.isAutomationMove) {
      stopMovingSpotAtCurrentPosition(index, spot);
      stoppedAnyMove = true;
    }
  });

  if (stoppedAnyMove) {
    saveMiningPositions();
  }
  updateEvolverZoneStatus();
}

function scheduleLevelUpLoopReturn(monsterId, automation) {
  cancelLevelUpLoop(monsterId);

  const timer = setTimeout(() => {
    levelUpLoopTimers.delete(monsterId);

    const index = gameState.monsters.findIndex((monster) => monster.id === monsterId);
    if (index < 0) {
      updateEvolverZoneStatus();
      return;
    }

    // If the player left the mining screen, keep the loop alive until they return
    if (uiState.currentScreen !== "mining") {
      scheduleLevelUpLoopReturn(monsterId, automation);
      return;
    }

    const monster = gameState.monsters[index];
    const settings = getAutomationSettingsForFamily(getMonsterFamilyPrefix(monster.species));
    const action = getUpgradeAction(monster);
    if (automation && !settings.autoLevelUp) {
      updateEvolverZoneStatus();
      return;
    }
    if (action.type === "max" || monster.level >= settings.targetLevel) {
      updateEvolverZoneStatus();
      return;
    }

    const commanded = commandMonsterToStageZone(index, "mine-auto-evolver", {
      levelUp: true,
      automation: Boolean(automation)
    });
    if (!commanded) {
      // Spot busy (e.g. mid-incineration) — retry shortly
      scheduleLevelUpLoopReturn(monsterId, automation);
      return;
    }
    updateEvolverZoneStatus();
  }, 600);

  levelUpLoopTimers.set(monsterId, timer);
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
      
      const baseSpeed = monsterDefinitions[monster.species].moveSpeed || 150;
      const speed = spot.isAutomationMove && spot.isTargetingAutoEvolver
        ? baseSpeed * AUTOMATED_LEVEL_UP_MOVE_MULTIPLIER
        : baseSpeed;
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
          if (wasAutomationMove && !shouldRunAutomatedLevelUp(monster)) {
            updateEvolverZoneStatus();
            return;
          }
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
  else if (spec === "cosmic_overlord") spec = "0_6_cosmic_overlord";
  
  else if (spec === "bruterock" || spec === "lovelydoll") spec = "1_1_lovelydoll";
  else if (spec === "cutie") spec = "1_2_cutie";
  else if (spec === "candy") spec = "1_3_candy";
  else if (spec === "marionette") spec = "1_4_marionette";
  else if (spec === "valkyria_doll") spec = "1_5_valkyria_doll";
  else if (spec === "seraph_valkyria") spec = "1_6_seraph_valkyria";
  
  else if (spec === "balancer" || spec === "unnyangi") spec = "2_1_unnyangi";
  else if (spec === "unnyangeoger" || spec === "unnyangsam") spec = "2_2_unnyangsam";
  else if (spec === "unrang") spec = "2_3_unrang";
  else if (spec === "unraiju") spec = "2_4_unraiju";
  else if (spec === "kirin_nyang") spec = "2_5_kirin_nyang";
  else if (spec === "divine_kirin") spec = "2_6_divine_kirin";
  
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
    automation: normalizeAutomationSettings(gameState.automation),
    tower: { highestFloor: Math.max(0, Number(gameState.tower?.highestFloor) || 0) },
    collection: Array.isArray(gameState.collection) ? gameState.collection : [],
    achievements: Array.isArray(gameState.achievements) ? gameState.achievements : [],
    stats: {
      goldEarned: Math.max(0, Number(gameState.stats?.goldEarned) || 0),
      incinerated: Math.max(0, Number(gameState.stats?.incinerated) || 0),
      evolutions: Math.max(0, Number(gameState.stats?.evolutions) || 0),
      rocksBroken: Math.max(0, Number(gameState.stats?.rocksBroken) || 0)
    },
    lastSeen: Date.now()
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
}

function createSpriteTestMonster(species, level, index) {
  return {
    id: `sprite_test_${index + 1}_${species}`,
    species,
    name: monsterDefinitions[species].name,
    level,
    stats: getMonsterStats(species, level)
  };
}

function applySpriteTestRosterFromQuery() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("spriteTest") !== "1") return false;

  const existingSave = localStorage.getItem(SAVE_KEY);
  const backupKey = `${SAVE_KEY}-backup-before-sprite-test`;
  if (existingSave && !localStorage.getItem(backupKey)) {
    localStorage.setItem(backupKey, existingSave);
  }

  const testRows = [
    ["0_1_cyclopse", 1], ["1_1_lovelydoll", 1], ["2_1_unnyangi", 1],
    ["0_2_cyclopsis", 10], ["1_2_cutie", 10], ["2_2_unnyangsam", 10],
    ["0_3_hatefulclops", 20], ["1_3_candy", 20], ["2_3_unrang", 20],
    ["0_4_goliathclops", 30], ["1_4_marionette", 30], ["2_4_unraiju", 30],
    ["0_5_abyss_monarch", 40], ["1_5_valkyria_doll", 40], ["2_5_kirin_nyang", 40],
    ["0_6_cosmic_overlord", 50], ["1_6_seraph_valkyria", 50], ["2_6_divine_kirin", 50]
  ];
  const monsters = testRows.map(([species, level], index) => createSpriteTestMonster(species, level, index));

  gameState = {
    ...createDefaultGameState(),
    started: true,
    gold: 999999999,
    crystal: 999999999,
    evoStones: 9999,
    monsters,
    miningMonsterId: monsters[0].id,
    pvpMonsterId: monsters[0].id,
    selectedRock: "stone",
    playerLevel: 60,
    collection: testRows.map(([species]) => species),
    lastSeen: Date.now()
  };
  uiState.selectedEvolutionMonsterId = monsters[0].id;
  miningState.monsterPositions = null;
  localStorage.removeItem("monsteria-mining-positions");
  saveGame();

  params.delete("spriteTest");
  const nextSearch = params.toString();
  const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", nextUrl);
  return true;
}

function appendMissingSpriteTestMonstersFromQuery() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("appendSpriteTest") !== "1") return 0;

  const testRows = [
    ["0_1_cyclopse", 1], ["1_1_lovelydoll", 1], ["2_1_unnyangi", 1],
    ["0_2_cyclopsis", 10], ["1_2_cutie", 10], ["2_2_unnyangsam", 10],
    ["0_3_hatefulclops", 20], ["1_3_candy", 20], ["2_3_unrang", 20],
    ["0_4_goliathclops", 30], ["1_4_marionette", 30], ["2_4_unraiju", 30],
    ["0_5_abyss_monarch", 40], ["1_5_valkyria_doll", 40], ["2_5_kirin_nyang", 40],
    ["0_6_cosmic_overlord", 50], ["1_6_seraph_valkyria", 50], ["2_6_divine_kirin", 50]
  ];

  if (!gameState.started) {
    gameState = {
      ...createDefaultGameState(),
      started: true,
      gold: 999999999,
      crystal: 999999999,
      evoStones: 9999,
      selectedRock: "stone",
      playerLevel: 60,
      lastSeen: Date.now()
    };
  }

  const existingSpecies = new Set(gameState.monsters.map((monster) => monster.species));
  const addedMonsters = [];
  testRows.forEach(([species, level], index) => {
    if (existingSpecies.has(species)) return;
    const monster = createSpriteTestMonster(species, level, gameState.monsters.length + index);
    gameState.monsters.push(monster);
    addedMonsters.push(monster);
    existingSpecies.add(species);
  });

  if (gameState.monsters.length > 0) {
    gameState.miningMonsterId = gameState.miningMonsterId || gameState.monsters[0].id;
    gameState.pvpMonsterId = gameState.pvpMonsterId || gameState.monsters[0].id;
  }
  gameState.collection = Array.from(new Set([...(gameState.collection || []), ...testRows.map(([species]) => species)]));
  uiState.selectedEvolutionMonsterId = uiState.selectedEvolutionMonsterId || gameState.monsters[0]?.id || null;
  miningState.monsterPositions = null;
  localStorage.removeItem("monsteria-mining-positions");
  saveGame();

  params.delete("appendSpriteTest");
  const nextSearch = params.toString();
  const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", nextUrl);
  return addedMonsters.length;
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
      automation: normalizeAutomationSettings(saved.automation),
      tower: { highestFloor: Math.max(0, Number(saved.tower?.highestFloor) || 0) },
      collection: Array.isArray(saved.collection) ? saved.collection.filter((species) => monsterDefinitions[species]) : [],
      achievements: Array.isArray(saved.achievements) ? saved.achievements : [],
      stats: {
        goldEarned: Math.max(0, Number(saved.stats?.goldEarned) || 0),
        incinerated: Math.max(0, Number(saved.stats?.incinerated) || 0),
        evolutions: Math.max(0, Number(saved.stats?.evolutions) || 0),
        rocksBroken: Math.max(0, Number(saved.stats?.rocksBroken) || 0)
      },
      lastSeen: Math.max(0, Number(saved.lastSeen) || 0)
    };

    // Sync codex with currently owned monsters
    gameState.monsters.forEach((monster) => {
      if (!gameState.collection.includes(monster.species)) {
        gameState.collection.push(monster.species);
      }
    });
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
  const spriteSheetClass = definition.spriteSheet ? " has-sprite-sheet" : "";
  const spriteSheetStyle = definition.spriteSheet
    ? ` style="--monster-sprite-sheet: url('${getVersionedSpriteSheetUrl(definition)}')"`
    : "";
  const stage = getMonsterStage(species);

  return `<div class="monster-sprite ${species} stage${stage} lv${level}${spriteSheetClass} ${extraClass}"${spriteSheetStyle} aria-hidden="true"></div>`;
}

function getVersionedSpriteSheetUrl(definition) {
  if (!definition?.spriteSheet) return "";
  const separator = definition.spriteSheet.includes("?") ? "&" : "?";
  return `${definition.spriteSheet}${separator}v=${SPRITE_ASSET_VERSION}`;
}

function preloadMonsterSpriteImages() {
  Object.values(monsterDefinitions).forEach((definition) => {
    if (!definition.spriteSheet || monsterSpriteImages[definition.id]) {
      return;
    }
    const image = new Image();
    image.src = getVersionedSpriteSheetUrl(definition);
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
  if (screenName === "tower") renderTower();
  if (screenName === "codex") renderCodex();
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
  recordSpeciesDiscovery(species);
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
  updateEvolverZoneStatus();
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
        <div class="automation-field">
          <span>목표 LV</span>
          <div class="automation-stepper">
            <button type="button" class="stepper-button" data-step="-1" data-step-family="${family.prefix}" data-step-field="targetLevel" aria-label="목표 레벨 감소">−</button>
            <input type="number" min="1" max="60" step="1" value="${settings.targetLevel}" data-automation-family="${family.prefix}" data-automation-field="targetLevel">
            <button type="button" class="stepper-button" data-step="1" data-step-family="${family.prefix}" data-step-field="targetLevel" aria-label="목표 레벨 증가">+</button>
          </div>
        </div>
        <div class="automation-field">
          <span>판매 LV</span>
          <div class="automation-stepper">
            <button type="button" class="stepper-button" data-step="-1" data-step-family="${family.prefix}" data-step-field="sellLevel" aria-label="판매 레벨 감소">−</button>
            <input type="number" min="0" max="60" step="1" value="${settings.sellLevel}" data-automation-family="${family.prefix}" data-automation-field="sellLevel">
            <button type="button" class="stepper-button" data-step="1" data-step-family="${family.prefix}" data-step-field="sellLevel" aria-label="판매 레벨 증가">+</button>
          </div>
        </div>
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
    if (!nextAutoBuy) {
      cancelAutomationPurchaseRequests();
    }
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
    if (!nextAutoLevelUp) {
      cancelAutomatedLevelUpForFamily(family);
    }
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
  if (shouldSuppressTransientEffects()) return;
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
  if (shouldSuppressTransientEffects()) return;
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
  trackStat("goldEarned", goldReward);
  trackStat("rocksBroken");
  saveGame();
  updateResourceDisplays();
  checkAchievements();

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
  trackStat("goldEarned", refund);
  trackStat("incinerated");
  const xpGain = monster.level * 5;
  addPlayerXp(xpGain, { showToastMessages: !options.auto });
  checkAchievements();

  // Apply the CSS animation classes to the DOM element
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

function getStageStarsMarkup(stage) {
  return `<span class="stage-stars stage-stars-${stage}" title="Stage ${stage}">${"★".repeat(stage)}</span>`;
}

function isEvolutionImminent(monster) {
  const prefix = getMonsterFamilyPrefix(monster.species);
  const nextSpecies = getSpeciesForLevel(prefix, monster.level + 1);
  return monster.level < getMaxLevel(monster.species) && nextSpecies && nextSpecies !== monster.species;
}

function renderMonsters() {
  $("#monster-list").innerHTML = gameState.monsters.map((monster) => {
    const definition = monsterDefinitions[monster.species];
    const isMining = monster.id === gameState.miningMonsterId;
    const isPvp = monster.id === gameState.pvpMonsterId;
    const stage = getMonsterStage(monster.species);
    const imminent = isEvolutionImminent(monster);
    return `
      <article class="monster-management-card pixel-panel card-tier-${stage}">
        <div class="monster-card-visual">${monsterSpriteMarkup(monster.species, monster.level)}</div>
        <div class="monster-card-copy">
          <h2>${monster.name} ${getStageStarsMarkup(stage)}</h2>
          <span class="level-badge">LV${monster.level} / ${definition.role}</span>
          ${imminent ? '<span class="evolution-imminent-badge">진화 임박!</span>' : ""}
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
  recordSpeciesDiscovery(species);
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
        <span><strong>${monster.name} ${getStageStarsMarkup(getMonsterStage(monster.species))}</strong>LV${monster.level} / ${label}</span>
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
      trackStat("evolutions");
      if (recordSpeciesDiscovery(monster.species)) {
        playEvolutionCutscene(monster);
      }
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
  checkAchievements();
}

function flashLevelUpZone(succeeded, monster) {
  const zone = $("#mine-auto-evolver");
  if (!zone) return;

  const flashClass = succeeded ? "zone-flash-success" : "zone-flash-fail";
  zone.classList.remove("zone-flash-success", "zone-flash-fail");
  void zone.offsetWidth;
  zone.classList.add(flashClass);
  setTimeout(() => zone.classList.remove(flashClass), 700);

  const float = document.createElement("span");
  float.className = `evolver-float ${succeeded ? "success" : "fail"}`;
  float.textContent = succeeded ? `LV${monster.level} UP!` : "FAIL";
  zone.appendChild(float);
  setTimeout(() => float.remove(), 1000);
}

function getActiveLevelUpMonsterIndex() {
  if (!miningState.monsterPositions) return -1;

  for (let index = 0; index < gameState.monsters.length; index += 1) {
    if (miningState.monsterPositions[index]?.isTargetingAutoEvolver) return index;
  }
  for (let index = 0; index < gameState.monsters.length; index += 1) {
    const monster = gameState.monsters[index];
    if (monster && levelUpLoopTimers.has(monster.id)) return index;
  }
  for (let index = 0; index < gameState.monsters.length; index += 1) {
    const spot = miningState.monsterPositions[index];
    if (!spot || spot.isMoving) continue;
    if (doesMonsterEntryOverlapZone(index, "mine-auto-evolver", spot)) return index;
  }
  return -1;
}

function updateEvolverZoneStatus() {
  const zone = $("#mine-auto-evolver");
  const card = $("#evolver-status");
  if (!zone || !card) return;

  const index = getActiveLevelUpMonsterIndex();
  const monster = index >= 0 ? gameState.monsters[index] : null;
  if (!monster) {
    zone.classList.remove("is-busy");
    card.classList.add("is-hidden");
    return;
  }

  zone.classList.add("is-busy");
  card.classList.remove("is-hidden");

  const settings = getAutomationSettingsForFamily(getMonsterFamilyPrefix(monster.species));
  const targetLevel = Math.max(settings.targetLevel, monster.level);
  const action = getUpgradeAction(monster);

  const nameEl = $("#evolver-status-name");
  if (nameEl) nameEl.textContent = monster.name;

  const infoEl = $("#evolver-status-info");
  const costEl = $("#evolver-status-cost");
  if (action.type === "max") {
    if (infoEl) infoEl.textContent = `LV${monster.level} · MAX`;
    if (costEl) costEl.textContent = "";
  } else {
    const chance = Math.min(1, action.chance + getEvolutionChanceBonus(monster.level));
    if (infoEl) infoEl.textContent = `LV${monster.level} → ${targetLevel} · 성공률 ${(chance * 100).toFixed(0)}%`;
    if (costEl) {
      const goldShort = gameState.gold < action.gold;
      const crystalShort = gameState.crystal < action.crystal;
      costEl.innerHTML =
        `<span class="${goldShort ? "cost-short" : ""}">G ${action.gold.toLocaleString()}</span>` +
        `<span class="${crystalShort ? "cost-short" : ""}">C ${action.crystal.toLocaleString()}</span>` +
        `${goldShort || crystalShort ? '<em>재화 대기</em>' : ""}`;
    }
  }

  const fill = $("#evolver-progress-fill");
  if (fill) {
    fill.style.width = `${Math.min(100, (monster.level / targetLevel) * 100).toFixed(1)}%`;
  }
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
    cancelLevelUpLoop(monster.id);
    const fromPosition = teleportMonsterToWaiting(index);
    if (showManualToasts) {
      showToast(`${monster.name}은(는) 이미 최대 레벨입니다.`, "info");
    }
    saveGame();
    updateEvolverZoneStatus();
    if (renderAfter && uiState.currentScreen === "mining") renderMining();
    playTeleportVisuals(index, fromPosition);
    return { attempted: false, reason: "max" };
  }

  if (gameState.gold < action.gold || gameState.crystal < action.crystal) {
    // Monster stays in place — checkStandingMonstersEvolution will retry when resources arrive
    saveGame();
    updateEvolverZoneStatus();
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
  let deferredToast = null;

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
      trackStat("evolutions");
      if (recordSpeciesDiscovery(monster.species)) {
        playEvolutionCutscene(monster);
      }
      if (showManualToasts || showAutoSuccessToast) {
        showToast(`${showManualToasts ? "성공" : "자동"}! ${monster.name}(으)로 진화하며 LV${monster.level}이 되었습니다!`, "success");
      }
    } else if (showManualToasts || showAutoSuccessToast) {
      deferredToast = { message: `성공! ${monster.name} LV${monster.level} 레벨업!`, type: "success" };
    }
  } else {
    soundManager.play("break");
    if (showManualToasts) {
      deferredToast = { message: `${monster.name} 레벨업 실패!`, type: "error" };
    }
  }

  const nextAction = getUpgradeAction(monster);
  const prefix = getMonsterFamilyPrefix(monster.species);
  const settings = getAutomationSettingsForFamily(prefix);
  const targetLevel = settings.targetLevel;
  
  const reachedTarget = monster.level >= targetLevel;
  const isMax = nextAction.type === "max";
  const willContinue = !reachedTarget && !isMax && (!followUpAutomation || shouldRunAutomatedLevelUp(monster));

  // Success or fail, the monster always teleports back to the waiting area
  const fromPosition = teleportMonsterToWaiting(index);

  if (willContinue) {
    // Walk back to the zone and try again until the target level is reached
    scheduleLevelUpLoopReturn(monster.id, followUpAutomation);
  } else {
    cancelLevelUpLoop(monster.id);
    if (reachedTarget && !isMax && (showManualToasts || followUpAutomation)) {
      showToast(`${monster.name} 목표 LV${targetLevel} 도달! 레벨업을 종료합니다.`, "info");
    }
  }

  // While the loop keeps running, the zone flash/float already shows each result
  if (deferredToast && !willContinue) {
    showToast(deferredToast.message, deferredToast.type);
  }

  saveGame();
  updateResourceDisplays();
  updateEvolverZoneStatus();
  checkAchievements();
  if (renderAfter && uiState.currentScreen === "mining") renderMining();

  // Visual feedback after the DOM rebuild so effects aren't wiped
  playTeleportVisuals(index, fromPosition);
  if (shouldShowEffect) {
    triggerLevelUpZoneVisualEffect(index, effectSucceeded);
    flashLevelUpZone(effectSucceeded, monster);
  }
  if (followUpAutomation && shouldRunAutomatedLevelUp(monster)) {
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

function hasAutoBuyEnabled() {
  return automationFamilies.some((family) => getAutomationSettingsForFamily(family.prefix).autoBuy);
}

function cancelAutomationPurchaseRequests() {
  miningAutomationRequestAllowsPurchases = false;
}

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
  if (!hasAutoBuyEnabled()) return 0;

  while (purchased < maxPurchases) {
    let boughtThisPass = false;
    const enabledFamilies = automationFamilies.filter((family) => getAutomationSettingsForFamily(family.prefix).autoBuy);
    if (enabledFamilies.length === 0) break;

    for (const family of enabledFamilies) {
      if (purchased >= maxPurchases) break;
      if (!getAutomationSettingsForFamily(family.prefix).autoBuy) continue;

      const price = getMonsterPurchasePrice(family.species);
      if (price <= 0 || gameState.gold < price) continue;

      gameState.gold -= price;
      if (gameState._cheatInfiniteResources) { gameState.gold = 999999999; gameState.crystal = 999999999; }
      const monster = createMonster(family.species);
      gameState.monsters.push(monster);
      recordSpeciesDiscovery(family.species);
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

  if (allowPurchases && hasAutoBuyEnabled()) {
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
// Endless Tower
// ---------------------------------------------------------------------------

const towerState = {
  active: false,
  floor: 1
};

function isTowerBossFloor(floor) {
  return floor % 5 === 0;
}

function getSpeciesForStage(prefix, stage) {
  return getSpeciesForLevel(prefix, stage <= 1 ? 1 : (stage - 1) * 10);
}

function getTowerFloorConfig(floor) {
  const boss = isTowerBossFloor(floor);
  const enemyLevel = Math.min(60, Math.max(1, Math.ceil(floor * 1.35)));
  const overflow = Math.max(0, floor * 1.35 - 60);
  const statMultiplier = 1 + overflow * 0.035 + (boss ? 0.25 : 0);
  const families = ["0", "1", "2"];

  const units = families.map((prefix) => ({
    species: getSpeciesForLevel(prefix, enemyLevel),
    level: enemyLevel,
    multiplier: statMultiplier,
    isBoss: false
  }));

  if (boss) {
    const bossPrefix = families[Math.floor(floor / 5) % families.length];
    const currentStage = getMonsterStage(getSpeciesForLevel(bossPrefix, enemyLevel));
    const bossStage = Math.min(6, currentStage + 1);
    units[1] = {
      species: getSpeciesForStage(bossPrefix, bossStage),
      level: Math.min(60, enemyLevel + 5),
      multiplier: statMultiplier * 1.6,
      isBoss: true
    };
  }

  return { floor, boss, units };
}

function getTowerRewards(floor, firstClear) {
  const boss = isTowerBossFloor(floor);
  const multiplier = (boss ? 3 : 1) * (firstClear ? 2 : 1);
  return {
    gold: Math.round(140 * floor * multiplier),
    crystal: Math.round(5 * floor * multiplier)
  };
}

function getTowerTeamIds() {
  if (uiState.pvpTeamIds && uiState.pvpTeamIds.length > 0) {
    return uiState.pvpTeamIds.filter((id) => getMonsterById(id));
  }
  return [...gameState.monsters]
    .sort((a, b) => b.level - a.level)
    .slice(0, 3)
    .map((monster) => monster.id);
}

function renderTower() {
  const best = gameState.tower?.highestFloor || 0;
  const nextFloor = best + 1;

  const bestEl = $("#tower-best-floor");
  if (bestEl) bestEl.textContent = best > 0 ? `${best}F 클리어` : "기록 없음";
  const nextEl = $("#tower-next-floor");
  if (nextEl) nextEl.textContent = `${nextFloor}F${isTowerBossFloor(nextFloor) ? " ☠ BOSS" : ""}`;

  const config = getTowerFloorConfig(nextFloor);
  const preview = $("#tower-floor-preview");
  if (preview) {
    preview.innerHTML = `
      <h3>${nextFloor}F 등장 적</h3>
      <div class="tower-enemy-row">
        ${config.units.map((unit) => `
          <div class="tower-enemy-cell ${unit.isBoss ? "boss" : ""}">
            <div class="tower-sprite-box">${monsterSpriteMarkup(unit.species, unit.level)}</div>
            <span>${unit.isBoss ? "☠ " : ""}${monsterDefinitions[unit.species].name}<br>LV${unit.level}</span>
          </div>
        `).join("")}
      </div>
    `;
  }

  const teamIds = getTowerTeamIds();
  const teamDisplay = $("#tower-team-display");
  if (teamDisplay) {
    teamDisplay.innerHTML = teamIds.length === 0
      ? '<p class="muted">보유 몬스터가 없습니다. 상점에서 영입하세요.</p>'
      : teamIds.map((id) => {
          const monster = getMonsterById(id);
          if (!monster) return "";
          return `
            <div class="tower-team-cell">
              <div class="tower-sprite-box">${monsterSpriteMarkup(monster.species, monster.level)}</div>
              <span>${monster.name}<br>LV${monster.level}</span>
            </div>
          `;
        }).join("");
  }

  const challengeButton = $("#tower-challenge-button");
  if (challengeButton) {
    challengeButton.disabled = teamIds.length === 0;
    challengeButton.textContent = `${nextFloor}F 도전 시작`;
  }
}

function startTowerChallenge(floor) {
  if (pvpState.active) return;
  const targetFloor = Number.isFinite(floor) ? floor : (gameState.tower?.highestFloor || 0) + 1;
  const teamIds = getTowerTeamIds();
  if (teamIds.length === 0) {
    showToast("도전할 몬스터가 없습니다.", "error");
    return;
  }

  uiState.pvpTeamIds = teamIds.slice(0, 3);
  towerState.active = true;
  towerState.floor = targetFloor;
  showScreen("pvp");
  startPvp({ tower: true, floor: targetFloor });
}

// ---------------------------------------------------------------------------
// Codex and achievements rendering
// ---------------------------------------------------------------------------

function renderCodex() {
  const grid = $("#codex-grid");
  if (!grid) return;

  const ordered = Object.keys(monsterDefinitions).sort((a, b) => {
    const [familyA, stageA] = a.split("_");
    const [familyB, stageB] = b.split("_");
    return familyA === familyB ? Number(stageA) - Number(stageB) : Number(familyA) - Number(familyB);
  });
  const discovered = new Set(gameState.collection || []);

  const heading = $("#codex-heading-status");
  if (heading) heading.textContent = `도감 등록: ${discovered.size} / ${ordered.length}종`;

  grid.innerHTML = ordered.map((species) => {
    const definition = monsterDefinitions[species];
    const stage = getMonsterStage(species);
    const isFound = discovered.has(species);
    const isActive = uiState.selectedCodexSpecies === species;
    return `
      <button class="codex-cell ${isFound ? "found" : "unknown"}${isActive ? " active" : ""}" data-codex-species="${species}">
        <div class="codex-sprite-box">${monsterSpriteMarkup(species, 1)}</div>
        <span class="codex-cell-name">${isFound ? definition.name : "???"}</span>
        ${getStageStarsMarkup(stage)}
      </button>
    `;
  }).join("");

  renderCodexDetail();
  renderAchievements();
}

function renderCodexDetail() {
  const detail = $("#codex-detail");
  if (!detail) return;

  const species = uiState.selectedCodexSpecies;
  if (!species || !monsterDefinitions[species]) {
    detail.innerHTML = '<p class="muted">몬스터를 선택하면 상세 정보가 표시됩니다.</p>';
    return;
  }

  const definition = monsterDefinitions[species];
  const discovered = new Set(gameState.collection || []);
  if (!discovered.has(species)) {
    detail.innerHTML = `
      <h3>??? ${getStageStarsMarkup(getMonsterStage(species))}</h3>
      <p class="muted">아직 발견하지 못한 몬스터입니다. 진화나 영입으로 도감을 완성하세요.</p>
    `;
    return;
  }

  const stats = getMonsterStats(species, 1);
  detail.innerHTML = `
    <h3>${definition.name} ${getStageStarsMarkup(getMonsterStage(species))}</h3>
    <p class="codex-role">${definition.role} / SKILL: ${definition.skillName}</p>
    <p>${definition.description}</p>
    <div class="stat-grid">
      <div class="stat"><span>ATK</span><strong>${stats.attack}</strong></div>
      <div class="stat"><span>SPD</span><strong>${stats.attackSpeed}/s</strong></div>
      <div class="stat"><span>HP</span><strong>${stats.maxHp}</strong></div>
      <div class="stat"><span>DEF</span><strong>${stats.defense}</strong></div>
      <div class="stat"><span>SKILL</span><strong>${stats.skillName}</strong></div>
      <div class="stat"><span>DMG</span><strong>${stats.skillDamage}</strong></div>
    </div>
  `;
}

function renderAchievements() {
  const list = $("#achievement-list");
  if (!list) return;

  const unlocked = new Set(gameState.achievements || []);
  list.innerHTML = achievementDefinitions.map((achievement) => {
    const isUnlocked = unlocked.has(achievement.id);
    return `
      <div class="achievement-row ${isUnlocked ? "unlocked" : ""}">
        <span class="achievement-medal">${isUnlocked ? "🏆" : "🔒"}</span>
        <div class="achievement-copy">
          <strong>${achievement.name}</strong>
          <span>${achievement.description}</span>
        </div>
        <span class="achievement-reward">+${achievement.reward} 💎</span>
      </div>
    `;
  }).join("");
}

// ---------------------------------------------------------------------------
// Offline (idle) rewards
// ---------------------------------------------------------------------------

let pendingOfflineRewards = null;

function computeOfflineRewards() {
  const lastSeen = gameState.lastSeen || 0;
  if (!lastSeen || gameState.monsters.length === 0) return null;

  const elapsedMs = Date.now() - lastSeen;
  if (elapsedMs < 90 * 1000) return null;

  const cappedSeconds = Math.min(elapsedMs / 1000, 8 * 3600);
  const rock = rockDefinitions[gameState.selectedRock] || rockDefinitions.stone;
  const teamDps = gameState.monsters.reduce(
    (sum, monster) => sum + monster.stats.attack * monster.stats.attackSpeed,
    0
  );
  if (teamDps <= 0) return null;

  // Offline mining runs at 60% efficiency, with a respawn-limited cap
  const rocksPerSecond = Math.min(0.5, teamDps / rock.maxHp);
  const rocksBroken = Math.floor(rocksPerSecond * cappedSeconds * 0.6);
  if (rocksBroken < 1) return null;

  const goldAverage = (rock.gold[0] + rock.gold[1]) / 2;
  const crystalAverage = (rock.crystal[0] + rock.crystal[1]) / 2;
  return {
    gold: Math.round(rocksBroken * goldAverage),
    crystal: Math.round(rocksBroken * crystalAverage),
    rocksBroken,
    seconds: cappedSeconds
  };
}

function formatOfflineDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}시간 ${minutes}분`;
  return `${minutes}분`;
}

function maybeShowOfflineRewards() {
  const rewards = computeOfflineRewards();
  if (!rewards) return;

  pendingOfflineRewards = rewards;
  const goldEl = $("#offline-reward-gold");
  if (goldEl) goldEl.textContent = `+${rewards.gold.toLocaleString()}`;
  const crystalEl = $("#offline-reward-crystal");
  if (crystalEl) crystalEl.textContent = `+${rewards.crystal.toLocaleString()}`;
  const copyEl = $("#offline-reward-copy");
  if (copyEl) {
    copyEl.textContent = `자리를 비운 ${formatOfflineDuration(rewards.seconds)} 동안 파트너들이 바위 ${rewards.rocksBroken.toLocaleString()}개를 부쉈습니다! (최대 8시간)`;
  }
  $("#offline-reward-modal")?.classList.remove("is-hidden");
}

function claimOfflineRewards() {
  if (!pendingOfflineRewards) {
    $("#offline-reward-modal")?.classList.add("is-hidden");
    return;
  }

  const rewards = pendingOfflineRewards;
  pendingOfflineRewards = null;

  gameState.gold += rewards.gold;
  gameState.crystal += rewards.crystal;
  trackStat("goldEarned", rewards.gold);
  trackStat("rocksBroken", rewards.rocksBroken);
  soundManager.play("buy");
  saveGame();
  syncDisplayResources();
  updateResourceDisplays();
  checkAchievements();
  $("#offline-reward-modal")?.classList.add("is-hidden");
  showToast(`오프라인 보상 수령! +${rewards.gold.toLocaleString()} Gold, +${rewards.crystal.toLocaleString()} Crystal`, "success");
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

function startPvp(options = {}) {
  if (pvpState.active) return;
  const towerMode = options && options.tower === true;
  if (!towerMode) {
    towerState.active = false;
  }
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
  
  // Build the enemy roster: tower floors or the default practice dummies
  let enemyConfigs;
  if (towerMode) {
    enemyConfigs = getTowerFloorConfig(options.floor || 1).units;
  } else {
    enemyConfigs = ["2_1_unnyangi", "0_1_cyclopse", "1_1_lovelydoll"].map((species) => ({
      species,
      level: avgLevel,
      multiplier: 1,
      isBoss: false
    }));
  }

  const enemyYPositions = [140, 240, 340];
  pvpState.enemyTeam = enemyConfigs.map((config, index) => {
    const stats = getMonsterStats(config.species, config.level);
    const def = monsterDefinitions[config.species];
    const multiplier = config.multiplier || 1;
    return {
      id: "enemy-" + index,
      side: "enemy",
      species: config.species,
      name: towerMode ? (config.isBoss ? "☠ BOSS " + def.name : def.name) : "Dummy " + def.name,
      level: config.level,
      isBoss: Boolean(config.isBoss),
      x: 670 + (index % 2) * 35,
      y: enemyYPositions[index],
      radius: config.isBoss ? 28 : 22,
      moveSpeed: (def.moveSpeed || 110) * 0.9,
      hp: Math.round(stats.maxHp * multiplier),
      maxHp: Math.round(stats.maxHp * multiplier),
      defense: Math.round(stats.defense * multiplier),
      attack: Math.round(stats.attack * multiplier),
      attackSpeed: stats.attackSpeed,
      skillDamage: Math.round(stats.skillDamage * multiplier),
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
  $("#battle-next-floor-button")?.classList.add("is-hidden");
  $("#battle-player-name").textContent = "Player Team";
  $("#battle-ai-name").textContent = towerMode
    ? `무한의 탑 ${options.floor || 1}F${isTowerBossFloor(options.floor || 1) ? " ☠" : ""}`
    : "AI Team";
  $("#battle-skill-name").textContent = towerMode ? `TOWER ${options.floor || 1}F` : "AUTO COMBAT";
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
  const wasTower = towerState.active;
  towerState.active = false;
  stopPvp();
  showScreen(wasTower ? "tower" : "mining");
}

function startNextTowerFloor() {
  if (!towerState.active) return;
  const nextFloor = towerState.floor + 1;
  stopPvp();
  startTowerChallenge(nextFloor);
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
    species: actor.species,
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

  const nextFloorButton = $("#battle-next-floor-button");
  nextFloorButton?.classList.add("is-hidden");

  if (towerState.active) {
    const floor = towerState.floor;
    if (victory) {
      const firstClear = floor > (gameState.tower?.highestFloor || 0);
      const rewards = getTowerRewards(floor, firstClear);
      gameState.gold += rewards.gold;
      gameState.crystal += rewards.crystal;
      trackStat("goldEarned", rewards.gold);
      if (firstClear) {
        gameState.tower.highestFloor = floor;
      }
      saveGame();
      updateResourceDisplays();
      checkAchievements();

      $("#battle-result-title").textContent = `${floor}F CLEAR!`;
      $("#battle-result-copy").textContent =
        `보상: +${rewards.gold.toLocaleString()} Gold, +${rewards.crystal.toLocaleString()} Crystal` +
        `${firstClear ? " (최초 클리어 2배!)" : ""}`;
      nextFloorButton?.classList.remove("is-hidden");
      if (nextFloorButton) {
        nextFloorButton.textContent = `${floor + 1}F 도전${isTowerBossFloor(floor + 1) ? " ☠" : ""}`;
      }
    } else {
      $("#battle-result-title").textContent = "DEFEAT";
      $("#battle-result-copy").textContent = `${floor}F 공략 실패... 몬스터를 더 성장시켜 재도전하세요.`;
    }
    $("#battle-return-button").textContent = "탑으로 돌아가기";
  } else {
    $("#battle-result-title").textContent = victory ? "VICTORY" : "DEFEAT";
    $("#battle-result-copy").textContent = victory
      ? "적군 AI 팀을 모두 쓰러뜨렸습니다!"
      : "아군 팀이 모두 쓰러졌습니다. 다시 도전해 보세요.";
    $("#battle-return-button").textContent = "Return to Mining";
  }

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

function drawActorSpriteOnly(context, actor, image, renderSize, state, frame, isAfterimage = false, customX = null, customY = null, customFacing = null) {
  const x = customX !== null ? customX : Math.round(actor.x);
  const y = customY !== null ? customY : Math.round(actor.y);
  const facing = customFacing !== null ? customFacing : actor.facing;
  const frameSize = 96;
  const row = spriteRows[state] ?? spriteRows.idle;

  context.save();
  context.translate(x, y);
  context.scale(facing < 0 ? -1 : 1, 1);

  context.drawImage(
    image,
    frame * frameSize,
    row * frameSize,
    frameSize,
    frameSize,
    -renderSize / 2,
    -renderSize * 0.7,
    renderSize,
    renderSize
  );
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
  else if (level >= 50) scale = 2.05;
  else if (level >= 40) scale = 1.92;
  else if (level >= 30) scale = 1.84;
  else if (level >= 20) scale = 1.78;
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

function drawPvpProjectile(context, projectile) {
  const x = Math.round(projectile.x);
  const y = Math.round(projectile.y);
  const species = projectile.species || "";
  const isSkill = projectile.isSkill;
  
  // Base radius size calculation
  const radius = isSkill ? 12 : 6;
  const angle = Math.atan2(projectile.vy, projectile.vx);

  // Helper function: shadow glow config
  const setGlow = (color, blur) => {
    context.shadowColor = color;
    context.shadowBlur = blur;
  };
  const resetGlow = () => {
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
  };

  // Save context state
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

    } else if (species === "0_6_cosmic_overlord") {
      // Stage 6: Singularity beam - black hole core, cyan accretion disk, magenta corona
      setGlow("#00e5ff", isSkill ? 38 : 24);
      context.translate(x, y);

      const r = radius * 2.0;
      const spin = (projectile.life * -20) % (Math.PI * 2);
      context.rotate(spin);

      // Magenta outer corona arcs
      context.strokeStyle = "rgba(224, 64, 251, 0.85)";
      context.lineWidth = 3.5;
      for (let i = 0; i < 3; i++) {
        context.beginPath();
        context.arc(0, 0, r + 3, i * (Math.PI * 2 / 3), i * (Math.PI * 2 / 3) + 1.4);
        context.stroke();
      }

      // Cyan accretion disk (tilted ellipse)
      context.strokeStyle = "#00e5ff";
      context.lineWidth = 2.5;
      context.beginPath();
      context.ellipse(0, 0, r + 1, r * 0.38, spin * 0.5, 0, Math.PI * 2);
      context.stroke();

      // Outline + black hole core
      context.beginPath();
      context.arc(0, 0, r * 0.68 + 2.5, 0, Math.PI * 2);
      context.fillStyle = "#12005e";
      context.fill();

      const grad = context.createRadialGradient(0, 0, 1, 0, 0, r * 0.68);
      grad.addColorStop(0, "#000000");
      grad.addColorStop(0.55, "#12005e");
      grad.addColorStop(0.85, "#7c4dff");
      grad.addColorStop(1, "#00e5ff");
      context.beginPath();
      context.arc(0, 0, r * 0.68, 0, Math.PI * 2);
      context.fillStyle = grad;
      context.fill();

      // Starfield sparkles
      context.fillStyle = "#ffffff";
      for (let i = 0; i < 4; i++) {
        const starAngle = spin * 2 + (i * Math.PI) / 2;
        const sx = Math.cos(starAngle) * r * 0.9;
        const sy = Math.sin(starAngle) * r * 0.9;
        context.fillRect(sx - 1, sy - 1, 2.5, 2.5);
      }
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

    } else if (species === "1_6_seraph_valkyria") {
      // Stage 6: Radiant holy lance with white feather trail and golden halo
      setGlow("#ffd700", isSkill ? 36 : 22);

      // Feather trail behind the lance
      resetGlow();
      const trailLength = isSkill ? 52 : 32;
      context.fillStyle = "rgba(255, 248, 225, 0.65)";
      for (let i = 1; i <= 3; i++) {
        const fx = x - Math.cos(angle) * (trailLength * i) / 3 + (Math.random() - 0.5) * 6;
        const fy = y - Math.sin(angle) * (trailLength * i) / 3 + (Math.random() - 0.5) * 6;
        context.beginPath();
        context.ellipse(fx, fy, 6 - i, 3, angle, 0, Math.PI * 2);
        context.fill();
      }

      setGlow("#ffd700", isSkill ? 36 : 22);
      context.translate(x, y);
      context.rotate(angle);

      const r = radius * 1.8;

      // Golden halo ring around the lance head
      context.strokeStyle = "#ffe082";
      context.lineWidth = 3;
      context.beginPath();
      context.arc(0, 0, r * 0.85, 0, Math.PI * 2);
      context.stroke();

      // Lance body (outline then gradient)
      context.fillStyle = "#172033";
      context.beginPath();
      context.moveTo(r * 1.4 + 2, 0);
      context.lineTo(-r * 0.9 - 2, -r * 0.42 - 2);
      context.lineTo(-r * 0.55, 0);
      context.lineTo(-r * 0.9 - 2, r * 0.42 + 2);
      context.closePath();
      context.fill();

      const grad = context.createLinearGradient(-r, 0, r * 1.4, 0);
      grad.addColorStop(0, "#fff8e1");
      grad.addColorStop(0.55, "#ffd700");
      grad.addColorStop(1, "#ffffff");
      context.fillStyle = grad;
      context.beginPath();
      context.moveTo(r * 1.4, 0);
      context.lineTo(-r * 0.9, -r * 0.42);
      context.lineTo(-r * 0.55, 0);
      context.lineTo(-r * 0.9, r * 0.42);
      context.closePath();
      context.fill();

      // Cyan gem core
      context.fillStyle = "#00e5ff";
      context.beginPath();
      context.arc(0, 0, 3.5, 0, Math.PI * 2);
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

    } else if (species === "2_6_divine_kirin") {
      // Stage 6: Imperial dual-color (gold/teal) divine thunder orb with rotating ring
      const r = radius * 2.0;

      resetGlow();
      const sparkCount = isSkill ? 10 : 6;
      for (let i = 0; i < sparkCount; i++) {
        context.strokeStyle = i % 2 === 0 ? "rgba(255, 213, 79, 0.95)" : "rgba(0, 229, 255, 0.95)";
        context.lineWidth = 2.2;
        const baseAngle = Math.random() * Math.PI * 2;
        const length = r * (1.3 + Math.random() * 0.9);
        const mid1X = x + Math.cos(baseAngle) * (length * 0.3) + (Math.random() - 0.5) * 8;
        const mid1Y = y + Math.sin(baseAngle) * (length * 0.3) + (Math.random() - 0.5) * 8;
        const mid2X = x + Math.cos(baseAngle) * (length * 0.65) + (Math.random() - 0.5) * 8;
        const mid2Y = y + Math.sin(baseAngle) * (length * 0.65) + (Math.random() - 0.5) * 8;
        const endX = x + Math.cos(baseAngle) * length;
        const endY = y + Math.sin(baseAngle) * length;

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(mid1X, mid1Y);
        context.lineTo(mid2X, mid2Y);
        context.lineTo(endX, endY);
        context.stroke();
      }

      setGlow("#ffd54f", isSkill ? 38 : 24);

      // Rotating imperial golden ring
      const ringSpin = (projectile.life * 14) % (Math.PI * 2);
      context.strokeStyle = "#ffd54f";
      context.lineWidth = 3;
      context.beginPath();
      context.ellipse(x, y, r + 4, (r + 4) * 0.45, ringSpin, 0, Math.PI * 2);
      context.stroke();

      context.beginPath();
      context.arc(x, y, r + 3, 0, Math.PI * 2);
      context.fillStyle = "#172033";
      context.fill();

      const grad = context.createRadialGradient(x, y, 1, x, y, r);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.3, "#ffd54f");
      grad.addColorStop(0.6, "#00e5ff");
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
    if (button.dataset.toggleId) togglePvpTeamMember(button.dataset.toggleId);
    if (button.dataset.removeId) togglePvpTeamMember(button.dataset.removeId);
    if (button.dataset.codexSpecies) {
      const species = button.dataset.codexSpecies;
      uiState.selectedCodexSpecies = species;
      renderCodex();
    }
    if (button.dataset.stepField) {
      const input = document.querySelector(
        `input[data-automation-family="${button.dataset.stepFamily}"][data-automation-field="${button.dataset.stepField}"]`
      );
      if (input) {
        const delta = Number(button.dataset.step) || 0;
        const minValue = button.dataset.stepField === "sellLevel" ? 0 : 1;
        const current = Number.parseInt(input.value, 10);
        const base = Number.isFinite(current) ? current : minValue;
        input.value = String(Math.min(60, Math.max(minValue, base + delta)));
        updateAutomationSettingFromInput(input);
      }
    }
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
  $("#start-pvp-button").addEventListener("click", () => startPvp());
  $("#exit-pvp-button").addEventListener("click", exitPvp);
  $("#battle-return-button").addEventListener("click", exitPvp);
  $("#tower-challenge-button")?.addEventListener("click", () => startTowerChallenge());
  $("#battle-next-floor-button")?.addEventListener("click", startNextTowerFloor);
  $("#offline-reward-claim")?.addEventListener("click", claimOfflineRewards);

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
          // Manual command interrupts an in-progress level-up loop
          if (!targetIsAutoEvolver) cancelLevelUpLoop(monster.id);
        }

        startMiningMovementLoop();
        updateEvolverZoneStatus();
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

  window.addEventListener("blur", () => {
    removeTransientMiningEffects();
  });
  window.addEventListener("focus", () => {
    lastMiningMoveTime = performance.now();
    if (pvpState.active) pvpState.lastTime = performance.now();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      removeTransientMiningEffects();
    } else {
      lastMiningMoveTime = performance.now();
      if (pvpState.active) pvpState.lastTime = performance.now();
    }
  });
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

function shouldSuppressTransientEffects() {
  return document.hidden || (typeof document.hasFocus === "function" && !document.hasFocus());
}

function removeTransientMiningEffects() {
  document
    .querySelectorAll(".mining-debris, .resource-particle, .damage-number, .mine-projectile-3d, .resource-gain-popup")
    .forEach((element) => element.remove());

  document.querySelectorAll(".is-hit, .shake-effect").forEach((element) => {
    element.classList.remove("is-hit", "shake-effect");
  });
  document.querySelectorAll(".monster-sprite.is-attacking").forEach((element) => {
    element.classList.remove("is-attacking");
  });

  syncDisplayResources();
  updateResourceDisplaysVisual();
}

function syncDisplayResourcesSoon() {
  queueMicrotask(() => {
    syncDisplayResources();
    updateResourceDisplaysVisual();
  });
}

function getParticleCapacity(selector, maxCount, requestedCount) {
  const existing = document.querySelectorAll(selector);
  const overflow = existing.length + requestedCount - maxCount;
  for (let index = 0; index < overflow; index += 1) {
    existing[index]?.remove();
  }
  return Math.max(0, maxCount - Math.max(0, existing.length - Math.max(0, overflow)));
}

function showToast(message, type = "") {
  const container = $("#toast-container");
  if (!container || document.hidden) return;

  const toast = document.createElement("div");
  toast.className = `toast${type ? " " + type : ""}`;
  const icons = { success: "✦", error: "✕", info: "◆", legendary: "★" };
  toast.innerHTML = `<span class="toast-icon">${icons[type] || "●"}</span><span class="toast-text"></span>`;
  toast.querySelector(".toast-text").textContent = message;
  container.appendChild(toast);

  while (container.children.length > 4) {
    container.removeChild(container.firstChild);
  }
  setTimeout(() => toast.remove(), type === "legendary" ? 4600 : 3100);
}

function init() {
  preloadMonsterSpriteImages();
  renderStarterOptions();
  bindEvents();
  loadGame();
  const createdSpriteTestRoster = applySpriteTestRosterFromQuery();
  const appendedSpriteTestCount = appendMissingSpriteTestMonstersFromQuery();
  syncDisplayResources();
  startResourceRollingLoop();
  startMiningAutomationLoop();
  if (gameState.started) {
    resetMiningRock(gameState.selectedRock);
    uiState.selectedEvolutionMonsterId = gameState.monsters[0]?.id || null;
    showGameUi();
    showScreen("mining");
    if (createdSpriteTestRoster) {
      showToast("스프라이트 테스트용 몬스터 18종을 생성했습니다.", "success");
    } else if (appendedSpriteTestCount > 0) {
      showToast(`테스트용 몬스터 ${appendedSpriteTestCount}종을 추가했습니다.`, "success");
    }
    maybeShowOfflineRewards();
    checkAchievements();
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
  if (!targetEl || amount <= 0 || shouldSuppressTransientEffects()) return;

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
  
  if (shouldSuppressTransientEffects()) {
    syncDisplayResourcesSoon();
    return;
  }
  if (!startEl) return;
  
  // Decide particle count
  let particlesCount = Math.min(12, Math.max(3, totalReward));
  if (type === "gold") {
    particlesCount = Math.min(12, Math.max(3, Math.floor(totalReward / 3)));
  }
  
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
  
  particlesCount = Math.min(
    particlesCount,
    getParticleCapacity(".resource-particle", MAX_RESOURCE_PARTICLES, particlesCount)
  );
  if (particlesCount <= 0) {
    syncDisplayResourcesSoon();
    return;
  }

  // Calculate value split per particle after capacity trimming.
  const baseValue = Math.floor(totalReward / particlesCount);
  const remainder = totalReward % particlesCount;

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
      if (shouldSuppressTransientEffects()) {
        particle.remove();
        syncDisplayResourcesSoon();
        return;
      }
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
  if (shouldSuppressTransientEffects()) return;
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
  
  let debrisCount = 4 + Math.floor(Math.random() * 4);
  debrisCount = Math.min(
    debrisCount,
    getParticleCapacity(".mining-debris", MAX_MINING_DEBRIS_PARTICLES, debrisCount)
  );
  if (debrisCount <= 0) return;
  
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
      if (shouldSuppressTransientEffects()) {
        deb.remove();
        return;
      }
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
