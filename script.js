/* ================================================================
   MAISON ROKHAYA — Beauty & Crêpes · script.js
   TO CUSTOMIZE:
   1. Replace WHATSAPP_NUMBER with your real number (no spaces, with country code)
   2. Add real photo URLs to `images` arrays in CREPE_DATA
================================================================ */

const WHATSAPP_NUMBER = '601XXXXXXXXX';

const CREPE_DATA = [
  {
    id: 'butter-sugar', name: 'Butter & Sugar', price: 'RM 6',
    desc: 'The timeless classic. Warm crêpe, real butter, a veil of golden caster sugar. Simple and perfect any time of day.',
    placeholderBg: 'linear-gradient(135deg, #F9EDD0 0%, #C9A227 100%)',
    placeholderIcon: '🧈', images: []
  },
  {
    id: 'nutella-banana', name: 'Nutella & Banana', price: 'RM 9',
    desc: 'Generous Nutella spread, fresh banana slices, folded into a warm golden crêpe. Rich, indulgent, irresistible.',
    placeholderBg: 'linear-gradient(135deg, #3D2010 0%, #6B3A1A 100%)',
    placeholderIcon: '🍫', images: []
  },
  {
    id: 'ham-cheese', name: 'Ham & Cheese', price: 'RM 11',
    desc: 'Smoked ham, melted cheese, wrapped in a soft golden crêpe. The savoury option that hits every time.',
    placeholderBg: 'linear-gradient(135deg, #C4A882 0%, #8A6A48 100%)',
    placeholderIcon: '🧀', images: []
  },
  {
    id: 'spicy-chicken', name: 'Spicy Chicken & Cheese', price: 'RM 12',
    desc: 'Juicy spiced chicken, melted cheese, a kick of heat. Our bestseller — bold, hearty, and seriously satisfying.',
    placeholderBg: 'linear-gradient(135deg, #8C4A50 0%, #C9A227 100%)',
    placeholderIcon: '🌶️', images: []
  }
];

/* ── UTILS ────────────────────────────────────────────────────── */
function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

/* ── STAR GENERATOR ───────────────────────────────────────────── */
function makeStars(container, count = 60) {
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const d = document.createElement('div');
    d.className = 'star-dot';
    const size = Math.random() * 2.5 + 1;
    d.style.cssText = `
      width:${size}px; height:${size}px;
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      --dur:${(Math.random() * 4 + 2).toFixed(1)}s;
      --dly:${(Math.random() * 5).toFixed(1)}s;
      --op:${(Math.random() * 0.5 + 0.3).toFixed(2)};
    `;
    container.appendChild(d);
  }
}

makeStars($('#heroStars'),  50);
makeStars($('#crepeStars'), 70);
makeStars($('#orderStars'), 50);
makeStars($('#stageStarLayer'), 40);

/* ── NAV ──────────────────────────────────────────────────────── */
const nav       = $('#nav');
const navToggle = $('#navToggle');
const navLinks  = $('#navLinks');
const navHairBtn  = $('#navHairBtn');
const navCrepeBtn = $('#navCrepeBtn');

window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 60);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') closeMobileMenu();
});

function closeMobileMenu() {
  navLinks.classList.remove('is-open');
  navToggle.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/* World switcher button active state */
const worldHair  = $('#world-hair');
const worldCrepe = $('#world-crepes');

const worldObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const isHair = e.target.id === 'world-hair';
      navHairBtn.classList.toggle('is-active', isHair);
      navCrepeBtn.classList.toggle('is-active', !isHair);
    }
  });
}, { threshold: 0.3 });

if (worldHair)  worldObserver.observe(worldHair);
if (worldCrepe) worldObserver.observe(worldCrepe);

/* ── SCROLL REVEAL ────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.1 });

$$('.reveal').forEach(el => revealObserver.observe(el));

/* ── HAIR MARQUEE — pause on hover ───────────────────────────── */
const hairMarquee = $('.hair-marquee__track');
if (hairMarquee) {
  const wrap = hairMarquee.closest('.hair-marquee');
  wrap.addEventListener('mouseenter', () => { hairMarquee.style.animationPlayState = 'paused'; });
  wrap.addEventListener('mouseleave', () => { hairMarquee.style.animationPlayState = 'running'; });
}

