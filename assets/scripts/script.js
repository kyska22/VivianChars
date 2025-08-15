document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-up");
  const navbar = document.querySelector(".navbar");
  const featureCards = document.querySelectorAll(".feature-card");
  const parallaxBg = document.querySelector(".parallax-bg");
  const statNumbers = document.querySelectorAll(".stat-number");
  let statsAnimated = false;

  // Función para animar contadores
  function animateCounter(element, target) {
    const increment = target / 100;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      // Formato especial para números decimales
      if (target === 2.5) {
        element.textContent = current.toFixed(1);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 20);
  }

  // Animación inicial fade-up
  fadeElements.forEach(el => {
    setTimeout(() => {
      el.classList.add("show");
    }, 200);
  });

  // Efectos de scroll
  window.addEventListener("scroll", () => {
    // Efecto parallax
    const scrolled = window.pageYOffset;
    if (parallaxBg) {
      parallaxBg.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
    }

    // Efecto para fade-up
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add("show");
      }
    });

    // Animación de estadísticas
    if (!statsAnimated) {
      const statsSection = document.querySelector(".stats-section");
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 200) {
          statsAnimated = true;
          statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute("data-target"));
            animateCounter(stat, target);
          });
        }
      }
    }

    // Efecto para el menú
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Animación de las tarjetas en diagonal
    featureCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        setTimeout(() => {
          card.classList.add("show");
        }, index * 200);
      }
    });
  });
});