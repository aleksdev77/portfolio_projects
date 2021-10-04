import { getResource } from '../services/requests';

// Динамическое формирование элемента при помощи базы данных db.json 

const showMoreStyles = (trigger) => {
    const btn = document.querySelector(trigger),
        style = document.querySelector('.styles .row');

    btn.addEventListener('click', () => {
        getResource('assets/db.json')
            .then(res => createCards(res.styles))
            .catch(error => console.log(error))
            .finally(btn.remove());
    });

    function createCards(response) { // Ответ от сервера
        response.forEach(item => { // Ответ содержит в себе массив данных
            let card = document.createElement('div');
            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
            card.innerHTML = `
            <div class=styles-block>
    	        <img src="${item.src}" alt="styles">
    		    <h4>${item.title}</h4>
    		    <a href="${item.link}">Подробнее</a>
    	    </div>
            `;
            style.appendChild(card);
        });
    }
};

export default showMoreStyles;