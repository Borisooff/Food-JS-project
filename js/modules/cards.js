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