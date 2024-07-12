/*
import { renderCheckoutHeader } from '../scripts/checkout/checkoutHeader.js';
import { displayValue } from '../scripts/utils/dom.js';
import {validDeliveryOption} from './deliveryOptions.js';
*/

class Cart {
  cartItems;

  #localStorageKey;
  #localStorageKey2;

  constructor(localStorageKey, localStorageKey2) {
    this.#localStorageKey = localStorageKey;
    this.#localStorageKey2 = localStorageKey2;
    this.#loadFromStorage();
    //cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  saveTotalCartQuatity(cartQuantity) {
    localStorage.setItem(this.#localStorageKey2, JSON.stringify(cartQuantity));
  }

  addToCart(productId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if(matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    //calculateCartQuantity();
    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    
    
    const minimumLimit = 0;
    const maximumLimit = 1000;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId && newQuantity >= minimumLimit && newQuantity <= maximumLimit) {
        let previousQuantity = cartItem.quantity;
        
        if (Number(getTotalCartQuantity()) <= maximumLimit) {
          //displayValue(`.js-quantity-label-${productId}`, newQuantity);
  
          //localStorage.removeItem(`cartItemQuantity-${productId}`);
          
          //localStorage.setItem(`cartItemQuantity-${productId}`, newQuantity);
  
          //displayCartQuantity('.js-checkout-header-middle-section');
          cartItem.quantity = newQuantity;
          this.saveToStorage();
          this.calculateCartQuantity();
          renderCheckoutHeader();
        } else {
          cartItem.quantity = previousQuantity;
          this.saveToStorage();
          this.calculateCartQuantity();
          alert('You have exceeded the maximum quantity of 1000 items. Please contact customer service for bulk orders.');
        }
        
      } else if (cartItem.productId === productId && newQuantity > maximumLimit) {
  
        alert('You have exceeded the maximum quantity of 1000 items. Please contact customer service for bulk orders.');
      } else if (cartItem.productId === productId && newQuantity < minimumLimit) {
        alert(`Oops! You can't have less than 0 items in your cart. Please enter a valid quantity. \nIf you want to remove this item from your cart, click the "Delete" button.`);
      }
    });
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    this.saveTotalCartQuatity(cartQuantity);
    return cartQuantity; 
  }

  getTotalCartQuantity() {
    let total = JSON.parse(localStorage.getItem(this.#localStorageKey2)) || 0;
    return total;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (!matchingItem) {
      return;
    }
  
    if (!validDeliveryOption(deliveryOptionId)) {
      return;
    }
  
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

const cart = new Cart('cart-oop', 'total-cart-quantity');

const businessCart = new Cart('cart-business-oop', 'total-business-cart-quantity');

console.log(cart);
console.log(businessCart);

/*
if (cartItem.productId === productId && (newQuantity + Number(getTotalCartQuantity()) > 1000)) {

  alert('You have reached the maximum quantity of 1000 items. Please contact customer service for bulk orders.');
}
*/









/*
export function displayCartQuantity(selector) {
  if (calculateCartQuantity() === 0) {
    displayValue(selector, `Your cart is empty`);
  } else if (calculateCartQuantity() === 1) {
    displayValue(selector, `Checkout (${getTotalCartQuantity()} item)`);
  } else {
    displayValue(selector, `Checkout (${getTotalCartQuantity()} items)`);
  }
}
*/

