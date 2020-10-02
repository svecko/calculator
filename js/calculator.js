const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

keys.addEventListener('click', (event) => {
  if (!event.target.closest('button')) {
    return;
  }

  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;
  const { type } = key.dataset;
  const { previousKeyType } = calculator.dataset;

  if (type === 'number') {
    if (displayValue === '0') {
      display.textContent = keyValue;
    } else if (previousKeyType === 'operator' || previousKeyType === 'equal') {
      display.textContent = keyValue;
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  if (type === 'operator') {
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach((element) => {
      element.dataset.state = '';
    });
    key.dataset.state = 'selected';

    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (type === 'equal') {
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach((element) => {
      element.dataset.state = '';
    });
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;

    display.textContent = calculate(firstNumber, operator, secondNumber);
  }

  calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
  let result = '';

  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);

  switch (operator) {
    case 'plus':
      result = firstNumber + secondNumber;
      break;
    case 'minus':
      result = firstNumber - secondNumber;
      break;
    case 'times':
      result = firstNumber * secondNumber;
      break;
    case 'divide':
      result = firstNumber / secondNumber;
      break;
  }

  return result;
}
