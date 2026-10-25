(function () {
  'use strict';
  var WA = '5549988073723';

  document.getElementById('ano').textContent = new Date().getFullYear();

  // header
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // lightbox
  var lb = document.querySelector('.lightbox');
  var lbImg = lb.querySelector('img');
  var lbCap = lb.querySelector('figcaption');
  var gal = Array.prototype.slice.call(document.querySelectorAll('.gal-item'));
  var idx = 0, lastFocus = null;
  function show(i) {
    idx = (i + gal.length) % gal.length;
    lbImg.src = gal[idx].dataset.full;
    lbImg.alt = gal[idx].dataset.alt + ' (imagem ilustrativa)';
    lbCap.textContent = gal[idx].dataset.alt;
  }
  function openLb(i) { lastFocus = document.activeElement; show(i); lb.hidden = false; lb.querySelector('.lb-close').focus(); document.body.style.overflow = 'hidden'; }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  gal.forEach(function (b, i) { b.addEventListener('click', function () { openLb(i); }); });
  lb.querySelector('.lb-close').addEventListener('click', closeLb);
  lb.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
  var sx = 0;
  lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
  });

  // reservation form -> WhatsApp (no fake confirmation)
  var form = document.getElementById('reserva');
  var err = form.querySelector('.form-error');
  var dateInput = form.elements.data;
  dateInput.min = new Date().toISOString().slice(0, 10);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var ok = ['nome', 'data', 'hora', 'pessoas', 'contato'].every(function (k) { return f[k].value.trim() !== ''; });
    err.hidden = ok;
    if (!ok) return;
    var d = f.data.value.split('-').reverse().join('/');
    var msg = 'Olá! Gostaria de consultar a disponibilidade para fazer uma reserva no Montês Restaurante & Garden.\n' +
      'Nome: ' + f.nome.value.trim() + '\nData: ' + d + '\nHorário: ' + f.hora.value +
      '\nPessoas: ' + f.pessoas.value + '\nContato: ' + f.contato.value.trim();
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });
})();
