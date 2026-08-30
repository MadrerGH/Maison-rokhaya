/* ================================================================
   MAISON ROKHAYA — Beauty & Crêpes · script.js

   TO CUSTOMIZE:
   1. Replace WHATSAPP_NUMBER with your real number (no spaces, with country code)
   2. Add real photo URLs to the `images` array for each crêpe in CREPE_DATA
   3. Update CREPE_DATA descriptions if needed
================================================================ */

/* ---- Your WhatsApp number ---- */
const WHATSAPP_NUMBER = '601XXXXXXXXX'; // e.g. '60123456789'

/* ---- Crêpe data ----
   Add real photo URLs to each `images` array.
   Example: images: ['images/crepes/butter-sugar-1.jpg', 'images/crepes/butter-sugar-2.jpg']
   While images is empty, a styled placeholder is shown.
---------------------------------------------------------------- */
const CREPE_DATA = [
  {
    id: 'butter-sugar',
    name: 'Butter & Sugar',
    price: 'RM 6',
    desc: 'The timeless classic. Warm crêpe, real butter, a veil of golden caster sugar. Simple and perfect any time of day.',
    placeholderBg: 'linear-gradient(135deg, #F9EDD0 0%, #C9A227 100%)',
    placeholderIcon: '🧈',
    images: [
      /* 'images/crepes/butter-sugar-1.jpg',
         'images/crepes/butter-sugar-2.jpg' */
    ]
  },
  {
    id: 'nutella-banana',
    name: 'Nutella & Banana',
    price: 'RM 9',
    desc: 'Generous Nutella spread, fresh banana slices, folded into a warm golden crêpe. Rich, indulgent, irresistible.',
    placeholderBg: 'linear-gradient(135deg, #4A2810 0%, #7A4A25 100%)',
    placeholderIcon: '🍫',
    images: []
  },
  {
    id: 'ham-cheese',
    name: 'Ham & Cheese',
    price: 'RM 11',
    desc: 'Smoked ham, melted cheese, wrapped in a soft golden crêpe. The savoury option that hits every time.',
    placeholderBg: 'linear-gradient(135deg, #C4A882 0%, #8A6A48 100%)',
    placeholderIcon: '🧀',
    images: []
  },
  {
    id: 'spicy-chicken',
    name: 'Spicy Chicken & Cheese',
    price: 'RM 12',
    desc: 'Juicy spiced chicken, melted cheese, a kick of heat. Our bestseller — bold, hearty, and seriously satisfying.',
    placeholderBg: 'linear-gradient(135deg, #8C4A50 0%, #C9A227 100%)',
    placeholderIcon: '🌶️',
    images: []
  }
];

/* ================================================================
   UTILITIES
================================================================ */
function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

/* ================================================================
   NAV — scroll class + mobile toggle
================================================================ */
const nav         = $('#nav');
const navToggle   = $('#navToggle');
const navLinks    = $('#navLinks');

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

/* ================================================================
   SCROLL REVEAL — IntersectionObserver
================================================================ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

$$('.reveal').forEach(el => revealObserver.observe(el));

/* ================================================================
   MARQUEE — pause on hover/focus
================================================================ */
const marquee = $('.marquee__track');
if (marquee) {
  marquee.closest('.marquee').addEventListener('mouseenter', () => { marquee.style.animationPlayState = 'paused'; });
  marquee.closest('.marquee').addEventListener('mouseleave', () => { marquee.style.animationPlayState = 'running'; });
}

/* ================================================================
   CRÊPE MODAL
================================================================ */
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

let currentCrepe  = null;
let currentSlide  = 0;
let totalSlides   = 0;
let prevFocusEl   = null;

/* Open modal */
function openModal(crepeId) {
  const data = CREPE_DATA.find(c => c.id === crepeId);
  if (!data) return;

  currentCrepe = data;
  currentSlide = 0;
  prevFocusEl  = document.activeElement;

  /* Populate text */
  modalName.textContent  = data.name;
  modalDesc.textContent  = data.desc;
  modalPrice.textContent = data.price;

  /* Build slides */
  const slides = data.images.length > 0 ? data.images : [null]; // 1 placeholder if no images
  totalSlides  = slides.length;
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
      /* Styled placeholder */
      slide.style.background = data.placeholderBg;
      slide.classList.add('modal__slide--placeholder');
      slide.setAttribute('aria-label', `${data.name} — add your photos`);
      slide.innerHTML = `
        <span class="slide-icon" aria-hidden="true">${data.placeholderIcon}</span>
        <span>Add your photos here</span>`;
    }
    modalSlides.appendChild(slide);

    /* Dot */
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

  updateArrows();
  setSlidePosition();

  /* Show modal */
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
  setSlidePosition();
  updateDots();
  updateArrows();
}
function setSlidePosition() {
  modalSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
}
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

