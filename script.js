/* Maison Rokhaya — script principal */

/* ---- Navigation scroll ---- */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 60);
}, { passive: true });

/* ---- Menu mobile ---- */
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ---- Onglets de la carte ---- */
const tabs = document.querySelectorAll('.carte__tab');
const panels = document.querySelectorAll('.carte__panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const id = 'tab-' + tab.dataset.tab;

    tabs.forEach(t => {
      t.classList.remove('carte__tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    panels.forEach(p => {
      p.classList.remove('carte__panel--active');
      p.hidden = true;
    });

    tab.classList.add('carte__tab--active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(id);
    panel.classList.add('carte__panel--active');
    panel.hidden = false;
  });
});

/* ---- Révélation au défilement ---- */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* ---- Date minimale : aujourd'hui ---- */
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

/* ---- Formulaire de réservation ---- */
const form = document.getElementById('reservationForm');
const submitBtn = document.getElementById('submitBtn');
const notice = document.getElementById('formNotice');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        field.focus();
        field.style.borderColor = '#c0392b';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    if (!valid) {
      notice.textContent = 'Veuillez remplir tous les champs obligatoires.';
      notice.style.color = '#c0392b';
      return;
    }

    submitBtn.textContent = 'Envoi en cours…';
    submitBtn.disabled = true;

    /* Simulation d'envoi (à remplacer par votre API) */
    setTimeout(() => {
      submitBtn.textContent = 'Demande envoyée avec succès !';
      submitBtn.style.background = '#2A5040';
      notice.textContent = 'Nous vous contacterons dans les 24h pour confirmer votre réservation.';
      notice.style.color = '';

      setTimeout(() => {
        submitBtn.textContent = 'Envoyer ma demande de réservation';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        notice.textContent = '';
        form.reset();
      }, 5000);
    }, 1200);
  });

  /* Réinitialise la couleur d'erreur au focus */
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('focus', () => { field.style.borderColor = ''; });
  });
}

/* ---- Lien actif dans la navigation au défilement ---- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.removeAttribute('aria-current');
        if (a.getAttribute('href') === '#' + id) {
          a.setAttribute('aria-current', 'page');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
