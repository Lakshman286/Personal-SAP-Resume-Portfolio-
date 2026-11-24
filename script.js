// =====================================================================
// SAP ABAP ENTERPRISE WORKBENCH INTERACTIVE ENGINE
// Developer: Golla Varalakshman Naidu
// =====================================================================

class EnterpriseBootLoader {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.mainContent = document.getElementById('main-content');
    this.typedText = document.querySelector('.typed-text');
    this.cursor = document.querySelector('.cursor');
    this.progressFill = document.querySelector('.progress-fill');
    this.progressPercent = document.querySelector('.progress-percent');
    this.loaderPhase = document.getElementById('loaderPhase');

    this.fullName = "Golla Varalakshman Naidu";
    this.isLoaded = false;

    this.init();
  }

  init() {
    this.startLoading();
    this.preloadAssets();
    this.startBootSequence();
  }

  startLoading() {
    if (this.loadingScreen) this.loadingScreen.style.display = 'flex';
    if (this.mainContent) this.mainContent.style.display = 'none';
    document.body.style.overflow = 'hidden';
  }

  startBootSequence() {
    // 1. Smoothly type full name "Golla Varalakshman Naidu" without getting cut off
    const totalChars = this.fullName.length;
    const typingInterval = 52; // 52ms per character -> ~1.3s for 25 characters
    let charIndex = 0;

    const typeTimer = setInterval(() => {
      charIndex++;
      if (this.typedText) {
        this.typedText.textContent = this.fullName.substring(0, charIndex);
      }
      if (charIndex >= totalChars) {
        clearInterval(typeTimer);
      }
    }, typingInterval);

    // 2. Smoothly advance progress bar across 1.8 seconds through genuine enterprise boot phases
    const startTime = Date.now();
    const duration = 1850;

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      this.updateProgress(progress);

      if (progress >= 100) {
        clearInterval(progressTimer);

        // 3. Calm hold (600ms) so the user can easily read their full name and System Online status
        setTimeout(() => {
          this.completeLoading();
        }, 650);
      }
    }, 35);
  }

  preloadAssets() {
    const images = [
      'hero-bg.png',
      'sap-certified-badge.png',
      'pest-advisory-project.png',
      'attendance-project.png',
      'project1.jpg'
    ];

    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  updateProgress(percent) {
    const p = Math.min(100, Math.round(percent));
    if (this.progressFill) this.progressFill.style.width = `${p}%`;
    if (this.progressPercent) this.progressPercent.textContent = `${p}%`;

    if (this.loaderPhase) {
      if (p < 28) {
        this.loaderPhase.textContent = 'Initializing SAP Gateway & NetWeaver kernel...';
      } else if (p < 62) {
        this.loaderPhase.textContent = 'Mounting DDIC Data Dictionary & Table Buffers...';
      } else if (p < 92) {
        this.loaderPhase.textContent = 'Compiling Core ABAP & ALV Grid Engines...';
      } else {
        this.loaderPhase.textContent = 'System Online (sy-subrc = 0)';
      }
    }
  }

  completeLoading() {
    if (this.cursor) this.cursor.style.display = 'none';
    this.updateProgress(100);

    // Make main content visible immediately underneath the fading loader
    if (this.mainContent) {
      this.mainContent.style.display = 'block';
    }

    // Trigger smooth loader dissolution and hero entrance keyframes in tandem
    requestAnimationFrame(() => {
      document.body.style.overflow = '';
      if (this.mainContent) {
        this.mainContent.classList.add('page-revealed');
      }
      if (this.loadingScreen) {
        this.loadingScreen.classList.add('fade-out');
      }
    });

    setTimeout(() => {
      if (this.loadingScreen) {
        this.loadingScreen.style.display = 'none';
      }
      initAllEnterpriseModules();
    }, 550);
  }
}

// =====================================================================
// CENTRAL INITIALIZATION & MODULE COORDINATION
// =====================================================================
let enterpriseModulesLoaded = false;

function initAllEnterpriseModules() {
  if (enterpriseModulesLoaded) return;
  enterpriseModulesLoaded = true;

  initScrollReveal();
  initMobileNavigation();
  initParallaxEngine();
  initDockNavigation();
  initProjectTabs();
  initSpecificationModal();
  initCertificateModal();
  initContactChannels();
  initBackToTopEngine();
  initFooterDiagnostics();
}

// =====================================================================
// SCROLL REVEAL ENGINE (Silky Section-to-Section Transitions)
// =====================================================================
function initScrollReveal() {
  const sections = document.querySelectorAll('.section-wrapper');
  if (!sections.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-revealed');
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    sections.forEach(sec => observer.observe(sec));
  } else {
    sections.forEach(sec => sec.classList.add('section-revealed'));
  }
}

// =====================================================================
// MOBILE NAVIGATION HAMBURGER DRAWER
// =====================================================================
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('shellNavMenu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  new EnterpriseBootLoader();

  // Failsafe in case of script pause or slow network
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    const main = document.getElementById('main-content');
    if (loader && loader.style.display !== 'none') {
      loader.classList.add('fade-out');
      setTimeout(() => { loader.style.display = 'none'; }, 500);
    }
    if (main) {
      main.style.display = 'block';
      main.classList.add('page-revealed');
      document.body.style.overflow = '';
    }
    initAllEnterpriseModules();
  }, 3500);
});

