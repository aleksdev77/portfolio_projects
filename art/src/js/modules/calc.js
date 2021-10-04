const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promocodeBlock = document.querySelector(promocode),
        sumBlock = document.querySelector('#sum'),
        sumOptions = document.querySelector('.result_sum'),
        calcBtn = document.getElementById('btn-calc'),
        resultBlock = document.querySelector(result);

    sumBlock.style.position = "absolute";

    let sum = 0;

    let arr = [];

    const calcFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7) + ' руб.';
        } else {
            resultBlock.textContent = sum + ' руб.';
            console.log(arr.push(sum));
            if (Object.keys(arr).length === 1) {
                document.querySelector('#btn-calc').removeAttribute('disabled'); // Если в массиве 2 ключа (arr) - тоесть 3 заполенных поля, тогда disabled удаляем.
            }
        }
        let endSum = resultBlock.textContent;

        sumOptions.value = endSum;
    };

    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input', calcFunc);
};

export default calc;
