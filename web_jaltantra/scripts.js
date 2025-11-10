
// --- HERO SECTION INTERACTIVITY ---
document.addEventListener('DOMContentLoaded', function() {
  // Logo bounce and glow on click/focus
  const logoWrapper = document.getElementById('heroLogoWrapper');
  const logo = document.getElementById('heroLogo');
  const logoGlow = document.querySelector('.hero-logo-glow');
  if (logoWrapper && logo) {
    logoWrapper.addEventListener('click', function() {
      logo.style.animation = 'heroLogoBounce 0.7s';
      logoGlow.style.opacity = '1';
      logoGlow.style.filter = 'blur(0)';
      setTimeout(() => {
        logo.style.animation = '';
        logoGlow.style.opacity = '0.5';
        logoGlow.style.filter = 'blur(12px)';
      }, 700);
    });
    logoWrapper.addEventListener('focus', function() {
      logoGlow.style.opacity = '1';
      logoGlow.style.filter = 'blur(0)';
    });
    logoWrapper.addEventListener('blur', function() {
      logoGlow.style.opacity = '0.5';
      logoGlow.style.filter = 'blur(12px)';
    });
    logoWrapper.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        logoWrapper.click();
      }
    });
  }

  // CTA button ripple effect
  const cta = document.getElementById('heroCta');
  if (cta) {
    cta.addEventListener('mousedown', function(e) {
      cta.classList.add('active');
      setTimeout(() => cta.classList.remove('active'), 500);
    });
  }

  // Learn More button ripple effect and smooth scroll
  const learnBtn = document.getElementById('heroLearnBtn');
  if (learnBtn) {
    learnBtn.addEventListener('mousedown', function(e) {
      learnBtn.classList.add('active');
      setTimeout(() => learnBtn.classList.remove('active'), 500);
    });
    learnBtn.addEventListener('click', function() {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Highlight pulse on hero title
  const highlight = document.querySelector('.hero-title-highlight');
  if (highlight) {
    setInterval(() => {
      highlight.style.filter = 'brightness(1.4) drop-shadow(0 0 12px #FBC02D)';
      setTimeout(() => {
        highlight.style.filter = '';
      }, 900);
    }, 2500);
  }

  // Social icon keyboard accessibility
  document.querySelectorAll('.hero-social-link').forEach(link => {
    link.setAttribute('tabindex', '0');
    link.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        link.click();
      }
    });
  });

  // --- STATS SECTION INTERACTIVITY ---
  const statsCards = document.querySelectorAll('.stats-card');
  statsCards.forEach(card => {
    // Tooltip logic
    let tooltip;
    card.addEventListener('mouseenter', function() {
      card.classList.add('active');
      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'stats-tooltip';
        tooltip.innerText = card.getAttribute('data-tooltip') || '';
        card.appendChild(tooltip);
      }
      card.classList.add('show-tooltip');
    });
    card.addEventListener('mouseleave', function() {
      card.classList.remove('active');
      card.classList.remove('show-tooltip');
      if (tooltip) tooltip.remove();
      tooltip = null;
    });
    // Keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.addEventListener('focus', function() {
      card.classList.add('active');
      card.classList.add('show-tooltip');
      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'stats-tooltip';
        tooltip.innerText = card.getAttribute('data-tooltip') || '';
        card.appendChild(tooltip);
      }
    });
    card.addEventListener('blur', function() {
      card.classList.remove('active');
      card.classList.remove('show-tooltip');
      if (tooltip) tooltip.remove();
      tooltip = null;
    });
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        card.classList.add('active');
        setTimeout(() => card.classList.remove('active'), 500);
      }
    });
  });
  // Pulse highlight effect for random card every few seconds
  setInterval(() => {
    if (statsCards.length > 0) {
      const idx = Math.floor(Math.random() * statsCards.length);
      statsCards[idx].classList.add('active');
      setTimeout(() => statsCards[idx].classList.remove('active'), 700);
    }
  }, 3500);

  // Animated counter for devices deployed
  function animateCounter(id, end, duration=2000) {
    const el = document.getElementById(id);
    let start = 0;
    const step = Math.ceil(end / (duration/20));
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        el.textContent = end.toLocaleString();
        clearInterval(interval);
      } else {
        el.textContent = start.toLocaleString();
      }
    }, 20);
  }
  animateCounter('devicesDeployed', 1200);
});
