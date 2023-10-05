const popupBtns = document.querySelectorAll('.popup-btn');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 300;

// Вызываем функцию открытия попапа
if(popupBtns.length) {
    for(let i = 0; i<popupBtns.length; i++) {
        const popupBtn = popupBtns[i];
        popupBtn.addEventListener('click', function(e) {
            const currentPopup = document.getElementById(this.dataset.forPopupTarget);
            popupOpen(currentPopup);
            e.preventDefault();
        })
    }
}

// Вызываем функцию закрытия попапа
const popupCloseItems = document.querySelectorAll('.close-popup');
if(popupCloseItems.length) {
    for(let i = 0; i<popupCloseItems.length; i++) {
        const popupCloseItem = popupCloseItems[i];
        popupCloseItem.addEventListener('click', function(e) {
            popupClose(popupCloseItem.closest('.popup'));
            e.preventDefault();
        })
    }
}
// Функция закрытия попапа
function popupClose(popupActive, doUnlock = true) {
    if(unlock) {
        popupActive.classList.remove('visible');
        if(doUnlock) {
            bodyUnlock();
        }
    }
}

// Функция открытия попапа
function popupOpen(currentPopup) {
    if(currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.visible');
        if(popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }

        currentPopup.classList.add('visible');
        currentPopup.addEventListener('click', function(e) {
            if(!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        })
    }
}

// Фиксируем Body и убираем сдвиг от скрола
function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if(lockPadding.length > 0) {
        for(let i = 0; i<lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }

        body.style.paddingRight = lockPaddingValue;
        body.classList.add('fixed');

        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, timeout)
    }
}

// Убираем фикс Body и возвращаем сдвиг от скрола
function bodyUnlock() {
    setTimeout(function() {
        if(lockPadding.length > 0) {
            for(let i = 0; i<lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }

        body.style.paddingRight = '0px';
        body.classList.remove('fixed');
    }, timeout - 100)
    
    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout)
}

// Функция закрытия попапа на кнопку Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const popupActive = document.querySelector('.popup.visible');
        popupClose(popupActive);
    }
});

// Полифилы
(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if(node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        }
    }
})();

(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
        // Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
})();