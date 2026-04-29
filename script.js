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
const projectScrollRail = document.querySelector("[data-scroll-rail]");

if (yearEl) yearEl.textContent = new Date().getFullYear();

const projectDemoVideo = document.querySelector(".project-demo-video");
if (
  projectDemoVideo &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  projectDemoVideo.removeAttribute("autoplay");
  projectDemoVideo.pause();
}

// -- Logo: sick spin on click --------------------------------
const logoEl = document.querySelector(".logo");
if (logoEl) {
  const logoSpinDone = (fn) => {
    const onEnd = (e) => {
      if (e.animationName !== "logo-sick-spin") return;
      logoEl.classList.remove("is-spinning");
      if (typeof fn === "function") fn();
    };
    logoEl.addEventListener("animationend", onEnd, { once: true });
  };

  logoEl.addEventListener("click", (e) => {
    const href = logoEl.getAttribute("href");
    const skipSpin = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!href || href === "#") {
      if (!skipSpin) {
        logoEl.classList.remove("is-spinning");
        void logoEl.offsetWidth;
        logoEl.classList.add("is-spinning");
        logoSpinDone();
      }
      return;
    }

    if (href.startsWith("#")) {
      if (!skipSpin) {
        logoEl.classList.remove("is-spinning");
        void logoEl.offsetWidth;
        logoEl.classList.add("is-spinning");
        logoSpinDone();
      }
      return;
    }

    if (skipSpin) return;

    e.preventDefault();
    logoEl.classList.remove("is-spinning");
    void logoEl.offsetWidth;
    logoEl.classList.add("is-spinning");
    logoSpinDone(() => {
      window.location.assign(href);
    });
  });
}

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
  if (progressBar) progressBar.style.width = `${value}%`;
  if (siteHeader) siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
  if (projectScrollRail) {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = maxScroll <= 0 ? 0 : window.scrollY / maxScroll;
    projectScrollRail.style.setProperty(
      "--project-scroll",
      String(Math.min(1, Math.max(0, pct)))
    );
    projectScrollRail.classList.toggle("is-scrolled", window.scrollY > 72);
    projectScrollRail.classList.toggle(
      "is-not-scrollable",
      document.documentElement.scrollHeight <= window.innerHeight + 32
    );
  }
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress, { passive: true });
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
    if (!ring) return;
    ring.style.width = "58px";
    ring.style.height = "58px";
    ring.style.borderColor = "rgba(255,255,255,0.78)";
  });
  target.addEventListener("mouseleave", () => {
    if (!ring) return;
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

// =============================================================
// Recruiter polish: counters, role rotator, palette, drawer,
// heatmap, SVG chart entries, scroll-hue, copy email, side dots
// =============================================================

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// -- Animated stat counters -----------------------------------
const formatCounter = (value, { decimals = 0, suffix = "", format = "" }) => {
  const num = Number(value);
  const fixed = decimals > 0 ? num.toFixed(decimals) : Math.floor(num).toString();
  let out = fixed;
  if (format === "commas") {
    out = Number(fixed).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return out + suffix;
};

const runCounter = (el) => {
  if (el.dataset.counted === "true") return;
  el.dataset.counted = "true";
  const target = parseFloat(el.dataset.counter);
  if (Number.isNaN(target)) return;
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const suffix = el.dataset.suffix || "";
  const format = el.dataset.format || "";
  if (prefersReducedMotion) {
    el.textContent = formatCounter(target, { decimals, suffix, format });
    return;
  }
  const duration = 1400;
  const start = performance.now();
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const current = target * ease(p);
    el.textContent = formatCounter(current, { decimals, suffix, format });
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const counterEls = document.querySelectorAll("[data-counter]");
if (counterEls.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counterEls.forEach((el) => counterObserver.observe(el));
}

// -- Role rotator ---------------------------------------------
const roleWords = document.querySelectorAll(".role-word");
if (roleWords.length > 1 && !prefersReducedMotion) {
  let activeRoleIdx = 0;
  setInterval(() => {
    const currentEl = roleWords[activeRoleIdx];
    currentEl.classList.remove("is-active");
    currentEl.classList.add("is-exit");
    activeRoleIdx = (activeRoleIdx + 1) % roleWords.length;
    const nextEl = roleWords[activeRoleIdx];
    nextEl.classList.remove("is-exit");
    requestAnimationFrame(() => {
      nextEl.classList.add("is-active");
    });
    setTimeout(() => {
      currentEl.classList.remove("is-exit");
    }, 500);
  }, 2500);
}

// -- Scroll-linked hue shift ----------------------------------
const updateHue = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max <= 0 ? 0 : window.scrollY / max;
  const hue = ratio * 32;
  document.documentElement.style.setProperty("--hue", `${hue}deg`);
};
if (!prefersReducedMotion) {
  window.addEventListener("scroll", updateHue, { passive: true });
  updateHue();
}

// -- Reveal-on-view for step charts + heatmap -----------------
const inViewObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        inViewObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);
document.querySelectorAll(".step--chart").forEach((el) => {
  inViewObserver.observe(el);
});

// -- Side dots sync (piggyback on existing section visibility) -
const sideDotLinks = document.querySelectorAll(".side-dots a");
const sideDotMap = new Map();
sideDotLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (!href || !href.startsWith("#")) return;
  const id = href.slice(1);
  sideDotMap.set(id, link);
});

