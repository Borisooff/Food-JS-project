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