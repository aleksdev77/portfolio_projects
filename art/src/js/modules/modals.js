const modals = () => {
    let btnPressed = false;

    function bindModal(triggerSelector, modalSelector, closeSelector, flag = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            gift = document.querySelector('.fixed-gift'),
            scroll = calcScroll();

        deleteGift();

        trigger.forEach((item) => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (flag != false) {
                    e.target.remove();
                    localStorage.setItem('gift', item);
                }

                windows.forEach(item => {   // Закрытие всех модалок что бы избежать наслоения
                    item.style.display = 'none';
                    item.classList.remove('fadeOut');
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = 'block';
                document.querySelector('.pageup').style.display = 'none';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;

            });
        });

        function deleteGift() {
            if (localStorage.getItem('gift')) {
                gift.style.display = "none";
            }
        }

        close.addEventListener('click', () => {
            closeModals();
            setTimeout(() => { // Появление скролла через 0.6 секунды
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            }, 600);
        });

        function closeModals() { // Закрытие модального окна
            modal.classList.remove('fadeIn');
            modal.classList.add('fadeOut');
            document.querySelector('.pageup').style.display = 'block';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 600);
        }

        modal.addEventListener('click', (event) => {

            if (event.target === modal) {
                closeModals();
                setTimeout(() => { // Появление скролла через 0.6 секунды
                    document.body.style.overflow = '';
                    document.body.style.marginRight = `0px`;
                }, 600);
            }
        });

    }

    // Через некоторое время прибывания на странице открывается модальное окно

    function showModalByTime(selector, time) {

        setTimeout(function () {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });

            // Если ни одно модально окно не показанно, значит показываем модальное окно, которое нужно

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }

        }, time);
    }

    // Функция расчета ширины скролла (пмогает избавиться от смещения экрана при открытии и закрытии модалки)

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        if (localStorage.getItem('gift')) {
            window.addEventListener('scroll', () => {
                if (btnPressed == false && (window.pageYOffset + document.documentElement.clientHeight >=
                    document.documentElement.scrollHeight)) {
                    document.querySelector(selector); // Вызов события вручную, фактически ненажимая кнопку
                }
            });
        } else {
            window.addEventListener('scroll', () => {
                if (btnPressed == false && (window.pageYOffset + document.documentElement.clientHeight >=
                    document.documentElement.scrollHeight)) {
                    document.querySelector(selector).click(); // Вызов события вручную, фактически ненажимая кнопку
                }
            });
        }
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');

    // showModalByTime('.popup-consultation', 5000);
};


export default modals;

