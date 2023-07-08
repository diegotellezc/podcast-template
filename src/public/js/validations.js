const navIcon = document.querySelector(".nav__icon");
const menu = document.querySelector(".nav__menu");

navIcon.addEventListener("click", function () {
  menu.classList.toggle("show-menu");
});
