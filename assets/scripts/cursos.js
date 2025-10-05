// Modal
const modal = document.getElementById('curso-modal');
const openBtns = document.querySelectorAll('[data-open-modal]');
const closeBtns = modal.querySelectorAll('[data-close-modal]');
const t = id => modal.querySelector(id);

openBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    t('#modal-title').textContent = btn.dataset.title || 'Curso';
    t('#modal-precio').textContent = btn.dataset.precio || '';
    t('#modal-fecha').textContent = btn.dataset.fecha || '';
    t('#modal-modalidad').textContent = btn.dataset.modalidad || '';
    t('#modal-descripcion').textContent = btn.dataset.descripcion || '';
    t('#modal-inscribirme').setAttribute('href', btn.dataset.link || '#');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
  });
});

function closeModal(){
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden','true');
}
closeBtns.forEach(b => b.addEventListener('click', closeModal));
modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

// Filtros simples (demo)
const chips = document.querySelectorAll('.filters .chip');
const selectMes = document.getElementById('filtro-mes');
const search = document.getElementById('q');
const slots = [...document.querySelectorAll('.agenda .slot')];

chips.forEach(ch => ch.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  ch.classList.add('active');
  aplicarFiltros();
}));
selectMes.addEventListener('change', aplicarFiltros);
search.addEventListener('input', aplicarFiltros);

function aplicarFiltros(){
  const mod = document.querySelector('.filters .chip.active')?.dataset.mod || 'all';
  const mes = selectMes.value || 'all';
  const q = (search.value || '').toLowerCase();

  slots.forEach(s => {
    const coincideMod = mod === 'all' || s.dataset.mod === mod;
    const coincideMes = mes === 'all' || s.dataset.mes === mes;
    const texto = s.querySelector('.slot-title')?.textContent.toLowerCase() || '';
    const coincideQ = !q || texto.includes(q);
    s.style.display = (coincideMod && coincideMes && coincideQ) ? '' : 'none';
  });
}
