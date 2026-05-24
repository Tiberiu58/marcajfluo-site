/* ============================================
   STRADA·MARK — GSAP scroll animations
   Modern-classic, restrained, interactive
   ============================================ */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ========== MOBILE DETECTION ========== */
const isMobile = () => window.matchMedia('(max-width: 980px)').matches;

/* ========== MOBILE MENU ========== */
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

if (navToggle && mobileMenu) {
  const closeMenu = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };
  const openMenu = () => {
    navToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    // Animate links in
    gsap.fromTo('.mobile-menu-links a',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out', delay: 0.15 }
    );
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu(); else openMenu();
  });

  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980 && navToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });
}

/* ========== SCROLL PROGRESS ========== */
gsap.to('.scroll-progress', {
  width: '100%',
  ease: 'none',
  scrollTrigger: {
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.3
  }
});

/* ========== HERO INTRO ========== */
const heroIntro = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroIntro
  .from('.nav', { y: -40, opacity: 0, duration: 0.7 })
  .from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
  .to('.hero-title .line > span', {
    y: 0,
    duration: 1,
    ease: 'expo.out',
    stagger: 0.08
  }, '-=0.3')
  .from('.hero-sub', { y: 20, opacity: 0, duration: 0.6 }, '-=0.5')
  .from('.hero-cta > *', { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.4')
  .from('.hero-trust .trust-item, .hero-trust .trust-divider', {
    y: 16, opacity: 0, duration: 0.5, stagger: 0.06
  }, '-=0.3')
  .from('.hero-card', {
    y: 40, opacity: 0, duration: 0.9
  }, '-=0.8')
  .from('.hero-card .space', {
    opacity: 0, y: 10, stagger: 0.05, duration: 0.4
  }, '-=0.4');

/* Road line shine animation */
gsap.to('.road-line::after', {
  // (pseudo elements need different approach)
});
document.querySelectorAll('.road-line').forEach((line, i) => {
  const shine = document.createElement('span');
  shine.style.cssText = `position:absolute;inset:0;background:linear-gradient(90deg,transparent,#62e3ab 30%,#62e3ab 70%,transparent);transform:translateX(-150%);`;
  line.appendChild(shine);
  gsap.to(shine, {
    x: '150%',
    duration: 2.5,
    delay: 1.5 + i * 0.2,
    repeat: -1,
    repeatDelay: 4,
    ease: 'power2.inOut'
  });
});

/* ========== HERO PARALLAX ========== */
gsap.to('.hero-card', {
  y: -50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
});

gsap.to('.hero-asphalt', {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
});

/* ========== COUNTERS ========== */
gsap.utils.toArray('.trust-item strong').forEach(el => {
  const text = el.textContent.trim();
  // Parse: 2.4M+, 1,800+, 27
  const match = text.match(/^([\d.,]+)(.*)$/);
  if (!match) return;
  const targetStr = match[1].replace(/,/g, '');
  const target = parseFloat(targetStr);
  const suffix = match[2] || '';
  const hasDecimal = targetStr.includes('.');

  ScrollTrigger.create({
    trigger: el,
    start: 'top 90%',
    once: true,
    onEnter: () => {
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          let display;
          if (hasDecimal) {
            display = counter.val.toFixed(1);
          } else if (target >= 1000) {
            display = Math.floor(counter.val).toLocaleString();
          } else {
            display = Math.floor(counter.val);
          }
          el.textContent = display + suffix;
        }
      });
    }
  });
});

/* ========== VALUE STRIP ========== */
gsap.from('.value-item', {
  y: 40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.value-strip',
    start: 'top 75%'
  }
});

gsap.from('.value-item::before', {
  scaleX: 0,
  transformOrigin: 'left',
  duration: 0.6,
  stagger: 0.1,
  scrollTrigger: {
    trigger: '.value-strip',
    start: 'top 75%'
  }
});

/* ========== REVEAL TEXT (section headers) ========== */
gsap.utils.toArray('.reveal-text').forEach(el => {
  gsap.from(el, {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%'
    }
  });
});

gsap.utils.toArray('.section-header h2, .services-header h2, .process-intro h2, .compare-header h2, .work-header h2').forEach(h => {
  gsap.from(h, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: h,
      start: 'top 85%'
    }
  });
});

