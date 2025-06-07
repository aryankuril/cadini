// 🧭 Smooth Scroll to Second Section
document.querySelector('.scroll-down').addEventListener('click', () => {
  document.querySelector('.secondsection').scrollIntoView({
    behavior: 'smooth'
  });
});

// 🔒 Initial state
gsap.set(".logo-center", { scale: 0, opacity: 0 });
gsap.set(".navbar", { y: -100, opacity: 0 });

// 📏 Track section positions
let heroTopAbs, secondTopAbs, heroHeight, secondHeight;

function updateSectionPositions() {
  const hero = document.querySelector(".hero");
  const secondSection = document.querySelector(".secondsection");

  heroTopAbs = hero.offsetTop;
  secondTopAbs = secondSection.offsetTop;
  heroHeight = hero.offsetHeight;
  secondHeight = secondSection.offsetHeight;
}

updateSectionPositions();
window.addEventListener("resize", updateSectionPositions);

// 🧠 Scroll logic
let ticking = false;

function handleScroll() {
  const scrollY = window.scrollY;
  const heroText = document.querySelector(".hero-text");
  const logo = document.querySelector(".logo-center");
  const navbar = document.querySelector(".navbar");

  // Shrink hero text scale from 1 to 0.5 smoothly
  const scaleValue = Math.max(1 - scrollY / 500, 0.5);
  gsap.to(heroText, {
    scale: scaleValue,
    duration: 0.3, // faster scale animation for text
    ease: "power2.out",
    overwrite: "auto"
  });

  // Zoom-in logo
  const logoStart = 100;
  const logoEnd = 300;
  let logoProgress = (scrollY - logoStart) / (logoEnd - logoStart);
  logoProgress = Math.min(Math.max(logoProgress, 0), 1);
  gsap.to(logo, {
    scale: logoProgress,
    opacity: logoProgress,
    duration: 0.3,
    ease: "power2.out",
    overwrite: "auto"
  });

  // Show navbar as soon as scaleValue is near 0.55 (earlier) and animate super fast
  if (scaleValue <= 0.55) {
    gsap.to(navbar, {
      y: 0,
      opacity: 1,
      duration: 0.05, // super quick slide down
      ease: "power2.out",
      overwrite: "auto"
    });
  } else {
    gsap.to(navbar, {
      y: -100,
      opacity: 0,
      duration: 0.05, // super quick slide up
      ease: "power2.in",
      overwrite: "auto"
    });
  }
}



window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});