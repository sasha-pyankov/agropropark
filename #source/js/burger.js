/* бургер-меню */
const iconMenu = document.querySelector('.top-menu-haader__burger-icon');
const headerMenu = document.querySelector('.menu-haader');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active-burger-menu');
    headerMenu.classList.toggle('_active-burger-menu');
  })
}

