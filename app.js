let displayValue = "";
let operatorClicked = false;
let equalClicked = false;
let afterCommaFirst = false;
let afterCommaSecond = false;

let firstValue;
let secondValue;
let operator;

const screen = document.querySelector('.screen');

function add(a, b){
    return a + b;
}
function minus(a, b){
    return a - b;
}
function multiplication(a, b){
    return a * b;
}
function division(a, b){
    if(b === 0){
        return "Division By Zero ERROR"
    }
    return a / b;
}
function modulus(a, b){
    return a % b;
}

function operate(a, operator, b){
    if(operator == "+") return a + b;
    else if (operator == "-") return minus(a, b);
    else if (operator == "*") return multiplication(a, b);
    else if (operator == "/") return division(a, b);
    else if (operator == "%") return modulus(a, b);
}

function updateScreen(){
    screen.textContent = displayValue;
}

const numbers = document.querySelectorAll('.number')
numbers.forEach(number => number.addEventListener('click', function(e) {
    if(equalClicked && !operatorClicked){
        equalClicked = false;
        afterCommaFirst = false;
        afterCommaSecond = false;
        displayValue = number.textContent;
        firstValue = parseFloat(displayValue);
        updateScreen();
    }
    else if(operatorClicked && typeof secondValue == 'undefined'){
        displayValue = number.textContent;
        secondValue = parseFloat(displayValue);
        updateScreen();
    }
    else if(operatorClicked){
        displayValue += number.textContent;
        secondValue = parseFloat(displayValue);
        updateScreen();
    }
    else if(!operatorClicked){
        displayValue += number.textContent;
        firstValue = parseFloat(displayValue);
        updateScreen();
    }
}))

const operators = document.querySelectorAll('.operator');
operators.forEach(op => op.addEventListener('click', function(e){
    if(!operatorClicked){
        operator = op.textContent;
        operatorClicked = true;
    }
    else if(operatorClicked && typeof secondValue !== 'undefined'){
        firstValue = operate(firstValue, operator, secondValue);
        displayValue = parseFloat(firstValue.toFixed(4));
        secondValue = undefined;
        afterCommaSecond = false;
        operator = op.textContent;
        operatorClicked = true;
        equalClicked = true;
        updateScreen();

    }
    else if(operatorClicked){
        operator = undefined;
        operatorClicked = false;
    }
}))


const equal = document.querySelector('.equal');
equal.addEventListener('click', function(e) {
    if(operatorClicked && typeof secondValue == 'undefined'){
        firstValue = operate(firstValue, operator, firstValue);
        displayValue = parseFloat(firstValue.toFixed(4));
        secondValue = undefined;
        afterCommaSecond = false;
        operator = undefined;
        operatorClicked = false;
        equalClicked = true;
        updateScreen();
    }
    else if(operatorClicked){
        firstValue = operate(firstValue, operator, secondValue);
        displayValue = parseFloat(firstValue.toFixed(4));
        secondValue = undefined;
        afterCommaSecond = false;
        operator = undefined;
        operatorClicked = false;
        equalClicked = true;
        updateScreen();
    }
})


const comma = document.querySelector('.comma');
comma.addEventListener('click', function(e) {
    if(!afterCommaFirst && !operatorClicked){
        displayValue += e.target.textContent;
        updateScreen();
        afterCommaFirst= true;
    }
    if(!afterCommaSecond && operatorClicked){
        displayValue += e.target.textContent;
        updateScreen();
        afterCommaSecond = true;
    }
})

const clearEverything = document.querySelector('.AC');
clearEverything.addEventListener('click', function(e){
    reset();
})

function reset(){
    displayValue = "";
    operatorClicked = false;
    equalClicked = false;
    afterCommaFirst = false;
    afterCommaSecond = false;
    firstValue = undefined;
    secondValue = undefined;
    operator = undefined;
    updateScreen();
}

const changeSign = document.querySelector('.sign');
changeSign.addEventListener('click', function(e){
    if(operatorClicked && Number.isInteger(secondValue)){
        afterCommaSecond = false;
        secondValue = -secondValue;
        displayValue = secondValue;
        updateScreen();
    }
    else if(operatorClicked && !Number.isInteger(secondValue)){
        secondValue = -secondValue;
        displayValue = secondValue;
        updateScreen();
    }
    else if(!operatorClicked && Number.isInteger(firstValue)){
        afterCommaFirst = false;
        equalClicked = false;
        firstValue = -firstValue;
        displayValue = firstValue;
        updateScreen();
    }
    else if(!operatorClicked && !Number.isInteger(firstValue)){
        equalClicked = false;
        firstValue = -firstValue;
        displayValue = firstValue;
        updateScreen();
    }
})