document.addEventListener('DOMContentLoaded', function () {

    //Открытие и закрытие меню юзера по клику
    let userBtn = document.querySelector('#userBtn');
    let userDropdown = document.querySelector('#userDropdown');

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

    //Задвигание меню слева
    let asideMenuBtn = document.querySelector('#asideMenuBtn');
    let asideMenuTexts = document.querySelectorAll('.aside__menu__link__text');
    let asideMenu = document.querySelector('.aside__menu');

    asideMenuBtn.addEventListener('click', function () {
        asideMenu.classList.toggle('aside__menu-active');

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

    // Если есть кука, то скрываем меню иначе показываем
    if (document.cookie.includes('name=left_menu')) {
        for (let asideMenuText of asideMenuTexts) {
            asideMenuText.classList.add('aside__menu__link__text-active');
            asideMenu.classList.add('aside__menu-active');
        }
    } else {
        for (let asideMenuText of asideMenuTexts) {
            asideMenuText.classList.remove('aside__menu__link__text-active');
            asideMenu.classList.remove('aside__menu-active');
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
    dropDownMenu.innerHTML = dropDownMenu.innerHTML + `<div class="dropdrown__menu__separator"></div>` + userDropdown.innerHTML;

    

})