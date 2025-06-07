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
gsap.set("nav", { y: -100 }); // Hide navbar above screen initially

// 🧩 Scroll animation
let ticking = false;

function handleScroll() {
  const scrollY = window.scrollY;
  const heroText = document.querySelector(".hero-text");
  const logo = document.querySelector(".logo-center");
  const navbar = document.querySelector("nav");

  // 🧠 1. Hero Text Zoom Out
  const scaleValue = Math.max(1 - scrollY / 500, 0.5);
  gsap.to(heroText, {
    scale: scaleValue,
    duration: 0.3,
    ease: "power2.out",
    overwrite: true
  });

  // 🧠 2. Show Logo on Scroll (between 50px and 200px)
  const logoProgress = Math.min(Math.max((scrollY - 50) / 150, 0), 1);
  gsap.to(logo, {
    scale: logoProgress,
    opacity: logoProgress,
    duration: 0.3,
    ease: "power2.out",
    overwrite: true
  });

  // 🧠 3. Bring Navbar Down When Hero Text Reaches Top
  const heroTop = heroText.getBoundingClientRect().top;

  if (heroTop <= 0) {
    gsap.to(navbar, {
      y: 0,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true
    });
  } else {
    gsap.to(navbar, {
      y: -100,
      duration: 0.5,
      ease: "power3.in",
      overwrite: true
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
