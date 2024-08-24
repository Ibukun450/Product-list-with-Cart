// Fetch the JSON data
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    // Call a function to generate the HTML for the products
    generateProductHTML(data);
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });

// Function to generate and append the HTML for the products
function generateProductHTML(products) {
  // Get the container where products will be added
  const productContainer = document.querySelector('.prod-cargo');
  
  // Loop through each product and create HTML elements dynamically
  products.forEach(product => {
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
