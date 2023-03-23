/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const result = document.querySelector('.calculating__result span');
    let gender = 'female',
        height,
        weight,
        age,
        activity = 1.375;

    if (localStorage.getItem('gender')) {
        gender = localStorage.getItem('gender');
    } else {
        gender = 'female';
        localStorage.setItem('gender', 'femail');
    }
    if (localStorage.getItem('activity')) {
        activity = localStorage.getItem('activity');
    } else {
        activity = 1.375;
        localStorage.setItem('activity', 1.375);
    }

    function initLocalSttings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.remove(activeClass);
            if (element.getAttribute('id') === localStorage.getItem('gender')) {
                element.classList.add(activeClass);
            }
            if (element.getAttribute('data-act') === localStorage.getItem('activity')) {
                element.classList.add(activeClass);
            }
        })
    }

    initLocalSttings('#gender div', 'calculating__choose-item_active');
    initLocalSttings('.calculating__choose_big div', 'calculating__choose-item_active');

    // функция подсчета каллорий по формуле и вывода на экран. для мужчины и женщины разные формулы. С проврекой на заполненые данные
    function calcTotal() {
        if (!gender || !height || !weight || !age || !activity) {
            result.textContent = '...';
            return;
        }
        if (gender === 'female') {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
        } else {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
        }
    }
    calcTotal();

    //  функция приема статических данных( пол и активность)
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element) => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-act')) {
                    activity = +e.target.getAttribute('data-act');
                    localStorage.setItem('activity', +e.target.getAttribute('data-act'))
                } else {
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', e.target.getAttribute('id'))
                }
                elements.forEach((element) => {
                    element.classList.remove(activeClass);
                })

                e.target.classList.add(activeClass);
                calcTotal();
            })
        });
    }

    // функция приема динамических данных(вес, возраст, рост)
    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break
                case 'weight':
                    weight = +input.value;
                    break
                case 'age':
                    age = +input.value;
                    break
            }
            calcTotal();
        });

    }

    // вызовы функций для каждого блока калькулятора
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_getData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/getData */ "./js/services/getData.js");


function cards() {
    const menu = document.querySelector('.menu__field .container');

    // класс для карточек с меню
    class MenuItem {
        constructor(img, alt, title, text, price, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.classes = classes;
        }
        showMenuItem(selector) {
            const menuItem = document.createElement('div');
            if (this.classes.length === 0) {
                menuItem.classList.add('menu__item');
            } else {
                this.classes.forEach(className => menuItem.classList.add(className));
            }
            menuItem.innerHTML =
                `<img src=${this.img} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.text}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> $/день</div>
            </div>`;
            selector.prepend(menuItem);
        }
    }

    //получение карточек с сервера и добавление их на страницу 
    (0,_services_getData__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuItem(img, altimg, title, descr, price, 'menu__item').showMenuItem(menu);
            })
        })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_postData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/postData */ "./js/services/postData.js");



