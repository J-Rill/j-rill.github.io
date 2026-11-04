// Dark-mode toggle. The site is white by default; the reader's choice is saved in
// localStorage so it carries across pages and visits (applied early by the inline
// <script> in each page's <head> to avoid a white flash).
const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

toggle.setAttribute('aria-pressed', root.dataset.theme === 'dark');

toggle.addEventListener('click', () => {
  const useDark = root.dataset.theme !== 'dark';
  if (useDark) root.dataset.theme = 'dark';
  else delete root.dataset.theme;
  themeColorMeta.content = useDark ? '#121212' : '#ffffff';
  toggle.setAttribute('aria-pressed', useDark);
  // Save last: if the browser blocks storage, the toggle still works for this page.
  localStorage.setItem('theme', useDark ? 'dark' : 'light');
});
