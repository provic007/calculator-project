const _history = document.getElementById("history");
const _result = document.getElementById("result");
const History = document.getElementById("lg-history");

export const setDisplay = ({ history = false, result = false }) => {
  _history.innerHTML = `<span class="w-full text-right">${!!history ? history : ""}</span>`;
  _result.innerHTML = `<span class="w-full text-right">${!!result ? result : ""}</span>`;
};

export const setHistory = (history) => {
    History.insertAdjacentHTML('beforeend',`<span class="">${history}</span>`);   
}