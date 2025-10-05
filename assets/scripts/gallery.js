// gallery.js — visor de imágenes con modal
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("modal-image");
  const closeBtn = document.querySelector("[data-close]");
  const images = document.querySelectorAll(".masonry-item img");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  });
});
