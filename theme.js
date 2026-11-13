// Dark-mode toggle. With no saved choice the site follows the reader's system
// setting (applied early by the inline <script> in each page's <head> to avoid a
// flash); clicking the toggle saves an explicit choice in localStorage.
const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
// Kept in sync with the theme actually shown: declaring "light dark" let the browser
// paint a dark blank page before CSS loaded, which made Dark Reader sometimes treat
// the site as already dark and skip it, so pages came out inconsistently.
const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function apply(useDark) {
  if (useDark) root.dataset.theme = 'dark';
  else delete root.dataset.theme;
  themeColorMeta.content = useDark ? '#080e1b' : '#f7f5f0';
  colorSchemeMeta.content = useDark ? 'dark' : 'light';
  // The button names the mode it switches *to*, as in the design.
  toggle.textContent = useDark ? 'Light' : 'Dark';
  toggle.setAttribute('aria-label', useDark ? 'Light mode' : 'Dark mode');
}

apply(root.dataset.theme === 'dark');

// Track system changes only until the reader makes an explicit choice.
systemDark.addEventListener('change', (event) => {
  if (!localStorage.getItem('theme')) apply(event.matches);
});

toggle.addEventListener('click', () => {
  const useDark = root.dataset.theme !== 'dark';
  apply(useDark);
  // Save last: if the browser blocks storage, the toggle still works for this page.
  localStorage.setItem('theme', useDark ? 'dark' : 'light');
});
