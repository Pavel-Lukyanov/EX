


    //Открытие и закрытие меню юзера по клику
    let userBtn = document.querySelector('#userBtn');
    let userDropdown = document.querySelector('#userDropdown');

    if (userBtn) {
        userBtn.addEventListener('click', function () {
            userBtn.childNodes[1].classList.toggle('active');
            userDropdown.classList.toggle('active');
        })

        //Закрытие меню юзера по клику вне него
        document.addEventListener('click', (e) => {
            const withinBoundaries = e.composedPath().includes(userBtn);
            if (!withinBoundaries) {
                userBtn.childNodes[1].classList.remove('active');
                userDropdown.classList.remove('active');
            }
        })
    }

    //Задвигание меню слева
    let asideMenuBtn = document.querySelector('#asideMenuBtn');
    let asideMenuTexts = document.querySelectorAll('.aside__menu__link__text');
    let asideMenu = document.querySelector('.aside__menu');
    let mainContainer = document.querySelector('#mainContainer');


    if (asideMenuBtn) {
        asideMenuBtn.addEventListener('click', function () {
            asideMenu.classList.toggle('aside__menu-active');
            mainContainer.classList.toggle('left__menu-active');

            for (let asideMenuText of asideMenuTexts) {
                asideMenuText.classList.toggle('aside__menu__link__text-active');
            }
            //Если нет куки, то записываем ее, иначе удаляем
            if (!document.cookie.includes('name=left_menu')) {
                document.cookie = "name=left_menu; max-age=1296000";  //max-age время жизни cookie в секундах 1296000
            } else {
                document.cookie = "name=left_menu; max-age=-1";
            }
        })
    }

    // Если есть кука, то скрываем меню иначе показываем
    if (document.cookie.includes('name=left_menu')) {
        for (let asideMenuText of asideMenuTexts) {
            asideMenuText.classList.add('aside__menu__link__text-active');
            asideMenu.classList.add('aside__menu-active');
        }
        mainContainer.classList.add('left__menu-active');
    } else {
        for (let asideMenuText of asideMenuTexts) {
            asideMenuText.classList.remove('aside__menu__link__text-active');
            asideMenu.classList.remove('aside__menu-active');
            mainContainer.classList.remove('left__menu-active');
        }
    }

    //Бургер меню
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('menuContainer');

    btn.addEventListener('click', showMenu);

    function showMenu() {
        menu.classList.toggle('menu-show');
        this.classList.toggle('opened');
    }

    let navTopMenu = document.querySelector('#navTopMenu');
    let dropDownMenu = document.querySelector('#menuContainer');

    dropDownMenu.innerHTML = navTopMenu.innerHTML;

    if (userDropdown) {
        dropDownMenu.innerHTML = dropDownMenu.innerHTML + `<div class="dropdrown__menu__separator"></div>` + userDropdown.innerHTML;
    }

    // Popups
    class Popup {
        constructor(popupElement) {
            this._popupElement = popupElement;
            this._closeButton = this._popupElement.querySelector('.popup__close');
            this._img = this._popupElement.id === "photo" ? this._popupElement.querySelector('.popup__img') : null;
            this._handleEscClose = this._handleEscClose.bind(this)
            this._openingLinks = document.querySelectorAll(`[data-pointer="${this._popupElement.id}"]`)
            this.setEventListeners()
        }

        open(el) {
            if (this._img) this._img.src = el.src
            document.body.style.overflow = "hidden";
            this._popupElement.classList.add('popup_opened')
            document.addEventListener('keydown', this._handleEscClose);
        }

        close() {
            if (this._img) this._img.src = ""
            this._popupElement.classList.remove('popup_opened');
            document.body.style.overflow = "visible";
            document.removeEventListener('keydown', this._handleEscClose);
        }

        _handleEscClose(evt) {
            if (evt.keyCode === 27) {
                this.close();
            }
        }

        _handleOverlayClick(evt) {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        }

        setEventListeners() {
            this._openingLinks.forEach(link => link.addEventListener('click', (e) => { e.preventDefault(); this.open(e.target) }))
            this._closeButton.addEventListener('click', () => this.close());
            this._popupElement.addEventListener('click', this._handleOverlayClick.bind(this));
        }
    }

    const popups = document.querySelectorAll('.popup')
    let popupsObj = {}
    if (popups.length > 0) popups.forEach(item => { popupsObj[item.id] = new Popup(item) })

    //Маска телефона
    let inputTel = document.querySelectorAll("input[type='tel']");
    if (inputTel.length > 0) {
        var im = new Inputmask("+7 (999)-999-99-99");
        for (let tel of inputTel) {
            im.mask(tel);
        }
    }
