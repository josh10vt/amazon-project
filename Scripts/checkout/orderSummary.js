import {cart, removeFromCart, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';


//displayCartQuantity('.js-checkout-header-middle-section');
//renderCheckoutHeader();

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const pickedDeliveryDate = calculateDeliveryDate(deliveryOption);

    

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${pickedDeliveryDate}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity
              js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">
                Save
              </span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" 
                data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const pickedDeliveryDate = calculateDeliveryDate(deliveryOption);
      

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId

        html += `
        <div class="delivery-option js-delivery-option js-delivery-options-${matchingProduct.id}-${deliveryOption.id}" data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${pickedDeliveryDate}
            </div>
            <div class="delivery-option-price">
              ${priceString}
            </div>
          </div>
        </div>
      `
    });

    return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        //const container = document.querySelector(
         // `.js-cart-item-container-${productId}`
        //);
        //container.remove();
        //displayCartQuantity('.js-checkout-header-middle-section');
        
        renderCheckoutHeader();
        renderOrderSummary();

        renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-update-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      document.querySelector(`.js-cart-item-container-${productId}`).classList.add(`is-editing-quantity`);

      console.log(document.querySelector(`.js-cart-item-container-${productId}`));
    });
  });

    document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
      
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const newQuantityElem = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(newQuantityElem.value);
          
        updateQuantity(productId, newQuantity);


        renderOrderSummary();
        renderPaymentSummary();

        document.querySelector(`.js-cart-item-container-${productId}`).classList.remove(`is-editing-quantity`);
      });
    });



    /*
  document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const productId = link.dataset.productId;
        const newQuantityElem = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(newQuantityElem.value);

        updateQuantity(productId, newQuantity);

        document.querySelector(`.js-cart-item-container-${productId}`).classList.remove(`is-editing-quantity`);
      }
    });
  });

  */

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}