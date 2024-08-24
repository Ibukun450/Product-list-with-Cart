let cart = [];
let products = [];

// Fetch the JSON data
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    generateProductHTML(products); // Call the function to generate the HTML for the products
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });

// Function to generate and append the HTML for the products
function generateProductHTML(products) {
  const productContainer = document.querySelector('.prod-cargo');

  products.forEach((product, index) => {
    const prodItem = document.createElement('div');
    prodItem.classList.add('prod-items');

    const prodImage = document.createElement('div');
    prodImage.classList.add('prod-image');

    const img = document.createElement('img');
    img.classList.add('prod-item-image');
    img.src = product.image.desktop || './assets/images/default-image.jpg'; // Fallback image
    img.alt = product.name;
    img.onerror = () => { img.src = './assets/images/default-image.jpg'; }; // Error handler

    prodImage.appendChild(img);

    const prodInfo = document.createElement('div');
    prodInfo.classList.add('prod-info');

    const addToCartIcon = document.createElement('img');
    addToCartIcon.src = './assets/images/icon-add-to-cart.svg';
    addToCartIcon.alt = 'Add to Cart';

    const addToCartText = document.createElement('p');
    addToCartText.textContent = 'Add to Cart';

    prodInfo.appendChild(addToCartIcon);
    prodInfo.appendChild(addToCartText);

    // Attach "Add to Cart" functionality
    prodInfo.addEventListener('click', () => addToCart(index));

    prodImage.appendChild(prodInfo);

    const category = document.createElement('p');
    category.classList.add('item');
    category.textContent = product.category;

    const name = document.createElement('h4');
    name.classList.add('prod-name');
    name.textContent = product.name;

    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = `$${product.price.toFixed(2)}`;

    prodItem.appendChild(prodImage);
    prodItem.appendChild(category);
    prodItem.appendChild(name);
    prodItem.appendChild(price);

    productContainer.appendChild(prodItem);
  });
}// Increment product quantity
function incrementQuantity(productIndex) {
  const product = products[productIndex];
  const cartItem = cart.find(item => item.name === product.name);

  if (cartItem) {
    cartItem.quantity -= 1;
    updateProductCardQuantity(productIndex);
  }

  updateCartUI();
  calculateTotal();
}

// Decrement product quantity
function decrementQuantity(productIndex) {
  const product = products[productIndex];
  const cartItemIndex = cart.findIndex(item => item.name === product.name);

  if (cartItemIndex > -1) {
    const cartItem = cart[cartItemIndex];

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      updateProductCardQuantity(productIndex);
    } else {
      cart.splice(cartItemIndex, 1);
      restoreAddToCartButton(productIndex);
    }
  }

  updateCartUI();
  calculateTotal();
}

// Add product to cart
function addToCart(productIndex) {
  const product = products[productIndex];
  const cartItem = cart.find(item => item.name === product.name);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
    replaceAddToCartButton(productIndex);
  }

  updateCartUI();
  calculateTotal();
}

// Replace "Add to Cart" with increment/decrement buttons
function replaceAddToCartButton(productIndex) {
  const productCard = document.querySelectorAll('.prod-items')[productIndex];
  const prodInfo = productCard.querySelector('.prod-info');

  prodInfo.innerHTML = ''; // Clear current content

  const decrementBtn = document.createElement('button');
  decrementBtn.classList.add('btn');
  decrementBtn.textContent = '-';
  decrementBtn.addEventListener('click', () => decrementQuantity(productIndex));

  const quantitySpan = document.createElement('span');
  quantitySpan.classList.add('quantity');
  quantitySpan.textContent = '1'; // Start with quantity 1

  const incrementBtn = document.createElement('button');
  incrementBtn.classList.add('btn');
  incrementBtn.textContent = '+';
  incrementBtn.addEventListener('click', () => incrementQuantity(productIndex));

  prodInfo.appendChild(decrementBtn);
  prodInfo.appendChild(quantitySpan);
  prodInfo.appendChild(incrementBtn);
}



// Restore "Add to Cart" button when item quantity becomes 0
function restoreAddToCartButton(productIndex) {
  const productCard = document.querySelectorAll('.prod-items')[productIndex];
  const prodInfo = productCard.querySelector('.prod-info');

  prodInfo.innerHTML = ''; // Clear current content

  const addToCartIcon = document.createElement('img');
  addToCartIcon.src = './assets/images/icon-add-to-cart.svg';
  addToCartIcon.alt = 'Add to Cart';

  const addToCartText = document.createElement('p');
  addToCartText.textContent = 'Add to Cart';

  prodInfo.appendChild(addToCartIcon);
  prodInfo.appendChild(addToCartText);

  prodInfo.addEventListener('click', () => addToCart(productIndex));
}

// Update the product card's quantity
function updateProductCardQuantity(productIndex) {
  const productCard = document.querySelectorAll('.prod-items')[productIndex];
  const quantitySpan = productCard.querySelector('.quantity');
  const cartItem = cart.find(item => item.name === products[productIndex].name);

  if (quantitySpan && cartItem) {
    quantitySpan.textContent = cartItem.quantity;
  }
}

// Update the cart UI
function updateCartUI() {
  const cartListImg = document.getElementById('cart-list-img');
  cartListImg.innerHTML = ''; // Clear cart display

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <p>${item.name} x ${item.quantity}</p>
      <button class="btn" onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    cartListImg.appendChild(cartItem);
  });

  document.getElementById('num-items').innerText = `(${cart.length})`;
}

// Calculate and display total price
function calculateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('total-price').innerText = `Total: $${total.toFixed(2)}`;
}

// Remove an item from the cart
function removeFromCart(itemName) {
  const itemIndex = cart.findIndex(item => item.name === itemName);

  if (itemIndex > -1) {
    cart.splice(itemIndex, 1);
    updateCartUI();
    calculateTotal();
    const productIndex = products.findIndex(product => product.name === itemName);
    if (productIndex > -1) {
      restoreAddToCartButton(productIndex);
    }
  }
}
