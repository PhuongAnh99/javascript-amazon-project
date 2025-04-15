import {renderOrderSummary} from '../scripts/checkout/orderSummary.js';
import {addToCart, cart, loadFromStorage} from '../data/cart.js';

describe('test suite: renderOrderSummary', () => {
    const productId1 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    const productId2 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';
    
    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
            <div class="order-summary"></div>
            <div class="payment-summary"></div>
        `;
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 1,
                    deliveryOptionId: '1'
                },
                {
                    productId: productId2,
                    quantity: 2,
                    deliveryOptionId: '2'
                }
            ]);
        });
        loadFromStorage();

        renderOrderSummary();
    });

    it('display the cart', () => {
        expect(document.querySelectorAll('.cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 1');

        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('removes a product from the cart', () => {
        const deleteLink = document.querySelector(`.delete-quantity-link[data-product-id="${productId2}"]`);
        deleteLink.click();

        expect(cart.length).toEqual(1);
        expect(document.querySelectorAll('.cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-${productId2}`)).toEqual(null);
        expect(document.querySelector(`.js-${productId1}`)).not.toEqual(null);
        expect(cart[0].productId).toEqual(productId1);

        document.querySelector('.js-test-container').innerHTML = '';
    });
});