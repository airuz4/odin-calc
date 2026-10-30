function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y === 0) {
    return 'You cant divide by 0';
  }
  return x / y;
}

function operate(x, operand, y) {
  if (operand === '+') return add(x, y);
  if (operand === '-') return subtract(x, y);
  if (operand === '*') return multiply(x, y);
  if (operand === '/') return divide(x, y);
}

const display = document.querySelector('.display');
const operands = ['/', '+', '*', '-', '='];
const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const inputButton = document.querySelector('.calc-inputs');

let nextNum = false;
let firstNum;
let operand = '';
let secondNum;
let total;
let result = false;

function cleanOperation() {
  display.innerText = '';
  firstNum = undefined;
  operand = '';
  secondNum = undefined;
  nextNum = false;
  total = undefined;
  result = false;
}

function numberInput(input) {
  // If starting a fresh calculation right after a result, clear & reset result flag
  if (result) {
    display.innerText = input;
    result = false;
    return;
  }

  // If transitioning from first number + operand to second number
  if (operand !== '' && !nextNum) {
    display.innerText = input;
    nextNum = true;
  } else {
    // Prevent duplicate decimals in current entry segment
    if (input === '.' && display.innerText.includes('.')) return;
    display.innerText += input;
  }
}

function operateInput(input) {
  if (!nextNum && input !== '=') {
    firstNum = Number(display.innerText);
    if (operand === '') {
      display.innerText += input;
    } else {
      display.innerText = display.innerText.slice(0, -1) + input;
    }
    operand = input;
  } else if (nextNum) {
    secondNum = Number(display.innerText);
    total = operate(firstNum, operand, secondNum);

    if (typeof total === 'string') {
      display.innerText = total; // Error message (e.g. divide by zero)
    } else if (String(total).includes('.')) {
      display.innerText = Number(total.toFixed(4));
    } else {
      display.innerText = total;
    }

    firstNum = total;
    nextNum = false;
    operand = '';
    result = true;

    if (input !== '=') {
      operand = input;
      display.innerText += operand;
    }
  }
}

function deleteInput() {
  if (operands.includes(display.innerText.slice(-1))) {
    operand = '';
  }
  display.innerText = display.innerText.slice(0, -1);
}

/* Delegated click event listener */
inputButton.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const input = btn.innerText;
  const clearButton = input === 'CE' || (input === 'DEL' && result);
  const deleteButton = input === 'DEL';
  const operateButton = operands.includes(input) && display.innerText !== '';
  const numButton = values.includes(input);

  if (clearButton) {
    cleanOperation();
  } else if (deleteButton) {
    deleteInput();
  } else if (operateButton) {
    operateInput(input);
  } else if (numButton) {
    numberInput(input);
  }
});

/* Keyboard Listener */
window.addEventListener('keydown', (e) => {
  let input = e.key;
  const numButton = values.includes(input);
  const operateButton = operands.includes(input);
  const deleteButton = input === 'Backspace';
  const equalButton = input === 'Enter';

  if (equalButton) {
    e.preventDefault();
    operateInput('=');
  } else if (deleteButton) {
    deleteInput();
  } else if (operateButton) {
    operateInput(input);
  } else if (numButton) {
    numberInput(input);
  }
});