
let swiper;

swiper = new Swiper(".our__slider", {
	navigation: { nextEl: ".our__arrow" },
	slidesPerView: 3,
	slidesPerGroup: 1,
	spaceBetween: 20,
	loop: true,
	speed: 800,
	watchOverflow: true,

	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},

	breakpoints: {
		320: { slidesPerView: 1, spaceBetween: 20 },
		550: { slidesPerView: 2, spaceBetween: 20 },
		768: { slidesPerView: 2, spaceBetween: 20 },
		940: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		// 992–1199px — 3 слайда
		960: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		980: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1200: { slidesPerView: 3, spaceBetween: 20 },
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

// ===== ПОДСВЕТКА ПОСЛЕДНЕГО ВИДИМОГО СЛАЙДА (автоматическая) =====
function highlightLastVisible() {
	if (!swiper || !swiper.slides) return;
	swiper.slides.forEach((s) => s.classList.remove("is-last-visible"));
	const perView = Math.round(swiper.params.slidesPerView) || 3;
	const lastIdx = swiper.activeIndex + perView - 1;
	const target = swiper.slides[lastIdx];
	if (target) target.classList.add("is-last-visible");
}

// ===== КЛИК ПО КАРТОЧКЕ — СТАНОВИТСЯ АКТИВНОЙ И УХОДИТ В КРАЙНЕЕ ПРАВОЕ ПОЛОЖЕНИЕ =====
document.querySelectorAll(".item-our").forEach((card) => {
	card.addEventListener("click", function (e) {
		// Если клик по ссылке внутри карточки — не активируем
		if (e.target.closest("a")) return;

		const slide = this.closest(".swiper-slide");
		if (!slide) return;

		// Реальный индекс слайда (учитывая loop)
		const realIndex = slide.dataset.swiperSlideIndex
			? parseInt(slide.dataset.swiperSlideIndex, 10)
			: swiper.slides.indexOf(slide);

		// Сколько слайдов видно сейчас
		const perView = Math.round(swiper.params.slidesPerView) || 3;

		// Чтобы кликнутый слайд оказался крайним правым, activeIndex должен быть на (perView - 1) меньше
		let targetIndex = realIndex - (perView - 1);

		// Прокручиваем с loop
		if (swiper.params.loop) {
			swiper.slideToLoop(targetIndex, 800);
		} else {
			// Без loop — ограничиваем диапазон
			targetIndex = Math.max(0, Math.min(targetIndex, swiper.slides.length - perView));
			swiper.slideTo(targetIndex, 800);
		}
	});
});

// ===== УСТАНОВКА is-active ПОСЛЕ ПЕРЕЛИСТЫВАНИЯ =====
swiper.on("slideChangeTransitionEnd", function () {
	// Снимаем is-active со всех
	document.querySelectorAll(".item-our").forEach((c) => c.classList.remove("is-active"));

	// Активная карточка — та, что сейчас крайняя правая (последняя видимая)
	const perView = Math.round(swiper.params.slidesPerView) || 3;
	const lastIdx = swiper.activeIndex + perView - 1;
	const lastSlide = swiper.slides[lastIdx];
	if (lastSlide) {
		const activeCard = lastSlide.querySelector(".item-our");
		if (activeCard) activeCard.classList.add("is-active");
	}
});