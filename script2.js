let cart = [];

const products = [
    {
        name: "Waffle with Berries",
        category: "Waffle",
        price: 6.50,
        image: "./assets/images/image-waffle-desktop.jpg"
    },
    {
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00,
        image: "./assets/images/image-creme-brulee-desktop.jpg"
    },
    {
        name: "Macaron Mix of Five",
        category: "Macaron",
        price: 8.00,
        image: "./assets/images/image-macaron-desktop.jpg"
    },
    {
        name: "Classic Tiramisu",
        category: "Tiramisu",
        price: 5.50,
        image: "./assets/images/image-tiramisu-desktop.jpg"
    },
    {
        name: "Pistachio Baklava",
        category: "Baklava",
        price: 4.00,
        image: "./assets/images/image-baklava-desktop.jpg"
    },
    {
        name: "Lemon Meringue Pie",
        category: "Pie",
        price: 5.00,
        image: "./assets/images/image-meringue-desktop.jpg"
    },
    {
        name: "Red Velvet Cake",
        category: "Cake",
        price: 4.50,
        image: "./assets/images/image-cake-desktop.jpg"
    },
    {
        name: "Salted Caramel Brownie",
        category: "Brownie",
        price: 4.50,
        image: "./assets/images/image-brownie-desktop.jpg"
    },
    {
        name: "Vanilla Panna Cotta",
        category: "Panna Cotta",
        price: 6.50,
        image: "./assets/images/image-panna-cotta-desktop.jpg"
    }
];

// Function to add an item to the cart
function addToCart(productIndex) {
    const product = products[productIndex];
    const itemIndex = cart.findIndex(item => item.name === product.name);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartUI();
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

// Populate the product list dynamically
const productContainer = document.querySelector('.prod-cargo');

products.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.className = 'prod-items';

    productCard.innerHTML = `
        <div class="prod-image">
            <img src="${product.image}" alt="" class="prod-item-image">
            <div class="prod-info">
            
                <img src="assets/images/icon-add-to-cart.svg" alt="Add to Cart">
                <button class="btn" onclick="addToCart(${index})">
                Add to Cart</button>
            </div>
        </div>
        <p class="item">${product.category}</p>
        <h4 class="prod-name">${product.name}</h4>
        <p class="price">$${product.price.toFixed(2)}</p>
    `;

    productContainer.appendChild(productCard);
});
