'use strict';
window.addEventListener('DOMContentLoaded', () => {
    // tabs

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
    // timer 

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

    // modal 

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

    // menu
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


    // forms
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

    // slider
    const slides = document.querySelectorAll('.offer__slide'),
        sliderPrevBtn = document.querySelector('.offer__slider-prev'),
        sliderNextBtn = document.querySelector('.offer__slider-next'),
        curentSlide = document.querySelector('#current'),
        totalSlides = document.querySelector('#total');
    let slideIndex = 0;

    showSlide(slideIndex);

    function showSlide(i) {
        totalSlides.innerHTML = getZero(slides.length);
        curentSlide.textContent = getZero(i + 1);
        slides.forEach((slide) => {
            slide.classList.remove('show');
            slide.classList.add('hide');
        })
        slides[i].classList.add('fade');
        slides[i].classList.add('show');
    }

    sliderPrevBtn.addEventListener('click', () => {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        showSlide(slideIndex);
    });

    sliderNextBtn.addEventListener('click', () => {
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        showSlide(slideIndex);
    });






})