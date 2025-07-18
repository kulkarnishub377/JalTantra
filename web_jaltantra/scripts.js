
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
});
