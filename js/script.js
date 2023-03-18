'use strict';
window.addEventListener('DOMContentLoaded', () => {
    // tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent'),
        tabWrapper = document.querySelector('.tabheader__items');

    function hideTabs() {
        tabs.forEach((element) => {
            element.classList.remove('tabheader__item_active');
        })
        tabContent.forEach((element) => {
            element.classList.remove('show', 'fade');
            element.classList.add('hide');
        })
    }

    function showTab(i = 0) {
        tabs[i].classList.add('tabheader__item_active');
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');
    }

    hideTabs();
    showTab();

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

    function timeRemaining(endtime) {
        const t = Date.parse(endtime) - new Date();
        let days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
            if(t <= 0) {
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

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

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












})