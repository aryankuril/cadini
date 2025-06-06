function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("show");
}
document.querySelector('.scroll-down').addEventListener('click', () => {
  document.querySelector('.secondsection').scrollIntoView({ 
    behavior: 'smooth' 
  });
});
// Scroll trigger for second section animation
window.addEventListener('scroll', () => {
  const section = document.querySelector('.secondsection');
  const sectionTop = section.getBoundingClientRect().top;
  const sectionBottom = section.getBoundingClientRect().bottom;
  const triggerPoint = window.innerHeight * 0.8;

  if (sectionTop < triggerPoint && sectionBottom > 100) {
    section.classList.add('animate-lines');
    section.classList.remove('reverse-lines');
  } else {
    section.classList.remove('animate-lines');
    section.classList.add('reverse-lines');
  }
});

// Initial load animation for hero text 
gsap.from(".hero-text", {
  opacity: 0,
  y: 40,
  scale: 1.2,
  duration: 1.4,
  ease: "power4.out",
  overwrite: "auto"
});

// Hide logo initially
gsap.set(".logo-center", { scale: 0, opacity: 0 });

// Scroll animations (hero text scaling, navbar & logo effects)
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

// Throttle scroll updates
let lastScrollY = 0;
let ticking = false;

function handleScroll() {
  const scrollY = window.scrollY;
  const hero = document.querySelector(".hero");
  const heroText = document.querySelector(".hero-text");

  // Scale hero text
  const scaleValue = Math.max(1 - scrollY / 500, 0.5);
  gsap.to(".hero-text", {
    scale: scaleValue,
    duration: 0.7,
    ease: "power3.out",
    overwrite: "auto"
  });

  // Navbar show/hide
  const heroTop = heroText.getBoundingClientRect().top;
  gsap.to(".navbar", {
    y: heroTop <= 0 ? 0 : -100,
    duration: 0.7,
    ease: "power3.out",
    overwrite: "auto"
  });

  // Logo transition
  const triggerStart = 50;
  const triggerEnd = 200;
  let logoProgress = (scrollY - triggerStart) / (triggerEnd - triggerStart);
  logoProgress = Math.min(Math.max(logoProgress, 0), 1);

  gsap.to(".hero-text", {
    y: -logoProgress * 100,
    scale: 1 - logoProgress * 0.99,
    opacity: 1 - logoProgress,
    duration: 0.5,
    ease: "power3.out",
    overwrite: "auto"
  });

  gsap.to(".logo-center", {
    scale: logoProgress,
    opacity: logoProgress,
    duration: 0.5,
    ease: "power3.out",
    overwrite: "auto"
  });

  ticking = false;
}

window.addEventListener("scroll", () => {
  lastScrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
    });
    ticking = true;
  }
});



