const operations = {
    ADD: "+",
    SUBTRACT: "-",
    DIVIDE: "/",
    MULTIPLY: "x",
    NONE: null,
};

const activeInputs = {
    FIRST: "firstNumber",
    SECOND: "secondNumber",
    START_FIRST: "startFirstNumber",
    START_SECOND: "startSecondNumber",
};

let operationData = {
    firstNumber: 0,
    secondNumber: NaN,
    operator: operations.NONE,
};

let activeInput = activeInputs.START_FIRST;

const numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach((button) =>
    button.addEventListener("click", handleNumberInput)
);

const dotButton = document.querySelector("#dot");
dotButton.addEventListener("click", handleNumberInput);

const operatorButtons = document.querySelectorAll(".operator-button");
operatorButtons.forEach((button) =>
    button.addEventListener("click", handleOperatorInput)
);

const equalButton = document.querySelector("#equal");
equalButton.addEventListener("click", handleEqualButton);

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", (e) => {
    operationData.firstNumber = 0;
    (operationData.secondNumber = NaN),
        (operationData.operator = operations.NONE);
    activeInput = activeInputs.START_FIRST;
    updateDisplay();
});

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", (e) => {
    if (activeInput == activeInputs.FIRST) {
        let first = operationData.firstNumber;
        if (first < 10) {
            if (first.length > 1) {
                operationData.firstNumber = first[0];
            } else {
                operationData.firstNumber = 0;
                activeInput = activeInputs.START_FIRST;
            }
        } else {
            operationData.firstNumber = first
                .split("")
                .splice(0, first.length - 1)
                .join("");
        }
    } else if (activeInput == activeInputs.SECOND) {
        let second = operationData.secondNumber;
        if (second < 10) {
            if (second.length > 1) {
                operationData.secondNumber = second[0];
            } else {
                operationData.secondNumber = 0;
                activeInput = activeInputs.START_SECOND;
            }
        } else {
            operationData.secondNumber = second
                .split("")
                .splice(0, second.length - 1)
                .join("");
        }
    }
    updateDisplay();
});

const display = document.querySelector(".display");

function handleEqualButton(e) {
    if (
        Number.isNaN(operationData.secondNumber) ||
        operationData.operator == operations.NONE
    ) {
        console.log("no operation");
        return;
    }

    let result = operate(
        operationData.firstNumber,
        operationData.secondNumber,
        operationData.operator
    );

    operationData.firstNumber = result;
    operationData.secondNumber = NaN;
    operationData.operator = operations.NONE;
    activeInput = activeInputs.START_FIRST;

    updateDisplay();
}

function handleNumberInput(e) {
    let number = e.target.textContent;
    switch (activeInput) {
        case activeInputs.START_FIRST:
            operationData.firstNumber = number;
            activeInput = activeInputs.FIRST;
            break;

        case activeInputs.START_SECOND:
            operationData.secondNumber = number;
            activeInput = activeInputs.SECOND;
            break;

        case activeInputs.FIRST:
            operationData.firstNumber += number;
            break;

        case activeInputs.SECOND:
            operationData.secondNumber += number;
            break;

        default:
            return;
    }

    updateDisplay();
}

function handleOperatorInput(e) {
    let id = e.target.id;
    let operator;
    switch (id) {
        case "plus":
            operator = operations.ADD;
            break;

        case "minus":
            operator = operations.SUBTRACT;
            break;

        case "divide":
            operator = operations.DIVIDE;
            break;

        case "multiply":
            operator = operations.MULTIPLY;
    }

    if (
        operationData.operator == operations.NONE ||
        Number.isNaN(operationData.secondNumber)
    ) {
        activeInput = activeInputs.START_SECOND;
        operationData.operator = operator;
    } else {
        let result = operate(
            operationData.firstNumber,
            operationData.secondNumber,
            operationData.operator
        );

        operationData.firstNumber = result;
        operationData.secondNumber = NaN;
        operationData.operator = operator;
        activeInput = activeInputs.START_SECOND;
    }

    updateDisplay();
}

function formatDisplayText() {
    let text = "";
    
    if (!Number.isNaN(operationData.firstNumber)) {
        text += formatNumber(operationData.firstNumber, 4);
    }

    if (operationData.operator != operations.NONE) {
        text += " " + operationData.operator;
        if (!Number.isNaN(operationData.secondNumber)) {
            text += " " + operationData.secondNumber;
        }
    }
    return text;
}

function formatNumber(num, decimals) {
    if (Number.isInteger(parseFloat(num))) {
        return num;
    } else {
        return parseFloat(parseFloat(num).toFixed(decimals));
    }
}

function updateDisplay() {
    display.textContent = formatDisplayText();
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function divide(x, y) {
    if (y == 0) {
        return NaN;
    }
    return x / y;
}

function multiply(x, y) {
    return x * y;
}

function operate(num1, num2, operator) {
    let result;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
        case operations.ADD:
            result = add(num1, num2);
            break;

        case operations.SUBTRACT:
            result = subtract(num1, num2);
            break;

        case operations.DIVIDE:
            result = divide(num1, num2);
            break;

        case operations.MULTIPLY:
            result = multiply(num1, num2);
            break;

        case operations.NONE:
            result = null;
            break;
    }

    return result;
}
