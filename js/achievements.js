/**
 * achievements.js — Achievement system for BrainCells
 * BrainCells Course for Graham Brain
 */

const ACHIEVEMENT_DEFINITIONS = {
  'automation-believer': {
    id: 'automation-believer',
    name: 'Automation Believer',
    icon: '🔧',
    description: 'Completed Module 2 — now believes in the power of AI automation',
    module: 2,
    cells: 15,
    rarity: 'common'
  },
  'openclaw-curious': {
    id: 'openclaw-curious',
    name: 'OpenClaw Curious',
    icon: '🦞',
    description: 'Completed Module 3 — met OpenClaw and liked what they saw',
    module: 3,
    cells: 20,
    rarity: 'common'
  },
  'file-whisperer': {
    id: 'file-whisperer',
    name: 'File Whisperer',
    icon: '📁',
    description: 'Mastered the Magic Files — knows SOUL.md from HEARTBEAT.md',
    module: 4,
    cells: 25,
    rarity: 'uncommon'
  },
  'gateway-guardian': {
    id: 'gateway-guardian',
    name: 'Gateway Guardian',
    icon: '🔐',
    description: 'Installed OpenClaw safely with proper security configuration',
    module: 5,
    cells: 25,
    rarity: 'uncommon'
  },
  'first-automation': {
    id: 'first-automation',
    name: 'First Automation Live',
    icon: '🤖',
    description: 'Sent a real command and got a real response — automation is real now',
    module: 6,
    cells: 30,
    rarity: 'rare'
  },
  'marketing-machine': {
    id: 'marketing-machine',
    name: 'Marketing Machine',
    icon: '🚀',
    description: 'Ran a real lead enrichment or competitor monitoring workflow',
    module: 7,
    cells: 35,
    rarity: 'rare'
  },
  'grand-cortex': {
    id: 'grand-cortex',
    name: 'Grand Cortex',
    icon: '👑',
    description: 'Completed Module 8 — reached the pinnacle of OpenClaw mastery',
    module: 8,
    cells: 50,
    rarity: 'epic'
  },
  'openclaw-certified': {
    id: 'openclaw-certified',
    name: 'OpenClaw Certified',
    icon: '🦞🎓',
    description: 'Completed the entire BrainCells course. As someone named Brain, this was destiny.',
    module: 8,
    cells: 100,
    rarity: 'legendary'
  },
  'brain-scan-master': {
    id: 'brain-scan-master',
    name: 'Brain Scan Ace',
    icon: '🧠',
    description: 'Aced all three refresher Brain Scans with perfect scores',
    module: null,
    cells: 30,
    rarity: 'rare'
  },
  'speed-runner': {
    id: 'speed-runner',
    name: 'Speed Runner',
    icon: '⚡',
    description: 'Completed two modules in the same week',
    module: null,
    cells: 50,
    rarity: 'rare'
  },
  'perfect-quiz': {
    id: 'perfect-quiz',
    name: 'Perfect Score',
    icon: '🌟',
    description: 'Got 5/5 on any module quiz — Neuron Boost activated',
    module: null,
    cells: 20,
    rarity: 'uncommon'
  }
};

const ACH_MILESTONES = [
  { cells: 100,  tier: 'Baby Neurons',        badge: '🌱', unlock: 'Module 1 complete' },
  { cells: 300,  tier: 'Brain Activated',      badge: '🧠', unlock: 'Module 3 territory' },
  { cells: 600,  tier: 'Synapse Surge',        badge: '⚡', unlock: 'Module 5 territory' },
  { cells: 900,  tier: 'Galaxy Brain',         badge: '🔥', unlock: 'Module 6-7 territory' },
  { cells: 1200, tier: 'OpenClaw Initiate',    badge: '🦞', unlock: 'Module 7 complete' },
  { cells: 1600, tier: 'Automation Architect', badge: '🚀', unlock: 'Module 8 territory' },
  { cells: 2000, tier: 'Grand Cortex',         badge: '👑', unlock: 'Full completion' }
];

function getCurrentTier(cells) {
  let current = { cells: 0, tier: 'Pre-Neurons', badge: '🥚', unlock: 'Just starting' };
  for (const milestone of ACH_MILESTONES) {
    if (cells >= milestone.cells) current = milestone;
    else break;
  }
  return current;
}

function getNextMilestone(cells) {
  for (const milestone of ACH_MILESTONES) {
    if (cells < milestone.cells) return milestone;
  }
  return null;
}

