/* слайдер на главной странице */

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
if (document.querySelector('.photo-gallery')) {
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
      el: '.swiper-pagination',
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
    // Увеличение центральной картинки
    // effect: 'coverflow',
    // coverflowEffect: {
    //   rotate: 0,
    //   stretch: -0.5,
    //   depth: 1,
    //   modifier: 100,
    //   slideShadows: false,
    // },
  });
}
  