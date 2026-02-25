(function() {
  'use strict';

  function initPausePoints() {
    const moduleBody = document.getElementById('module-body');
    if (!moduleBody) return;

    const h2s = moduleBody.querySelectorAll('h2');
    h2s.forEach((heading) => {
      if (heading.closest('.quiz-section')) return;
      const sibling = heading.nextElementSibling;
      if (sibling && sibling.classList.contains('pause-point')) return;

      const pause = document.createElement('div');
      pause.className = 'pause-point';
      pause.innerHTML = [
        '<span class="pause-icon">☕</span>',
        '<span class="pause-text">Good stopping point — your progress is saved automatically. Pick up from the next section whenever you\'re ready.</span>'
      ].join('');
      heading.insertAdjacentElement('afterend', pause);
    });
  }

  function initReadingProgress() {
    const indicator = document.getElementById('module-reading-progress');
    const pctEl = document.getElementById('module-reading-pct');
    const moduleBody = document.getElementById('module-body');
    if (!indicator || !pctEl || !moduleBody) return;

    const update = () => {
      const rect = moduleBody.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = moduleBody.offsetHeight;
      const denom = Math.max(1, articleHeight - window.innerHeight * 0.45);
      const raw = ((window.scrollY - articleTop) / denom) * 100;
      const pct = Math.max(0, Math.min(100, raw));
      const rounded = Math.round(pct);

      if (rounded >= 100) {
        indicator.innerHTML = '<span id="module-reading-pct">100%</span> ✅ Module complete! Take the quiz below.';
      } else {
        pctEl.textContent = rounded + '%';
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPausePoints();
    initReadingProgress();
  });
})();
