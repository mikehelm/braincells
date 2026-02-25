/**
 * state.js — localStorage read/write/migrate
 * BrainCells Course for Graham Brain
 */

const STATE_KEY = 'braincells_v1';

const DEFAULT_STATE = {
  version: '1.0',
  brainCells: 0,
  lastActivity: null,
  modules: {
    1: { status: 'available', checklistComplete: false, quizScore: null, quizAnswers: {}, quizAttempts: {}, brainCellsEarned: 0, achievementUnlocked: false, completedAt: null },
    2: { status: 'locked', checklistComplete: false, quizScore: null, quizAnswers: {}, quizAttempts: {}, brainCellsEarned: 0, achievementUnlocked: false, completedAt: null },
    3: { status: 'locked', checklistComplete: false, quizScore: null, quizAnswers: {}, quizAttempts: {}, brainCellsEarned: 0, achievementUnlocked: false, completedAt: null },
    4: { status: 'locked', checklistComplete: false, quizScore: null, quizAnswers: {}, quizAttempts: {}, brainCellsEarned: 0, achievementUnlocked: false, completedAt: null },
    5: { status: 'locked', checklistComplete: false, quizScore: null, quizAnswers: {}, quizAttempts: {}, brainCellsEarned: 0, achievementUnlocked: false, completedAt: null },
    6: { status: 'locked', checklistComplete: false, quizScore: null, quizAnswers: {}, quizAttempts: {}, brainCellsEarned: 0, achievementUnlocked: false, completedAt: null },
    7: { status: 'locked', checklistComplete: false, quizScore: null, quizAnswers: {}, quizAttempts: {}, brainCellsEarned: 0, achievementUnlocked: false, completedAt: null },
    8: { status: 'locked', checklistComplete: false, quizScore: null, quizAnswers: {}, quizAttempts: {}, brainCellsEarned: 0, achievementUnlocked: false, completedAt: null }
  },
  achievements: [],
  streaks: {
    lastModuleCompletedAt: null,
    weekStreakActive: false
  },
  courseComplete: false
};

const MODULE_CONFIG = {
  1: { title: 'What Are AI Agents?', cells: 100, quizCells: 50, achievement: null },
  2: { title: 'AI + Automation = Your Superpower', cells: 150, quizCells: 60, achievement: 'automation-believer' },
  3: { title: 'Meet OpenClaw', cells: 200, quizCells: 75, achievement: 'openclaw-curious' },
  4: { title: 'The Magic Files', cells: 250, quizCells: 100, achievement: 'file-whisperer' },
  5: { title: 'Safe Installation', cells: 200, quizCells: 75, achievement: 'gateway-guardian' },
  6: { title: 'Your First Automation', cells: 300, quizCells: 120, achievement: 'first-automation' },
  7: { title: 'Marketing Superpowers', cells: 350, quizCells: 140, achievement: 'marketing-machine' },
  8: { title: 'Advanced — The Long Game', cells: 250, quizCells: 100, achievement: 'grand-cortex' }
};

const ACHIEVEMENTS = {
  'automation-believer': { name: 'Automation Believer', icon: '🔧', module: 2, cells: 15 },
  'openclaw-curious':    { name: 'OpenClaw Curious',    icon: '🦞', module: 3, cells: 20 },
  'file-whisperer':      { name: 'File Whisperer',      icon: '📁', module: 4, cells: 25 },
  'gateway-guardian':    { name: 'Gateway Guardian',     icon: '🔐', module: 5, cells: 25 },
  'first-automation':    { name: 'First Automation Live',icon: '🤖', module: 6, cells: 30 },
  'marketing-machine':   { name: 'Marketing Machine',    icon: '🚀', module: 7, cells: 35 },
  'grand-cortex':        { name: 'Grand Cortex',         icon: '👑', module: 8, cells: 50 },
  'openclaw-certified':  { name: 'OpenClaw Certified',   icon: '🦞🎓',module: 8, cells: 0 }
};

const MILESTONES = [
  { cells: 100,  tier: 'Baby Neurons',          emoji: '🌱' },
  { cells: 300,  tier: 'Brain Activated',        emoji: '🧠' },
  { cells: 600,  tier: 'Synapse Surge',          emoji: '⚡' },
  { cells: 900,  tier: 'Galaxy Brain',           emoji: '🔥' },
  { cells: 1200, tier: 'OpenClaw Initiate',      emoji: '🦞' },
  { cells: 1600, tier: 'Automation Architect',   emoji: '🚀' },
  { cells: 2000, tier: 'Grand Cortex',           emoji: '👑' }
];

