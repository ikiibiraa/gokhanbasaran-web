// === Video Switching (Parmak İzi Project) ===
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

// === Pointer Light Effect ===
animatedLinks.forEach((link) => {
  link.addEventListener("pointermove", (event) => {
    const rect = link.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    link.style.setProperty("--mx", `${x}%`);
    link.style.setProperty("--my", `${y}%`);
  });
});

// === Lucide Icons ===
if (window.lucide) {
  window.lucide.createIcons();
}

// === Scroll Reveal Animation ===
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

// === Hero Parallax Effect ===
const heroBg = document.querySelector('.hero-bg');
const heroSection = document.querySelector('.hero-section');

if (heroBg && heroSection) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        if (scrolled < heroHeight) {
          heroBg.style.transform = `translateY(${scrolled * 0.25}px) scale(1.08)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// === Active Navigation Highlight ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

if (navLinks.length > 0 && sections.length > 0) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(section => navObserver.observe(section));
}

// === Show More Albums (Mobile) ===
const showMoreBtn = document.getElementById('show-more-albums');
const albumGrid = document.querySelector('.album-grid');

if (showMoreBtn && albumGrid) {
  showMoreBtn.addEventListener('click', () => {
    const isExpanded = albumGrid.classList.toggle('expanded');
    showMoreBtn.setAttribute('aria-expanded', String(isExpanded));
    const label = showMoreBtn.querySelector('span');
    if (label) {
      label.textContent = isExpanded ? 'Daha Az Göster' : 'Tüm Diskografiyi Gör';
    }
    if (window.lucide) window.lucide.createIcons();

    // Reveal hidden album cards that now become visible
    if (isExpanded) {
      albumGrid.querySelectorAll('.album-card.reveal:not(.active)').forEach(card => {
        card.classList.add('active');
      });
    }
  });
}

// === Bio Timeline Line Animation ===
const bioTimeline = document.querySelector('.bio-timeline');

if (bioTimeline) {
  const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('line-active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  timelineObserver.observe(bioTimeline);
}
