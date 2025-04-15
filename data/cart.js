export let cart;

loadFromStorage();
export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem = cart.find(item => item.productId === productId);

  if (matchingItem) {
      matchingItem.quantity++;
  } else {
      cart.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1',
      });
  };
  saveToStorage();
};

export function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    cart.forEach(item => {
        if (item.productId === productId) {
            item.deliveryOptionId = deliveryOptionId;
        }
    });
    saveToStorage();
}