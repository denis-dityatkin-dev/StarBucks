"use strict"

const options = {
	root: null,
	rootMargin: "0px 0px -50px 0px",
	threshold: 0.1,
}

const callback = (entries, observer) => {
	entries.forEach(entry => {
		const currentElement = entry.target
		if (entry.isIntersecting) {
			currentElement.classList.add('--animate')
		} else {
			currentElement.classList.remove('--animate')
		}
	})
}

const observer = new IntersectionObserver(callback, options)

// Ищем секции с классом .anim (а не [class*="--anim"])
const animElements = document.querySelectorAll('.anim')
animElements.forEach(animElement => {
	observer.observe(animElement)
})