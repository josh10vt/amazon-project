import {calculateCartQuantity} from '../../data/cart.js';
//import {displayValue} from '../utils/dom.js';

export function renderCheckoutHeader() {
  //const html = displayCartQuantity('.js-checkout-header-middle-section');

  const checkOutHeaderHTML = `
    <div class="header-content">
      <div class="checkout-header-left-section">
        <a href="amazon.html">
          <img class="amazon-logo" src="images/amazon-logo.png">
          <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
        </a>
      </div>

      <div class="checkout-header-middle-section js-checkout-header-middle-section">
        ${checkNumberOfItems()}
      </div>

      <div class="checkout-header-right-section">
        <img src="images/icons/checkout-lock-icon.png">
      </div>
    </div>
  `
  document.querySelector('.js-checkout-header').innerHTML = checkOutHeaderHTML;
}

function checkNumberOfItems() {
  if (calculateCartQuantity() === 0) {
    return `Your cart is empty`;
  } else if (calculateCartQuantity() === 1) {
    return `Checout (${calculateCartQuantity()} Item)`;
  } else if (calculateCartQuantity() > 1) {
    return `Checkout (${calculateCartQuantity()} Items)`;
  }
}

/*
function displayCartQuantity(selector) {
  if (calculateCartQuantity() === 0) {
    displayValue(selector, `Your cart is empty`);
  } else if (calculateCartQuantity() === 1) {
    displayValue(selector, `Checkout (${getTotalCartQuantity()} item)`);
  } else {
    displayValue(selector, `Checkout (${getTotalCartQuantity()} items)`);
  }
}
*/