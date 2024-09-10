let runningTotal = 0;
let buffer = '0';
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−': 
        case '×': 
        case '÷': 
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else if (previousOperator !== null) {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    
}

function flushOperation(intBuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += intBuffer;
            break;
        case '−': 
            runningTotal -= intBuffer;
            break;
        case '×': 
            runningTotal *= intBuffer;
            break;
        case '÷': 
            runningTotal /= intBuffer;
            break;
    }
}

function handleNumber(numberString) {
    if (buffer === '0' || previousOperator !== null && buffer === runningTotal.toString()) {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            buttonClick(event.target.innerText.trim());
        }
    });
}

init();