const syncSideDots = () => {
  let winnerId = "";
  let winnerRatio = 0;
  sectionVisibility.forEach((ratio, id) => {
    if (ratio > winnerRatio) {
      winnerRatio = ratio;
      winnerId = id;
    }
  });
  if (winnerRatio < 0.15) winnerId = "";
  sideDotLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const id = href.slice(1);
    link.classList.toggle("is-active", id === winnerId);
  });
};

const sideDotObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      sectionVisibility.set(entry.target.id, entry.intersectionRatio);
    });
    syncSideDots();
  },
  { threshold: [0.2, 0.35, 0.55, 0.75] }
);
sideDotMap.forEach((_link, id) => {
  const section = document.getElementById(id);
  if (section) sideDotObserver.observe(section);
});

// -- Project case study scroll rail (section dots + progress fill) -
if (projectScrollRail) {
  const railLinks = projectScrollRail.querySelectorAll(".project-scroll-rail-dots a");
  const projectRailVisibility = new Map();
  railLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) projectRailVisibility.set(id, 0);
  });

  const syncProjectRailDots = () => {
    let winnerId = "";
    let winnerRatio = 0;
    projectRailVisibility.forEach((ratio, id) => {
      if (ratio > winnerRatio) {
        winnerRatio = ratio;
        winnerId = id;
      }
    });
    if (winnerRatio < 0.12) winnerId = "";
    railLinks.forEach((link) => {
      const id = (link.getAttribute("href") || "").slice(1);
      link.classList.toggle("is-active", id === winnerId);
    });
  };

  const projectRailObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        projectRailVisibility.set(entry.target.id, entry.intersectionRatio);
      });
      syncProjectRailDots();
    },
    { threshold: [0.08, 0.2, 0.35, 0.55, 0.75] }
  );

  projectRailVisibility.forEach((_ratio, id) => {
    const el = document.getElementById(id);
    if (el) projectRailObserver.observe(el);
  });
}

// -- Mobile drawer --------------------------------------------
const mobileToggle = document.getElementById("mobileToggle");
const mobileDrawer = document.getElementById("mobileDrawer");
const openDrawer = () => {
  mobileDrawer.classList.add("is-open");
  mobileDrawer.setAttribute("aria-hidden", "false");
  mobileToggle.classList.add("is-open");
  mobileToggle.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
};
const closeDrawer = () => {
  mobileDrawer.classList.remove("is-open");
  mobileDrawer.setAttribute("aria-hidden", "true");
  mobileToggle.classList.remove("is-open");
  mobileToggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
};
if (mobileToggle && mobileDrawer) {
  mobileToggle.addEventListener("click", () => {
    if (mobileDrawer.classList.contains("is-open")) closeDrawer();
    else openDrawer();
  });
  mobileDrawer.querySelectorAll("[data-drawer-close]").forEach((el) => {
    el.addEventListener("click", closeDrawer);
  });
}

// -- Toast helper ---------------------------------------------
const toastEl = document.getElementById("toast");
let toastTimer;
const showToast = (msg) => {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("is-visible");
  }, 2400);
};

// -- Copy email button ----------------------------------------
const copyEmailBtn = document.querySelector(".btn-copy-email");
const copyEmail = () => {
  const email = copyEmailBtn?.dataset.email;
  if (!email) return;
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(email)
      .then(() => showToast(`Copied ${email}`))
      .catch(() => showToast(`Email: ${email}`));
  } else {
    const tmp = document.createElement("textarea");
    tmp.value = email;
    document.body.appendChild(tmp);
    tmp.select();
    try {
      document.execCommand("copy");
      showToast(`Copied ${email}`);
    } catch {
      showToast(`Email: ${email}`);
    }
    document.body.removeChild(tmp);
  }
};
if (copyEmailBtn) copyEmailBtn.addEventListener("click", copyEmail);

