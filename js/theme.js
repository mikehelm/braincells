/**
 * theme.js — Dark/light mode toggle
 * BrainCells Course for Graham Brain
 *
 * IMPORTANT: Load in <head> WITHOUT defer/async — the IIFE at the top
 * must run before first paint to prevent a flash of unstyled content.
 *
 *   <head>
 *     <script src="/js/theme.js"></script>   ← first script, no defer
 *     <link rel="stylesheet" href="/css/base.css">
 *     ...
 *   </head>
 *
 * The button is auto-injected into .site-header on DOMContentLoaded.
 * No manual wiring needed on individual pages.
 */

/* ─────────────────────────────────────────────────────────────
   PART 1 — Runs immediately (synchronous, before first paint)
   Sets data-theme on <html> so CSS variables load correctly
   and there is zero flash of wrong theme.
───────────────────────────────────────────────────────────── */
(function applyThemeEarly() {
  try {
    var saved      = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme       = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    // localStorage unavailable (private browsing edge case) — default to light
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

/* ─────────────────────────────────────────────────────────────
   PART 2 — ThemeToggle module (runs after DOM ready)
   Injects the button, wires events, responds to OS changes.
───────────────────────────────────────────────────────────── */
window.ThemeToggle = (function () {

  /* Icon shown WHILE in that mode (i.e. the opposite mode's symbol) */
  var ICONS  = { light: '🌙', dark: '☀️' };
  var LABELS = { light: 'Switch to dark mode', dark: 'Switch to light mode' };

  /* ── Helpers ─────────────────────────────────────────────── */
  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    syncButton(theme);
  }

  function toggle() {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  }

  function syncButton(theme) {
    var iconEl  = document.getElementById('theme-icon');
    var btnEl   = document.getElementById('theme-toggle');
    if (iconEl) iconEl.textContent = ICONS[theme]  || '🌙';
    if (btnEl)  btnEl.setAttribute('aria-label', LABELS[theme] || 'Toggle dark mode');
    if (btnEl)  btnEl.setAttribute('title',      LABELS[theme] || 'Toggle dark mode');
  }

  /* ── Button injection ────────────────────────────────────── */
  function injectButton() {
    /* If a button already exists (manually placed in HTML), just wire it */
    var existing = document.getElementById('theme-toggle');
    if (existing) {
      existing.addEventListener('click', toggle);
      syncButton(currentTheme());
      return;
    }

    /* Otherwise find the site header and inject the button */
    var header = document.querySelector('.site-header');
    if (!header) return;

    var btn = document.createElement('button');
    btn.id           = 'theme-toggle';
    btn.className    = 'theme-toggle';
    btn.setAttribute('aria-label', LABELS[currentTheme()]);
    btn.setAttribute('title',      LABELS[currentTheme()]);
    btn.innerHTML    = '<span id="theme-icon">' + (ICONS[currentTheme()] || '🌙') + '</span>';
    btn.addEventListener('click', toggle);

    /* Append as last child of header (or its inner wrapper) */
    var inner = header.querySelector('.header-inner') || header;
    inner.appendChild(btn);
  }

  /* ── OS preference listener ──────────────────────────────── */
  function watchOSPreference() {
    try {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        /* Only follow OS if user hasn't manually chosen a preference */
        try {
          if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
          }
        } catch (err) {}
      });
    } catch (e) {}
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    injectButton();
    watchOSPreference();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Public API */
  return {
    toggle:       toggle,
    applyTheme:   applyTheme,
    currentTheme: currentTheme,
    init:         init          // call manually if you render the header after load
  };

})();
