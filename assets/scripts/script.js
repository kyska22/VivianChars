document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const fadeElements = document.querySelectorAll(".fade-up");
  const featureCards = document.querySelectorAll(".feature-card");
  const statNumbers = document.querySelectorAll(".stat-number");
  const statsSection = document.querySelector(".stats-section");
  const parallaxSection = document.getElementById("parallax-vigo");
  const parallaxImg = parallaxSection ? parallaxSection.querySelector(".parallax-bg") : null;
  let statsAnimated = false;

  /* ========== Fade-in inicial ========== */
  fadeElements.forEach((el) => setTimeout(() => el.classList.add("show"), 200));

  /* ========== IntersectionObserver (cards + fade) ========== */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => e.isIntersecting && (e.target.classList.add("show"), io.unobserve(e.target)));
    },
    { threshold: 0.2 }
  );
  fadeElements.forEach((el) => io.observe(el));
  featureCards.forEach((card) => io.observe(card));

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

  /* ========== Parallax RELATIVO A LA SECCIÓN ========== */
  function updateParallax() {
    if (!parallaxSection) return;
    const rect = parallaxSection.getBoundingClientRect();

    // si está fuera de pantalla no hacemos nada (performance)
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

    // progreso dentro de la sección (0 al entrar, 1 al salir)
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    // desplazamiento suave (ajusta el factor 60 a tu gusto)
    const y = (rect.top * -0.4); // mueve en sentido contrario al scroll

    if (parallaxImg) {
      // caso <img class="parallax-bg">
      parallaxImg.style.transform = `translate3d(0, ${y}px, 0)`;
      parallaxImg.style.willChange = "transform";
      parallaxImg.style.pointerEvents = "none";
    } else {
      // caso background-image en el <section>
      parallaxSection.style.backgroundPositionY = `${-progress * 60}px`;
    }
  }

  /* ========== Scroll handler ========== */
  function onScroll() {
    // Navbar
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");

    // Parallax
    updateParallax();

    // Stats
    if (!statsAnimated && statsSection) {
      const r = statsSection.getBoundingClientRect();
      if (r.top < window.innerHeight - 200) {
        statsAnimated = true;
        statNumbers.forEach((stat) => {
          const target = parseFloat(stat.getAttribute("data-target"));
          animateCounter(stat, target);
        });
      }
    }
  }

  // Primer pintado
  onScroll();
  // Listeners
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateParallax, { passive: true });
});
