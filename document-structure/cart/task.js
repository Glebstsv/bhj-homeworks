document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.product__quantity-control').forEach(control => {
    control.addEventListener('click', function() {
      const valueElement = this.closest('.product__quantity-controls').querySelector('.product__quantity-value');
      let value = parseInt(valueElement.textContent);
      
      if (this.classList.contains('product__quantity-control_dec')) {
        value = value > 1 ? value - 1 : 1;
      } else {
        value += 1;
      }
      
      valueElement.textContent = value;
    });
  });

  document.querySelectorAll('.product__add').forEach(button => {
    button.addEventListener('click', function() {
      const product = this.closest('.product');
      const productId = product.dataset.id;
      const productImage = product.querySelector('.product__image').src;
      const quantity = parseInt(product.querySelector('.product__quantity-value').textContent);
      
      const cartProduct = document.querySelector(`.cart__product[data-id="${productId}"]`);
      
      if (cartProduct) {
        const countElement = cartProduct.querySelector('.cart__product-count');
        countElement.textContent = parseInt(countElement.textContent) + quantity;
      } else {
        const cartProducts = document.querySelector('.cart__products');
        const newCartProduct = document.createElement('div');
        newCartProduct.className = 'cart__product';
        newCartProduct.dataset.id = productId;
        
        newCartProduct.innerHTML = `
          <img class="cart__product-image" src="${productImage}">
          <div class="cart__product-count">${quantity}</div>
        `;
        
        cartProducts.appendChild(newCartProduct);
      }
    });
  });
});