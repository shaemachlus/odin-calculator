// to-do
// add scientific notation for large calculations
// highlight the operation being used
// add keyboard support

const COLOR_OP_SELECTED = "#fff";
const COLOR_OP_UNSELECTED = "#000";

const opButtons = document.querySelectorAll(".btn-op");
const numButtons = document.querySelectorAll(".btn-num");
const display = document.querySelector(".display");
const clearButton = document.querySelector(".btn-clear");
const equalsButton = document.querySelector(".btn-equals");
const decimalButton = document.querySelector(".btn-decimal");
const delButton = document.querySelector(".btn-del");

let isClear = true; // should the next number clear the display
let firstNum;
let secondNum;
let currentOperator;

function add(num1, num2) {
  return +num1 + +num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (+num2 === 0) {
    return "error";
  }
  return num1 / num2;
}

function operate(num1, num2, opString) {
  let optr;
  switch (opString) {
    case "+":
      optr = add;
      break;
    case "-":
      optr = subtract;
      break;
    case "/":
      optr = divide;
      break;
    case "x":
      optr = multiply;
      break;
    default:
      alert("Error: operation missing");
      break;
  }
  let res = Math.round(optr(num1, num2) * 1e6) / 1e6;
  if (res.toString().length > 8) {
    return "Overflow";
  }
  return res;
}

function convertEventToString(stringOrEvent) {
  if (typeof stringOrEvent === "string") {
    return stringOrEvent;
  } else {
    return stringOrEvent.target.textContent;
  }
}

function enterNum(stringOrEvent) {
  let num = convertEventToString(stringOrEvent);
  if (isClear) {
    display.textContent = num;
    isClear = false;
  } else if (display.textContent.length < 8) {
    display.textContent += num;
  }
}

function enterDecimal() {
  if (!display.textContent.includes(".") || isClear) {
    if (isClear) {
      display.textContent = "0.";
      isClear = false;
    } else {
      display.textContent += ".";
    }
  }
}

function enterOperator(stringOrEvent) {
  let newOperator = convertEventToString(stringOrEvent);
  if (currentOperator) {
    secondNum = display.textContent;
    display.textContent = operate(firstNum, secondNum, currentOperator);
  }
  firstNum = display.textContent;
  currentOperator = newOperator;
  // opBtn.classList.toggle("op-selected");
  isClear = true;
}

function enterEquals() {
  secondNum = display.textContent;
  display.textContent = operate(firstNum, secondNum, currentOperator);
  isClear = true;
  currentOperator = null;
}

function enterDel() {
  if (display.textContent.length > 1) {
    display.textContent = display.textContent.slice(0, -1);
  } else {
    display.textContent = 0;
    isClear = true;
  }
}

function enterClear() {
  display.textContent = 0;
  firstNum = null;
  secondNum = null;
  currentOperator = null;
  isClear = true;
}

window.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) {
    enterNum(e.key);
  } else if (e.key === ".") {
    enterDecimal();
  } else if (e.key === "x" || e.key === "/" || e.key === "-" || e.key === "+") {
    enterOperator(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    // "enter" button does not always work as expected
    enterEquals();
  } else if (e.key === "Backspace") {
    enterDel();
  }
});

numButtons.forEach((btn) => btn.addEventListener("click", enterNum));
opButtons.forEach((opBtn) => opBtn.addEventListener("click", enterOperator));
decimalButton.addEventListener("click", enterDecimal);
equalsButton.addEventListener("click", enterEquals);
clearButton.addEventListener("click", enterClear);
delButton.addEventListener("click", enterDel);
