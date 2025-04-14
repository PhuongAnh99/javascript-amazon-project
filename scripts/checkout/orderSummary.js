import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary(){
  let cartSummaryHTML = '';

  cart.forEach(item => {
      let product = products.find(product => product.id === item.productId);

      const deliveryOptionId = item.deliveryOptionId;
      let deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D');

      cartSummaryHTML += `
          <div class="cart-item-container js-${product.id}" >
              <div class="delivery-date">
                Delivery date: ${deliveryDate}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src=${product.image}>

                <div class="cart-item-details">
                  <div class="product-name">
                    ${product.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(product.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${item.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary" data-product-id="${product.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(product, item)}
                </div>
              </div>
            </div>
      `;
  });
  document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

  function deliveryOptionsHTML(product, cartItem){
    let deliveryOptionsHTML = '';
    deliveryOptions.forEach(option => {
        const today = dayjs();
        const deliveryDate = today.add(option.deliveryDays, 'days').format('dddd, MMMM D');

        const deliveryPrice = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)} -`;

        const isChecked = option.id === cartItem.deliveryOptionId;

        deliveryOptionsHTML += `
            <div class="delivery-option"
                data-delivery-option-id="${option.id}"
                data-product-id="${product.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${product.id}">
                <div>
                <div class="delivery-option-date">
                    ${deliveryDate}
                </div>
                <div class="delivery-option-price">
                    ${deliveryPrice} Shipping
                </div>
                </div>
            </div>
        `;
    });

    return deliveryOptionsHTML;
  };

  document.querySelectorAll('.delivery-option')
  .forEach(element => {
      element.addEventListener('click', () => {
          const { productId, deliveryOptionId } = element.dataset;
          updateDeliveryOption(productId, deliveryOptionId);
          renderOrderSummary();
          renderPaymentSummary();
      });
  });

  document.querySelectorAll('.delete-quantity-link')
    .forEach(link => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            document.querySelector(`.js-${productId}`).remove();
            renderPaymentSummary();
        });
    });
}