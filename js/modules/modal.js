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

export default modal;
export { openModal };
export { closeModal };