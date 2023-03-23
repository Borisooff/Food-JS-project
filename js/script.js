'use strict';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {
    calc();
    cards();
    forms();
    modal('[data-modal]', '.modal');
    slider({
        sliderContainer: '.offer__slider',
        slide: '.offer__slide',
        prevBtn: '.offer__slider-prev',
        nextBtn: '.offer__slider-next',
        line: '.slider__line',
        wrapper: '.offer__slider-wrapper',
        currentCounter: '#current',
        totalCounter: '#total',
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2023-05-20');
})