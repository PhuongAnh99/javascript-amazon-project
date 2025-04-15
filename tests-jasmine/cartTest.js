import {addToCart, cart, loadFromStorage} from '../data/cart.js';

describe('test suite: addToCart', () => {
    it('adds a new item to cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart).toEqual([{productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '1'}]);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.length).toEqual(1);
    });

    it('adds an existing item to cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '1'}]);
        });
        loadFromStorage();

        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart).toEqual([{productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 2,
            deliveryOptionId: '1'}]);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.length).toEqual(1);
    });
});