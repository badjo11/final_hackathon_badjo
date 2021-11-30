export const calcSubPrice = (product) => {
  return product.count * product.product.price;
};
export const calcTotalPrice = (cart) => {
  let sum = 0;
  cart.products.forEach((element) => {
    sum += element.subPrice;
  });
  return sum;
};
