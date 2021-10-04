const images = () => {
    const imgPopup = document.createElement('div'),
        workSection = document.querySelector('.works'),
        bigImage = document.createElement('img'),
        screenWidth = window.screen.width;
        
    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            document.body.style.overflow = 'hidden';  // Блокирует прокрутку при открытом модальном окне
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
        }

        if (screenWidth < 1024) {
            bigImage.style.width = '80%';
        } else if (screenWidth > 1024) {
            bigImage.style.width = 'none';
        }

        if (target && target.matches('div.popup')) { // matches() совпадение при клике
            imgPopup.style.display = 'none';
            document.body.style.overflow = ''; // Убирает блокировку прокрутки
        }
    });
};

export default images;