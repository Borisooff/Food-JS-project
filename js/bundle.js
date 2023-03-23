/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

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

                module.exports = calc;

                /***/
}),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

                function cards() {
                    const menu = document.querySelector('.menu__field .container');

                    //функция запроса данных с json сервера возвращает объект в нормальном виде или ошибку по статусу
                    const getData = async (url) => {
                        const res = await fetch(url);
                        if (!res.ok) {
                            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
                        }
                        return await res.json();
                    }

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
                    getData('http://localhost:3000/menu')
                        .then(data => {
                            data.forEach(({ img, altimg, title, descr, price }) => {
                                new MenuItem(img, altimg, title, descr, price, 'menu__item').showMenuItem(menu);
                            })
                        })
                }

                module.exports = cards;

                /***/
}),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

                function forms() {
                    const forms = document.querySelectorAll('form'),
                        message = {
                            success: 'Спасибо! Скоро мы с вами свяжемся',
                            loading: 'img/form/005 spinner.svg',
                            error: 'Произошла ошибка. Попробуйте позже',
                        };

                    // функция отпраки данных на json сервер 
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

                            postData('http://localhost:3000/requests', json)
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
                        openModal();

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
                            closeModal();
                        }, 2000)
                    }
                }

                module.exports = forms;

                /***/
}),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

                function modal() {
                    const modalBtn = document.querySelectorAll('[data-modal]'),
                        modal = document.querySelector('.modal');

                    // открытие окна на классах + отмена скролла для страницы за окном
                    function openModal() {
                        modal.classList.remove('hide');
                        modal.classList.add('show');
                        document.body.style.overflow = 'hidden';
                    }

                    // открытие модального окна через 15 сек после захода на сайт
                    const modalTimer = setTimeout(openModal, 50000);

                    // открытие модального окна при наадатии на кнопку связаться с нами. Если пользователь самостоятельно открывает окно, снимаем открытие через 15 сек
                    modalBtn.forEach((btn) => {
                        btn.addEventListener('click', () => {
                            openModal();
                            clearInterval(modalTimer);
                        })
                    })

                    // закрытие окна
                    function closeModal() {
                        modal.classList.remove('show');
                        modal.classList.add('hide');
                        document.body.style.overflow = '';
                    }

                    // закрытие по нажатию по пустому пространству или элименту с атрибутом 
                    modal.addEventListener('click', (e) => {
                        if (e.target === modal || e.target.getAttribute('data-close') === '') {
                            closeModal();
                        }
                    })

                    // закрытие по Escape
                    document.addEventListener('keydown', (e) => {
                        if (e.code === 'Escape' && modal.classList.contains('show')) {
                            closeModal();
                        }
                    })

                    // закрытие по достижению конца страницы
                    function showModalbyScroll() {
                        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
                            openModal();
                            window.removeEventListener('scroll', showModalbyScroll)
                        }
                    }

                    window.addEventListener('scroll', showModalbyScroll)
                }

                module.exports = modal;

                /***/
}),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

                function slider() {
                    const slider = document.querySelector('.offer__slider'),
                        sliderWrapper = slider.querySelector('.offer__slider-wrapper'),
                        slides = sliderWrapper.querySelectorAll('.offer__slide'),
                        sliderPrevBtn = slider.querySelector('.offer__slider-prev'),
                        sliderNextBtn = slider.querySelector('.offer__slider-next'),
                        curentSlide = slider.querySelector('#current'),
                        totalSlides = slider.querySelector('#total'),
                        slidrLine = sliderWrapper.querySelector('.slider__line'),
                        sliderDotsWrapper = document.createElement('ol'),
                        dotsArray = [],
                        wrapperWidth = window.getComputedStyle(sliderWrapper).width;
                    let slideIndex = 1,
                        offset = 0;

                    // показывает общее колличество слайдов и номер текущего слайда функция getZero добавляет 0 перед цифрой если она меньше 10
                    totalSlides.innerHTML = getZero(slides.length);
                    curentSlide.innerHTML = getZero(slideIndex);

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
                        curentSlide.textContent = getZero(slideIndex);
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
                        curentSlide.textContent = getZero(slideIndex);
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
                            curentSlide.textContent = getZero(slideIndex);
                            changeDot(slideIndex - 1);

                        })
                    })
                }

                module.exports = slider;

                /***/
}),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

                function tabs() {
                    const tabs = document.querySelectorAll('.tabheader__item'),
                        tabContent = document.querySelectorAll('.tabcontent'),
                        tabWrapper = document.querySelector('.tabheader__items');

                    //на весь контент весит класс hide. со всех табов снимает класс активности 
                    function hideTabs() {
                        tabs.forEach((element) => {
                            element.classList.remove('tabheader__item_active');
                        })
                        tabContent.forEach((element) => {
                            element.classList.remove('show', 'fade');
                            element.classList.add('hide');
                        })
                    }


                    // удаляет с нужного объекта класс hide и добавляет show и fade для анимации
                    function showTab(i = 0) {
                        tabs[i].classList.add('tabheader__item_active');
                        tabContent[i].classList.remove('hide');
                        tabContent[i].classList.add('show', 'fade');
                    }

                    hideTabs();
                    showTab();

                    // делигирует событие на нажатый элемент если он имеет нужный класс. по нажатию весь конткнт прячется, а нужный появляется
                    tabWrapper.addEventListener('click', event => {
                        const target = event.target;
                        if (target && target.classList.contains('tabheader__item')) {
                            tabs.forEach((element, index) => {
                                if (element == target) {
                                    hideTabs();
                                    showTab(index);
                                }
                            })
                        }
                    })
                }

                module.exports = tabs;

                /***/
}),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

                function timer() {
                    const deadLine = '2023-05-20';

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

                    //  добавляет 0 когда число меньше 10 
                    function getZero(num) {
                        if (num >= 0 && num < 10) {
                            return `0${num}`;
                        } else {
                            return num;
                        }
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

                    setTimer('.timer', deadLine)
                }

                module.exports = timer;

                /***/
})

        /******/
});
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
            /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
            /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
        /******/
}
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be in strict mode.
    (() => {
        "use strict";
        /*!**********************!*\
          !*** ./js/script.js ***!
          \**********************/

        window.addEventListener('DOMContentLoaded', () => {
            const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
                cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
                forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
                modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
                slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
                tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
                timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

            calc();
            cards();
            forms();
            modal();
            slider();
            tabs();
            timer();
        })
    })();

    /******/
})()
    ;
//# sourceMappingURL=bundle.js.map