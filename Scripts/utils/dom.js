export function displayValue(selector, value) {
  document.querySelector(selector)
    .innerHTML = value;
}