function checkAndUnlockAchievement(achievementId) {
  if (!window.BrainState) return false;
  const state = window.BrainState.load();
  if (state.achievements.includes(achievementId)) return false; // already unlocked

  const def = ACHIEVEMENT_DEFINITIONS[achievementId];
  if (!def) return false;

  window.BrainState.unlockAchievement(achievementId, def.cells);
  showAchievementToast(def);
  return true;
}

function showAchievementToast(achievement) {
  const existing = document.querySelector('.achievement-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.innerHTML = `
    <div class="achievement-toast-inner">
      <div class="achievement-toast-icon">${achievement.icon}</div>
      <div class="achievement-toast-content">
        <div class="achievement-toast-title">Achievement Unlocked!</div>
        <div class="achievement-toast-name">${achievement.name}</div>
        <div class="achievement-toast-cells">+${achievement.cells} 🧠</div>
      </div>
    </div>
  `;

  // Inject styles if not already present
  if (!document.getElementById('achievement-toast-styles')) {
    const style = document.createElement('style');
    style.id = 'achievement-toast-styles';
    style.textContent = `
      .achievement-toast {
        position: fixed;
        bottom: 80px;
        right: 20px;
        z-index: 9999;
        animation: toastIn 0.4s ease, toastOut 0.4s ease 3.5s forwards;
      }
      .achievement-toast-inner {
        background: linear-gradient(135deg, #0B1E3D, #1a3a6b);
        border: 2px solid #F5A623;
        border-radius: 12px;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 16px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        min-width: 280px;
      }
      .achievement-toast-icon {
        font-size: 2rem;
        flex-shrink: 0;
      }
      .achievement-toast-title {
        color: #F5A623;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .achievement-toast-name {
        color: #ffffff;
        font-weight: 700;
        font-size: 1rem;
        margin: 2px 0;
      }
      .achievement-toast-cells {
        color: #F5A623;
        font-size: 0.9rem;
        font-weight: 600;
      }
      @keyframes toastIn {
        from { transform: translateX(120%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes toastOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(120%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4200);
}

function renderAchievementGrid(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const state = window.BrainState ? window.BrainState.load() : { achievements: [] };
  const unlocked = state.achievements || [];

  container.innerHTML = '';
  Object.values(ACHIEVEMENT_DEFINITIONS).forEach(ach => {
    const isUnlocked = unlocked.includes(ach.id);
    const card = document.createElement('div');
    card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'} rarity-${ach.rarity}`;
    card.innerHTML = `
      <div class="achievement-card-icon">${isUnlocked ? ach.icon : '🔒'}</div>
      <div class="achievement-card-name">${isUnlocked ? ach.name : '???'}</div>
      <div class="achievement-card-desc">${isUnlocked ? ach.description : 'Keep learning to unlock'}</div>
      <div class="achievement-card-cells">${isUnlocked ? `+${ach.cells} 🧠` : ''}</div>
      <div class="achievement-card-rarity">${ach.rarity}</div>
    `;
    container.appendChild(card);
  });
}

function renderMilestoneBar(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const state = window.BrainState ? window.BrainState.load() : { brainCells: 0 };
  const cells = state.brainCells || 0;
  const current = getCurrentTier(cells);
  const next = getNextMilestone(cells);

  const maxCells = 2000;
  const pct = Math.min(100, (cells / maxCells) * 100);

  container.innerHTML = `
    <div class="milestone-bar-wrapper">
      <div class="milestone-current">
        <span class="milestone-badge">${current.badge}</span>
        <span class="milestone-tier">${current.tier}</span>
        <span class="milestone-cells">${cells} 🧠</span>
      </div>
      <div class="milestone-progress-track">
        <div class="milestone-progress-fill" style="width: ${pct}%"></div>
        ${ACH_MILESTONES.map(m => `
          <div class="milestone-marker ${cells >= m.cells ? 'passed' : ''}" 
               style="left: ${(m.cells/maxCells)*100}%"
               title="${m.tier} (${m.cells} 🧠)">
            <span>${m.badge}</span>
          </div>
        `).join('')}
      </div>
      ${next ? `<div class="milestone-next">Next: <strong>${next.tier}</strong> at ${next.cells} 🧠 (${next.cells - cells} to go)</div>` : '<div class="milestone-next">🏆 Maximum tier achieved!</div>'}
    </div>
  `;
}

// Export for module use
window.Achievements = {
  definitions: ACHIEVEMENT_DEFINITIONS,
  milestones: ACH_MILESTONES,
  getCurrentTier,
  getNextMilestone,
  checkAndUnlock: checkAndUnlockAchievement,
  showToast: showAchievementToast,
  renderGrid: renderAchievementGrid,
  renderMilestoneBar
};