// -- Expand-all toggle on experience timeline -----------------
const expandAllBtn = document.getElementById("expandAllBtn");
const experienceTimeline = document.querySelector(".experience-timeline");
if (expandAllBtn && experienceTimeline) {
  expandAllBtn.addEventListener("click", () => {
    const isExpanded = experienceTimeline.classList.toggle("is-expanded");
    expandAllBtn.setAttribute("aria-pressed", isExpanded ? "true" : "false");
    expandAllBtn.querySelector(".expand-all-label").textContent = isExpanded
      ? "Collapse all"
      : "Expand all";
  });
}

// -- Click-to-toggle on every experience card -----------------
document.querySelectorAll(".exp-item").forEach((item) => {
  item.style.cursor = "pointer";
  item.setAttribute("role", "button");
  item.setAttribute("tabindex", "0");
  item.setAttribute("aria-expanded", "false");

  const toggle = (e) => {
    if (e.target.closest("a, button")) return;
    const expanded = item.classList.toggle("is-expanded");
    item.setAttribute("aria-expanded", expanded ? "true" : "false");
  };

  item.addEventListener("click", toggle);
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(e);
    }
  });
});

// -- Command palette ------------------------------------------
const cmdPalette = document.getElementById("cmdPalette");
const cmdInput = document.getElementById("cmdInput");
const cmdList = document.getElementById("cmdList");

const cmdCommands = [
  {
    label: "Go to Experience",
    hint: "Section",
    icon: "arrow",
    action: () => scrollToId("#work"),
  },
  {
    label: "Go to Featured Work",
    hint: "Section",
    icon: "arrow",
    action: () => scrollToId("#featured"),
  },
  {
    label: "Go to Skills",
    hint: "Section",
    icon: "arrow",
    action: () => scrollToId("#skills"),
  },
  {
    label: "Go to GitHub",
    hint: "Section",
    icon: "arrow",
    action: () => scrollToId("#github"),
  },
  {
    label: "Go to Journey",
    hint: "Section",
    icon: "arrow",
    action: () => scrollToId("#process"),
  },
  {
    label: "Contact",
    hint: "Section",
    icon: "arrow",
    action: () => scrollToId("#contact"),
  },
  {
    label: "Open GitHub profile",
    hint: "External",
    icon: "external",
    action: () => window.open("https://github.com/amalick8", "_blank", "noopener"),
  },
  {
    label: "Open LinkedIn profile",
    hint: "External",
    icon: "external",
    action: () =>
      window.open(
        "https://www.linkedin.com/in/ammar-malick-1023b9278",
        "_blank",
        "noopener"
      ),
  },
  {
    label: "Copy email address",
    hint: "Clipboard",
    icon: "copy",
    action: copyEmail,
  },
];

const cmdIconSVG = {
  arrow:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
  external:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
  copy:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
};

let cmdFilter = "";
let cmdSelected = 0;

