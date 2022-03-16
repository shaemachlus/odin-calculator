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
  return Math.round(optr(num1, num2) * 1e6) / 1e6;
}

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
let op;

numButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (isClear) {
      display.textContent = btn.textContent;
      isClear = false;
    } else if (display.textContent.length < 8) {
      display.textContent += btn.textContent;
    }
  });
});

opButtons.forEach((opBtn) => {
  opBtn.addEventListener("click", () => {
    if (op) {
      secondNum = display.textContent;
      display.textContent = operate(firstNum, secondNum, op);
    }
    firstNum = display.textContent;
    op = opBtn.textContent;
    isClear = true;
  });
});

equalsButton.addEventListener("click", () => {
  secondNum = display.textContent;
  display.textContent = operate(firstNum, secondNum, op);
  isClear = true;
  op = null;
});

decimalButton.addEventListener("click", () => {
  if (!display.textContent.includes(".") || isClear) {
    if (isClear) {
      display.textContent = "0.";
      isClear = false;
    } else {
      display.textContent += ".";
    }
  }
});

clearButton.addEventListener("click", () => {
  display.textContent = 0;
  firstNum = null;
  secondNum = null;
  op = null;
  isClear = true;
});

delButton.addEventListener("click", () => {
  if (display.textContent.length > 1) {
    display.textContent = display.textContent.slice(0, -1);
  } else {
    display.textContent = 0;
    isClear = true;
  }
});
