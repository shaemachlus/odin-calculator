// to-do
// add scientific notation for large calculations
// highlight the operation being used

const buttons = document.querySelectorAll(".btn");
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
let newBtn;
let oldBtn;

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

function colorButton(event) {
  if (!newBtn) {
    oldBtn = event.target;
    oldBtn.classList.toggle("selected");
    newBtn = true;
  } else {
    newBtn = event.target;
    oldBtn.classList.toggle("selected");
    newBtn.classList.toggle("selected");
    oldBtn = newBtn;
  }
}

window.addEventListener("keydown", (e) => {
  let associatedButton = Array.from(buttons).find(
    (btn) => btn.textContent === e.key
  );
  // the only key where the text is not the same as e.key
  if (e.key === "Backspace")
    associatedButton = document.querySelector(".btn-del");
  if (associatedButton) associatedButton.click();
});

numButtons.forEach((numBtn) =>
  numBtn.addEventListener("click", (e) => {
    enterNum(e);
    colorButton(e);
  })
);
opButtons.forEach((opBtn) =>
  opBtn.addEventListener("click", (e) => {
    enterOperator(e);
    colorButton(e);
  })
);
decimalButton.addEventListener("click", (e) => {
  enterDecimal(e);
  colorButton(e);
});

equalsButton.addEventListener("click", (e) => {
  enterEquals(e);
  colorButton(e);
});

clearButton.addEventListener("click", (e) => {
  enterClear(e);
  colorButton(e);
});

delButton.addEventListener("click", (e) => {
  enterDel(e);
  colorButton(e);
});
