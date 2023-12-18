import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper.css';
import 'swiper/modules/pagination.css';

// Disable scrolling
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#menu') {
    document.body.classList.add('page__body--with-modal');
  } else {
    document.body.classList.remove('page__body--with-modal');
  }

  if (window.location.hash === '#tickets') {
    document.body.classList.add('page__body--with-modal');
  } else {
    document.body.classList.remove('page__body--with-modal');
  }
});

// Disabling form submission
const pageReload = document.querySelector('#form-reload');

pageReload.addEventListener('submit', function formReload(event) {
  event.preventDefault();
  pageReload.reset();
});

// Slider
function initSwiper() {
  return new Swiper('.swiper', {
    modules: [Pagination],
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
    },
  });
}

const swiper = document.querySelector('.gallery__swiper');
const wrapper = document.querySelector('.gallery__images');
const box = document.querySelectorAll('.gallery__image-box');

function removeSwiperClasses() {
  swiper.classList.remove('swiper');
  swiper.classList.remove('swiper-backface-hidden');
  wrapper.classList.remove('swiper-wrapper');
  wrapper.removeAttribute('id');

  box.forEach(slide => {
    slide.classList.remove('swiper-slide');
    slide.removeAttribute('style');
  });

  document.querySelector('.gallery__pagination').remove();
}

function addSwiperClasses() {
  swiper.classList.add('swiper');
  wrapper.classList.add('swiper-wrapper');

  box.forEach(slide => {
    slide.classList.add('swiper-slide');
  });

  const newElement = document.createElement('div');

  newElement.setAttribute('class', 'gallery__pagination swiper-pagination');
  swiper.appendChild(newElement);
}

let mySwiper = null;

if (window.innerWidth < 1280) {
  addSwiperClasses();
  mySwiper = initSwiper();
}

function checkScreenWidth() {
  if (window.innerWidth >= 1280) {
    if (mySwiper) {
      mySwiper.destroy();
      mySwiper = null;
    }

    removeSwiperClasses();
  } else {
    if (!mySwiper) {
      addSwiperClasses();

      mySwiper = initSwiper();
    }
  }
}

checkScreenWidth();
window.addEventListener('resize', checkScreenWidth);
