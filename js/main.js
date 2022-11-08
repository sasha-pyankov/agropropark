


// Попап
const popupLinks = document.querySelectorAll('.popup-link');//добавляем данный класс в HTML дополнительно!!! на ссыллки которые ведут к попап окну
const body = document.querySelector('body');//для блокировки скрола при открытом попапе
const lockPadding = document.querySelectorAll(".lock-padding");//добавляем данный класс в HTML дополнительно!!! к фиксированным объектам, например к шапке, чтобы учитывать ширину скролла 

let unlock = true//что бы не было двойных нажатий

const timeout = 800;//цифра должна совпадать с css - transition: 0.8s

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });   
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');//добавляем данный класс в HTML для закрытия попапа
if (popupCloseIcon.length > 0) {    
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener("click", function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });   
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }   
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;//высчитываем ширину скрола, чтобы при появлении попапа контент не сдвигался
        }
    }    
    body.style.paddingRight = lockPaddingValue;//высчитываем ширину скрола, чтобы при появлении попапа контент не сдвигался
    body.classList.add('_lock');

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {//высчитываем ширину скрола, чтобы при появлении попапа он не сдвигался
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }    
        body.style.paddingRight = '0px';
        body.classList.remove('_lock');
    }, timeout);

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
}); 

(function () {
    //проверям поддержку
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function () {
    if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }    
})();
/* Исчезновение шапки при скролле */
let lastScroll = 0;
const defaultOffset = 100;//через сколько px при прокрутке вниз исчезает блок
const header = document.querySelector('.header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');
window.addEventListener('scroll', () => {
  if(scrollPosition() > lastScroll && !containHide() &&scrollPosition() > defaultOffset) {
    header.classList.add('hide');
  }
  else if(scrollPosition() < lastScroll && containHide()){
    header.classList.remove('hide');
  }
  lastScroll = scrollPosition();
})

/* Счетчик посещения сайта в footer */
window.addEventListener("load", windowLoad);

function windowLoad() {
  //функция инициализации
  function digitsCountersInit(digitsCountersItems) {
    let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
    if (digitsCounters) {
      digitsCounters.forEach(digitsCounter => {
        digitsCountersAnimate(digitsCounter);
      }); 
    }
  }
  //функция анимации
  function digitsCountersAnimate(digitsCounter) {
    let startTimestamp = null;
    const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 3000;// время анимации
    const startValue = parseInt(digitsCounter.innerHTML);
    const startPosition = 0;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  //Пуск анимации сразу при загрузки страницы
  // digitsCountersInit();

  //Пуск анимации при скролле страницы до секции
  let options = {
    threshold: 0.3//анимация сработает когда нужная секция отпуститься на 30% вниз
  }
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
        const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
        if (digitsCountersItems.length) {
          digitsCountersInit(digitsCountersItems);
        }
        // если надо чтобы онимация сработала только один раз при загрузке страницы, то включаем:
        // observer.unobserve(targetElement);
      }
    });
  }, options);

  let sections = document.querySelectorAll('.footer');//родитель где находиться счетчик
  if (sections.length) {
    sections.forEach(section => {
      observer.observe(section);
    });
  } 
}


/* плавное перемещение по документу при клике по ссылке */
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const blockID = anchor.getAttribute('href')
    document.querySelector('' + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  })
}


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

/* слайдер discription-------------------------------------------------------------------------------------------------------------------------------- */

if (document.querySelector('.discription-slider')) {
  const swiper = new Swiper('.discription-slider__swiper', {
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
        el: '.discription-slider__swiper-pagination', 
        clickable: true,
      },
      // Navigation arrows
      navigation: {
        nextEl: '.discription-slider__swiper-button-next',
        prevEl: '.discription-slider__swiper-button-prev',
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
      //счётчик слайдеров
      on: {
        init: function (swiper) {
          const allSlides = document.querySelector('.fraction-control__all');
          const allSlidesItems = document.querySelectorAll('.discription-slider__swiper-slide:not(.swiper-slide-duplicate)');
          allSlides.innerHTML = allSlidesItems.length < 10 ? `0${allSlidesItems.length}` : allSlidesItems.length;
        },
        slideChange: function (swiper) {
          const currentSlide = document.querySelector('.fraction-control__current');
          currentSlide.innerHTML = swiper.realIndex + 1 < 10 ? `0${swiper.realIndex + 1}` : swiper.realIndex + 1;
        }
      },
      breakpoints: {
        320: {
          spaceBetween: 40,
          // autoHeight: true
        },
        1260: {
          spaceBetween: 40
        },
      },
  });
}


