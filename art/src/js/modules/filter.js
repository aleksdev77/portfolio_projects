const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll('.all'),
        markGirl = wrapper.querySelectorAll('.girl'),
        markLovers = wrapper.querySelectorAll('.lovers'),
        markChef = wrapper.querySelectorAll('.chef'),
        markGuy = wrapper.querySelectorAll('.guy'),
        no = document.querySelector('.portfolio-no');

    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';

    const typeFilter = (markType) => {
        markAll.forEach(mark => {
            mark.classList.remove('animated', 'fadeIn');
            mark.style.display = 'none';
        });

        no.classList.add('animated', 'fadeIn');
        no.style.display = "none";

        if (markType) {
            markType.forEach(mark => {
                mark.classList.add('animated', 'fadeIn');
                setTimeout(() => {
                    mark.style.display = 'block';
                }, 1);
            });
        } else {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    };

    // Рабочий вариант №1

    menu.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.tagName == "LI") {
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
        }

        if (target.classList.contains('all')) {
            typeFilter(markAll);
        } else if (target.classList.contains('lovers')) {
            typeFilter(markLovers);
        } else if (target.classList.contains('chef')) {
            typeFilter(markChef);
        } else if (target.classList.contains('girl')) {
            typeFilter(markGirl);
        } else if (target.classList.contains('guy')) {
            typeFilter(markGuy);
        } else if (target.classList.contains('grandmother') || target.classList.contains('granddad')) {
            typeFilter();
        }
    });

    // Рабочий вариант №2

    // function getBtn(triggerSelector) {
    //     const trigger = document.querySelectorAll(triggerSelector);
    //     trigger.forEach(btn => {
    //         btn.addEventListener('click', (e) => {
    //             let target = e.target;

    //             if (target && target.tagName == "LI") {
    //                 items.forEach(btn => btn.classList.remove('active'));
    //                 target.classList.add('active');
    //             }

    //             if (target.classList.contains('all')) {
    //                 typeFilter(markAll);
    //             } else if (target.classList.contains('lovers')) {
    //                 typeFilter(markLovers);
    //             } else if (target.classList.contains('chef')) {
    //                 typeFilter(markChef);
    //             } else if (target.classList.contains('girl')) {
    //                 typeFilter(markGirl);
    //             } else if (target.classList.contains('guy')) {
    //                 typeFilter(markGuy);
    //             } else if (target.classList.contains('grandmother') || target.classList.contains('granddad')) {
    //                 typeFilter();
    //             }
    //         });
    //     });

    // }

    // getBtn('.portfolio-menu li');


};

export default filter;
