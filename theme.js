/* Light / dark mode toggle.
   The initial theme is applied by the inline script in <head> (before first
   paint); this file only wires up the button and keeps things in sync. */
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function current() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function apply(theme, persist) {
    root.setAttribute('data-theme', theme);
    var toDark = theme === 'light';
    btn.setAttribute('aria-label', toDark ? 'Switch to dark mode' : 'Switch to light mode');
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
    }
  }

  // Sync the button label with whatever the head script already applied.
  apply(current(), false);

  btn.addEventListener('click', function () {
    apply(current() === 'dark' ? 'light' : 'dark', true);
  });

  // Follow the OS setting only while the user hasn't chosen explicitly.
  function onSystemChange(e) {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (err) { /* ignore */ }
    if (saved !== 'light' && saved !== 'dark') {
      apply(e.matches ? 'dark' : 'light', false);
    }
  }
  if (media.addEventListener) media.addEventListener('change', onSystemChange);
  else if (media.addListener) media.addListener(onSystemChange);
})();
