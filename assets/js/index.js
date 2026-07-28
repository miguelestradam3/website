const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;
    mobileMenu.classList.toggle("open", !isOpen);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
      mobileMenu.classList.remove("open");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  let frame;
  window.addEventListener("pointermove", (event) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    });
  }, { passive: true });
}

const metricsConsole = document.querySelector("[data-metrics-source]");

if (metricsConsole) {
  const status = document.querySelector("#metrics-status");
  const updateMetric = (selector, pattern, source) => {
    const match = source.match(pattern);
    const element = document.querySelector(selector);
    if (match && element) element.textContent = match[1];
  };

  fetch(metricsConsole.dataset.metricsSource)
    .then((response) => {
      if (!response.ok) throw new Error("Metrics unavailable");
      return response.text();
    })
    .then((metrics) => {
      updateMetric("#metric-streak", /Current streak ([\d,]+) days/, metrics);
      updateMetric("#metric-repositories", /Contributed to ([\d,]+) repositories/, metrics);
      updateMetric("#metric-highest", /Highest in a day at ([\d,]+)/, metrics);
      updateMetric("#metric-average", /Average per day at ~([\d.]+)/, metrics);
      updateMetric("#metric-languages", /(\d+) Languages/, metrics);
      if (status) status.textContent = "Synced live";
    })
    .catch(() => {
      if (status) status.textContent = "Latest snapshot";
    });
}
