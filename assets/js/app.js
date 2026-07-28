// Subtle particles setup
if (typeof particlesJS !== "undefined") {
  particlesJS('particles-js', {
    particles: {
      number: { value: 70, density: { enable: true, value_area: 1200 } },
      color: { value: "#7aa2f7" },
      shape: { type: "circle" },
      opacity: { value: 0.25, random: true, anim: { enable: true, speed: 0.4, opacity_min: 0, sync: false } },
      size: { value: 2.5, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 0.6, direction: "none", random: true, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
    },
    retina_detect: true
  });
}