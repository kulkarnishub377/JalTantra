// --- HERO SECTION INTERACTIVITY ---
document.addEventListener('DOMContentLoaded', function() {
  // Logo bounce on click
  const logoWrapper = document.getElementById('heroLogoWrapper');
  const logo = document.getElementById('heroLogo');
  if (logoWrapper && logo) {
    logoWrapper.addEventListener('click', function() {
      logo.style.animation = 'heroLogoBounce 0.7s';
      setTimeout(() => { logo.style.animation = ''; }, 700);
    });
  }

  // CTA button pulse on hover
  const cta = document.getElementById('heroCta');
  if (cta) {
    cta.addEventListener('mouseenter', function() {
      cta.style.animation = 'heroCtaPulse 0.6s';
    });
    cta.addEventListener('mouseleave', function() {
      cta.style.animation = '';
    });
  }

  // Learn More button smooth scroll
  const learnBtn = document.getElementById('heroLearnBtn');
  if (learnBtn) {
    learnBtn.addEventListener('click', function() {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Highlight animation on subtitle
  const subtitle = document.getElementById('heroSubtitle');
  if (subtitle) {
    setInterval(() => {
      subtitle.classList.toggle('hero-highlight-animate');
    }, 1800);
  }
});

// Extra: Pulse animation for CTA
const style = document.createElement('style');
style.innerHTML = `
@keyframes heroCtaPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.08); box-shadow: 0 0 24px #03A9F4aa; }
  100% { transform: scale(1); }
}
.hero-highlight-animate {
  background: linear-gradient(90deg,#388E3C 0%,#03A9F4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: background 0.5s;
}`;
document.head.appendChild(style);
