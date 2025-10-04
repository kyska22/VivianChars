document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const fadeElements = document.querySelectorAll(".fade-up");
  // 🔧 Tus tarjetas son .course-card (no .feature-card)
  const courseCards = document.querySelectorAll(".course-card");
  const statNumbers = document.querySelectorAll(".stat-number");
  const statsSection = document.querySelector(".stats-section");
  const parallaxSection = document.getElementById("parallax-vigo");
  const parallaxImg = parallaxSection ? parallaxSection.querySelector(".parallax-bg") : null;
  let statsAnimated = false;

  /* ========== Fade-in inicial ========== */
  setTimeout(() => fadeElements.forEach(el => el.classList.add("show")), 200);

  /* ========== IntersectionObserver (fade + cards) ========== */
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add("show");
        io.unobserve(e.target);
      });
    },
    { threshold: 0.2 }
  );
  fadeElements.forEach(el => io.observe(el));
  courseCards.forEach(card => io.observe(card));

  /* ========== Contadores ========== */
  function animateCounter(element, target) {
    const isDecimal = String(target).includes(".");
    const steps = 100;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    }, 20);
  }

  /* ========== Parallax relativo a la sección (suave) ========== */
  function updateParallax() {
    if (!parallaxSection || !parallaxImg) return;
    const rect = parallaxSection.getBoundingClientRect();

    // evita cálculos si está fuera de pantalla
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

    // factor de movimiento: mueve en sentido contrario al scroll
    const y = rect.top * -0.4;
    parallaxImg.style.transform = `translate3d(0, ${y}px, 0)`;
  }

  /* ========== Scroll handler ========== */
  function onScroll() {
    // Navbar shrink
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");

    // Parallax
    updateParallax();

    // Stats
    if (!statsAnimated && statsSection) {
      const r = statsSection.getBoundingClientRect();
      if (r.top < window.innerHeight - 200) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseFloat(stat.getAttribute("data-target"));
          animateCounter(stat, target);
        });
      }
    }
  }

  // Primer pintado
  onScroll();

  // Listeners (passive para performance)
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateParallax, { passive: true });
});
