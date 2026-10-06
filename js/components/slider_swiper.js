let swiper;

swiper = new Swiper(".our__slider", {
  navigation: { nextEl: ".our__arrow" },
  slidesPerView: 3,           // дефолт для десктопа
  slidesPerGroup: 1,
  spaceBetween: 54,
  loop: true,
  speed: 800,
  watchOverflow: true,

  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },

  breakpoints: {
    // < 480px — 1 слайд
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    // 480–991px — 2 слайда
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // 992–1199px — 2 слайда (или 3, если влезает)
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // ≥ 1200px — 3 слайда
    1200: {
      slidesPerView: 3,
      spaceBetween: 54,
    },
  },

  on: {
    init: function () {
      requestAnimationFrame(highlightLastVisible);
    },
    slideChange: highlightLastVisible,
    slideChangeTransitionEnd: highlightLastVisible,
    resize: highlightLastVisible,
    loopFix: highlightLastVisible,
  },
});

function highlightLastVisible() {
  if (!swiper || !swiper.slides) return;
  swiper.slides.forEach((s) => s.classList.remove("is-last-visible"));

  // slidesPerView теперь число — берём напрямую
  const perView = Math.round(swiper.params.slidesPerView) || 3;
  const lastIdx = swiper.activeIndex + perView - 1;
  const target = swiper.slides[lastIdx];
  if (target) target.classList.add("is-last-visible");
}