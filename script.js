function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    if (y == 0) {
        return 'You cant divide by 0';
    }
    return x / y;
}


function operate(x, operand, y){
    if (operand == '+'){
        return add(x,y);
    }
    if (operand == '-'){
        return subtract(x,y);
    }
    if (operand == '*'){
        return multiply(x,y);
    }
    if (operand == '/'){
        return divide(x,y);
    }

}
const display = document.querySelector('.display');
const operands = '/+*-=';
const values = '1234567890.'
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

inputButton.addEventListener('mouseup', (e) =>{
    let input = e.target.innerText;
    if (input == 'CE' || (input == 'DEL' && result)){
        cleanOperation();
    }
    else if (input == 'DEL'){
        display.innerText = display.innerText.slice(0, -1)
            if (operands.includes(display.innerText.slice(0, -1))){
            operand = '';
            }
        }
    else if (operands.includes(input) && display.innerText != ''){
        if(nextNum == false && input != '='){
            firstNum = Number(display.innerText);
            if (operand == ''){
                display.innerText += input;
            }
            else{
                display.innerText = display.innerText.slice(0, -1) + input;
            }
            operand = input;
            
        } 
        else if (nextNum == true){
            secondNum = Number(display.innerText);
            total = operate(firstNum, operand, secondNum);
            if (String(total).includes('.')){
                display.innerText = total.toFixed(4);
            }
            else{
                display.innerText = total;
            }
            firstNum = total;
            nextNum = false;
            operand = '';
            result = true;

            if (input != '='){
                operand = input;
                }
        }
        else if (input == '='){
            
        }
    }
    else if ((!(display.innerText.includes('.') && input == '.')) && values.includes(input) ){
        
        if (operand != '' && nextNum == false){
                display.innerText = input;
                nextNum = true;
            }
        else if (result == true){
            display.innerText = input;
        }
        else{
            display.innerText += input;
        }
    }
}
)





