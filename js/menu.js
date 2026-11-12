document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#menu-principal');
  const icon = button?.querySelector('.menu-icon');
  if (!button || !menu) return;
  const setMenu = (open) => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('is-open', open);
    icon.textContent = open ? '✕' : '☰';
    if (!open) button.focus();
  };
  button.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') setMenu(false);
  });
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !button.contains(event.target) && button.getAttribute('aria-expanded') === 'true') {
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Abrir menu');
      menu.classList.remove('is-open');
      icon.textContent = '☰';
    }
  });
  const current = location.pathname.split('/').pop() || 'index.html';
  menu.querySelectorAll('a').forEach(link => {
    if (link.dataset.page === current) link.setAttribute('aria-current', 'page');
  });
  const year = document.querySelector('#ano-atual');
  if (year) year.textContent = new Date().getFullYear();
});
