/**
 * unlock.js — Module lock/unlock logic and UI state
 * BrainCells Course for Graham Brain
 */

(function() {
  'use strict';

  // Initialize module page - show locked overlay if needed
  window.initModulePage = function(moduleNum) {
    const state = window.BrainCells.loadState();
    const mod = state.modules[String(moduleNum)];

    // Initialize UI
    window.BrainCells.initUI(state);

    // Check if locked
    if (mod.status === 'locked') {
      showLockedOverlay(moduleNum, state);
      return false;
    }

    // Mark as in_progress if available
    if (mod.status === 'available') {
      mod.status = 'in_progress';
      window.BrainCells.saveState(state);
    }

    // Init quiz
    if (typeof window.initQuiz === 'function') {
      window.initQuiz(moduleNum);
    }

    // Init checklist
    initChecklist(moduleNum, state);

    // Init code blocks
    initCodeBlocks();

    // Set active sidebar item
    const sidebarLink = document.querySelector(`[data-module="${moduleNum}"]`);
    if (sidebarLink) sidebarLink.classList.add('active');

    // Init sidebar toggle
    initSidebar();

    return true;
  };

  function showLockedOverlay(moduleNum, state) {
    const main = document.getElementById('main-content');
    if (!main) return;

    const prevModule = moduleNum - 1;
    const prevStatus = prevModule > 0 ? state.modules[String(prevModule)].status : 'N/A';
    const prevName = prevModule > 0 ? window.BrainCells.MODULE_CONFIG[prevModule].title : '';

    main.innerHTML = `
      <div class="locked-overlay">
        <div class="locked-overlay__icon">🔒</div>
        <h2 class="locked-overlay__title">Module ${moduleNum} is Locked</h2>
        <p class="locked-overlay__desc">
          Complete Module ${prevModule} first to unlock this module.<br>
          <strong>${prevName}</strong> needs to be finished.
        </p>
        <a href="/braincells/module/${prevModule}/" class="btn btn-primary">
          ← Go to Module ${prevModule}
        </a>
        <div style="margin-top:1.5rem;">
          <a href="/braincells/" class="text-muted text-sm">← Back to Course Overview</a>
        </div>
      </div>
    `;
  }

  // Checklist initialization
  function initChecklist(moduleNum, state) {
    const checklist = document.getElementById(`checklist-${moduleNum}`);
    if (!checklist) return;

    const items = checklist.querySelectorAll('input[type="checkbox"]');
    const savedChecks = getChecklistState(moduleNum);

    // Restore saved state
    items.forEach((cb, idx) => {
      if (savedChecks[idx]) {
        cb.checked = true;
        cb.closest('li')?.classList.add('checked');
      }

      cb.addEventListener('change', () => {
        const li = cb.closest('li');
        if (li) li.classList.toggle('checked', cb.checked);
        savedChecks[idx] = cb.checked;
        saveChecklistState(moduleNum, savedChecks);

        // Check if all checked
        const allChecked = Array.from(items).every(c => c.checked);
        if (allChecked) {
          onChecklistComplete(moduleNum);
        }
      });
    });
  }

  function getChecklistState(moduleNum) {
    try {
      return JSON.parse(localStorage.getItem(`bc_checklist_${moduleNum}`) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveChecklistState(moduleNum, state) {
    localStorage.setItem(`bc_checklist_${moduleNum}`, JSON.stringify(state));
  }

  function onChecklistComplete(moduleNum) {
    // Show a small celebration callout
    const cl = document.getElementById(`checklist-${moduleNum}`);
    if (cl) {
      const note = document.createElement('div');
      note.className = 'callout callout-success';
      note.innerHTML = `
        <span class="callout__icon">✅</span>
        <div class="callout__body">
          <strong>All objectives checked!</strong> 
          Now complete the quiz below to earn your Brain Cells and unlock the next module.
        </div>
      `;
      cl.parentNode?.insertBefore(note, cl.nextSibling);
    }

    // Award small bonus cells for completing checklist
    const state = window.BrainCells.loadState();
    const mod = state.modules[String(moduleNum)];
    if (!mod.checklistComplete) {
      mod.checklistComplete = true;
      state.brainCells += 10; // small bonus for reading
      window.BrainCells.saveState(state);
      window.BrainCells.updateBrainCellDisplay(state.brainCells);
    }
  }

  // Code block copy buttons
  function initCodeBlocks() {
    document.querySelectorAll('pre').forEach(pre => {
      if (pre.querySelector('.copy-btn')) return; // already initialized

      const wrapper = document.createElement('div');
      wrapper.className = 'code-block';
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code');
      btn.addEventListener('click', () => {
        const code = pre.querySelector('code')?.textContent || pre.textContent;
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = 'Copied! ✅';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 2000);
        }).catch(() => {
          btn.textContent = 'Copy failed';
          setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
        });
      });
      wrapper.appendChild(btn);
    });
  }

  // Sidebar toggle for mobile
  function initSidebar() {
    const hamburger = document.querySelector('.hamburger-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (!hamburger || !sidebar) return;

    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay?.classList.toggle('open');
    });

    overlay?.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // Initialize all pages
  window.initPage = function() {
    const state = window.BrainCells.loadState();
    window.BrainCells.initUI(state);
    initCodeBlocks();
    initSidebar();
  };

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initCodeBlocks();
    initSidebar();
  });

})();
