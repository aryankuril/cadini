function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("show");
}

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

// Scroll-based effects
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector(".hero");
  const secondSection = document.querySelector(".secondsection");
  const heroText = document.querySelector(".hero-text");
  const bottle = document.querySelector(".bottle");

  const scaleValue = Math.max(1 - scrollY / 500, 0.5);

  // Navbar hide/show based on scroll
  const heroTop = heroText.getBoundingClientRect().top;
  gsap.to(".navbar", {
    y: heroTop <= 0 ? 0 : -100,
    duration: 0.9,
    ease: "expo.out",
    overwrite: "auto"
  });

  // Smooth bottle scroll movement
  const heroTopAbs = hero.offsetTop;
  const secondTopAbs = secondSection.offsetTop;
  const heroHeight = hero.offsetHeight;
  const secondHeight = secondSection.offsetHeight;

  const heroCenter = heroTopAbs + heroHeight / 4;
  const secondTargetY = secondTopAbs + secondHeight / 2 + 100;

  const scrollStart = heroCenter - window.innerHeight / 2;
  const scrollEnd = secondTargetY - window.innerHeight / 2;
  const scrollRange = scrollEnd - scrollStart;
  const moveDistance = secondTargetY - heroCenter;

  let progress = (scrollY - scrollStart - 100) / scrollRange;
  progress = Math.min(Math.max(progress, 0), 1); // Clamp

  const translateY = moveDistance * progress - 80;

  gsap.to(bottle, {
    y: translateY,
    duration: 1,
    ease: "expo.out",
    overwrite: "auto"
  });

  // Smooth scale-down hero text
  gsap.to(".hero-text", {
    scale: scaleValue,
    duration: 0.8,
    ease: "expo.out",
    overwrite: "auto"
  });

  // Hero zoom out + logo fade/zoom in
  const triggerStart = 50;
  const triggerEnd = 200;
  let logoProgress = (scrollY - triggerStart) / (triggerEnd - triggerStart);
  logoProgress = Math.min(Math.max(logoProgress, 0), 1); // Clamp

  gsap.to(".hero-text", {
    y: -logoProgress * 100,
    scale: 1 - logoProgress * 0.99,
    opacity: 1 - logoProgress,
    duration: 0.8,
    ease: "power4.out",
    overwrite: "auto"
  });

  gsap.to(".logo-center", {
    scale: logoProgress,
    opacity: logoProgress,
    duration: 0.8,
    ease: "power4.out",
    overwrite: "auto"
  });
});
 