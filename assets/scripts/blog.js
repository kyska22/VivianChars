// blog.js – funciones básicas del blog
document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.querySelector(".pagination button:first-child");
  const nextBtn = document.querySelector(".pagination button:last-child");

  // Ejemplo: activar/desactivar según página
  let currentPage = 1;
  const totalPages = 5; // simulado

  function updatePagination() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) currentPage--;
    updatePagination();
  });
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) currentPage++;
    updatePagination();
  });

  updatePagination();
});