const scrollToId = (hash) => {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const filteredCommands = () => {
  const q = cmdFilter.trim().toLowerCase();
  if (!q) return cmdCommands;
  return cmdCommands.filter((c) => c.label.toLowerCase().includes(q));
};

const renderCmdList = () => {
  if (!cmdList) return;
  const items = filteredCommands();
  if (items.length === 0) {
    cmdList.innerHTML = '<li class="cmd-empty" aria-disabled="true">No matches. Try "github" or "skills".</li>';
    return;
  }
  cmdSelected = Math.min(cmdSelected, items.length - 1);
  cmdList.innerHTML = items
    .map(
      (c, i) => `
        <li role="option" data-index="${i}" aria-selected="${i === cmdSelected}">
          <span class="cmd-icon">${cmdIconSVG[c.icon] || cmdIconSVG.arrow}</span>
          <span class="cmd-label">${c.label}</span>
          <span class="cmd-hint">${c.hint}</span>
        </li>
      `
    )
    .join("");
  cmdList.querySelectorAll("li[data-index]").forEach((li) => {
    li.addEventListener("mousemove", () => {
      cmdSelected = parseInt(li.dataset.index, 10);
      cmdList.querySelectorAll("li").forEach((x) => {
        x.setAttribute(
          "aria-selected",
          x === li ? "true" : "false"
        );
      });
    });
    li.addEventListener("click", () => {
      runCmd(parseInt(li.dataset.index, 10));
    });
  });
};

const runCmd = (index) => {
  const items = filteredCommands();
  const cmd = items[index];
  if (!cmd) return;
  closeCmdPalette();
  requestAnimationFrame(() => cmd.action());
};

const openCmdPalette = () => {
  if (!cmdPalette) return;
  cmdPalette.classList.add("is-open");
  cmdPalette.setAttribute("aria-hidden", "false");
  cmdFilter = "";
  cmdSelected = 0;
  if (cmdInput) cmdInput.value = "";
  renderCmdList();
  setTimeout(() => cmdInput && cmdInput.focus(), 60);
  document.body.style.overflow = "hidden";
};

const closeCmdPalette = () => {
  if (!cmdPalette) return;
  cmdPalette.classList.remove("is-open");
  cmdPalette.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

if (cmdPalette) {
  cmdPalette.querySelectorAll("[data-cmd-close]").forEach((el) => {
    el.addEventListener("click", closeCmdPalette);
  });
  if (cmdInput) {
    cmdInput.addEventListener("input", (e) => {
      cmdFilter = e.target.value;
      cmdSelected = 0;
      renderCmdList();
    });
  }
  renderCmdList();
}

window.addEventListener("keydown", (e) => {
  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const modifier = isMac ? e.metaKey : e.ctrlKey;
  if (modifier && e.key.toLowerCase() === "k") {
    e.preventDefault();
    if (!cmdPalette) return;
    if (cmdPalette.classList.contains("is-open")) closeCmdPalette();
    else openCmdPalette();
    return;
  }
  if (!cmdPalette || !cmdPalette.classList.contains("is-open")) return;
  const items = filteredCommands();
  if (e.key === "Escape") {
    e.preventDefault();
    closeCmdPalette();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    cmdSelected = (cmdSelected + 1) % Math.max(items.length, 1);
    renderCmdList();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    cmdSelected = (cmdSelected - 1 + items.length) % Math.max(items.length, 1);
    renderCmdList();
  } else if (e.key === "Enter") {
    e.preventDefault();
    runCmd(cmdSelected);
  }
});

/* ----------------------------------------------------------------
 *  Live GitHub profile stats
 *  GET https://api.github.com/users/{username}
 *  - Cached in sessionStorage for 1h (unauth limit is 60 req/h per IP).
 *  - Updates any element with [data-gh="<field>"] in place.
 *  - Silently falls back to hardcoded values on network/rate-limit error.
 * -------------------------------------------------------------- */
const GH_USERNAME = "amalick8";
const GH_CACHE_KEY = `ghUser:${GH_USERNAME}`;
const GH_CACHE_TTL = 60 * 60 * 1000;

const readGhCache = () => {
  try {
    const raw = sessionStorage.getItem(GH_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.ts !== "number") return null;
    if (Date.now() - parsed.ts > GH_CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
};

const writeGhCache = (data) => {
  try {
    sessionStorage.setItem(
      GH_CACHE_KEY,
      JSON.stringify({ ts: Date.now(), data })
    );
  } catch {
    /* storage can be disabled; ignore */
  }
};

const animateGhNumber = (el, from, to) => {
  if (prefersReducedMotion || !Number.isFinite(from) || from === to) {
    el.textContent = to.toLocaleString();
    return;
  }
  const duration = 900;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.round(from + (to - from) * eased);
    el.textContent = value.toLocaleString();
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const applyGhData = (data) => {
  if (!data) return;
  document.querySelectorAll("[data-gh]").forEach((el) => {
    const field = el.dataset.gh;
    const value = data[field];
    if (value === undefined || value === null) return;
    if (typeof value === "number") {
      const current = parseInt(el.textContent.replace(/[^\d-]/g, ""), 10);
      animateGhNumber(el, Number.isFinite(current) ? current : value, value);
    } else {
      el.textContent = String(value);
    }
  });
};

const fetchGitHubProfile = async () => {
  const cached = readGhCache();
  if (cached) {
    applyGhData(cached);
    return;
  }
  try {
    const res = await fetch(`https://api.github.com/users/${GH_USERNAME}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return;
    const data = await res.json();
    writeGhCache(data);
    applyGhData(data);
  } catch {
    /* offline or blocked — keep static defaults */
  }
};

if (document.querySelector("[data-gh]")) {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(fetchGitHubProfile, { timeout: 1500 });
  } else {
    setTimeout(fetchGitHubProfile, 400);
  }
}
