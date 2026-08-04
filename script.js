function add(...parameters){
    return parameters.reduce((sum, item) => sum += item,0)
}

function subtract(...parameters){
    return parameters.reduce((difference, item) => difference -= item,0)
}

function multiply(...parameters){
    return parameters.reduce((product, item) => product *= item,0)
}

function divide(...parameters){
    return parameters.reduce((quotient, item) => quotient -= item,0)
}


let x = 3;
let y = 3; 
let operand = '+';

console.log(operate(x, operand, y));

function operate(x, operand, y){
    if (operand == '+'){
        return add(x,y);
    }
    if (operand == '-'){
        difference(x,y);
    }
    if (operand == '*'){
        multiply(x,y);
    }
    if (operand == '/'){
        divide(x,y);
    }

}


