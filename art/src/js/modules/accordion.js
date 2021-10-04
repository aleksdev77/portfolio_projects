const accordion = () => {
    const accordion = document.querySelector('#accordion'),
        accordionBlocks = document.querySelectorAll('.accordion-block'),
        accordionSpan = document.querySelectorAll('.accordion-heading span');

    // Скрытие всех блоков    

    function hideBlocks() {
        accordionBlocks.forEach(item => {
            item.style.maxHeight = item.scrollHeight + 80 + "px";
            item.style.transition = 'all 0.8s ease-out';
            item.classList.remove('active');
        });
        accordionSpan.forEach(span => {
            span.style.transition = 'all 0.5s ease-out';
            span.classList.remove('active-style');
            span.style.fontSize = '2.2rem';
            span.style.color = 'black';
        });
    }

    // Работа аккордиона через делегирование событий

    accordion.addEventListener('click', (e) => {
        let target = e.target;
        let parentNode = target.parentNode; // Получаю тег p - родителя тега span
        let nextNode = parentNode.nextElementSibling; // Получаю div

        if (target.tagName === "SPAN" && !target.classList.contains('active-style')) {
            hideBlocks();
            target.style.fontSize = '2.5rem';
            target.style.color = '#E950D7';
            nextNode.classList.remove('animated', 'fadeOutDown');
            nextNode.classList.add('animated', 'fadeInUp');
            nextNode.classList.add('active');
            nextNode.style.maxHeight = nextNode.scrollHeight + 80 + "px";
            target.classList.add('active-style');
        } else if (target.tagName === "SPAN" && target.classList.contains('active-style')) {
            nextNode.classList.remove('animated', 'fadeInUp');
            nextNode.classList.add('animated', 'fadeOutDown');
            // nextNode.style.maxHeight = '0px';
            setTimeout(() => {
                hideBlocks();
            }, 500);
        }
    });

};

export default accordion;
