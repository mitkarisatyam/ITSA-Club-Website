/**
 * ITSA Official Content Adapter
 * Seamlessly injects ITSA identity and content while strictly preserving
 * GSAP SplitText line wrappers, Three.js 3D rig, and Next.js flight payloads.
 */
(function () {
  'use strict';

  const TITLE = 'ITSA | Information Technology Students Association — VIT Pune';
  const META_DESC = 'Discover ITSA, the Information Technology Students Association at VIT Pune. Explore its activities, technical domains, student community, and leadership opportunities.';

  // 1. Permanent CSS rules to hide viewport frame border, ES switcher, and "Available for projects"
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    a[hrefLang="es"], a[href="/es"], a[href*="/es"] { display: none !important; }
    a[href*="linkedin.com"], a[href*="instagram.com"], a[href*="twitter.com"], a[href*="x.com"], a[href*="github.com"] {
      display: none !important;
    }
    div[class*="calc(100%-32px)"],
    div[class*="calc(100vh-32px)"],
    div.mx-auto.pointer-events-none.fixed[class*="border-white/10"] {
      display: none !important;
    }
  
    /* Remove project title and live links when scrolling images in Section 3 */
    section[data-geometry="diamond"] div.sticky,
    section[data-geometry="diamond"] a.sticky,
    section[data-geometry="diamond"] p.heading-5,
    section[data-geometry="diamond"] a.underline,
    section[data-geometry="diamond"] div.flex.tablet-portrait\\:hidden.items-center.justify-between {
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    section[data-geometry="diamond"] p.heading-5,
    section[data-geometry="diamond"] div.flex.tablet-portrait\\:hidden.items-center.justify-between {
      display: none !important;
    }
  `;
  if (document.head) document.head.appendChild(styleEl);
  else document.addEventListener('DOMContentLoaded', () => document.head.appendChild(styleEl));

  const SERVICES_DATA = [
    // Slide 1: Explore. Learn. Innovate.
    {
      title: 'Explore. Learn. Innovate.',
      cards: [
        {
          heading: 'TECHNICAL WORKSHOPS',
          shortDesc: 'Explore new technologies and strengthen your technical skills.',
          fullDesc: 'Discover new technologies, develop your fundamentals, and explore practical applications through hands-on learning and technical sessions.'
        },
        {
          heading: 'HACKATHONS & COMPETITIONS',
          shortDesc: 'Turn creative ideas into innovative solutions.',
          fullDesc: 'Challenge yourself, exchange ideas, collaborate with fellow students, and explore solutions to interesting technical problems.'
        },
        {
          heading: 'NETWORKING & MENTORSHIP',
          shortDesc: 'Connect, learn, and grow together.',
          fullDesc: 'Gain insights from peers, seniors, and industry experts while building connections that support your technical and professional development.'
        }
      ]
    },
    // Slide 2: Technology & Innovation
    {
      title: 'Technology & Innovation',
      cards: [
        {
          heading: 'WEB DEVELOPMENT',
          shortDesc: 'From ideas to interactive digital experiences.',
          fullDesc: 'Explore website development, learn how digital experiences are built, and discover opportunities to create interactive websites using modern web technologies.'
        },
        {
          heading: 'ARTIFICIAL INTELLIGENCE & MACHINE LEARNING',
          shortDesc: 'Explore the possibilities of intelligent technology.',
          fullDesc: 'Discover artificial intelligence and machine learning concepts and explore how intelligent systems can be applied to real-world problems.'
        },
        {
          heading: 'DATA STRUCTURES & ALGORITHMS',
          shortDesc: 'Build a stronger foundation in problem-solving.',
          fullDesc: 'Explore algorithms, data structures, logical reasoning, and computational thinking to strengthen your computer science fundamentals.'
        }
      ]
    },
    // Slide 3: Discover Your Potential
    {
      title: 'Discover Your Potential',
      cards: [
        {
          heading: 'LEARN & EXPLORE',
          shortDesc: 'Discover your interests. Develop your skills.',
          fullDesc: 'Explore new technologies, strengthen your fundamentals, and discover areas of interest beyond the classroom.'
        },
        {
          heading: 'COLLABORATE & CREATE',
          shortDesc: 'Great ideas grow through collaboration.',
          fullDesc: 'Exchange ideas with fellow students, learn from different perspectives, and explore creative approaches to technical challenges.'
        },
        {
          heading: 'LEAD & GROW',
          shortDesc: 'Take responsibility. Make a contribution.',
          fullDesc: 'Develop leadership, communication, and teamwork skills while contributing to a technology-focused student community.'
        }
      ]
    }
  ];

  const DOMAINS_DATA = [
    {
      title: 'Technical Division',
      desc: 'Web Development • AIML • Data Structures & Algorithms (DSA) — Full-stack web applications, intelligent systems, and algorithmic problem-solving.'
    },
    {
      title: 'Branding Division',
      desc: 'Graphics • Media — Creative visual identity, graphic design, photography, video production, and social media storytelling.'
    },
    {
      title: 'Operations Division',
      desc: 'Operations • Database • Aesthetics — Association logistics, event management, database administration, and venue aesthetics.'
    },
    {
      title: 'Relations & Finance Divisions',
      desc: 'Industry Relations • Sponsorship • Publicity • Finance — Corporate partnerships, sponsorships, campus publicity, and financial planning.'
    }
  ];

  function applyITSAContent() {
    // Cleanup any "Available for projects" or Ricardo email elements if rendered
    document.querySelectorAll('p, a, button, span').forEach((el) => {
      const text = el.textContent ? el.textContent.trim() : '';
      if (text === 'Available for projects') {
        const parentDiv = el.closest('div');
        if (parentDiv && (parentDiv.querySelector('[data-works-line]') || el.closest('button'))) {
          parentDiv.style.setProperty('display', 'none', 'important');
        }
        el.style.setProperty('display', 'none', 'important');
      }
      if (text.includes('hello@ricardochance.com')) {
        const a = el.closest('a') || el;
        a.style.setProperty('display', 'none', 'important');
      }
    });
    const path = window.location.pathname;

    // Document Metadata
    if (document.title !== TITLE && !path.includes('/about') && !path.includes('/work') && !path.includes('/events')) {
      document.title = TITLE;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && metaDesc.getAttribute('content') !== META_DESC) {
      metaDesc.setAttribute('content', META_DESC);
    }

    // Header Logo (I T S A)
    const brandContainer = document.querySelector('header a[data-event="simple-hover"]');
    if (brandContainer) {
      brandContainer.style.mixBlendMode = '';
      const srOnly = brandContainer.querySelector('.sr-only');
      if (srOnly && srOnly.textContent !== 'ITSA') srOnly.textContent = 'ITSA';

      const charSpans = brandContainer.querySelectorAll('[data-vp-char]');
      const targetLetters = ['I', 'T', 'S', 'A'];
      charSpans.forEach((span, idx) => {
        if (idx < targetLetters.length) {
          if (span.textContent !== targetLetters[idx]) span.textContent = targetLetters[idx];
          span.style.display = 'inline-block';
        } else {
          span.textContent = '';
          span.style.display = 'none';
        }
      });
    }

    // Language Switcher: remove ES link and stray slash
    const esLinks = document.querySelectorAll('a[hrefLang="es"], a[href="/es"], a[href*="/es"]');
    esLinks.forEach((esLink) => {
      esLink.style.display = 'none';
      if (esLink.previousSibling && esLink.previousSibling.nodeType === Node.TEXT_NODE) {
        esLink.previousSibling.textContent = '';
      }
    });

    // Remove Viewport Frame Border
    const frameBorders = document.querySelectorAll('div[class*="calc(100%-32px)"], div[class*="calc(100vh-32px)"], div.mx-auto.pointer-events-none.fixed[class*="border-white/10"]');
    frameBorders.forEach((b) => {
      b.style.display = 'none';
    });

    // If on /work or /events page, prevent modifying SplitText lines or causing mutation loops
    if (path.includes('/work') || path.includes('/events')) {
      return;
    }

    // ITSA Projects badge & contact@vit.edu on works page
    const worksLines = document.querySelectorAll('[data-works-line="true"]');
    worksLines.forEach((el) => {
      if (el.tagName === 'P') {
        if (el.textContent.includes('Available for projects') || el.textContent !== 'ITSA Projects & Initiatives') {
          el.textContent = 'ITSA Projects & Initiatives';
        }
      } else if (el.tagName === 'A') {
        el.href = 'mailto:contact@vit.edu';
        const charSpans = el.querySelectorAll('[data-vp-char]');
        const emailStr = 'contact@vit.edu';
        if (charSpans.length > 0) {
          charSpans.forEach((span, idx) => {
            if (idx < emailStr.length) {
              if (span.textContent !== emailStr[idx]) span.textContent = emailStr[idx];
              span.style.display = 'inline-block';
            } else {
              span.textContent = '';
              span.style.display = 'none';
            }
          });
        }
        const srOnly = el.querySelector('.sr-only');
        if (srOnly) srOnly.textContent = 'contact@vit.edu';
      }
    });

    const emailLinks = document.querySelectorAll('a[href*="hello@ricardochance.com"], a[href*="instagram.com"], a[href*="linkedin.com"], a[href*="x.com"]');
    emailLinks.forEach((a) => {
      a.href = 'mailto:contact@vit.edu';
      const srOnly = a.querySelector('.sr-only');
      if (srOnly) srOnly.textContent = 'contact@vit.edu';
      if (a.textContent.includes('hello@ricardochance.com') || a.textContent.includes('@vit_itsa')) {
        a.textContent = 'contact@vit.edu';
      }
    });

    // Remove any Social Media columns or links in footer / content
    document.querySelectorAll('p, h6, span').forEach((el) => {
      if (el.textContent.trim() === 'Social Media') {
        const col = el.closest('div.flex.flex-col');
        if (col) col.remove();
      }
    });
    document.querySelectorAll('a[href*="linkedin.com"], a[href*="instagram.com"], a[href*="twitter.com"], a[href*="x.com"]').forEach((a) => {
      a.remove();
    });

    // 1. Hero Section
    const heroLabel = document.querySelector('[data-home-hero-label="true"]');
    if (heroLabel && !heroLabel.textContent.includes('Information Technology Students Association')) {
      heroLabel.textContent = 'Information Technology Students Association · VIT Pune';
    }

    const heroTitle = document.querySelector('[data-home-hero-title="true"]');
    if (heroTitle && !heroTitle.textContent.includes('Ideas Into Innovation')) {
      heroTitle.innerHTML = "Ideas Into Innovation, <span class='opacity-60'>Technology Into Impact.</span>";
    }

    const heroDesc = document.querySelector('[data-home-hero-description="true"]');
    if (heroDesc && !heroDesc.textContent.includes('ITSA brings together curious minds')) {
      heroDesc.textContent = 'ITSA brings together curious minds to explore technology, develop skills, exchange ideas, and discover opportunities for growth through collaboration and innovation.';
    }

    // Ensure section IDs are present for scrolling
    const secDiamond = document.querySelector('section[data-geometry="diamond"]');
    if (secDiamond && secDiamond.id !== 'projects') secDiamond.id = 'projects';
    const secDissolve = document.querySelector('section[data-dissolve="out"]');
    if (secDissolve && secDissolve.id !== 'about') secDissolve.id = 'about';

    // Ensure hero CTA button 2 is not trapped inside an <a> tag
    const heroA = document.querySelector('section[data-home-hero="true"] a:has([data-home-hero-cta="true"]), [data-home-hero="true"] a[href*="work"]:has([data-home-hero-cta="true"]), [data-home-hero="true"] a[href*="projects"]:has([data-home-hero-cta="true"])');
    if (heroA) {
      const btn = heroA.querySelector('[data-home-hero-cta="true"]');
      if (btn) {
        heroA.replaceWith(btn);
      }
    }

    const heroCtas = document.querySelectorAll('[data-home-hero-cta="true"] span.relative.block');
    if (heroCtas.length >= 2) {
      if (heroCtas[0].textContent !== 'EXPLORE ITSA') heroCtas[0].textContent = 'EXPLORE ITSA';
      if (heroCtas[1].textContent !== 'DISCOVER OUR WORK') heroCtas[1].textContent = 'DISCOVER OUR WORK';
    }

    const heroCtaBtns = document.querySelectorAll('[data-home-hero-cta="true"]');
    if (heroCtaBtns.length >= 2) {
      heroCtaBtns[0].setAttribute('data-cta-target', 'about');
      heroCtaBtns[0].setAttribute('onclick', "window.__itsaScroll && window.__itsaScroll('about')");
      heroCtaBtns[1].setAttribute('data-cta-target', 'work');
      heroCtaBtns[1].setAttribute('onclick', "window.open('/work', '_blank')");
      heroCtaBtns.forEach(btn => {
        btn.classList.remove('invisible');
        btn.style.cursor = 'pointer';
        btn.style.pointerEvents = 'auto';
      });
    }

    // Set up interactive actions for other buttons & links
    const dropALineLinks = document.querySelectorAll('a[href*="hello@ricardochance.com"], a[href*="mailto:"]');
    dropALineLinks.forEach(a => {
      if (a.textContent.includes('Drop a line')) {
        a.removeAttribute('href');
        a.style.cursor = 'pointer';
        a.setAttribute('data-action', 'contact');
      }
    });

    const getInTouchSpan = Array.from(document.querySelectorAll('span.underline')).find(el => el.textContent.includes('GET IN TOUCH'));
    if (getInTouchSpan) {
      getInTouchSpan.style.cursor = 'pointer';
      getInTouchSpan.setAttribute('data-action', 'contact');
    }

    const oppBtns = document.querySelectorAll('.process-cta-pending, button');
    oppBtns.forEach(btn => {
      if (btn.textContent.includes('EXPLORE OPPORTUNITIES') || btn.textContent.includes("Let's build something")) {
        btn.setAttribute('data-action', 'contact');
        btn.style.cursor = 'pointer';
      }
    });

    const navContactP = Array.from(document.querySelectorAll('header nav p, header nav a, header nav span')).find(el => el.textContent.trim() === 'Contact' || el.textContent.trim() === 'CONTACT');
    if (navContactP) {
      const parentP = navContactP.closest('p, a');
      if (parentP) {
        parentP.setAttribute('data-action', 'contact');
        parentP.style.cursor = 'pointer';
      }
    }

    // Ensure Events option is present in header nav
    const headerNav = document.querySelector('header nav, div.relative > nav');
    if (headerNav && !headerNav.querySelector('a[href="/events"]')) {
      const eventsLink = document.createElement('a');
      eventsLink.setAttribute('data-event', 'simple-hover');
      eventsLink.className = 'inherit';
      eventsLink.href = '/events';
      eventsLink.innerHTML = '<span data-proximity-text="true" class="inline"><span class="red_hat_display_c426665f-module__-9R5Xa__className" style="display:inline"><span style="display:inline-block;white-space:nowrap"><span data-vp-char="" style="display:inline-block" aria-hidden="true">E</span><span data-vp-char="" style="display:inline-block" aria-hidden="true">v</span><span data-vp-char="" style="display:inline-block" aria-hidden="true">e</span><span data-vp-char="" style="display:inline-block" aria-hidden="true">n</span><span data-vp-char="" style="display:inline-block" aria-hidden="true">t</span><span data-vp-char="" style="display:inline-block" aria-hidden="true">s</span></span><span class="sr-only">Events</span></span></span>';
      const contactTarget = headerNav.querySelector('p[data-action="contact"], p');
      if (contactTarget) {
        headerNav.insertBefore(eventsLink, contactTarget);
      } else {
        headerNav.appendChild(eventsLink);
      }
    }

    // Ensure direct Events pill is present in header bar
    const headerRowRight = document.querySelector('header div.pointer-events-auto.flex.items-center.justify-end');
    if (headerRowRight && !headerRowRight.querySelector('a[href="/events"]')) {
      const pill = document.createElement('a');
      pill.href = '/events';
      pill.setAttribute('data-event', 'simple-hover');
      pill.className = 'pointer-events-auto flex items-center gap-1.5 px-3 py-1 text-xs tracking-wider uppercase border border-brand-05/30 hover:border-brand-05/70 rounded-full transition-all text-brand-05 hover:bg-white/5 mr-1';
      pill.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400" style="box-shadow:0 0 8px #10b981"></span><span class="font-semibold">Events</span>';
      headerRowRight.insertBefore(pill, headerRowRight.firstChild);
    }

    // 2. Section Two: Community and Identity (About ITSA)
    const sec2Heading = document.querySelector('section[data-dissolve="out"] h2');
    if (sec2Heading && !sec2Heading.innerHTML.includes('A Community')) {
      sec2Heading.innerHTML = `<span data-start-from-zero="true" class="js-s-print-opacity flex flex-col mobile-landscape:w-fit"><span class='flex mobile-landscape:w-fit mobile-landscape:ml-auto'>A Community</span><span class='flex flex-col'><span>of Innovators.</span></span></span>`;
    }

    const sec2Desc = document.querySelector('section[data-dissolve="out"] p.body-md');
    if (sec2Desc && !sec2Desc.textContent.includes('ITSA brings students together around technology')) {
      sec2Desc.textContent = 'ITSA brings students together around technology, creativity, collaboration, and continuous learning. It represents an opportunity to explore interests, exchange knowledge, and develop skills alongside a community of fellow students.';
    }

    const sec2Btn = document.querySelector('section[data-dissolve="out"] a[href="/about"] span.relative.block');
    if (sec2Btn && !sec2Btn.textContent.includes('ITSA')) {
      sec2Btn.innerHTML = 'Learn more<span class="sr-only"> about ITSA</span>';
    }

    // 3. Section Three: Projects and Innovation header & copy
    const featHeader = document.querySelector('section[data-geometry="diamond"] h2');
    if (featHeader && featHeader.textContent !== 'PROJECTS AND INNOVATION') {
      featHeader.textContent = 'PROJECTS AND INNOVATION';
    }

    const featSubtitle = document.querySelector('section[data-geometry="diamond"] p.heading-2');
    if (featSubtitle && !featSubtitle.textContent.includes('From Ideas to Implementation')) {
      featSubtitle.textContent = 'From Ideas to Implementation.';
    }

    const featDesc = document.querySelector('section[data-geometry="diamond"] p.body-md.max-w-100');
    if (featDesc && !featDesc.textContent.includes('Technology creates opportunities')) {
      featDesc.textContent = 'Technology creates opportunities to explore ideas, solve problems, and develop practical solutions. ITSA encourages an environment where students can share knowledge, collaborate, and develop their technical interests.';
    }

    const featBtn = document.querySelector('section[data-geometry="diamond"] a[href="/work"] span.relative.block');
    if (featBtn && featBtn.textContent !== 'View all projects') {
      featBtn.textContent = 'View all projects';
    }

    // Hide sticky and mobile project texts when scrolling images in Section 3
    const diamondSection = document.querySelector('section[data-geometry="diamond"]');
    if (diamondSection) {
      const textsToHide = diamondSection.querySelectorAll(
        'div.sticky, a.sticky, p.heading-5, a.underline, div.flex.tablet-portrait\\:hidden.items-center.justify-between'
      );
      textsToHide.forEach((el) => {
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
      });
    }

    // ============================================================
    // 4. THE 3 SERVICES SLIDES (Explore. Learn. Innovate. | Technology & Innovation | Discover Your Potential)
    // ============================================================
    const serviceHeadings = document.querySelectorAll('h2.heading-2.font-instrument-serif');
    serviceHeadings.forEach((h2) => {
      if (h2.textContent.includes('Ideation to Launch') || h2.textContent.includes('Got You Covered')) {
        h2.textContent = 'Your Platform for Growth, Collaboration & Technology.';
      }
    });

    const serviceDescriptions = document.querySelectorAll('p.body-sm.mobile-landscape\\:max-w-105');
    serviceDescriptions.forEach((p) => {
      if (p.textContent.includes('beyond the expected') || p.textContent.includes('3D scenes, scroll-driven')) {
        p.textContent = 'Explore technical workshops, hackathons, mentorship sessions, and student development initiatives through ITSA at VIT Pune.';
      }
    });

    // 3 Category Titles (both desktop & mobile)
    const serviceTitles = document.querySelectorAll('[data-service-title="true"]');
    serviceTitles.forEach((t, idx) => {
      const catIdx = idx % 3;
      if (catIdx < SERVICES_DATA.length) {
        if (t.textContent !== SERVICES_DATA[catIdx].title) {
          t.textContent = SERVICES_DATA[catIdx].title;
        }
      }
    });

    // 9 Cards (both desktop & mobile)
    const serviceCards = document.querySelectorAll('[data-service-card="true"]');
    serviceCards.forEach((card, idx) => {
      const catIdx = Math.floor((idx % 9) / 3);
      const cardIdx = (idx % 9) % 3;
      const data = SERVICES_DATA[catIdx]?.cards[cardIdx];
      if (data) {
        const ps = card.querySelectorAll('p');
        if (ps.length >= 3) {
          if (ps[0].textContent !== data.heading) ps[0].textContent = data.heading;
          if (ps[1].textContent !== data.shortDesc) ps[1].textContent = data.shortDesc;
          if (ps[2].textContent !== data.fullDesc) ps[2].textContent = data.fullDesc;
        }
      }
    });

    // ============================================================
    // 5. Section Five: Recruitment & DOMAINS OF ITSA (Timeline Steps)
    // ============================================================
    const processHeadings = document.querySelectorAll('h2.heading-2.font-instrument-serif');
    processHeadings.forEach((h2) => {
      if (h2.textContent.includes('clarity and craft') || h2.textContent.includes('A process built around')) {
        h2.textContent = 'Find Your Place at ITSA.';
      }
    });

    const processSubtitles = document.querySelectorAll('p.body-md');
    processSubtitles.forEach((p) => {
      if (p.textContent.includes('No surprises, no handoff chaos')) {
        p.textContent = "Whether you're passionate about technology, creativity, operations, finance, or building connections, ITSA offers a community where you can contribute, collaborate, and grow. Applicants must demonstrate leadership, responsibility, and a strong interest in contributing to ITSA.";
      }
    });

    const processBtns = document.querySelectorAll('.process-cta-pending span.relative.block, section button span.relative.block');
    processBtns.forEach((btn) => {
      if (btn.textContent.includes("Let's build something")) {
        btn.textContent = 'EXPLORE OPPORTUNITIES';
      }
    });

    // Target the 4 timeline steps on desktop (.js-s-fade-in-outs)
    const desktopStepContainers = document.querySelectorAll('.js-s-fade-in-outs');
    desktopStepContainers.forEach((container, idx) => {
      if (idx < DOMAINS_DATA.length) {
        const titleEl = container.querySelector('p.heading-3');
        const descEl = container.querySelector('p.body-lg');
        if (titleEl && titleEl.textContent !== DOMAINS_DATA[idx].title) {
          titleEl.textContent = DOMAINS_DATA[idx].title;
        }
        if (descEl && descEl.textContent !== DOMAINS_DATA[idx].desc) {
          descEl.textContent = DOMAINS_DATA[idx].desc;
        }
      }
    });

    // Also target all p[data-start="top center"].heading-3 (covers mobile & desktop)
    const allStepTitles = document.querySelectorAll('p[data-start="top center"].heading-3');
    allStepTitles.forEach((titleEl, idx) => {
      const stepIdx = idx % DOMAINS_DATA.length;
      if (titleEl.textContent !== DOMAINS_DATA[stepIdx].title) {
        titleEl.textContent = DOMAINS_DATA[stepIdx].title;
      }
      const descEl = titleEl.nextElementSibling;
      if (descEl && descEl.textContent !== DOMAINS_DATA[stepIdx].desc) {
        descEl.textContent = DOMAINS_DATA[stepIdx].desc;
      }
    });

    // 6. Closing Section left as original

    // 7. Footer
    const footerParagraphs = document.querySelectorAll('footer p, .mix-blend-difference p, footer .body-md');
    footerParagraphs.forEach((p) => {
      if (p.textContent.includes('Ricardo Chance') || p.textContent.includes('Ricardo')) {
        p.innerHTML = 'By <i>ITSA — VIT Pune</i> &copy; 2026';
      }
      if (p.textContent.includes('Buenos Aires')) {
        p.textContent = 'VIT Pune, Maharashtra, India';
      }
    });
  }

  // ============================================================
  // GLOBAL CONTROLLERS: Smooth Scroll, Contact Drawer & Nav Menu
  // ============================================================

  window.__itsaScroll = function (targetName) {
    const isAbout = targetName === 'about';
    const targetEl = isAbout
      ? (document.getElementById('about') || document.querySelector('section[data-dissolve="out"]'))
      : (document.getElementById('projects') || document.querySelector('section[data-geometry="diamond"]'));

    if (!targetEl) {
      if (window.location.pathname !== '/' && window.location.pathname !== '/index.html' && window.location.pathname !== '') {
        window.location.href = isAbout ? '/#about' : '/#projects';
      }
      return false;
    }

    const startY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const targetY = startY + targetEl.getBoundingClientRect().top - 40;
    const diff = targetY - startY;
    const startTime = performance.now();
    const duration = 850;
    const lenis = window.__scrollStore?.getState?.()?.lenis;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    if (window.__itsaScrollTimer) clearInterval(window.__itsaScrollTimer);

    window.__itsaScrollTimer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      const currentY = startY + diff * easeInOutCubic(progress);

      window.scrollTo(0, currentY);
      if (lenis) {
        if (lenis.isStopped) { try { lenis.start(); } catch (e) {} }
        if (typeof lenis.setScroll === 'function') lenis.setScroll(currentY);
        if (typeof lenis.emit === 'function') lenis.emit();
      }

      if (progress >= 1) {
        clearInterval(window.__itsaScrollTimer);
        window.__itsaScrollTimer = null;
      }
    }, 16);

    return true;
  };

  window.__openContactDrawer = function () {
    const drawer = document.querySelector('.fixed.top-0.right-0.z-1000000, [data-contact-drawer="true"]');
    if (!drawer) return;
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    drawer.style.transform = 'translateX(0)';

    let backdrop = document.getElementById('itsa-drawer-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'itsa-drawer-backdrop';
      backdrop.className = 'fixed inset-0 bg-black/60 z-[999999] transition-opacity duration-300';
      backdrop.onclick = function() { window.__closeContactDrawer(); };
      document.body.appendChild(backdrop);
    }
    backdrop.style.display = 'block';
    requestAnimationFrame(() => {
      backdrop.style.opacity = '1';
      backdrop.style.pointerEvents = 'auto';
    });
  };

  window.__closeContactDrawer = function () {
    const drawer = document.querySelector('.fixed.top-0.right-0.z-1000000, [data-contact-drawer="true"]');
    if (drawer) {
      drawer.classList.remove('translate-x-0');
      drawer.classList.add('translate-x-full');
      drawer.style.transform = '';
    }
    const backdrop = document.getElementById('itsa-drawer-backdrop');
    if (backdrop) {
      backdrop.style.opacity = '0';
      backdrop.style.pointerEvents = 'none';
      setTimeout(() => { if (backdrop) backdrop.style.display = 'none'; }, 300);
    }
  };

  window.__toggleNavMenu = function (forceState) {
    const btn = document.querySelector('button[aria-label="Open navigation menu"], header button[data-event="simple-hover"]');
    const nav = document.querySelector('header nav, div.relative > nav');
    if (!nav) return;
    const isExpanded = btn ? btn.getAttribute('aria-expanded') === 'true' : false;
    const newState = forceState !== undefined ? forceState : !isExpanded;

    if (btn) btn.setAttribute('aria-expanded', String(newState));
    if (newState) {
      nav.style.clipPath = 'inset(0 0 0% 0)';
      nav.style.pointerEvents = 'auto';
    } else {
      nav.style.clipPath = 'inset(0 0 100% 0)';
      nav.style.pointerEvents = 'none';
    }
  };

  // Global click interception (Capture phase) to handle all interactive controls reliably
  document.addEventListener('click', function(e) {
    // 1. Navigation Menu Hamburger button
    const navMenuBtn = e.target.closest('button[aria-label="Open navigation menu"], header button[data-event="simple-hover"]');
    if (navMenuBtn) {
      e.preventDefault();
      e.stopPropagation();
      window.__toggleNavMenu();
      return;
    }

    // 2. Navigation Menu items
    const navEl = e.target.closest('header nav');
    if (navEl) {
      const link = e.target.closest('a, p');
      if (link) {
        const text = (link.textContent || '').trim().toUpperCase();
        const href = link.getAttribute('href');

        if (text.includes('CONTACT') || link.getAttribute('data-action') === 'contact') {
          e.preventDefault();
          e.stopPropagation();
          window.__toggleNavMenu(false);
          window.__openContactDrawer();
          return;
        }

        if (text.includes('ABOUT') || href === '/about') {
          e.preventDefault();
          e.stopPropagation();
          window.__toggleNavMenu(false);
          window.location.href = '/about';
          return;
        }

        if (text.includes('WORK') || href === '/work') {
          e.preventDefault();
          e.stopPropagation();
          window.__toggleNavMenu(false);
          window.location.href = '/work';
          return;
        }

        if (text.includes('EVENT') || text.includes('HACKATHON') || text.includes('WORKSHOP') || href === '/events' || href === '/events/') {
          e.preventDefault();
          e.stopPropagation();
          window.__toggleNavMenu(false);
          window.location.href = '/events';
          return;
        }

        if (text.includes('HOME') || href === '/' || href === '/index.html') {
          e.preventDefault();
          e.stopPropagation();
          window.__toggleNavMenu(false);
          const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '';
          if (isHome) {
            const lenis = window.__scrollStore?.getState?.()?.lenis;
            if (lenis) {
              if (lenis.isStopped) { try { lenis.start(); } catch(err){} }
              lenis.scrollTo(0, { duration: 1.2 });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          } else {
            window.location.href = '/';
          }
          return;
        }
      }
    }

    // If menu is open and clicked outside header, close it
    const openMenu = document.querySelector('header button[aria-expanded="true"]');
    if (openMenu && !e.target.closest('header')) {
      window.__toggleNavMenu(false);
    }

    // 3. Contact Drawer Close Button (SVG X button)
    const closeDrawerBtn = e.target.closest('.fixed.top-0.right-0.z-1000000 div[data-event="hover"]:has(svg), .fixed.top-0.right-0.z-1000000 svg path[d*="M12.0205"]');
    if (closeDrawerBtn || (e.target.closest('.fixed.top-0.right-0.z-1000000') && e.target.closest('svg')?.querySelector('path[d*="M12.0205"]'))) {
      e.preventDefault();
      e.stopPropagation();
      window.__closeContactDrawer();
      return;
    }

    // 4. Contact triggers: "EXPLORE OPPORTUNITIES", "Drop a line", "GET IN TOUCH", or data-action="contact"
    const contactTrigger = e.target.closest('[data-action="contact"], .process-cta-pending');
    if (contactTrigger) {
      e.preventDefault();
      e.stopPropagation();
      window.__openContactDrawer();
      return;
    }

    const clickedText = (e.target.textContent || '').trim();
    if (clickedText === 'GET IN TOUCH' || clickedText === 'Drop a line' || clickedText === 'EXPLORE OPPORTUNITIES') {
      e.preventDefault();
      e.stopPropagation();
      window.__openContactDrawer();
      return;
    }

    // 5. Hero CTAs: "EXPLORE ITSA" and "DISCOVER OUR WORK"
    const ctaBtn = e.target.closest('[data-cta-target], [data-home-hero-cta="true"], a[href="#projects"], a[href="#about"], a[href="/work"], a[href*="work"]');
    if (ctaBtn) {
      const text = (ctaBtn.textContent || '').trim().toUpperCase();
      const targetAttr = ctaBtn.getAttribute('data-cta-target');
      const hrefAttr = ctaBtn.getAttribute('href');

      if (targetAttr === 'work' || text.includes('DISCOVER OUR WORK') || text.includes('DISCOVER') || hrefAttr === '/work' || hrefAttr === '/work/') {
        e.preventDefault();
        e.stopPropagation();
        window.open('/work', '_blank');
        return;
      }

      if (targetAttr === 'projects' || hrefAttr === '#projects') {
        e.preventDefault();
        e.stopPropagation();
        window.__itsaScroll('projects');
        return;
      }

      if (targetAttr === 'about' || hrefAttr === '#about' || text.includes('EXPLORE ITSA') || text.includes('EXPLORE')) {
        e.preventDefault();
        e.stopPropagation();
        window.__itsaScroll('about');
        return;
      }
    }

    // 6. Section 2 "Learn more about ITSA"
    const learnMoreBtn = e.target.closest('section[data-dissolve="out"] a, a[href="/about"]');
    if (learnMoreBtn && !learnMoreBtn.closest('header')) {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = '/about';
      return;
    }

    // 7. Section 3 "View all projects" & Project Cards
    const projectBtn = e.target.closest('section[data-geometry="diamond"] a[href="/work"], section[data-geometry="diamond"] button[aria-label="Project"]');
    if (projectBtn) {
      e.preventDefault();
      e.stopPropagation();
      window.open('/work', '_blank');
      return;
    }

    // 8. Header Logo: "ITSA"
    const logoLink = e.target.closest('header a[data-event="simple-hover"]');
    if (logoLink) {
      e.preventDefault();
      e.stopPropagation();
      const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '';
      if (isHome) {
        const lenis = window.__scrollStore?.getState?.()?.lenis;
        if (lenis) {
          if (lenis.isStopped) { try { lenis.start(); } catch(err){} }
          lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        window.location.href = '/';
      }
      return;
    }

    // 9. Direct header Events pill button
    const directEventsBtn = e.target.closest('header a[href="/events"], header a[href*="events"]');
    if (directEventsBtn) {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = '/events';
      return;
    }

    // 10. Generic internal navigation fallback
    const genericLink = e.target.closest('a[href]');
    if (genericLink) {
      const href = genericLink.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#') && !href.startsWith('javascript:')) {
        if (href === '/work' || href === '/about' || href === '/' || href === '/index.html' || href === '/events' || href === '/events/') {
          e.preventDefault();
          e.stopPropagation();
          window.location.href = href;
        }
      }
    }
  }, true);

  // Form submission handling for Contact Drawer
  document.addEventListener('submit', function(e) {
    const contactForm = e.target.closest('.fixed.top-0.right-0.z-1000000 form');
    if (contactForm) {
      e.preventDefault();
      e.stopPropagation();

      // Display beautiful confirmation message inside drawer
      let successBanner = document.getElementById('itsa-form-success');
      if (!successBanner) {
        successBanner = document.createElement('div');
        successBanner.id = 'itsa-form-success';
        successBanner.style.cssText = 'margin: 16px; padding: 20px; border-radius: 12px; background: rgba(34, 197, 94, 0.18); border: 1px solid rgba(34, 197, 94, 0.4); text-align: center; color: #ffffff; animation: fadeIn 0.3s ease;';
        successBanner.innerHTML = '<p style="font-weight: 600; font-size: 1.1rem; margin-bottom: 6px;">Message Sent Successfully!</p><p style="font-size: 0.9rem; opacity: 0.85;">Thank you for reaching out to ITSA. Our team will get back to you shortly.</p>';
        contactForm.prepend(successBanner);
      }
      contactForm.reset();

      setTimeout(() => {
        if (successBanner) successBanner.remove();
        window.__closeContactDrawer();
      }, 2500);
    }
  }, true);

  let isApplying = false;
  let scheduled = null;

  function safeApplyITSAContent() {
    if (isApplying) return;
    if (scheduled) return;
    scheduled = setTimeout(() => {
      scheduled = null;
      if (isApplying) return;
      isApplying = true;
      try {
        applyITSAContent();
      } finally {
        setTimeout(() => {
          isApplying = false;
        }, 100);
      }
    }, 60);
  }

  // Execute on DOM ready and after window load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeApplyITSAContent);
  } else {
    safeApplyITSAContent();
  }

  window.addEventListener('load', () => {
    safeApplyITSAContent();
    setTimeout(safeApplyITSAContent, 300);
    setTimeout(safeApplyITSAContent, 1000);
  });

  // Watch for dynamic DOM modifications without infinite cascade
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      if (!isApplying) {
        safeApplyITSAContent();
      }
    });
    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true
    });
  }
})();
