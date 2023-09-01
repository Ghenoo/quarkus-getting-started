const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let operator = '';
let isFirstInput = true;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if ('0123456789.'.includes(value)) {
            currentInput += value;
            display.value = currentInput;
        } else if ('+-*/'.includes(value)) {
            if (!isFirstInput) {
                calculate();
            }
            operator = value;
            isFirstInput = false;
            currentInput = '';
        } else if (value === '=') {
            calculate();
            operator = '';
            isFirstInput = true;
        }
    });
});

function calculate() {
    const num1 = parseFloat(display.value);
    const num2 = parseFloat(currentInput);
    
    let result = 0;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            break;
    }
    
    display.value = result;
    currentInput = result.toString();
}

