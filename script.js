// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  });
});

// Gallery filter
const filters = document.querySelectorAll('.filter');
const works = document.querySelectorAll('.work');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    works.forEach(w => {
      w.hidden = !(cat === 'all' || w.dataset.cat === cat);
    });
  });
});

// Lightbox (full-size preview)
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbClose = document.getElementById('lbClose');
let lastFocused = null;

function openLightbox(btn) {
  lastFocused = btn;
  lbImg.src = btn.dataset.full;
  lbImg.alt = btn.dataset.title;
  lbCaption.innerHTML = btn.dataset.title;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lbClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lbImg.src = '';
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll('.work-btn').forEach(btn => {
  btn.addEventListener('click', () => openLightbox(btn));
});

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