gsap.utils.toArray('.section-num').forEach(s => {
  gsap.from(s, {
    y: 20,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: s,
      start: 'top 90%'
    }
  });
});

/* ========== WHAT WE DO ========== */
gsap.from('.lede', {
  y: 40,
  opacity: 0,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.lede',
    start: 'top 80%'
  }
});

gsap.from('.what-text p', {
  y: 30,
  opacity: 0,
  duration: 0.8,
  delay: 0.1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.what-text',
    start: 'top 75%'
  }
});

gsap.from('.check', {
  x: -30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.what-checks',
    start: 'top 80%'
  }
});

/* Real photo reveal */
gsap.from('.real-photo', {
  y: 60,
  opacity: 0,
  duration: 1.2,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.real-photo',
    start: 'top 80%'
  }
});

gsap.from('.real-photo-caption', {
  y: 20,
  opacity: 0,
  duration: 0.8,
  delay: 0.4,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.real-photo',
    start: 'top 80%'
  }
});

/* ========== SERVICES CARDS ========== */
gsap.from('.service-card', {
  y: 60,
  opacity: 0,
  duration: 0.7,
  stagger: { each: 0.08, from: 'start' },
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.services-grid',
    start: 'top 80%'
  }
});

/* Magnetic card icons on hover (subtle interactive touch) */
document.querySelectorAll('.service-card').forEach(card => {
  const icon = card.querySelector('.card-icon');
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(icon, { x: x * 14, y: y * 14, duration: 0.4, ease: 'power2.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(icon, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  });
});

/* ========== PROCESS HORIZONTAL SCROLL ========== */
const processSlides = document.querySelector('.process-slides');
const processTrack = document.querySelector('.process-track');
const processPin = document.querySelector('.process-pin');

if (processSlides && processTrack && !isMobile()) {
  const getScrollDistance = () => {
    return processSlides.scrollWidth - window.innerWidth + 80;
  };

  const processTween = gsap.to(processSlides, {
    x: () => -getScrollDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: processTrack,
      start: 'top top',
      end: () => `+=${getScrollDistance()}`,
      scrub: 1,
      pin: processPin,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  /* Survey rows count animation */
  gsap.from('.survey-row', {
    x: -20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.survey-mockup',
      containerAnimation: processTween,
      start: 'left 70%'
    }
  });

  /* Prep stages lighting up */
  gsap.utils.toArray('.prep-stage').forEach((stage, i) => {
    stage.classList.remove('active');
    ScrollTrigger.create({
      trigger: stage,
      containerAnimation: processTween,
      start: 'left 70%',
      onEnter: () => {
        gsap.delayedCall(i * 0.2, () => stage.classList.add('active'));
      }
    });
  });

  /* Apply line painting */
  gsap.to('.apply-line', {
    width: '100%',
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.apply-road',
      containerAnimation: processTween,
      start: 'left 65%'
    }
  });
  gsap.to('.apply-machine', {
    left: '100%',
    duration: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: '.apply-road',
      containerAnimation: processTween,
      start: 'left 65%'
    }
  });
  gsap.from('.apply-stats > div', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.apply-stats',
      containerAnimation: processTween,
      start: 'left 70%'
    }
  });

  /* QC check */
  gsap.to('.qc-check path', {
    strokeDashoffset: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.qc-check',
      containerAnimation: processTween,
      start: 'left 65%'
    }
  });
  gsap.from('.qc-stats > div', {
    x: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.qc-stats',
      containerAnimation: processTween,
      start: 'left 65%'
    }
  });
} else if (processSlides) {
  /* Mobile: simple vertical scroll animations for each slide */
  gsap.utils.toArray('.p-slide').forEach(slide => {
    gsap.from(slide, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: slide, start: 'top 85%' }
    });
  });

  /* Survey rows */
  gsap.from('.survey-row', {
    x: -20, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.survey-mockup', start: 'top 85%' }
  });

  /* Prep stages */
  ScrollTrigger.create({
    trigger: '.prep-bar', start: 'top 85%', once: true,
    onEnter: () => {
      gsap.utils.toArray('.prep-stage').forEach((stage, i) => {
        stage.classList.remove('active');
        gsap.delayedCall(i * 0.2, () => stage.classList.add('active'));
      });
    }
  });

  /* Apply line */
  gsap.to('.apply-line', {
    width: '100%', duration: 1.5, ease: 'power2.inOut',
    scrollTrigger: { trigger: '.apply-road', start: 'top 80%' }
  });
  gsap.to('.apply-machine', {
    left: '100%', duration: 1.5, ease: 'power2.inOut',
    scrollTrigger: { trigger: '.apply-road', start: 'top 80%' }
  });
  gsap.from('.apply-stats > div', {
    y: 20, opacity: 0, duration: 0.4, stagger: 0.1,
    scrollTrigger: { trigger: '.apply-stats', start: 'top 85%' }
  });

  /* QC */
  gsap.to('.qc-check path', {
    strokeDashoffset: 0, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '.qc-check', start: 'top 85%' }
  });
  gsap.from('.qc-stats > div', {
    x: 20, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.qc-stats', start: 'top 85%' }
  });
}

