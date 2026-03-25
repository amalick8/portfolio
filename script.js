const revealElements = document.querySelectorAll(".reveal");
const progressBar = document.querySelector(".scroll-progress");
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
const magneticItems = document.querySelectorAll(".magnetic");
const tiltCards = document.querySelectorAll(".tilt");
const parallaxItems = document.querySelectorAll(".parallax");
const yearEl = document.getElementById("year");
const siteHeader = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".site-header nav a");

yearEl.textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);

revealElements.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 22, 220)}ms`;
  revealObserver.observe(el);
});

const updateScrollProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max <= 0 ? 0 : (window.scrollY / max) * 100;
  progressBar.style.width = `${value}%`;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

const sectionVisibility = new Map();
const linkToSection = new Map();

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (!href || !href.startsWith("#")) return;
  const section = document.querySelector(href);
  if (!section) return;
  linkToSection.set(link, section);
  sectionVisibility.set(section.id, 0);
});

const syncActiveNav = () => {
  let winnerId = "";
  let winnerRatio = 0;

  sectionVisibility.forEach((ratio, id) => {
    if (ratio > winnerRatio) {
      winnerRatio = ratio;
      winnerId = id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const id = href ? href.slice(1) : "";
    link.classList.toggle("is-active", id === winnerId && winnerRatio > 0.2);
  });
};

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      sectionVisibility.set(entry.target.id, entry.intersectionRatio);
    });
    syncActiveNav();
  },
  { threshold: [0.2, 0.35, 0.55, 0.75] }
);

linkToSection.forEach((section) => navObserver.observe(section));

let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;
let dotX = targetX;
let dotY = targetY;
let ringX = targetX;
let ringY = targetY;
let parallaxTargetX = 0;
let parallaxTargetY = 0;
let parallaxX = 0;
let parallaxY = 0;

window.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;

  const midX = window.innerWidth / 2;
  const midY = window.innerHeight / 2;
  parallaxTargetX = (targetX - midX) / midX;
  parallaxTargetY = (targetY - midY) / midY;
});

const renderFrame = () => {
  dotX += (targetX - dotX) * 0.5;
  dotY += (targetY - dotY) * 0.5;
  ringX += (targetX - ringX) * 0.24;
  ringY += (targetY - ringY) * 0.24;

  if (dot) {
    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;
  }

  if (ring) {
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
  }

  parallaxX += (parallaxTargetX - parallaxX) * 0.13;
  parallaxY += (parallaxTargetY - parallaxY) * 0.13;

  parallaxItems.forEach((item) => {
    const depth = Number(item.dataset.depth || 0.2);
    item.style.transform = `translate3d(${parallaxX * depth * 35}px, ${parallaxY * depth * 35}px, 0)`;
  });

  requestAnimationFrame(renderFrame);
};
renderFrame();

const interactiveTargets = document.querySelectorAll("a, button, .project-card");
interactiveTargets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    ring.style.width = "58px";
    ring.style.height = "58px";
    ring.style.borderColor = "rgba(255,255,255,0.78)";
  });
  target.addEventListener("mouseleave", () => {
    ring.style.width = "34px";
    ring.style.height = "34px";
    ring.style.borderColor = "rgba(255,255,255,0.45)";
  });
});

magneticItems.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.16}px, ${y * 0.16}px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translate(0,0)";
  });
});

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -12;
    const ry = (px - 0.5) * 14;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});
