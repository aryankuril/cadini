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

// Second section line animations – initial state
// gsap.set(".line1", { x: -150, opacity: 0 });
// gsap.set(".line2", { x: 150, opacity: 0 });
// gsap.set(".line3", { x: 150, opacity: 0 });

// Animate second section lines on scroll into view
// Animate second section lines on scroll into/out of view
const secondObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // if (entry.isIntersecting) {
    //   // Animate lines in
    //   gsap.to(".line1", {
    //     x: 0,
    //     opacity: 1,
    //     duration: 1.3,
    //     ease: "expo.out",
    //     overwrite: "auto"
    //   });
    //   gsap.to(".line2", {
    //     x: 0,
    //     opacity: 1,
    //     duration: 1.3,
    //     delay: 0.4,
    //     ease: "expo.out",
    //     overwrite: "auto"
    //   });
    //   gsap.to(".line3", {
    //     x: 0,
    //     opacity: 1,
    //     duration: 1.3,
    //     delay: 0.8,
    //     ease: "expo.in",
    //     overwrite: "auto"
    //   });
    // } else {
    //   // Animate lines out (reverse effect)
    //   gsap.to(".line3", {
    //     x: 150,
    //     opacity: 0,
    //     duration: 1.3,
    //     ease: "expo.in",
    //     overwrite: "auto"
    //   });
    //   gsap.to(".line2", {
    //     x: 150,
    //     opacity: 0,
    //     duration: 1.3,
    //     delay: 0.4,
    //     ease: "expo.in",
    //     overwrite: "auto"
    //   });
    //   gsap.to(".line1", {
    //     x: -150,
    //     opacity: 0,
    //     duration: 1.3,
    //     delay: 0.8,
    //     ease: "expo.in",
    //     overwrite: "auto"
    //   });
    // }
  });
}, {
  threshold: 0.5
});
secondObserver.observe(document.querySelector('.secondsection'));


// Scroll-based effects
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector(".hero");
  const secondSection = document.querySelector(".secondsection");
  const heroText = document.querySelector(".hero-text");
  const bottle = document.querySelector(".bottle");

  const scaleValue = Math.max(1 - scrollY / 500, 0.5);

  // Navbar show/hide
  const heroTop = heroText.getBoundingClientRect().top;
  gsap.to(".navbar", {
    y: heroTop <= 0 ? 0 : -100,
    duration: 0.7,             // increased duration for smoother transition
    ease: "power3.out",        // smoother easing
    overwrite: "auto"
  });

  // 🧩 Bottle Movement
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
  progress = Math.min(Math.max(progress, 0), 1); // Clamp between 0 and 1

  const translateY = moveDistance * progress - 80;

  gsap.to(bottle, {
    y: translateY,
    duration: 0.7,             // increased duration for smoother movement
    ease: "power3.out",
    overwrite: "auto"
  });

  // Hero text scale on scroll
  gsap.to(".hero-text", {
    scale: scaleValue,
    duration: 0.7,             // increased duration for smooth scaling
    ease: "power3.out",
    overwrite: "auto"
  });

  // 🔥 Zoom-out and fade-out hero-text + zoom-in logo-center
  const triggerStart = 50;
  const triggerEnd = 200;
  let logoProgress = (scrollY - triggerStart) / (triggerEnd - triggerStart);
  logoProgress = Math.min(Math.max(logoProgress, 0), 1); // Clamp 0-1

  gsap.to(".hero-text", {
    y: -logoProgress * 100,
    scale: 1 - logoProgress * 0.99,
    opacity: 1 - logoProgress,
    duration: 0.5,             // increased duration for smoother fade
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
});


const section = document.querySelector('.secondsection');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      section.classList.add('animate-lines');
    } else {
      section.classList.remove('animate-lines');
    }
  });
}, {
  threshold: 0.5
});

observer.observe(section);