/* ========== COMPARE ========== */
gsap.from('.compare-row', {
  x: -20,
  opacity: 0,
  duration: 0.5,
  stagger: 0.06,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.compare-grid',
    start: 'top 80%'
  }
});

/* ========== PRICING TABLE ========== */
gsap.from('.pt-row', {
  x: -20,
  opacity: 0,
  duration: 0.5,
  stagger: 0.06,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.pricing-table',
    start: 'top 80%'
  }
});

gsap.from('.pricing-note', {
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.pricing-note',
    start: 'top 90%'
  }
});

/* ========== FAQ ========== */
gsap.from('.faq-item', {
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.08,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.faq-list',
    start: 'top 80%'
  }
});

/* FAQ accordion smooth animation */
document.querySelectorAll('.faq-item').forEach(item => {
  const summary = item.querySelector('summary');
  const body = item.querySelector('.faq-body');

  summary.addEventListener('click', (e) => {
    // Let native toggle happen first
    requestAnimationFrame(() => {
      if (item.hasAttribute('open')) {
        gsap.fromTo(body,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
      }
    });
  });
});

/* ========== WORK ITEMS ========== */
gsap.from('.work-item', {
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: { each: 0.1, from: 'start' },
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.work-grid',
    start: 'top 80%'
  }
});

/* Subtle parallax on work images */
gsap.utils.toArray('.work-img').forEach(img => {
  gsap.to(img, {
    yPercent: -10,
    ease: 'none',
    scrollTrigger: {
      trigger: img,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });
});

/* ========== QUOTE ========== */
gsap.from('.quote-mark', {
  scale: 0.5,
  opacity: 0,
  duration: 1,
  ease: 'back.out(1.4)',
  scrollTrigger: {
    trigger: 'blockquote',
    start: 'top 80%'
  }
});

gsap.from('blockquote p', {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: 'blockquote',
    start: 'top 80%'
  }
});

gsap.from('blockquote footer > *', {
  y: 20,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  delay: 0.5,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: 'blockquote',
    start: 'top 80%'
  }
});

/* ========== CONTACT ========== */
gsap.from('.contact-title', {
  y: 60,
  opacity: 0,
  duration: 1,
  ease: 'expo.out',
  scrollTrigger: {
    trigger: '.contact-title',
    start: 'top 85%'
  }
});

gsap.from('.contact-lede', {
  y: 30,
  opacity: 0,
  duration: 0.8,
  delay: 0.2,
  scrollTrigger: {
    trigger: '.contact-lede',
    start: 'top 85%'
  }
});

gsap.from('.ci-row', {
  x: -20,
  opacity: 0,
  duration: 0.5,
  stagger: 0.08,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact-info',
    start: 'top 80%'
  }
});

gsap.from('.contact-form', {
  y: 40,
  opacity: 0,
  duration: 0.9,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact-form',
    start: 'top 80%'
  }
});

/* ========== FOOTER ========== */
gsap.from('.footer-top > *, .footer-bottom', {
  y: 30,
  opacity: 0,
  duration: 0.7,
  stagger: 0.1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.footer',
    start: 'top 90%'
  }
});

/* ========== SMOOTH ANCHOR SCROLL ========== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (targetId === '#' || targetId.length < 2) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    gsap.to(window, {
      duration: 1.1,
      scrollTo: { y: target, offsetY: 70 },
      ease: 'power3.inOut'
    });
  });
});

/* ========== REFRESH ON RESIZE ========== */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
});
