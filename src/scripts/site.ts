const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu');

if (menu) {
  menu.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) menu.open = false;
  });
  document.addEventListener('click', (event) => {
    if (menu.open && event.target instanceof Node && !menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary')?.focus();
    }
  });
  window.matchMedia('(min-width: 701px)').addEventListener('change', (event) => {
    if (event.matches) menu.open = false;
  });
}

const root = document.documentElement;
const hero = document.querySelector<HTMLElement>('[data-ambient]');
const mist = hero?.querySelector<HTMLElement>('.mist-band');
const motionButton = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
const motionLabel = motionButton?.querySelector<HTMLElement>('[data-motion-label]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const nativeTimelines = CSS.supports('animation-timeline: view()')
  && CSS.supports('animation-range: entry 0% entry 100%');
const revealFrames = [...document.querySelectorAll<HTMLElement>('[data-reveal-frame]')];
let motionEnabled = true;
let mistVisible = false;

root.dataset.scrollMotion = nativeTimelines ? 'native' : 'fallback';

// Storage can be unavailable in private or restricted browsing contexts.
try { motionEnabled = localStorage.getItem('critbuild-motion') !== 'off'; } catch { /* Use the OS preference. */ }

function syncMotion() {
  const enabled = motionEnabled && !reducedMotion.matches;
  root.dataset.motion = enabled && !document.hidden ? 'on' : 'off';
  motionButton?.setAttribute('aria-pressed', String(enabled));
  if (motionButton) motionButton.disabled = reducedMotion.matches;
  if (motionLabel) motionLabel.textContent = reducedMotion.matches ? 'MOTION REDUCED' : enabled ? 'MOTION ON' : 'MOTION OFF';
  if (!enabled || document.hidden) {
    hero?.classList.remove('is-entering');
    for (const frame of revealFrames) frame.classList.remove('is-revealing');
  }
}

function syncVisibility() {
  if (hero) hero.dataset.visible = String(mistVisible && !document.hidden);
  syncMotion();
}

function enterHero() {
  if (hero && root.dataset.motion === 'on' && hero.getBoundingClientRect().top > -80) {
    hero.classList.add('is-entering');
  }
}

if (motionButton) motionButton.hidden = false;
syncMotion();

motionButton?.addEventListener('click', () => {
  motionEnabled = !motionEnabled;
  try { localStorage.setItem('critbuild-motion', motionEnabled ? 'on' : 'off'); } catch { /* Preference still applies to this page. */ }
  syncMotion();
  enterHero();
});
reducedMotion.addEventListener('change', syncMotion);
document.addEventListener('visibilitychange', syncVisibility);
document.addEventListener('animationend', (event) => {
  if (event.animationName === 'hero-arrive') hero?.classList.remove('is-entering');
  if (!(event.target instanceof Element)) return;
  const frame = event.target.closest('[data-reveal-frame]');
  if (frame && !frame.getAnimations({ subtree: true })
    .some((animation) => animation instanceof CSSAnimation && animation.playState === 'running')) {
    frame.classList.remove('is-revealing');
  }
});
document.addEventListener('focusin', (event) => {
  if (!(event.target instanceof Element)) return;
  const card = event.target.closest('.project-card');
  card?.querySelector('[data-reveal-frame]')?.classList.remove('is-revealing');
  if (hero?.contains(event.target)) hero.classList.remove('is-entering');
});

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.target === mist) {
      mistVisible = entry.isIntersecting;
      syncVisibility();
      continue;
    }
    if (entry.target === hero) {
      if (!entry.isIntersecting) hero.classList.remove('is-entering');
      continue;
    }
    const card = entry.target.closest('.project-card');
    entry.target.classList.toggle('is-revealing',
      entry.isIntersecting && motionEnabled && !reducedMotion.matches && !document.hidden
        && !card?.contains(document.activeElement));
  }
}, { rootMargin: `0px 0px -${Math.round(Math.min(240, window.innerHeight * .3))}px 0px` });

for (const frame of revealFrames) observer.observe(frame);
if (mist) observer.observe(mist);
if (hero) observer.observe(hero);
if (!location.hash || location.hash === '#top') enterHero();