/* ════════════════════════════════════════════════════════════════
   ANIME PRODUCTION STAGE
════════════════════════════════════════════════════════════════ */
const stage       = $('#stage');
const stagePlay   = $('#stagePlay');
const stageReplay = $('#stageReplay');
const phaseLbl    = $('#phaseLbl');
const ingFlour    = $('#ingFlour');
const ingMilk     = $('#ingMilk');
const flourPour   = $('#flourPour');
const milkStream  = $('#milkStream');
const chickenWrap = $('#chickenWrap');
const chick       = $('#chick');
const chickBubble = $('#chickBubble');
const chickWink   = $('#chickWink');
const eggDrop     = $('#eggDrop');
const eggYolk     = $('#eggYolk');
const ingBowl     = $('#ingBowl');
const batter      = $('#batter');
const ingPan      = $('#ingPan');
const panCrepe    = $('#panCrepe');
const panSteam    = $('#panSteam');
const finalReveal = $('#finalReveal');
const readyText   = $('#readyText');
const impacts     = $('#impacts');

let stageRunning = false;
let stageTimers = [];

function clearStageTimers() {
  stageTimers.forEach(clearTimeout);
  stageTimers = [];
}

function at(ms, fn) {
  stageTimers.push(setTimeout(fn, ms));
}

function showPhase(text) {
  phaseLbl.textContent = text;
  phaseLbl.classList.add('visible');
  at(2200, () => phaseLbl.classList.remove('visible'));
}

function flashScreen(color) {
  const el = document.createElement('div');
  el.className = 'screen-flash';
  el.style.background = color;
  stage.appendChild(el);
  setTimeout(() => el.remove(), 500);
}

function impact(text, x, y) {
  const el = document.createElement('div');
  el.className = 'impact-burst';
  el.textContent = text;
  el.style.left = x + '%';
  el.style.top  = y + '%';
  impacts.appendChild(el);
  setTimeout(() => el.remove(), 600);
}

function resetStage() {
  clearStageTimers();
  stageRunning = false;
  phaseLbl.classList.remove('visible');
  phaseLbl.textContent = '';
  $$('.ing').forEach(el => { el.classList.remove('visible'); el.style.transform = ''; });
  flourPour.classList.remove('active');
  milkStream.classList.remove('active');
  chickenWrap.classList.remove('fly');
  chickenWrap.style.left = '-160px';
  chickenWrap.style.bottom = '30%';
  chickBubble.classList.remove('show');
  chickBubble.textContent = '';
  chickWink.classList.remove('active');
  eggDrop.classList.remove('active');
  eggYolk.classList.remove('cracked');
  batter.classList.remove('has-batter');
  panCrepe.classList.remove('cooking', 'flip');
  panSteam.classList.remove('active');
  finalReveal.classList.remove('visible');
  readyText.textContent = '';
  impacts.innerHTML = '';
  stagePlay.hidden = false;
  stageReplay.hidden = true;
}

