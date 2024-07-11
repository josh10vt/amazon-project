import {addToCart, cart, loadFromStorage, removeFromCart} from '../../data/cart.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';

describe('test suite: addToCart', () => {
beforeEach(() => {
  spyOn(localStorage, 'setItem');
});

  it('it adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });
});

describe('test suite: removeFromCart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  const productId3 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();
  });

  it('removes a product from the cart', () => {
      removeFromCart(productId1);
      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart[0].productId).toEqual(productId2);
      expect(cart[0].quantity).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  it('removes product that is not in the cart', () => {
    removeFromCart(productId3);
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });
});