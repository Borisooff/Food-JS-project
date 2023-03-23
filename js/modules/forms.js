import { closeModal, openModal } from "./modal";
import { postData } from "../services/postData";

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
        openModal('.modal');

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
            closeModal('.modal');
        }, 2000)
    }
}

export default forms;