/* Keyboard navigation inside modal */
modal.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); return; }
  if (e.key === 'ArrowLeft')  goToSlide(currentSlide - 1);
  if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
  /* Focus trap */
  if (e.key === 'Tab') {
    const focusable = $$('button:not([disabled]), a[href]', modal).filter(el => !el.hidden);
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* Touch swipe on carousel */
let touchX = 0;
modalSlides.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
modalSlides.addEventListener('touchend', e => {
  const dx = touchX - e.changedTouches[0].clientX;
  if (Math.abs(dx) > 50) { dx > 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1); }
});

/* "Order this" — prefill form and close modal */
modalOrder.addEventListener('click', () => {
  closeModal();
  prefillForm('group-crepe', 'ixora');
  scrollToContact();
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

/* "Order crêpes" button in menu column */
$$('[data-prefill]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    prefillForm(btn.dataset.prefill);
    scrollToContact();
  });
});

/* ================================================================
   FORM — validation + WhatsApp redirect
================================================================ */
const bookingForm  = $('#bookingForm');
const formBtn      = $('#formBtn');
const formNotice   = $('#formNotice');
const formSuccess  = $('#formSuccess');
const formWaBtn    = $('#formWaBtn');
const formReset    = $('#formReset');
const fService     = $('#f-service');
const fLoc         = $('#f-loc');
const fDate        = $('#f-date');

/* Set min date to today */
if (fDate) fDate.min = new Date().toISOString().split('T')[0];

/* Update all WhatsApp hrefs with real number */
$$('.fab-wa, .contact__wa, #formWaBtn').forEach(el => {
  if (el.href && el.href.includes('601XXXXXXXXX')) {
    el.href = el.href.replace('601XXXXXXXXX', WHATSAPP_NUMBER);
  }
});

function prefillForm(serviceVal, locationVal) {
  if (fService && serviceVal) {
    fService.value = serviceVal;
    fService.dispatchEvent(new Event('change'));
  }
  if (fLoc && locationVal) fLoc.value = locationVal;
}

function scrollToContact() {
  const section = $('#contact');
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* Clear error styling on input */
$$('.booking-form input, .booking-form select, .booking-form textarea').forEach(el => {
  el.addEventListener('focus', () => el.classList.remove('is-error'));
});

bookingForm && bookingForm.addEventListener('submit', e => {
  e.preventDefault();
  formNotice.textContent = '';

  /* Validate required fields */
  const required = $$('[required]', bookingForm);
  let firstError = null;
  required.forEach(f => {
    if (!f.value.trim()) {
      f.classList.add('is-error');
      if (!firstError) firstError = f;
    }
  });
  if (firstError) {
    formNotice.textContent = 'Please fill in all required fields.';
    firstError.focus();
    return;
  }

  /* Loading state */
  const origText = formBtn.textContent;
  formBtn.textContent = 'Sending…';
  formBtn.disabled = true;

  /* Build WhatsApp URL with pre-filled message */
  const data = {
    name:     $('#f-name').value.trim(),
    whatsapp: $('#f-wa').value.trim(),
    service:  fService.options[fService.selectedIndex]?.text || fService.value,
    location: fLoc.options[fLoc.selectedIndex]?.text || fLoc.value,
    date:     fDate ? fDate.value : '',
    time:     $('#f-time') ? $('#f-time').value : '',
    message:  $('#f-msg') ? $('#f-msg').value.trim() : ''
  };

  const waText = [
    `Hello Maison Rokhaya! 💁🏽‍♀️`,
    ``,
    `Name: ${data.name}`,
    `WhatsApp: ${data.whatsapp}`,
    `Service: ${data.service}`,
    `Location: ${data.location}`,
    data.date ? `Date: ${data.date}` : '',
    data.time ? `Time: ${data.time}` : '',
    data.message ? `Notes: ${data.message}` : '',
    ``,
    `— Sent via maisonrokhaya.com`
  ].filter(Boolean).join('\n');

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  /* Simulate brief processing delay (replace with real API call if needed) */
  setTimeout(() => {
    formBtn.textContent = origText;
    formBtn.disabled = false;
    bookingForm.hidden = true;
    formSuccess.hidden = false;
    formWaBtn.href = waUrl;
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 900);
});

/* Reset form */
formReset && formReset.addEventListener('click', () => {
  bookingForm.hidden = false;
  bookingForm.reset();
  formSuccess.hidden = true;
  formNotice.textContent = '';
});

/* ================================================================
   NAV active section highlighting (optional — aria-current)
================================================================ */
const sections   = $$('section[id], div[id]');
const navAnchors = $$('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        const match = a.getAttribute('href') === `#${id}`;
        a.toggleAttribute('aria-current', match);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
