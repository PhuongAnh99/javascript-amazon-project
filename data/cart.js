export const cart = [{
    productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
    quantity: 2
}, {
    productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    quantity: 5
}, {
    productId: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    quantity: 1
}];

export function addToCart(productId) {
  let matchingItem;
  cart.forEach(item => {
      if (item.productId === productId) {
          matchingItem = item;
      }
  });

  if (matchingItem) {
      matchingItem.quantity++;
  } else {
      cart.push({
          productId: productId,
          quantity: 1
      });
  };
};