// ---- State Management ----

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return migrateState(null);
    const parsed = JSON.parse(raw);
    return migrateState(parsed);
  } catch (e) {
    console.warn('State load error, resetting:', e);
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

function saveState(state) {
  try {
    state.lastActivity = new Date().toISOString();
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('State save error:', e);
  }
}

function migrateState(parsed) {
  if (!parsed) return JSON.parse(JSON.stringify(DEFAULT_STATE));

  // Merge with defaults to handle new fields
  const state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  state.version = parsed.version || '1.0';
  state.brainCells = parsed.brainCells || 0;
  state.lastActivity = parsed.lastActivity || null;
  state.achievements = parsed.achievements || [];
  state.courseComplete = parsed.courseComplete || false;
  state.streaks = Object.assign({}, state.streaks, parsed.streaks || {});

  // Merge module states
  for (let i = 1; i <= 8; i++) {
    const key = String(i);
    if (parsed.modules && parsed.modules[key]) {
      state.modules[key] = Object.assign({}, state.modules[key], parsed.modules[key]);
    }
  }

  return state;
}

function resetState() {
  const fresh = JSON.parse(JSON.stringify(DEFAULT_STATE));
  saveState(fresh);
  return fresh;
}

// ---- Brain Cells ----

function addBrainCells(state, amount, source) {
  const prev = state.brainCells;
  state.brainCells = Math.max(0, (state.brainCells || 0) + amount);
  saveState(state);

  // Check for milestone crossing
  const newMilestone = checkMilestoneCrossed(prev, state.brainCells);
  return { newTotal: state.brainCells, milestone: newMilestone };
}

function checkMilestoneCrossed(before, after) {
  for (const m of MILESTONES) {
    if (before < m.cells && after >= m.cells) {
      return m;
    }
  }
  return null;
}

function getCurrentTier(cells) {
  let current = null;
  for (const m of MILESTONES) {
    if (cells >= m.cells) current = m;
  }
  return current;
}

function getNextMilestone(cells) {
  for (const m of MILESTONES) {
    if (cells < m.cells) return m;
  }
  return null;
}

// ---- Module State ----

function getModuleState(state, moduleNum) {
  return state.modules[String(moduleNum)];
}

function setModuleStatus(state, moduleNum, status) {
  state.modules[String(moduleNum)].status = status;
  saveState(state);
}

function isModuleLocked(state, moduleNum) {
  return state.modules[String(moduleNum)].status === 'locked';
}

function isModuleComplete(state, moduleNum) {
  return state.modules[String(moduleNum)].status === 'complete';
}

function isModuleAvailable(state, moduleNum) {
  const s = state.modules[String(moduleNum)].status;
  return s === 'available' || s === 'in_progress';
}

function completeModule(state, moduleNum) {
  const mod = state.modules[String(moduleNum)];
  if (mod.status === 'complete') return false; // already done

  const config = MODULE_CONFIG[moduleNum];
  const prevCells = state.brainCells;

  // Award base cells
  state.brainCells += config.cells;
  mod.brainCellsEarned += config.cells;
  mod.status = 'complete';
  mod.completedAt = new Date().toISOString();

  // Week streak bonus (modules 5-6 in same week)
  if (moduleNum === 6) {
    const prev = state.modules['5'].completedAt;
    if (prev) {
      const diff = (new Date() - new Date(prev)) / (1000 * 60 * 60 * 24);
      if (diff <= 7) {
        state.brainCells += 50;
        mod.brainCellsEarned += 50;
        state.streaks.weekStreakActive = true;
      }
    }
  }

  // Course completion bonus
  const allComplete = [1,2,3,4,5,6,7,8].every(n => 
    state.modules[String(n)].status === 'complete' || n === moduleNum
  );
  if (allComplete) {
    state.brainCells += 100;
    state.courseComplete = true;
  }

  // Unlock achievement
  if (config.achievement) {
    unlockAchievement(state, config.achievement);
  }

  // Special: module 8 gets two achievements
  if (moduleNum === 8) {
    unlockAchievement(state, 'openclaw-certified');
  }

  // Unlock next module
  if (moduleNum < 8) {
    state.modules[String(moduleNum + 1)].status = 'available';
  }

  state.streaks.lastModuleCompletedAt = new Date().toISOString();
  saveState(state);

  return { milestoneReached: checkMilestoneCrossed(prevCells, state.brainCells) };
}

function unlockAchievement(state, achievementId) {
  if (state.achievements.includes(achievementId)) return false;
  state.achievements.push(achievementId);
  const achievement = ACHIEVEMENTS[achievementId];
  if (achievement && achievement.cells > 0) {
    state.brainCells += achievement.cells;
  }
  return true;
}

// ---- Quiz State ----

function recordQuizAnswer(state, moduleNum, questionIdx, answer) {
  const mod = state.modules[String(moduleNum)];
  mod.quizAnswers[questionIdx] = answer;

  // Track attempts
  if (!mod.quizAttempts[questionIdx]) mod.quizAttempts[questionIdx] = 0;
  mod.quizAttempts[questionIdx]++;

  saveState(state);
}

function calculateQuizCells(moduleNum, correctCount, questions) {
  const config = MODULE_CONFIG[moduleNum];
  const perQuestion = Math.floor(config.quizCells / 5);
  return correctCount * perQuestion;
}

function recordQuizComplete(state, moduleNum, correctCount, earnedCells) {
  const mod = state.modules[String(moduleNum)];
  const prevCells = state.brainCells;
  mod.quizScore = correctCount;
  state.brainCells += earnedCells;
  mod.brainCellsEarned += earnedCells;

  // Perfect score bonus (double base cells for that module)
  if (correctCount === 5 && moduleNum === 4) {
    state.brainCells += MODULE_CONFIG[moduleNum].cells;
    mod.brainCellsEarned += MODULE_CONFIG[moduleNum].cells;
  }

  saveState(state);
  return checkMilestoneCrossed(prevCells, state.brainCells);
}

// ---- Display Helpers ----

function formatCells(n) {
  if (n === undefined || n === null) return '0';
  return n.toLocaleString();
}

function getCourseProgress(state) {
  const completed = Object.values(state.modules).filter(m => m.status === 'complete').length;
  return Math.round((completed / 8) * 100);
}

function updateBrainCellDisplay(cells) {
  const counters = document.querySelectorAll('.bc-counter__number');
  counters.forEach(el => {
    const prev = parseInt(el.textContent.replace(/,/g, '')) || 0;
    el.textContent = formatCells(cells);
    if (cells !== prev) {
      el.classList.remove('bc-bump');
      void el.offsetWidth; // reflow
      el.classList.add('bc-bump');
      setTimeout(() => el.classList.remove('bc-bump'), 500);
    }
  });
}

function updateProgressBars(state) {
  const pct = getCourseProgress(state);
  document.querySelectorAll('.course-progress-bar__fill').forEach(el => {
    el.style.width = pct + '%';
  });
}

function updateSidebarStatus(state) {
  document.querySelectorAll('[data-module]').forEach(el => {
    const num = parseInt(el.getAttribute('data-module'));
    const mod = state.modules[String(num)];
    el.classList.remove('locked', 'complete', 'available', 'active');

    if (mod.status === 'locked') {
      el.classList.add('locked');
      const numEl = el.querySelector('.module-number');
      if (numEl) numEl.textContent = '🔒';
    } else if (mod.status === 'complete') {
      el.classList.add('complete');
      const numEl = el.querySelector('.module-number');
      if (numEl) numEl.textContent = '✅';
    } else {
      el.classList.add('available');
    }
  });
}

// ---- Initialize UI ----

function initUI(state) {
  updateBrainCellDisplay(state.brainCells);
  updateProgressBars(state);
  updateSidebarStatus(state);
}

// Export for module use
window.BrainCells = {
  loadState,
  saveState,
  resetState,
  addBrainCells,
  getCurrentTier,
  getNextMilestone,
  getModuleState,
  setModuleStatus,
  isModuleLocked,
  isModuleComplete,
  isModuleAvailable,
  completeModule,
  unlockAchievement,
  recordQuizAnswer,
  recordQuizComplete,
  calculateQuizCells,
  formatCells,
  getCourseProgress,
  updateBrainCellDisplay,
  updateProgressBars,
  updateSidebarStatus,
  initUI,
  MODULE_CONFIG,
  ACHIEVEMENTS,
  MILESTONES
};

// Legacy compatibility shim used by existing module pages.
window.BrainState = {
  load: loadState,
  save: saveState,
  reset: resetState,
  addCells(amount, source) {
    const state = loadState();
    const result = addBrainCells(state, amount, source);
    return { total: result.newTotal, milestoneReached: result.milestone };
  },
  completeModule(moduleNum) {
    const state = loadState();
    return completeModule(state, moduleNum);
  },
  unlockAchievement(achievementId) {
    const state = loadState();
    const unlocked = unlockAchievement(state, achievementId);
    saveState(state);
    return unlocked;
  }
};
