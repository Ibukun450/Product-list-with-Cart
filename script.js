let cart = [];
let products = []; // Keep products empty initially

// Fetch the JSON data
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    products = data; // Set products to the fetched data
    generateProductHTML(products); // Call the function to generate the HTML for the products
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });

// Function to generate and append the HTML for the products
function generateProductHTML(products) {
  // Get the container where products will be added
  const productContainer = document.querySelector('.prod-cargo');
  
  // Loop through each product and create HTML elements dynamically
  products.forEach((product, index) => {
    // Create the product item container
    const prodItem = document.createElement('div');
    prodItem.classList.add('prod-items');

    // Create the product image container
    const prodImage = document.createElement('div');
    prodImage.classList.add('prod-image');

    // Set the image source based on the device type
    const img = document.createElement('img');
    img.classList.add('prod-item-image');
    img.src = product.image.desktop; // Choose the image for desktop by default
    img.alt = product.name;

    // Append the image to the product image container
    prodImage.appendChild(img);

    // Create the product info container (Add to Cart button)
    const prodInfo = document.createElement('div');
    prodInfo.classList.add('prod-info');
    
    const addToCartIcon = document.createElement('img');
    addToCartIcon.src = './assets/images/icon-add-to-cart.svg';
    addToCartIcon.alt = 'Add to Cart';
    
    const addToCartText = document.createElement('p');
    addToCartText.textContent = 'Add to Cart';

    // Append icon and text to the product info
    prodInfo.appendChild(addToCartIcon);
    prodInfo.appendChild(addToCartText);

    // Add event listener for Add to Cart button
    prodInfo.addEventListener('click', () => {
      addToCart(index); // Pass index to add to cart
    });
    
    // Append the product info to the image container
    prodImage.appendChild(prodInfo);

    // Create and set the product category
    const category = document.createElement('p');
    category.classList.add('item');
    category.textContent = product.category;

    // Create and set the product name
    const name = document.createElement('h4');
    name.classList.add('prod-name');
    name.textContent = product.name;

    // Create and set the product price
    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = `$${product.price.toFixed(2)}`;

    // Append everything to the product item container
    prodItem.appendChild(prodImage);
    prodItem.appendChild(category);
    prodItem.appendChild(name);
    prodItem.appendChild(price);

    // Finally, append the product item to the main product container
    productContainer.appendChild(prodItem);
  });
}

// Function to add an item to the cart
function addToCart(productIndex) {
    const product = products[productIndex];
    const itemIndex = cart.findIndex(item => item.name === product.name);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
        replaceAddToCartButton(productIndex);
    }

    updateCartUI();
    calculateTotal();
}

// Function to replace the "Add to Cart" button with increment and decrement buttons
function replaceAddToCartButton(productIndex) {
    const productCard = document.querySelectorAll('.prod-items')[productIndex];
    const prodInfo = productCard.querySelector('.prod-info');

    prodInfo.innerHTML = `
        <button class="btn" onclick="decrementQuantity(${productIndex})">-</button>
        <span class="quantity">1</span>
        <button class="btn" onclick="incrementQuantity(${productIndex})">+</button>
    `;
}

// Function to increment the quantity of an item in the cart
function incrementQuantity(productIndex) {
    const product = products[productIndex];
    const itemIndex = cart.findIndex(item => item.name === product.name);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
    }

    updateCartUI();
    updateProductCardQuantity(productIndex);
    calculateTotal();
}

// Function to decrement the quantity of an item in the cart
function decrementQuantity(productIndex) {
    const product = products[productIndex];
    const itemIndex = cart.findIndex(item => item.name === product.name);

    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
            restoreAddToCartButton(productIndex);
        }
    }

    updateCartUI();
    updateProductCardQuantity(productIndex);
    calculateTotal();
}

// Function to restore the "Add to Cart" button if quantity is reduced to zero
function restoreAddToCartButton(productIndex) {
    const productCard = document.querySelectorAll('.prod-items')[productIndex];
    const prodInfo = productCard.querySelector('.prod-info');

    prodInfo.innerHTML = `
        <img src="assets/images/icon-add-to-cart.svg" alt="Add to Cart">
        <button class="btn" onclick="addToCart(${productIndex})">Add to Cart</button>
    `;
}

// Function to update the quantity displayed on the product card
function updateProductCardQuantity(productIndex) {
    const productCard = document.querySelectorAll('.prod-items')[productIndex];
    const quantitySpan = productCard.querySelector('.quantity');
    const product = products[productIndex];
    const itemIndex = cart.findIndex(item => item.name === product.name);

    if (itemIndex > -1) {
        quantitySpan.textContent = cart[itemIndex].quantity;
    }
}

// Function to update the cart UI
function updateCartUI() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = ""; // Clear the current cart display

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <p>${item.name} x ${item.quantity}</p>
            <button class="btn" onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });

    document.getElementById("num-items").innerText = `(${cart.length})`;
}

// Function to calculate the total price of items in the cart
function calculateTotal() {
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    document.getElementById("total-price").innerText = `Total: $${total.toFixed(2)}`;
}