function forms() {
    const forms = document.querySelectorAll('form'),
        message = {
            success: 'Спасибо! Скоро мы с вами свяжемся',
            loading: 'img/form/005 spinner.svg',
            error: 'Произошла ошибка. Попробуйте позже',
        };

    // отправка форм на сервер. формы получаются через FormFata
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form),
                json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_postData__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.error);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    forms.forEach(form => {
        bindPostData(form);
    })

    //показ модального окна после заполнения формы
    function showThanksModal(message) {
        const prevModalDilog = document.querySelector('.modal__dialog');
        prevModalDilog.classList.remove('show');
        prevModalDilog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__title">${message}</div>
            <div data-close class="modal__close">×</div>
        </div>`
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDilog.classList.add('show');
            prevModalDilog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 2000)
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
// открытие окна на классах + отмена скролла для страницы за окном
function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// закрытие окна
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector) {
    const modalBtn = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    // открытие модального окна через 15 сек после захода на сайт
    const modalTimer = setTimeout(() => openModal(modalSelector), 5000);

    // открытие модального окна при наадатии на кнопку связаться с нами. Если пользователь самостоятельно открывает окно, снимаем открытие через 15 сек
    modalBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            openModal(modalSelector);
            clearInterval(modalTimer);
        })
    })

    // закрытие по нажатию по пустому пространству или элименту с атрибутом 
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal(modalSelector);
        }
    })

    // закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    })

    // закрытие по достижению конца страницы
    function showModalbyScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSelector);
            window.removeEventListener('scroll', showModalbyScroll)
        }
    }

    window.addEventListener('scroll', showModalbyScroll)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");


function slider({ sliderContainer, slide, prevBtn, nextBtn, wrapper, line, totalCounter, currentCounter }) {
    const slider = document.querySelector(sliderContainer),
        sliderWrapper = slider.querySelector(wrapper),
        slides = sliderWrapper.querySelectorAll(slide),
        sliderPrevBtn = slider.querySelector(prevBtn),
        sliderNextBtn = slider.querySelector(nextBtn),
        curentSlide = slider.querySelector(currentCounter),
        totalSlides = slider.querySelector(totalCounter),
        slidrLine = sliderWrapper.querySelector(line),
        sliderDotsWrapper = document.createElement('ol'),
        dotsArray = [],
        wrapperWidth = window.getComputedStyle(sliderWrapper).width;
    let slideIndex = 1,
        offset = 0;

    // показывает общее колличество слайдов и номер текущего слайда функция getZero добавляет 0 перед цифрой если она меньше 10
    totalSlides.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slides.length);
    curentSlide.innerHTML = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);

    // sliderLine равен длине всех слайдов в процентах. каждый слайд равен ширине окна показа
    slidrLine.style.width = 100 * slides.length + '%';
    slides.forEach((slide) => {
        slide.style.width = wrapperWidth;
    })

    // размещение обертки точек на слайдере и добавление класса
    slider.style.position = 'relative';
    sliderDotsWrapper.classList.add('carousel-indicators');
    slider.append(sliderDotsWrapper);

    // создание точек, размещение точек в обертке, добавление точкам класса и атрибута для переключения, добавления точек в массив
    for (let i = 0; i < slides.length; i++) {
        const sliderDot = document.createElement('li');
        sliderDot.setAttribute('data-slide-to', i + 1);
        sliderDot.classList.add('dot');

        sliderDotsWrapper.append(sliderDot);
        dotsArray.push(sliderDot);
        if (i == 0) {
            changeDot(i);
        }
    }

    // смена цвета у точки (активность точки)
    function changeDot(i) {
        dotsArray.forEach(dot => {
            dot.style.cssText = `
            background-color: #fff;
            opacity: 0.5;
            `;
            dotsArray[i].style.cssText = `
            background-color: #585757;
            opacity: 1;
            `;
        })
    }

    // удаление из строки букв и приведение к числу
    function strToInt(str) {
        return +str.replace(/\D/g, '');
    }

    // переключение слайдов вперед (slider line двигается влево на ширину слайда)
    sliderNextBtn.addEventListener('click', () => {
        if (offset == strToInt(wrapperWidth) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset += strToInt(wrapperWidth)//+wrapperWidth.replace(/\D/g, '');
            slideIndex++
        }
        curentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);
        slidrLine.style.transform = `translateX(-${offset}px)`;

        changeDot(slideIndex - 1);
    })

    // переключение слайда назад (двигается вправо)
    sliderPrevBtn.addEventListener('click', () => {
        if (offset == 0) {
            offset = strToInt(wrapperWidth) * (slides.length - 1);
            slideIndex = slides.length;
        } else {
            offset -= strToInt(wrapperWidth)//+wrapperWidth.replace(/\D/g, '');
            slideIndex--;
        }
        curentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);
        slidrLine.style.transform = `translateX(-${offset}px)`;

        changeDot(slideIndex - 1);
    })

    // переключение слайдов по нажитю на точки
    dotsArray.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = strToInt(wrapperWidth) * (slideTo - 1);
            slidrLine.style.transform = `translateX(-${offset}px)`;
            curentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.getZero)(slideIndex);
            changeDot(slideIndex - 1);

        })
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabContentSelector, tabParantSelector, tabActiveClass) {
    const tabs = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabContentSelector),
        tabWrapper = document.querySelector(tabParantSelector);

    //на весь контент весит класс hide. со всех табов снимает класс активности 
    function hideTabs() {
        tabs.forEach((element) => {
            element.classList.remove(tabActiveClass);
        })
        tabContent.forEach((element) => {
            element.classList.remove('show', 'fade');
            element.classList.add('hide');
        })
    }


    // удаляет с нужного объекта класс hide и добавляет show и fade для анимации
    function showTab(i = 0) {
        tabs[i].classList.add(tabActiveClass);
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');
    }

    hideTabs();
    showTab();

    // делигирует событие на нажатый элемент если он имеет нужный класс. по нажатию весь конткнт прячется, а нужный появляется
    tabWrapper.addEventListener('click', event => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.clice(1))) {
            tabs.forEach((element, index) => {
                if (element == target) {
                    hideTabs();
                    showTab(index);
                }
            })
        }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getZero": () => (/* binding */ getZero)
/* harmony export */ });
//  добавляет 0 когда число меньше 10 
function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function timer(timerId, deadLine) {

    //расчет оставшегося времени до нужной даты в дняхб часах, минутах и секундах 
    function timeRemaining(endtime) {
        const t = Date.parse(endtime) - new Date();
        let days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    // получет объекты по id внутри нжного селектора. добавляет в эти теги данные из функции оставшегося вресени. обновляет данные каждую секунду 
    function setTimer(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateTimer, 1000);
        updateTimer();

        function updateTimer() {
            const t = timeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setTimer(timerId, deadLine)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/getData.js":
/*!********************************!*\
  !*** ./js/services/getData.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData)
/* harmony export */ });
const getData = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    return await res.json();
}



/***/ }),

/***/ "./js/services/postData.js":
/*!*********************************!*\
  !*** ./js/services/postData.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data,
    });
    return await res.json();
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        sliderContainer: '.offer__slider',
        slide: '.offer__slide',
        prevBtn: '.offer__slider-prev',
        nextBtn: '.offer__slider-next',
        line: '.slider__line',
        wrapper: '.offer__slider-wrapper',
        currentCounter: '#current',
        totalCounter: '#total',
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2023-05-20');
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map