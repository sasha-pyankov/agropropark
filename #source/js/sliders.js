/* слайдер на главной странице-------------------------------------------------------------------------------------------------------------------------------- */

if (document.querySelector('.main-slider')) {
    const swiper = new Swiper('.main-slider__swiper', {
        // бесконечная прокрутка
        loop: true,
        //автоматическая прокрутка при загрузке страници
          autoplay:{ 
              delay: 2500,
              stopOnLastSlider: true, 
              disableOninteraction: false
          },
        // Скорость прокрутки  
        speed: 1000,  
        // базавая пагинация
        pagination: {
          el: '.main-slider__swiper-pagination',
          clickable: true,
        },
        // Количество слайдев для показа
        slidesPerView: 1,
         // Стартовый слайд
         initialSlide: 0,
          // Паралакс
         parallax: true,
         // Упарвление клавиатурой
         keyboard: {
           enabled: true,
           onlyInViewport: true,
           pageUpDown: true,
         },
        // Отключение функционала, если слайдов меньше чем нужно
        watchOverflow: true,
        // Обновить свайпер при изменении элементов свайпера
        observer: true,
        // Обновить свайпер при изменении дочерних элементов свайпера
        observeSlideChildren: true,
        // Обновить свайпер при изменении родительских элементов свайпера
        observeParents: true,
    });
}

/* слайдер в фотогалерее-------------------------------------------------------------------------------------------------------------------------------- */
if (document.querySelector('.photo-gallery')) {
var init = false;

function swiperCard() {
  if (window.innerWidth >= 768) {
    if (!init) {
      init = true;
      const swiper = new Swiper('.photo-gallery__swiper', {
            // бесконечная прокрутка
            loop: true,
            //автоматическая прокрутка при загрузке страници
              autoplay:{ 
                  delay: 10000,
                  stopOnLastSlider: true, 
                  disableOninteraction: false
              },
              // Скорость прокрутки  
              speed: 1000,  
            // базавая пагинация
            pagination: {
              el: '.photo-gallery__swiper-pagination',
              clickable: true,
            },
            // Navigation arrows
            navigation: {
              nextEl: '.photo-gallery__swiper-button-next',
              prevEl: '.photo-gallery__swiper-button-prev',
            },
             // Стартовый слайд
             initialSlide: 0,
              // Паралакс добавляем к картинки: data-swiper-parallax-opacity="0.1" data-swiper-parallax-duration="500" data-swiper-parallax-scale="0.1"
             parallax: true,
             // Упарвление клавиатурой
             keyboard: {
               enabled: true,
               onlyInViewport: true,
               pageUpDown: true,
             },
            // Отключение функционала, если слайдов меньше чем нужно
            watchOverflow: true,
            // Обновить свайпер при изменении элементов свайпера
            observer: true,
            // Обновить свайпер при изменении дочерних элементов свайпера
            observeSlideChildren: true,
            // Обновить свайпер при изменении родительских элементов свайпера
            observeParents: true,
            spaceBetween: 35, 
          });
    }
  } else if (init) {
    swiper.destroy();
    init = true;
  }
}
swiperCard();
window.addEventListener("resize", swiperCard);
}
/* слайдер в партнеры-------------------------------------------------------------------------------------------------------------------------------- */
if (document.querySelector('.partners')) {
var init = false;

function swiperCard() {
  if (window.innerWidth >= 768) {
    if (!init) {
      init = true;
      const swiper = new Swiper('.partners__swiper', {
            // бесконечная прокрутка
            loop: true,
            //автоматическая прокрутка при загрузке страници
              autoplay:{ 
                  delay: 10000,
                  stopOnLastSlider: true, 
                  disableOninteraction: false
              },
              // Скорость прокрутки  
              speed: 1000,  
            // базавая пагинация
            pagination: {
              el: '.partners__swiper-pagination',
              clickable: true,
            },
            // Navigation arrows
            navigation: {
              nextEl: '.partners__swiper-button-next',
              prevEl: '.partners__swiper-button-prev',
            },
             // Стартовый слайд
             initialSlide: 0,
              // Паралакс добавляем к картинки: data-swiper-parallax-opacity="0.1" data-swiper-parallax-duration="500" data-swiper-parallax-scale="0.1"
             parallax: true,
             // Упарвление клавиатурой
             keyboard: {
               enabled: true,
               onlyInViewport: true,
               pageUpDown: true,
             },
            // Отключение функционала, если слайдов меньше чем нужно
            watchOverflow: true,
            // Обновить свайпер при изменении элементов свайпера
            observer: true,
            // Обновить свайпер при изменении дочерних элементов свайпера
            observeSlideChildren: true,
            // Обновить свайпер при изменении родительских элементов свайпера
            observeParents: true,
            spaceBetween: 35, 
          });
    }
  } else if (init) {
    swiper.destroy();
    init = true;
  }
}
swiperCard();
window.addEventListener("resize", swiperCard);
}