function add(...parameters){
    return parameters.reduce((sum, item) => sum += item)
}

function subtract(...parameters){
    return parameters.reduce((difference, item) => difference -= item)
}

function multiply(...parameters){
    return parameters.reduce((product, item) => product *= item)
}

function divide(...parameters){
    return parameters.reduce((quotient, item) => quotient /= item)
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
const inputButton = document.querySelector('.calc-inputs');
let step = 0;
let firstNum = 0;
let operand;
let secondNum = 0;

inputButton.addEventListener('mouseup', (e) =>{
    let input = e.target.innerText;
    if (input == 'CE'){
        display.innerText = '';
        firstNum = 0;
        operand = '';
        secondNum = 0;
        step = 0;
    }
    else if (operands.includes(input)){
        if(step == 0){
            firstNum = Number(display.innerText);
            operand = input;
            step++;

        } 
        else if (step == 2 || input == '='){
            secondNum = Number(display.innerText);
            total = operate(firstNum, operand, secondNum);
            display.innerText = total;
            firstNum = total;
            step = 0;
        }
        else if (step == 3){
            step = 1;
        }
        
    }
    else{
        if(step == 0 || step == 2){
            display.innerText += input;
        }
        else{
            display.innerText = input;
            step = 2;
        }
    }


})








