
let displayValue = "";
let operatorClicked = false;
let equalClicked = false;

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
    if(operator == "+") return add(a, b);
    else if (operator == "-") return minus(a, b);
    else if (operator == "*") return multiplication(a, b);
    else if (operator == "/") return division(a, b);
    else if (operator == "%") return modulus(a, b);
}

const squares = document.querySelectorAll('.square');
squares.forEach(square => square.addEventListener('click', function(e) {
    e.stopPropagation();
    if (square.textContent == '+/-' && typeof secondValue == 'undefined'){
        firstValue = -firstValue;
        displayValue = firstValue;
        updateScreen();
    }
    else if (square.textContent == '+/-' && typeof secondValue !== 'undefined'){
        secondValue = -secondValue;
        displayValue = secondValue;
        updateScreen();
    }
    
    else if (square.textContent == 'AC'){
        let operatorClicked = false;
        let equalClicked = false;
        firstValue = undefined;
        secondValue = undefined;
        operator = undefined;
        displayValue = "";
        updateScreen();
    }
    else if(square.classList.contains('operator') && square.textContent !== '=' && typeof firstValue !=='undefined' && typeof secondValue !== 'undefined'){
        firstValue = operate(firstValue, operator, secondValue);
        console.log(square.textContent);
        secondValue = 'undefined';
        operator = square.textContent;
        operatorClicked = false;
        equalClicked = true;
        displayValue = firstValue;
        updateScreen();
    }
    else if(square.classList.contains('operator') && square.textContent !== '=' && typeof firstValue !=='undefined' && typeof secondValue == 'undefined'){
        firstValue = operate(firstValue, operator, secondValue);
        console.log(square.textContent);
        secondValue = 'undefined';
        operator = square.textContent;
        operatorClicked = false;
        equalClicked = true;
        displayValue = firstValue;
        updateScreen();
    }
    else if(square.classList.contains('number') && equalClicked && !operatorClicked){
        equalClicked = false;
        displayValue = square.textContent
        updateScreen();
        firstValue = parseFloat(displayValue);
    }
    else if (square.classList.contains('number') && operatorClicked) {
        if(typeof secondValue == 'undefined'){
            displayValue += square.textContent;
            secondValue = parseFloat(displayValue);
            updateScreen();
        }
        else if(!(secondValue.toString()).includes('.')){
            displayValue += square.textContent;
            secondValue = parseFloat(displayValue);
            updateScreen();
        }
    }
    else if (square.classList.contains('number')) {
        if(typeof firstValue == 'undefined'){
            displayValue += square.textContent;
            firstValue = parseFloat(displayValue);
            updateScreen();
        }
        else if(!(firstValue.toString()).includes('.')){
            displayValue += square.textContent;
            firstValue = parseFloat(displayValue);
            updateScreen();
        }
    }
    else if (square.classList.contains('equal') && !operatorClicked && typeof secondValue == 'undefined'){
        equalClicked = true;
    }
    else if (square.classList.contains('equal') && operatorClicked && typeof secondValue == 'undefined') {
        secondValue = firstValue;
        console.log(firstValue, operator, secondValue);
        firstValue = operate(firstValue, operator, secondValue);
        secondValue = undefined;
        operatorClicked = false;
        equalClicked = true;
        displayValue = firstValue;
        updateScreen();
        console.log("test");
    }
    else if (square.classList.contains('equal') && operatorClicked && typeof secondValue !== 'undefined') {
        firstValue = operate(firstValue, operator, secondValue);
        secondValue = undefined;
        operatorClicked = false;
        equalClicked = true;
        displayValue = firstValue;
        updateScreen();
    }
    else if (square.classList.contains('operator')){
        operatorClicked = true;
        operator = square.textContent;
        displayValue = "";
    }
}))





function updateScreen(){
    screen.textContent = displayValue;
}