/* спойлеры */
/* 
Для родителя спойлеров пишем атрибут data-spollers
Для заголовка спойлеров пишем атрибут data-spoller
Если нужно вкл\вкл работу спойлеров на различных экранах мониторов
пишем параметры ширены и и тип брейкпоинта
Например:
data-spollers="800,max"

Если нужно чтобы в блоке открывался только один спойлер добавляем атрибут data-one-spoller
*/
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {

    // Получение обычных спойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
        return !item.dataset.spollers.split(",")[0];
    });

    // Инициализация обычных спойлеров
    if (spollersRegular.length > 0) {
        initSpollers(spollersRegular);
    }

    // Получение спойлеров с медиа запросами
    const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
        return item.dataset.spollers.split(",")[0];
    });

     // Инициализация спойлеров с медиа запросами
     if (spollersMedia.length > 0) {
        const breakpointsArray = [];
        spollersMedia.forEach(item => {
            const params = item.dataset.spollers;
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
        });

        // Получаем уникальные брекпоинты
        let mediaQueries = breakpointsArray.map(function (item) {
            return '(' + item.type + "-width: "+ item.value + "px)," + item.value + ',' + item.type;

        });
        mediaQueries = mediaQueries.filter(function (item, index, self) {
            return self.indexOf(item) === index;
        });

        // Работаем с каждым брейкпоинтом
        mediaQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);

            // Объекты с нужными условиями
            const spollersArray = breakpointsArray.filter(function (item) {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true;
                }
            }); 
            // Событие
            matchMedia.addListener(function () {
                initSpollers(spollersArray, matchMedia);
            });
            initSpollers(spollersArray, matchMedia);
        });
    }
    // Инициализация
    function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
            if (matchMedia.matches || !matchMedia) {
                spollersBlock.classList.add('_init');
                initSpollerBody(spollersBlock);
                spollersBlock.addEventListener("click", setSpollerAction);
            } else {
                spollersBlock.classList.remove('_init');
                initSpollerBody(spollersBlock, false);
                spollersBlock.removeEventListener("click", setSpollerAction);            
            }
        });
    }
    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
        if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitles => {
                if (hideSpollerBody) {
                    spollerTitles.removeAttribute('tabindex');
                    if (!spollerTitles.classList.contains('_active')) {
                        spollerTitles.nextElementSibling.hidden = true;
                    }
                } else {
                    spollerTitles.setAttribute('tabindex', '-1');
                    spollerTitles.nextElementSibling.hidden = false;
                }
            });
        }
    }    
    function setSpollerAction(e) {
        const el = e.target;
        if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller')  ? el : el.closest('[data-spoller]');
            const spollersBlock = spollerTitle.closest('[data-spollers]');
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
            if (!spollersBlock.querySelectorAll('._slide').length) {
                if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                    hideSpollersBody(spollersBlock);
                }
                spollerTitle.classList.toggle('_active');
                _slideToggle(spollerTitle.nextElementSibling, 500);
            }
            e.preventDefault();
        }
    }
    function hideSpollersBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
        if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_active');
            _slideUp(spollerActiveTitle.nextElementSibling, 500)
        }
    }
} 

let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');     
        }, duration);
    }
}
let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
}
       
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);        
    } else {
        return _slideUp(target, duration);
    }
}

//закрытие спойлера при клике в любой области
document.documentElement.addEventListener("click", function (e){
    if(!e.target.closest('[data-spoller]')) {
        const clos = document.querySelector('[data-spoller]._active');
        clos.classList.remove('_active');
        _slideUp(clos.nextElementSibling, 500)
    }
});


/* бургер-меню */
const iconMenu = document.querySelector('.top-menu-header__burger-icon');
const headerMenu = document.querySelector('.menu-header');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active-burger-menu');
    headerMenu.classList.toggle('_active-burger-menu');
  })
}


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
// форма для заполнения с отправкой на почту
"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);

        if ( error === 0) {  
            form.classList.add('_sending');// класс для загрузки аннимированной картинки, пока отправляется форма      
            let response = await fetch('sendmail.php', {
                type: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.massage);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Ошибка1');
                form.classList.remove('_sending');
            }
        } else {
            alert('заполните обязательные поля');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');// класс для HTML для подсветки красным полей импутов если они не заполнены

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');// класс для scc для подсветки красным полей импутов если они не заполнены
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);// проверка на правельность ввода Email
    }
    const formImage = document.getElementById('formImage');
    const formPreview = document.getElementById('formPreview');
    
    formImage.addEventListener('change', () => {
        upLoadFile(formImage.files[0]);
    });

    function upLoadFile(file) {
        if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Разрешены только изображения.');
            formImage.value = '';
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть меньше 2 Мб.');
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        };
        reader.onerror = function (e) {
            alert('Ошибка');
        };
        reader.readAsDataURL(file);
    }
});