function playStage() {
  if (stageRunning) return;
  stageRunning = true;
  stagePlay.hidden = true;

  /* ─ Phase 1: Flour ─ */
  at(200, () => {
    showPhase('Phase 1 · La Farine');
    flashScreen('rgba(255,248,220,.15)');
    ingFlour.classList.add('visible');
  });
  at(900,  () => { flourPour.classList.add('active'); impact('POOF!', 14, 45); });
  at(2800, () => { flourPour.classList.remove('active'); });

  /* ─ Phase 2: Milk ─ */
  at(3200, () => {
    showPhase('Phase 2 · Le Lait');
    flashScreen('rgba(180,220,255,.12)');
    ingMilk.classList.add('visible');
  });
  at(4000, () => { milkStream.classList.add('active'); impact('GLOU!', 85, 40); });
  at(5500, () => { milkStream.classList.remove('active'); });

  /* ─ Phase 3: The Chicken ─ */
  at(5900, () => {
    showPhase('Phase 3 · L\'Œuf !!');
    flashScreen('rgba(255,220,80,.18)');
    impact('★ !!', 50, 20);
  });
  at(6400, () => {
    chickenWrap.classList.add('fly');
    at(800, () => {
      chickBubble.textContent = 'Prêt(e) à pondre !';
      chickBubble.classList.add('show');
    });
    at(1400, () => {
      chickBubble.textContent = '';
      chickBubble.classList.remove('show');
      chickWink.classList.add('active');
      eggDrop.classList.add('active');
      impact('POW!', 55, 60);
    });
    at(1800, () => {
      eggYolk.classList.add('cracked');
      flashScreen('rgba(255,200,50,.2)');
    });
    at(2200, () => {
      chickWink.classList.remove('active');
      chickBubble.textContent = '🍳 Et voilà !';
      chickBubble.classList.add('show');
    });
    at(3000, () => { chickBubble.classList.remove('show'); });
  });

  /* ─ Phase 4: Mixing ─ */
  at(10800, () => {
    showPhase('Phase 4 · La Pâte');
    flashScreen('rgba(240,200,80,.1)');
    ingBowl.classList.add('visible');
  });
  at(11600, () => {
    batter.classList.add('has-batter');
    impact('MIX!', 50, 72);
  });

  /* ─ Phase 5: Pan & cook ─ */
  at(13200, () => {
    showPhase('Phase 5 · La Cuisson');
    flashScreen('rgba(232,148,58,.15)');
    ingPan.classList.add('visible');
  });
  at(14000, () => {
    panCrepe.classList.add('cooking');
    panSteam.classList.add('active');
    impact('SIZZLE!', 78, 45);
  });
  at(16000, () => {
    panCrepe.classList.add('flip');
    flashScreen('rgba(255,220,80,.2)');
    impact('FLIP!', 75, 35);
    setTimeout(() => panCrepe.classList.remove('flip'), 600);
  });

  /* ─ Phase 6: Final reveal ─ */
  at(18000, () => {
    showPhase('🍽 Votre Crêpe !');
    flashScreen('rgba(201,162,39,.25)');
    finalReveal.classList.add('visible');
    readyText.textContent = 'PRÊTE À MANGER !';
    impact('✨', 30, 30);
    impact('✨', 70, 30);
    impact('★', 50, 25);
    stageReplay.hidden = false;
    stageRunning = false;
  });
}

if (stagePlay) {
  stagePlay.addEventListener('click', playStage);
}
if (stageReplay) {
  stageReplay.addEventListener('click', () => {
    resetStage();
    setTimeout(playStage, 100);
  });
}

/* ════════════════════════════════════════════════════════════════
   CRÊPE PHOTO MODAL
════════════════════════════════════════════════════════════════ */
const modal       = $('#crepeModal');
const modalOverlay= $('#modalOverlay');
const modalClose  = $('#modalClose');
const modalSlides = $('#modalSlides');
const modalDots   = $('#modalDots');
const modalPrev   = $('#modalPrev');
const modalNext   = $('#modalNext');
const modalName   = $('#modalName');
const modalDesc   = $('#modalDesc');
const modalPrice  = $('#modalPrice');
const modalOrder  = $('#modalOrder');

let currentCrepe = null;
let currentSlide = 0;
let totalSlides  = 0;
let prevFocusEl  = null;

function openModal(crepeId) {
  const data = CREPE_DATA.find(c => c.id === crepeId);
  if (!data) return;
  currentCrepe = data;
  currentSlide = 0;
  prevFocusEl  = document.activeElement;

  modalName.textContent  = data.name;
  modalDesc.textContent  = data.desc;
  modalPrice.textContent = data.price;

  const slides = data.images.length > 0 ? data.images : [null];
  totalSlides = slides.length;
  modalSlides.innerHTML = '';
  modalDots.innerHTML   = '';

  slides.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'modal__slide';
    slide.setAttribute('role', 'img');
    if (src) {
      slide.style.backgroundImage = `url(${src})`;
      slide.setAttribute('aria-label', `${data.name} photo ${i + 1}`);
    } else {
      slide.style.background = data.placeholderBg;
      slide.classList.add('modal__slide--placeholder');
      slide.setAttribute('aria-label', `${data.name} — add your photos`);
      slide.innerHTML = `<span class="slide-icon" aria-hidden="true">${data.placeholderIcon}</span><span>Add your photos here</span>`;
    }
    modalSlides.appendChild(slide);

    if (totalSlides > 1) {
      const dot = document.createElement('button');
      dot.className = 'modal__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Photo ${i + 1}`);
      dot.setAttribute('aria-selected', String(i === 0));
      dot.dataset.i = i;
      dot.addEventListener('click', () => goToSlide(Number(dot.dataset.i)));
      modalDots.appendChild(dot);
    }
  });

  updateArrows(); setSlidePosition();
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => { modalClose.focus(); });
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
  if (prevFocusEl) prevFocusEl.focus();
}

