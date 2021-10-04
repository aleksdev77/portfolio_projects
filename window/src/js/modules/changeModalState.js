import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => { // (state) Сбор данных в модальных окнах
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'), // ширина
        windowHeight = document.querySelectorAll('#height'), // высота
        windowType = document.querySelectorAll('#view_type'), // тип окна
        windowProfile = document.querySelectorAll('.checkbox'); // тип окна

    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }
                if (Object.keys(state).length === 3) {
                    document.querySelector('.popup_calc_button').removeAttribute('disabled'); // Если в массиве 3 ключа (state) - тоесть 3 заполенных поля, тогда disabled удаляем.
                }
                if (Object.keys(state).length === 5) {
                    document.querySelector('.popup_calc_proffile_button').removeAttribute('disabled'); // Если в массиве 5 ключей (state), тогда disabled удаляем.
                }

                console.log(state);
            });
        });
    }

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;