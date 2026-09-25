// Alpine (always loaded)
import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();

// Lazy-load Swiper only if swiper elements are present
if (
  document.querySelector('.mySwiper') ||
  document.querySelector('.swiperThumbs') ||
  document.querySelector('.swiperHistory')
) {
  (async () => {
    // Dynamically import Swiper JS bundle and CSS
    const SwiperModule = await import('swiper/bundle');
    await import('swiper/css/bundle');

    const Swiper = SwiperModule.default;

    // Initialize main swiper
    const swiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.testimonios-next',
        prevEl: '.testimonios-prev',
      },
      breakpoints: {
        768: { slidesPerView: 2 },
      },
    });

    // Initialize thumbs swiper
    const swiper2 = new Swiper('.swiperThumbs', {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    // Initialize history swiper with thumbs
    const swiper3 = new Swiper('.swiperHistory', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: swiper2,
      },
    });
  })();
}

// Animaciones de entrada al hacer scroll
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const selector = [
    'section h1',
    'section h2',
    'section figure',
    'section .prose',
    'section form',
    'section .swiper',
    'section img:not(.rellax):not([class*="size-"])',
    'footer > *',
  ].join(',');

  const targets = [...document.querySelectorAll(selector)].filter(
    (el) => !el.closest('.swiper-slide') && !el.closest('.rellax') && !el.querySelector('.rellax')
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        observer.unobserve(el);
        el.classList.add('is-visible');
        el.addEventListener(
          'animationend',
          () => el.classList.remove('reveal', 'is-visible'),
          { once: true }
        );
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  const counts = new Map();
  targets.forEach((el) => {
    const parent = el.parentElement;
    const i = counts.get(parent) || 0;
    counts.set(parent, i + 1);
    el.style.setProperty('--reveal-delay', `${Math.min(i, 4) * 90}ms`);
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
