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