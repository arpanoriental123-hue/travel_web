(function () {
  var STORAGE_KEY = 'travellrr-site-theme';
  var VALID = { dark: true, light: true };

  function getStoredTheme() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v && VALID[v]) {
        return v;
      }
    } catch (e) {}
    return 'dark';
  }

  function applyTheme(theme) {
    if (!VALID[theme]) {
      theme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}

    var btn = document.getElementById('theme-toggle');
    if (btn) {
      var isLight = theme === 'light';
      btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
      btn.setAttribute(
        'title',
        isLight ? 'Switch to dark mode' : 'Switch to light mode'
      );
      btn.setAttribute(
        'aria-label',
        isLight ? 'Switch to dark mode' : 'Switch to light mode'
      );
      var icon = btn.querySelector('i');
      if (icon) {
        icon.className = 'fas ' + (isLight ? 'fa-moon' : 'fa-sun');
      }
    }
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  }

  var initial = getStoredTheme();
  applyTheme(initial);

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(document.documentElement.getAttribute('data-theme') || initial);
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
    }
  });
})();