// =====================================================================
// 1. AMBIENT PARALLAX ENGINE
// =====================================================================
function initParallaxEngine() {
  const shapes = document.querySelectorAll('#bg-shapes .shape');
  if (!shapes.length) return;
  let ticking = false;

  const handleMouseMove = (e) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 24;
        const y = (e.clientY / window.innerHeight - 0.5) * 24;

        shapes.forEach((s, idx) => {
          const factor = (idx + 1) * 0.45;
          s.style.transform = `translate3d(${x * factor}px, ${y * factor}px, 0)`;
        });

        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
}

// =====================================================================
// 2. ENTERPRISE DOCK NAVIGATION & SCROLLSPY
// =====================================================================
function initDockNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navLinks.length) return;

  function scrollToSection(href) {
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;

    // Use getBoundingClientRect for absolute document-relative coordinate
    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetTop = rect.top + scrollTop - 72; // Accounting for 64px sticky shell bar + spacing

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth'
    });
  }

  // Click handler for dock navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();

      scrollToSection(href);

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, href);
      }
    });
  });

  // Also support smooth scroll for footer and hero jump links
  document.querySelectorAll('.footer-nav-links a, .hero-actions a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      scrollToSection(href);
    });
  });

  // Scrollspy: accurately detect which section is currently active in the viewport
  const sections = Array.from(document.querySelectorAll('main > section'));

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // If near the bottom of the page, activate Contact
    if (scrollY + windowHeight >= docHeight - 100) {
      navLinks.forEach(l => l.classList.remove('active'));
      const contactLink = document.querySelector('.nav-link[href="#contact"]');
      if (contactLink) contactLink.classList.add('active');
      return;
    }

    let currentSectionId = '';
    const triggerY = scrollY + (windowHeight * 0.35);

    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      const secTop = rect.top + scrollY;
      const secBottom = secTop + sec.offsetHeight;

      if (triggerY >= secTop && triggerY < secBottom) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${currentSectionId}`);
      });
    }
  }

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateActiveNavLink();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // Initial call to sync active state
  updateActiveNavLink();
}

// =====================================================================
// 3. ENTERPRISE PROJECT INTERACTIVE TABS
// =====================================================================
function initProjectTabs() {
  const projTabBtns = document.querySelectorAll('.proj-tab-btn');
  const projTabContents = document.querySelectorAll('.proj-tab-content');

  projTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tabId = btn.getAttribute('data-projtab');
      projTabContents.forEach(c => {
        if (c.id === `projtab-${tabId}`) {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });
    });
  });
}

// =====================================================================
// 5. SPECIFICATION & ARCHITECTURE MODAL
// =====================================================================
function initSpecificationModal() {
  const modal = document.getElementById('portfolioModal');
  const openBtn = document.getElementById('openArchModalBtn');
  const closeBtn = document.getElementById('modalClose');
  const backdrop = document.getElementById('modalBackdrop');
  if (!modal) return;

  function openModal() {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn && openBtn.addEventListener('click', openModal);
  closeBtn && closeBtn.addEventListener('click', closeModal);
  backdrop && backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
}

// =====================================================================
// 5B. CERTIFICATE DOCUMENT LIGHTBOX MODAL
// =====================================================================
function initCertificateModal() {
  const certModal = document.getElementById('certModal');
  const openBtns = [
    document.getElementById('openCertModalBtn'),
    document.getElementById('openCertModalBtn2'),
    document.getElementById('certBadgeFrame')
  ];
  const closeBtn = document.getElementById('certModalClose');
  const backdrop = document.getElementById('certModalBackdrop');
  if (!certModal) return;

  function openModal() {
    certModal.classList.add('show');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    certModal.classList.remove('show');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn && btn.addEventListener('click', openModal));
  closeBtn && closeBtn.addEventListener('click', closeModal);
  backdrop && backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('show')) {
      closeModal();
    }
  });
}

// =====================================================================
// 6. CONTACT CHANNELS & CLICK-TO-COPY
// =====================================================================
function initContactChannels() {
  const copyBoxes = document.querySelectorAll('.contact-interactive-box');
  const contactForm = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMessage');

  copyBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const text = box.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        box.classList.add('copied');
        const hint = box.querySelector('.copy-hint');
        if (hint) hint.innerHTML = `<i class="fas fa-check"></i>`;

        setTimeout(() => {
          box.classList.remove('copied');
          if (hint) hint.innerHTML = `<i class="fas fa-copy"></i>`;
        }, 1500);
      }).catch(() => {});
    });

    box.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') box.click();
    });
  });

  // Async Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (formMsg) {
        formMsg.className = 'form-feedback-message success';
        formMsg.innerHTML = '<i class="fas fa-circle-check"></i> Inbound dispatch received. I will respond to your email promptly.';
      }

      const formData = new FormData(contactForm);
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(res => {
        if (res.ok) {
          contactForm.reset();
        }
      }).catch(err => {
        console.error('Contact submission error:', err);
      });

      setTimeout(() => {
        if (formMsg) {
          formMsg.className = 'form-feedback-message';
          formMsg.innerHTML = '';
        }
      }, 6000);
    });
  }
}

// =====================================================================
// 7. BACK TO TOP
// =====================================================================
function initBackToTopEngine() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        btn.classList.toggle('show', window.scrollY > 350);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =====================================================================
// 8. FOOTER YEAR & DIAGNOSTICS
// =====================================================================
function initFooterDiagnostics() {
  const year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();
}