function goToSlide(n) {
  currentSlide = Math.max(0, Math.min(n, totalSlides - 1));
  setSlidePosition(); updateDots(); updateArrows();
}
function setSlidePosition() { modalSlides.style.transform = `translateX(-${currentSlide * 100}%)`; }
function updateDots() {
  $$('.modal__dot', modalDots).forEach((dot, i) => {
    dot.classList.toggle('is-active', i === currentSlide);
    dot.setAttribute('aria-selected', String(i === currentSlide));
  });
}
function updateArrows() {
  modalPrev.disabled = currentSlide === 0;
  modalNext.disabled = currentSlide === totalSlides - 1;
}

modalPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
modalNext.addEventListener('click', () => goToSlide(currentSlide + 1));
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

modal.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); return; }
  if (e.key === 'ArrowLeft')  goToSlide(currentSlide - 1);
  if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
  if (e.key === 'Tab') {
    const focusable = $$('button:not([disabled]), a[href]', modal).filter(el => !el.hidden);
    if (!focusable.length) return;
    const first = focusable[0]; const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

let touchX = 0;
modalSlides.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
modalSlides.addEventListener('touchend', e => {
  const dx = touchX - e.changedTouches[0].clientX;
  if (Math.abs(dx) > 50) { dx > 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1); }
});

/* "Order this" from modal → scroll to crêpe form */
modalOrder.addEventListener('click', () => {
  closeModal();
  const sec = $('#contact-crepes');
  if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (currentCrepe) {
    const flavourSel = $('#cf-flavour');
    if (flavourSel) { flavourSel.value = currentCrepe.id; flavourSel.dispatchEvent(new Event('change')); }
  }
});

/* Open modal from crêpe cards */
document.addEventListener('click', e => {
  const card = e.target.closest('[data-crepe]');
  if (card) openModal(card.dataset.crepe);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const card = e.target.closest('[data-crepe]');
    if (card) { e.preventDefault(); openModal(card.dataset.crepe); }
  }
});

/* ════════════════════════════════════════════════════════════════
   HAIR BOOKING FORM
════════════════════════════════════════════════════════════════ */
const hairForm        = $('#hairForm');
const hairFormBtn     = $('#hairFormBtn');
const hairFormNotice  = $('#hairFormNotice');
const hairFormSuccess = $('#hairFormSuccess');
const hairWaBtn       = $('#hairWaBtn');
const hairFormReset   = $('#hairFormReset');

const hfDate = $('#hf-date');
if (hfDate) hfDate.min = new Date().toISOString().split('T')[0];

$$('.hair-form input, .hair-form select, .hair-form textarea').forEach(el => {
  el.addEventListener('focus', () => el.classList.remove('is-error'));
});

