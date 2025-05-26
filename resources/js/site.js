// Alpine.
import Alpine from 'alpinejs'
 
window.Alpine = Alpine
 
Alpine.start()

// Swiper
// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

// init Swiper:
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1, // valor base (móvil)
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      // A partir de 768px (escritorio)
      768: {
        slidesPerView: 3
      }
    }
  });

var swiper2 = new Swiper(".swiperThumbs", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

var swiper3 = new Swiper(".swiperHistory", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper2,
      },
    });

// site.js o donde quieras iniciar el mapa
document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map');

    if (mapContainer) {
        import('./map.js')
            .then((module) => {
                module.initMap();
            })
            .catch((err) => {
                console.error('Error al cargar el mapa:', err);
            });
    }
});