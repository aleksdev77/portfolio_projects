import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        modal = document.querySelector('.popup_calc_end');

    checkNumInputs('input[name=user_phone]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами с вами свяжемся',
        error: 'Что-то пошло не так',
    };

    // Функция отвечает за отправку запроса на сервер

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let result = await fetch(url, {   // Скрипту необходимо дождаться окончания запроса
            method: "POST",
            body: data,
        });

        return await result.text();
    };

    const clearInputs = () => {  // Очистка инпутов
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage); // Помещаем оповещение в самый конец формы (item)

            const formData = new FormData(item); // Собираем все данные из формы в конструктор FormData
            if (item.getAttribute('data-calc') == "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData) // Отправка запроса на сервер уже с данными
                .then(result => {
                    console.log(result);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.error)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        setTimeout(() => {
                            modal.style.display = 'none';
                            document.body.style.overflow = '';
                            for (let key in state) {
                                delete state[key];
                            }
                        }, 500);
                    }, 2000);
                });
        });
    });
};

export default forms;