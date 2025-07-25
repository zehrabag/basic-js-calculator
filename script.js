const display = document.querySelector('.calculater-input');
const keys = document.querySelector('.calculater-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {

    display.value = displayValue;

}

keys.addEventListener('click', function (e) {
    const element = e.target;
    const value = element.value;

    if (!element.matches('button')) return;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(element.value);

    }


    //inputNumber(element.value);
    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);
    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    }
    else if (operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;

        firstValue = result;
    }

    waitingForSecondValue = true;

    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator) {

    if (operator === '+') {
        return first + second;
    }
    else if (operator === '-') {
        return first - second;
    }
    else if (operator === '*') {
        return first * second;
    }
    else if (operator === '/') {
        return first / second;
    }

    return second;

}

function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    }
    else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }

}

function clear() {
    displayValue = '0';
}