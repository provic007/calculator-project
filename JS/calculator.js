import { key, keys, keypad } from "./keypad.js";
import { setDisplay, setHistory } from "./display.js";

let operation = [];
let history = "";
let result = "";
const handleClick = ({ target }) => {
  if (target?.id === "key") {
    let { name, type } = target?.dataset;

    if (type === "number") {
      console.log(operation);
      operation.push(`${name}`);
      result = operation.join("");
    }
    if (type === "math") {
      if (name !== "=") {
        operation.push(`${name}`);
        result = operation.join("");
      }
      if (name === "=") {
        history = operation.join("");
        result = calculator(operation.join(""));
        setHistory(operation.join(""));
      }
    }
    if (type === "reset") {
      if (name === "C") {
        operation.pop();
        result = `${operation.join("")}`;
      }
      if (name === "AC") {
        operation = [];
        result = operation.join("");
      }
    }
    setDisplay({ history, result });
  }
};
export const init = () => {
  keys.map(({ name, type }, index) => {
    keypad.insertAdjacentHTML(
      "beforeend",
      `<div class="key key-${index + 1} flex items-center justify-center ${
        type === "number" ? "" : ""
      } rounded-lg" id="key" data-name="${name}" data-type="${type}">${name}</div>`
    );
  });
  key.addEventListener("click", (e) => handleClick(e));
};

export const calculator = (op) => {
  const divide = (expression) => {
    if (expression.includes("/")) {
      const operands = expression.split("/");
      const numbers = operands.map((operand) => parseInt(operand));
      const result = numbers.reduce((acc, num) => acc / num);
      return result;
    }
    return parseInt(expression);
  };
  const multiply = (expression) => {
    if (expression.includes("x")) {
      const operands = expression.split("x");
      const numbers = operands.map((operand) => divide(operand));
      const result = numbers.reduce((acc, num) => acc * num);
      return result;
    }
    return divide(expression);
  };
  const exponential = (expression) => {
    if (expression.includes("^")) {
      const operands = expression.split("^");
      const numbers = operands.map((operand) => multiply(operand));
      const result = numbers.reduce((acc, num) => acc ** num);
      return result;
    }
    return multiply(expression);
  };
  const subtract = (expression) => {
    if (expression.includes("-")) {
      const operands = expression.split("-");
      const numbers = operands.map((operand) => exponential(operand));
      const result = numbers.reduce((acc, num) => acc - num);
      return result;
    }
    return exponential(expression);
  };
  const add = (expression) => {
    if (expression.includes("+")) {
      const operands = expression.split("+");
      const numbers = operands.map((operand) => subtract(operand));
      const result = numbers.reduce((acc, num) => acc + num);
      return result;
    }
    return subtract(expression);
  };

  return add(op);
};
