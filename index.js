document.querySelector('.scroll-down').addEventListener('click', () => {
  document.querySelector('.secondsection').scrollIntoView({
    behavior: 'smooth'
  });
});


// ⚡ Faster direct animation handles
const quickHeroScale = gsap.quickTo(".hero-text", "scale", {
  duration: 0.3,
  ease: "power2.out"
});

const quickLogoScale = gsap.quickTo(".logo-center", "scale", {
  duration: 0.3,
  ease: "power2.out"
});

const quickLogoOpacity = gsap.quickTo(".logo-center", "opacity", {
  duration: 0.3,
  ease: "power2.out"
});

const quickNavbarY = gsap.quickTo(".navbar", "y", {
  duration: 0.05,
  ease: "power2.out"
});

const quickNavbarOpacity = gsap.quickTo(".navbar", "opacity", {
  duration: 0.05,
  ease: "power2.out"
});

// 🧠 Optimized Scroll Logic
function handleScroll() {
  const scrollY = window.scrollY;

  // Scale hero text
  const scaleValue = Math.max(1 - scrollY / 500, 0.5);
  quickHeroScale(scaleValue);

  // Logo logic
  const logoStart = 100;
  const logoEnd = 300;
  let logoProgress = (scrollY - logoStart) / (logoEnd - logoStart);
  logoProgress = Math.min(Math.max(logoProgress, 0), 1);
  quickLogoScale(logoProgress);
  quickLogoOpacity(logoProgress);

  // Navbar logic
  if (scaleValue <= 0.55) {
    quickNavbarY(0);
    quickNavbarOpacity(1);
  } else {
    quickNavbarY(-100);
    quickNavbarOpacity(0);
  }
}
