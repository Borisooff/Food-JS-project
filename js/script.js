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

    const deadLine = '2023-03-19';

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
        modal = document.querySelector('.modal'),
        closeBtn = modal.querySelector('[data-close]');

    // открытие окна на классах + отмена скролла для страницы за окном
    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
    }

    // открытие модального окна через 15 сек после захода на сайт
    const modalTimer = setTimeout(openModal, 15000);

    // открытие модального окна при наадатии на кнопку связаться с нами. Если пользователь самостоятельно открывает окно, снимаем открытие через 15 сек
    modalBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            openModal();
            clearInterval(modalTimer);
        })
    })

    // закрытие окна
    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    // закрытие по нажатию кнопки закрыть 
    closeBtn.addEventListener('click', closeModal)

    // закрытие по нажатию по пустому пространству
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
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

    // класс для карточек с меню
    class MenuItem {
        constructor(img, alt, title, text, price) {
            this.img = img;
            this.alt = alt; 
            this.title = title; 
            this.text = text; 
            this.price = price; 
        }

        showMenuItem(selector) {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu__item');
            menuItem.innerHTML =
            `<img src=${this.img} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.text}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>`;
            selector.prepend(menuItem);
        }
    }

    // карточки 
    const fitnesMenu = new MenuItem(
        'img/tabs/vegy.jpg', 
        'vegy', 'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        '229');
    const premiumMenu = new MenuItem(
        'img/tabs/elite.jpg', 
        'elite', 'Меню “Премиум”', 
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
        '550');
    const postMenu = new MenuItem(
        'img/tabs/post.jpg', 
        'post', 'Меню "Постное"', 
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
        '430');
    
    // показ карточек на сайт
    fitnesMenu.showMenuItem(menu);
    premiumMenu.showMenuItem(menu);
    postMenu.showMenuItem(menu);












})