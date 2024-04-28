// Бургер жи есть
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("burger").addEventListener("click", function() {
      document.querySelector(".header").classList.toggle("open")
  });
})
// Закрыть меню при нажатии на Esc
window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
      document.querySelector(".header").classList.remove("open")
  }
});

// Закрыть меню при клике вне его
document.getElementById("menu").addEventListener('click', event => {
  event._isClickWithInMenu = true;
});
document.getElementById("burger").addEventListener('click', event => {
  event._isClickWithInMenu = true;
});
document.body.addEventListener('click', event => {
  if (event._isClickWithInMenu) return;
  document.querySelector(".header").classList.remove("open")
});

// Табы
const tabsTitle = document.querySelectorAll('.tab__title');
const tabsContent = document.querySelectorAll('.tab__content');

tabsTitle.forEach(item => item.addEventListener('click', event => {
  const tabsTitleTarget = event.target.getAttribute('data-tab');

  tabsTitle.forEach(element => element.classList.remove('active-tab'));

  tabsContent.forEach(element => element.classList.add('hidden-tab-content'));

  item.classList.add('active-tab');

  document.getElementById(tabsTitleTarget).classList.remove('hidden-tab-content');
}));

document.querySelector('[data-tab="tab-1"]').classList.add('active-tab');
document.querySelector('#tab-1').classList.remove('hidden-tab-content');

// Слайдер

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  // loop: true,
  speed: 500,
  effect: 'slider', //slider, cards, coverflow, flip, fade, cube (способ перелистывания),
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    1420: {
      slidesPerView: 2,
      spaceBetween: -100,
    }
  }
});

// Аккордеон
const boxes = document.querySelectorAll('.box');

boxes.forEach((box) => {
  box.addEventListener('click', boxHandler);
});

function boxHandler(e) {
  e.preventDefault();
  let currentBox = e.target.closest('.box');
  let currentContent = e.target.nextElementSibling;
  currentBox.classList.toggle('active');

  if (currentBox.classList.contains('active')) {
    currentContent.style.maxHeight = currentContent.scrollHeight + 'px';
  } else {
    currentContent.style.maxHeight = 0;
  }
}

// Модальное окно
const modalController = ({modal, btnOpen, btnClose, time = 300}) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  // Открытие модального окна
  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms easy-in-out;
  `;

  // Закрытие модального окна
  const closeModal = event => {
    const target = event.target;

    if (target === modalElem || 
      (btnClose && target.closest(btnClose)) ||
      event.code === 'Escape'
      ) {
      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = 'hidden'; 
      }, time);

      window.removeEventListener('keydown', closeModal);
    }
  }

  // Открытие модального окна
  const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal)
  };

  buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modalElem.addEventListener('click', closeModal);
}

modalController({
  modal: '.modal1',
  btnOpen: '.modal__button1',
  btnClose: '.modal__close',
});