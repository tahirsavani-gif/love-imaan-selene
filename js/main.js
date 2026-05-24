/* Love, Imaan Selene — main.js */

document.addEventListener('DOMContentLoaded', () => {

  // ── CUSTOM CURSOR ──
  const cursor = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');

  if (cursor && ring) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Grow cursor on interactive elements
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        ring.style.width = '52px';
        ring.style.height = '52px';
        ring.style.opacity = '0.3';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.opacity = '0.5';
      });
    });
  }

  // ── NAV SCROLL BEHAVIOUR ──
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // ── MOBILE NAV ──
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => mobileNav.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // ── PARALLAX HERO IMAGE ──
  const heroRight = document.querySelector('.hero-right');
  if (heroRight) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroRight.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    });
  }

  // ── PHILOSOPHY FLOATING WORDS ──
  const philosophyEl = document.querySelector('.philosophy');
  if (philosophyEl) {
    const words = ['undefined', 'miraculous', 'becoming', 'worthy', 'free', 'here'];
    words.forEach((word, i) => {
      const el = document.createElement('div');
      el.classList.add('philosophy-word');
      el.textContent = word;
      el.style.left = `${Math.random() * 70 + 5}%`;
      el.style.top = `${Math.random() * 70 + 10}%`;
      el.style.opacity = `${Math.random() * 0.12 + 0.06}`;
      el.style.fontSize = `${Math.random() * 4 + 3}rem`;
      el.style.animationDelay = `${i * 0.3}s`;
      philosophyEl.appendChild(el);
    });
  }

});
