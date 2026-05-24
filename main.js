// ═══════════════════════════════════════════════════════════
//  LOVE, IMAAN SELENE — main.js
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── INJECT CONTENT FROM content.js ──────────────────────
  if (typeof SITE !== 'undefined') {
    // Wordmarks
    document.querySelectorAll('[data-content="wordmark"]').forEach(el => el.textContent = SITE.wordmark);
    // Hero
    const heroHeadline = document.querySelector('[data-content="heroHeadline"]');
    if (heroHeadline) heroHeadline.innerHTML = SITE.tagline.replace("you're here.", "<em>you're here.</em>");
    const heroSub = document.querySelector('[data-content="heroSub"]');
    if (heroSub) heroSub.textContent = SITE.subtagline;
    // About
    const aOpen = document.querySelector('[data-content="aboutOpener"]');
    if (aOpen) aOpen.textContent = SITE.aboutOpener;
    const aSig = document.querySelector('[data-content="aboutSignature"]');
    if (aSig) aSig.textContent = SITE.aboutSignature;
    // Quote
    const quote = document.querySelector('[data-content="quote"]');
    if (quote) quote.innerHTML = SITE.quote.replace('do not define you.', '<em>do not define you.</em>');
    // Footer
    document.querySelectorAll('[data-content="footerTagline"]').forEach(el => el.textContent = SITE.footerTagline);
    document.querySelectorAll('[data-content="footerCopy"]').forEach(el => el.textContent = SITE.footerCopy);
    // Images
    document.querySelectorAll('[data-img="hero"]').forEach(el => el.src = SITE.heroImage);
    document.querySelectorAll('[data-img="about"]').forEach(el => el.src = SITE.aboutImage);
    document.querySelectorAll('[data-img="polaroid1"]').forEach(el => el.src = SITE.polaroid1);
    document.querySelectorAll('[data-img="polaroid2"]').forEach(el => el.src = SITE.polaroid2);
    document.querySelectorAll('[data-img="polaroid3"]').forEach(el => el.src = SITE.polaroid3);
    // Social links
    document.querySelectorAll('[data-link="instagram"]').forEach(el => el.href = SITE.instagram);
    document.querySelectorAll('[data-link="spotify"]').forEach(el => el.href = SITE.spotify);
    document.querySelectorAll('[data-link="apple"]').forEach(el => el.href = SITE.applePodcasts);
    document.querySelectorAll('[data-link="youtube"]').forEach(el => el.href = SITE.youtube);
    // Ticker
    const tickerInner = document.querySelector('.ticker-inner');
    if (tickerInner && SITE.ticker) {
      const phrases = [...SITE.ticker, ...SITE.ticker];
      tickerInner.innerHTML = phrases.map(p =>
        `<span class="ticker-phrase">${p}</span><span class="ticker-dot">✦</span>`
      ).join('');
    }
    // Cities
    const citiesWrap = document.querySelector('.travel-cities-grid');
    if (citiesWrap && SITE.cities) {
      citiesWrap.innerHTML = SITE.cities.map(c =>
        `<span class="city-pill" onclick="window.location='./travel.html'">${c}</span>`
      ).join('');
    }
    // Travel quote
    const tq = document.querySelector('[data-content="travelQuote"]');
    if (tq) tq.textContent = SITE.travelQuote;
  }

  // ── CUSTOM CURSOR ────────────────────────────────────────
  const cursor = document.querySelector('.cursor');
  const ring   = document.querySelector('.cursor-ring');
  if (cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
    (function animRing() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();
    document.querySelectorAll('a, button, .city-pill').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('grow'); ring.classList.add('grow'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('grow'); ring.classList.remove('grow'); });
    });
  }

  // ── NAV SCROLL ───────────────────────────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ── MOBILE NAV ───────────────────────────────────────────
  const toggle    = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn  = document.querySelector('.mobile-nav-close');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => mobileNav.classList.add('open'));
    closeBtn?.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
  }

  // ── SCROLL REVEAL ────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
  }, { threshold: 0.1 });
  revealEls.forEach(el => ro.observe(el));

  // ── HERO PARALLAX ────────────────────────────────────────
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight * 1.2) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.2}px)`;
      }
    }, { passive: true });
  }

});
