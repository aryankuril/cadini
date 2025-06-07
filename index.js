// 🔄 Toggle Mobile Menu
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("show");
}

// 🧭 Smooth Scroll to Second Section
document.querySelector('.scroll-down').addEventListener('click', () => {
  document.querySelector('.secondsection').scrollIntoView({
    behavior: 'smooth'
  });
});

// 🎯 Animate second section lines on scroll
window.addEventListener('scroll', () => {
  const section = document.querySelector('.secondsection');
  const { top: sectionTop, bottom: sectionBottom } = section.getBoundingClientRect();
  const triggerPoint = window.innerHeight * 0.8;

  if (sectionTop < triggerPoint && sectionBottom > 100) {
    section.classList.add('animate-lines');
    section.classList.remove('reverse-lines');
  } else {
    section.classList.remove('animate-lines');
    section.classList.add('reverse-lines');
  }
});

// 💨 Initial hero text animation
gsap.from(".hero-text", {
  opacity: 0,
  y: 40,
  scale: 1.2,
  duration: 1.4,
  ease: "power4.out",
  overwrite: "auto"
});

// 👻 Hide logo at start
gsap.set(".logo-center", { scale: 0, opacity: 0 });

// 🧩 Scroll animation helpers
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

// 🕹️ Smooth scroll animation throttle
let ticking = false;

function handleScroll() {
  const scrollY = window.scrollY;
  const heroText = document.querySelector(".hero-text");
  const hero = document.querySelector(".hero");

  // Hero text scale animation
  const scaleValue = Math.max(1 - scrollY / 500, 0.5);
  gsap.to(heroText, {
    scale: scaleValue,
    duration: 0.4,
    ease: "power2.out",
    overwrite: "auto"
  });

  // Navbar transition
  const heroTop = heroText.getBoundingClientRect().top;
  gsap.to(".navbar", {
    y: heroTop <= 0 ? 0 : -100,
    duration: 0.4,
    ease: "power2.out",
    overwrite: "auto"
  });

  // Logo transition logic
  const triggerStart = 50;
  const triggerEnd = 200;
  let logoProgress = (scrollY - triggerStart) / (triggerEnd - triggerStart);
  logoProgress = Math.min(Math.max(logoProgress, 0), 1);

  // Hero text zoom-out and fade
  gsap.to(heroText, {
    y: -logoProgress * 100,
    scale: 1 - logoProgress * 0.99,
    opacity: 1 - logoProgress,
    duration: 0.4,
    ease: "power2.out",
    overwrite: "auto"
  });

  // Logo appear with scale
  gsap.to(".logo-center", {
    scale: logoProgress,
    opacity: logoProgress,
    duration: 0.4,
    ease: "power2.out",
    overwrite: "auto"
  });

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(handleScroll);
    ticking = true;
  }
});
