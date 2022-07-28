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
          el: '.swiper-pagination',
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
