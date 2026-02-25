(function() {
  'use strict';

  const TIER_MESSAGES = {
    'Baby Neurons': 'Tiny sparks, big momentum. You are officially in motion.',
    'Brain Activated': 'Core systems online. You are now learning with intent.',
    'Synapse Surge': 'Connections are firing fast. Your automation instincts are forming.',
    'Galaxy Brain': 'Strategic pattern recognition unlocked. This is serious progress.',
    'OpenClaw Initiate': 'You are past theory and into execution territory now.',
    'Automation Architect': 'You design systems now, not just tasks.',
    'Grand Cortex': 'Peak tier reached. This is expert-level consistency.'
  };

  function launchCelebrationConfetti() {
    if (typeof window.confetti !== 'function') return;
    const opts = {
      spread: 80,
      startVelocity: 40,
      ticks: 180,
      colors: ['#f5a623', '#ff8a00', '#7c3aed']
    };

    window.confetti(Object.assign({ particleCount: 120, origin: { y: 0.65 } }, opts));
    setTimeout(() => window.confetti(Object.assign({ particleCount: 80, origin: { x: 0.2, y: 0.75 } }, opts)), 120);
    setTimeout(() => window.confetti(Object.assign({ particleCount: 80, origin: { x: 0.8, y: 0.75 } }, opts)), 180);
  }

  function closeOverlay(overlay) {
    if (!overlay) return;
    overlay.classList.remove('milestone-overlay--visible');
    setTimeout(() => overlay.remove(), 220);
  }

  function showMilestoneCelebration(milestone) {
    if (!milestone) return;

    const overlay = document.createElement('div');
    overlay.className = 'milestone-overlay milestone-overlay--visible';
    overlay.innerHTML = [
      '<div class="milestone-modal" role="dialog" aria-modal="true" aria-label="Milestone reached">',
      '<div class="milestone-modal__emoji">' + (milestone.emoji || '🎉') + '</div>',
      '<h2 class="milestone-modal__title">You\'ve reached ' + milestone.tier + '!</h2>',
      '<p class="milestone-modal__cells">Milestone unlocked at ' + milestone.cells + ' Brain Cells.</p>',
      '<p class="milestone-modal__message">' + (TIER_MESSAGES[milestone.tier] || 'You just crossed a major threshold. Keep stacking momentum.') + '</p>',
      '<button type="button" class="btn btn-primary milestone-modal__btn">Keep Going! →</button>',
      '</div>'
    ].join('');

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeOverlay(overlay);
    });

    overlay.querySelector('.milestone-modal__btn').addEventListener('click', () => closeOverlay(overlay));

    document.body.appendChild(overlay);
    launchCelebrationConfetti();
  }

  function showGraduationCelebration(onContinue) {
    const overlay = document.createElement('div');
    overlay.className = 'milestone-overlay milestone-overlay--visible';
    overlay.innerHTML = [
      '<div class="milestone-modal milestone-modal--graduation" role="dialog" aria-modal="true" aria-label="Course complete">',
      '<div class="milestone-modal__emoji">🎓</div>',
      '<h2 class="milestone-modal__title">You\'ve done it, Graham.</h2>',
      '<p class="milestone-modal__cells">All 8 modules complete. OpenClaw Certified status unlocked.</p>',
      '<p class="milestone-modal__message">Mike is proud, Otto is smug, and your future automations are waiting.</p>',
      '<button type="button" class="btn btn-gold milestone-modal__btn">Go To Graduation →</button>',
      '</div>'
    ].join('');

    const finish = () => {
      closeOverlay(overlay);
      if (typeof onContinue === 'function') onContinue();
    };

    overlay.querySelector('.milestone-modal__btn').addEventListener('click', finish);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) finish();
    });

    document.body.appendChild(overlay);
    launchCelebrationConfetti();
    setTimeout(finish, 3000);
  }

  window.showMilestoneCelebration = showMilestoneCelebration;
  window.showGraduationCelebration = showGraduationCelebration;
})();
