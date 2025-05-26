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
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 3 },
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