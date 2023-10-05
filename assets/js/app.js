
// Блок кода для выпадающих списков в хэдере

const tabItems = document.querySelectorAll(".header__nav-item--tab");

if (tabItems) {
    tabItems.forEach(item => {
        const tabDropdown = item.querySelector(".header__nav-item__tab-wrapper");
        const tabMainLink = item.querySelector(".header__nav-link");
        item.addEventListener("click", function(e) {
            e.preventDefault();
            if (tabDropdown) {
                tabDropdown.classList.toggle("header__nav-item__tab-wrapper--visible");
                tabMainLink.classList.toggle("header__nav-link--active");
                item.classList.toggle("header__nav-item--tab--top");
            }
            
        });
        
        item.addEventListener('mouseleave', function() {
            if (tabDropdown) {
                tabDropdown.classList.add('header__nav-item__tab-wrapper--fadeOut');
                tabMainLink.classList.remove("header__nav-link--active");
                item.classList.remove("header__nav-item--tab--top");
                
                setTimeout(function() {
                    tabDropdown.classList.remove('header__nav-item__tab-wrapper--fadeOut');
                    tabDropdown.classList.remove('header__nav-item__tab-wrapper--visible');
                }, 300); 
            }
        });
    });
}

// Блок кода для адаптива с бургер меню

// Общие переменные
const header = document.querySelector('.header');
const headerNav = header.querySelector('.header__nav');
const headerMenu = header.querySelector('.header__menu');
const headerNavWrapper = header.querySelector('.header__nav-wrapper');


function moveHeaderNavToMenu() {
    if(headerNavWrapper && headerMenu && headerNav) {
        if (window.innerWidth < 1000) {
            if (!headerMenu.contains(headerNav)) {
              headerMenu.appendChild(headerNav);
            }
        } else {
            if (headerMenu.contains(headerNav)) {
              headerMenu.removeChild(headerNav);
              headerNavWrapper.appendChild(headerNav);
            }
        }
    }
}

moveHeaderNavToMenu();
window.addEventListener('resize', moveHeaderNavToMenu);


// Блок кода для бургер меню
const burger = header.querySelector('.burger');

if(burger) {
    burger.addEventListener('click', function(e) {
        e.preventDefault();
    
        burger.classList.toggle('burger--active');
        if(headerMenu) {
            headerMenu.classList.toggle('header__menu--visible');
        }
        if(document.body.classList.contains('body--fixed')) {
            document.body.classList.remove('body--fixed');
        } else {
            document.body.classList.add('body--fixed');
        }
    })
}


// Слушатель событий на всей странице
window.addEventListener('click', (item) => {
    if(!item.target.closest('div.burger') && !item.target.closest('div.header__menu')) {
        if(burger) {
            burger.classList.remove('burger--active');
        }
        if(headerMenu) {
            headerMenu.classList.remove('header__menu--visible');
        }
        document.body.classList.remove('body--fixed');
    }
});

