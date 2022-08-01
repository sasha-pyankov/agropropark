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

