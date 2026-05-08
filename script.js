const projectPlayer = document.querySelector(".project-video-player iframe");
const projectButtons = document.querySelectorAll(".project-video");
const animatedLinks = document.querySelectorAll(".hero-links a, .project-video, .contact-actions a");

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!projectPlayer || !button.dataset.video) return;

    projectButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    projectPlayer.src = `https://www.youtube.com/embed/${button.dataset.video}?rel=0`;
  });
});

animatedLinks.forEach((link) => {
  link.addEventListener("pointermove", (event) => {
    const rect = link.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    link.style.setProperty("--mx", `${x}%`);
    link.style.setProperty("--my", `${y}%`);
  });
});

if (window.lucide) {
  window.lucide.createIcons();
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.05
});

revealElements.forEach(el => revealObserver.observe(el));
