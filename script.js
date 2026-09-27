const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const projectCarousel = document.querySelector('.project-carousel');

if (projectCarousel) {
  const track = projectCarousel.querySelector('.project-carousel-track');
  const cards = [...track.querySelectorAll('.project-card')];
  const previous = projectCarousel.querySelector('[data-carousel-prev]');
  const next = projectCarousel.querySelector('[data-carousel-next]');
  const current = projectCarousel.querySelector('[data-carousel-current]');
  const total = projectCarousel.querySelector('[data-carousel-total]');
  let activeIndex = 0;

  total.textContent = String(cards.length).padStart(2, '0');

  function updateCarousel() {
    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    activeIndex = cards.reduce((closest, card, index) =>
      Math.abs(card.offsetLeft + card.clientWidth / 2 - trackCenter) <
      Math.abs(cards[closest].offsetLeft + cards[closest].clientWidth / 2 - trackCenter) ? index : closest, 0);
    current.textContent = String(activeIndex + 1).padStart(2, '0');
    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === cards.length - 1;
  }

  function showProject(index) {
    activeIndex = Math.max(0, Math.min(cards.length - 1, index));
    track.scrollTo({ left: cards[activeIndex].offsetLeft - cards[0].offsetLeft, behavior: 'smooth' });
    current.textContent = String(activeIndex + 1).padStart(2, '0');
    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === cards.length - 1;
  }

  previous.addEventListener('click', () => showProject(activeIndex - 1));
  next.addEventListener('click', () => showProject(activeIndex + 1));
  track.addEventListener('scroll', updateCarousel, { passive: true });
  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}
