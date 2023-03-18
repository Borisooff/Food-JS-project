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

    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
    }

    const modalTimer = setTimeout(openModal, 15000);

    modalBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            openModal();
            clearInterval(modalTimer);
        })
    })

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal)

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    })

    function showModalbyScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalbyScroll)
        }
    }

    window.addEventListener('scroll', showModalbyScroll)

    














})