hairForm && hairForm.addEventListener('submit', e => {
  e.preventDefault();
  hairFormNotice.textContent = '';

  const required = $$('[required]', hairForm);
  let firstError = null;
  required.forEach(f => {
    if (!f.value.trim()) { f.classList.add('is-error'); if (!firstError) firstError = f; }
  });
  if (firstError) {
    hairFormNotice.textContent = 'Please fill in all required fields.';
    firstError.focus(); return;
  }

  const orig = hairFormBtn.textContent;
  hairFormBtn.textContent = 'Sending…'; hairFormBtn.disabled = true;

  const data = {
    name:     $('#hf-name').value.trim(),
    wa:       $('#hf-wa').value.trim(),
    service:  (() => { const s = $('#hf-svc'); return s.options[s.selectedIndex]?.text || s.value; })(),
    location: (() => { const l = $('#hf-loc'); return l.options[l.selectedIndex]?.text || l.value; })(),
    date:     hfDate ? hfDate.value : '',
    time:     $('#hf-time') ? $('#hf-time').value : '',
    message:  $('#hf-msg') ? $('#hf-msg').value.trim() : ''
  };

  const waText = [
    `Hello Maison Rokhaya! ✂️`,
    ``,
    `Name: ${data.name}`,
    `WhatsApp: ${data.wa}`,
    `Service: ${data.service}`,
    `Location: ${data.location}`,
    data.date ? `Date: ${data.date}` : '',
    data.time ? `Time: ${data.time}` : '',
    data.message ? `Notes: ${data.message}` : '',
    ``,
    `— Hair booking via maisonrokhaya.com`
  ].filter(Boolean).join('\n');

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  setTimeout(() => {
    hairFormBtn.textContent = orig; hairFormBtn.disabled = false;
    hairForm.hidden = true; hairFormSuccess.hidden = false;
    hairWaBtn.href = waUrl;
    hairFormSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 900);
});

hairFormReset && hairFormReset.addEventListener('click', () => {
  hairForm.hidden = false; hairForm.reset();
  hairFormSuccess.hidden = true; hairFormNotice.textContent = '';
});

/* ════════════════════════════════════════════════════════════════
   CRÊPE ORDER FORM
════════════════════════════════════════════════════════════════ */
const crepeForm        = $('#crepeForm');
const crepeFormBtn     = $('#crepeFormBtn');
const crepeFormNotice  = $('#crepeFormNotice');
const crepeFormSuccess = $('#crepeFormSuccess');
const crepeWaBtn       = $('#crepeWaBtn');
const crepeFormReset   = $('#crepeFormReset');

$$('.crepe-form input, .crepe-form select, .crepe-form textarea').forEach(el => {
  el.addEventListener('focus', () => el.classList.remove('is-error'));
});

crepeForm && crepeForm.addEventListener('submit', e => {
  e.preventDefault();
  crepeFormNotice.textContent = '';

  const required = $$('[required]', crepeForm);
  let firstError = null;
  required.forEach(f => {
    if (!f.value.trim()) { f.classList.add('is-error'); if (!firstError) firstError = f; }
  });
  if (firstError) {
    crepeFormNotice.textContent = 'Please fill in all required fields.';
    firstError.focus(); return;
  }

  const orig = crepeFormBtn.textContent;
  crepeFormBtn.textContent = 'Sending…'; crepeFormBtn.disabled = true;

  const cfFlavour  = $('#cf-flavour');
  const cfQty      = $('#cf-qty');
  const cfDelivery = $('#cf-delivery');

  const data = {
    name:     $('#cf-name').value.trim(),
    wa:       $('#cf-wa').value.trim(),
    flavour:  cfFlavour.options[cfFlavour.selectedIndex]?.text || cfFlavour.value,
    qty:      cfQty ? cfQty.value : '',
    delivery: cfDelivery ? (cfDelivery.options[cfDelivery.selectedIndex]?.text || cfDelivery.value) : '',
    message:  $('#cf-msg') ? $('#cf-msg').value.trim() : ''
  };

  const waText = [
    `Hello Maison Rokhaya! 🍽`,
    ``,
    `Name: ${data.name}`,
    `WhatsApp: ${data.wa}`,
    `Crêpe: ${data.flavour}`,
    data.qty ? `Quantity: ${data.qty}` : '',
    data.delivery ? `Delivery: ${data.delivery}` : '',
    data.message ? `Notes: ${data.message}` : '',
    ``,
    `— Crêpe order via maisonrokhaya.com`
  ].filter(Boolean).join('\n');

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  setTimeout(() => {
    crepeFormBtn.textContent = orig; crepeFormBtn.disabled = false;
    crepeForm.hidden = true; crepeFormSuccess.hidden = false;
    crepeWaBtn.href = waUrl;
    crepeFormSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 900);
});

crepeFormReset && crepeFormReset.addEventListener('click', () => {
  crepeForm.hidden = false; crepeForm.reset();
  crepeFormSuccess.hidden = true; crepeFormNotice.textContent = '';
});

/* ── Update all WhatsApp hrefs ───────────────────────────────── */
$$('.fab-wa, .ch-wa, #hairWaBtn, #crepeWaBtn').forEach(el => {
  if (el.href && el.href.includes('601XXXXXXXXX')) {
    el.href = el.href.replace('601XXXXXXXXX', WHATSAPP_NUMBER);
  }
});
