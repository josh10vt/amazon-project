import { displayValue } from '../scripts/utils/dom.js';

export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function saveTotalCartQuatity(cartQuantity) {
  localStorage.setItem('totalCartQuantity', cartQuantity);
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  //calculateCartQuantity();
  saveToStorage();
}


/*
if (cartItem.productId === productId && (newQuantity + Number(getTotalCartQuantity()) > 1000)) {

  alert('You have reached the maximum quantity of 1000 items. Please contact customer service for bulk orders.');
}
*/




export function updateQuantity(productId, newQuantity) {
  
  
  const minimumLimit = 0;
  const maximumLimit = 1000;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId && newQuantity >= minimumLimit && newQuantity <= maximumLimit) {
      let previousQuantity = cartItem.quantity;
      cartItem.quantity = newQuantity;
      saveToStorage();
      calculateCartQuantity();
      if (Number(getTotalCartQuantity()) <= maximumLimit) {
        displayValue(`.js-quantity-label-${productId}`, newQuantity);

        localStorage.removeItem(`cartItemQuantity-${productId}`);
        
        //localStorage.setItem(`cartItemQuantity-${productId}`, newQuantity);

        displayCartQuantity('.js-checkout-header-middle-section');
      } else {
        cartItem.quantity = previousQuantity;
        saveToStorage();
        calculateCartQuantity();
        alert('You have exceeded the maximum quantity of 1000 items. Please contact customer service for bulk orders.');
      }
      
    } else if (cartItem.productId === productId && newQuantity > maximumLimit) {

      alert('You have exceeded the maximum quantity of 1000 items. Please contact customer service for bulk orders.');
    } else if (cartItem.productId === productId && newQuantity < minimumLimit) {
      alert(`Oops! You can't have less than 0 items in your cart. Please enter a valid quantity. \nIf you want to remove this item from your cart, click the "Delete" button.`);
    }
  });
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  saveTotalCartQuatity(cartQuantity);
  return cartQuantity; 
}

export function getTotalCartQuantity() {
  let total = localStorage.getItem('totalCartQuantity') || 0;
  return total;
}

export function displayCartQuantity(selector) {
  if (calculateCartQuantity() === 0) {
    displayValue(selector, `Your cart is empty`);
  } else if (calculateCartQuantity() === 1) {
    displayValue(selector, `Checkout (${getTotalCartQuantity()} item)`);
  } else {
    displayValue(selector, `Checkout (${getTotalCartQuantity()} items)`);
  }
}