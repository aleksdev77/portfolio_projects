import { postData } from "../services/requests";

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('[data-input]'),
        upload = document.querySelectorAll('[name="upload"]');


    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо, в ближайшее время с вами свяжутся',
        error: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png',
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php',
    };

    const clearInputs = () => {  // Очистка инпутов
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };

    upload.forEach(item => { // Загрузка файлов 
        item.addEventListener('input', () => {
            // console.log(item.files[0]); // [0] - обращение к первому файлу, который был загружен в инпут
            let dots;
            let itemFiles = item.files[0].name.split('.'); // Разделение файла на до точки и после точки
            itemFiles[0].length > 5 ? dots = "..." : dots = ".";
            const name = itemFiles[0].substring(0, 6) + dots + itemFiles[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => { // Форма отправки данных
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 600);

            let statusImg = document.createElement('img');  // Изображение при отправки формы
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);
            let api;
            if (item.closest('.popup-design') || item.classList.contains('calc_form')) {
                api = path.designer;
            } else {
                api = path.question;
            }
            console.log(api);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.error;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                        document.body.style.overflow = '';
                    }, 3000);
                });
        });
    });
};

export default forms;
