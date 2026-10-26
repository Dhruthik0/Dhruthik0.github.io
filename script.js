// Scroll reveal, active nav link, mobile menu, and stat count-up. No dependencies.
document.documentElement.classList.remove('no-js');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal sections as they enter the viewport.
const revealer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealer.observe(el));

// Nav border on scroll + highlight the section in view.
const nav = document.querySelector('.nav');
const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
  const y = window.scrollY + 120;
  let current = null;
  sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
}, { passive: true });

// Mobile menu.
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  menu.classList.toggle('open', !open);
});
menu.addEventListener('click', e => {
  if (e.target.closest('a')) {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }
});

// Count the stat numbers up once, when they first appear. The final text is already in the HTML.
const counter = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    counter.unobserve(e.target);
    const el = e.target;
    const target = parseFloat(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const dur = 1300;
    const tick = now => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.6 });
if (!reduceMotion) document.querySelectorAll('[data-count]').forEach(el => counter.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
