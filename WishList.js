const closewishlist = document.getElementById('closeWishlistbtn');
const WishList = document.getElementById('wishTab');
let showingWishlist = document.getElementById('hearticon');
const WishListIcon = document.getElementById('hearticon');

closewishlist.addEventListener('click', function () {
    document.body.classList.remove('showWishlist');
});


WishListIcon.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent any default action on the anchor tag
    body.classList.toggle('showWishlist'); // Toggle the wishlist visibility
});

document.addEventListener('DOMContentLoaded', function() {
    // Function to update the quantity of an item
    function updateQuantity(itemDiv, change) {
        const quantityElement = itemDiv.querySelector('.quantity-value');
        let currentQuantity = parseInt(quantityElement.textContent, 10);
        let newQuantity = currentQuantity + change;

        // Ensure quantity does not go below 1
        if (newQuantity < 1) {
            newQuantity = 1;
        }

        quantityElement.textContent = newQuantity;
    }

    // Event delegation for dynamically added items
    document.getElementById('Wishlist').addEventListener('click', function(e) {
        if (e.target.classList.contains('minus')) {
            const itemDiv = e.target.closest('.item');
            updateQuantity(itemDiv, -1);
        } else if (e.target.classList.contains('plus')) {
            const itemDiv = e.target.closest('.item');
            updateQuantity(itemDiv, 1);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Function to update the quantity of an item
    function updateQuantity(itemDiv, change) {
        const quantityElement = itemDiv.querySelector('.quantity-value');
        let currentQuantity = parseInt(quantityElement.textContent, 10);
        let newQuantity = currentQuantity + change;

        // Ensure quantity does not go below 0
        if (newQuantity < 1) {
            // Remove the item from the cart if the quantity is 0
            itemDiv.remove();
        } else {
            // Update the quantity display
            quantityElement.textContent = newQuantity;
        }
    }

    // Event delegation for dynamically added items
    document.getElementById('Wishlist').addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('minus')) {
            const itemDiv = target.closest('.item');
            updateQuantity(itemDiv, -1);
        } else if (target.classList.contains('plus')) {
            const itemDiv = target.closest('.item');
            updateQuantity(itemDiv, 1);
        }
    });
     // Example function to add items to the cart (this can be replaced with your actual add-to-cart logic)
     function addToWishlist(item) {
        const Wishlist = document.getElementById('Wishlist');
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <div class="image">
                <img src="${item.imageSrc}" alt="${item.title}">
            </div>
            <div class="name">
                <a href="#" class="title-prod">${item.title}</a>
            </div>
            <div class="price">
                <span>${item.price}</span>
            </div>
            <div class="quantity">
                <span class="minus">-</span>
                <span class="quantity-value">1</span>
                <span class="plus">+</span>
            </div>
        `;
        Wishlist.appendChild(itemDiv);
    }

    // Example call to add an item to the cart (use your actual item data)
    addToWishlist({
        imageSrc: 'img/44.webp',
        title: 'Grey Graphic Tee Short Sleeve',
        price: '399 EGP'
    });
    addToWishlist({
        imageSrc: 'img/48.webp',
        title: 'Black Sports Tee Short Sleeve',
        price: '850 EGP'
    });
    addToWishlist({
        imageSrc: 'img/56.jpg',
        title: 'Grey Cat Eye Sunglasses',
        price: '60 EGP'
    });
    addToWishlist({
        imageSrc: 'img/45.webp', // Image source
        title: 'Green T-Shirt Short Sleeve', // Item title
        price: '400 EGP' // Item price
    });
    addToWishlist({
        imageSrc: 'img/54.webp', // Image source
        title: 'Brown Wide Leg Pants High Rise Textured Fabric', // Item title
        price: '1000 EGP' // Item price
    });

});


// Function to add an item to the cart
function addToWishlist(item) {
    // Get the cart list container
    const ListWish = document.querySelector('#Wishlist');

    // Create a new cart item element
    const WishListItem = document.createElement('div');
    WishListItem .classList.add('item');

    // Populate the cart item with HTML
    WishListItem .innerHTML = `
        <div class="image">
            <img src="${item.imageSrc}" alt="${item.title}">
        </div>
        <div class="name">
            <a href="#" class="title-prod">${item.title}</a>
        </div>
        <div class="price">
            <span>${item.price}</span>
        </div>
        <div class="quantity">
            <span class="minus">-</span>
            <span>1</span>
            <span class="plus">+</span>
        </div>
    `;

    // Append the new item to the cart list
    ListWish.appendChild(WishListItem);

    // Attach quantity controls functionality
    attachQuantityListeners(WishListItem);

    // Scroll to the bottom of the cart list
    ListWish.scrollTop = ListWish.scrollHeight;
}

// Function to attach quantity listeners for a cart item
function attachQuantityListeners(WishListItem) {
    const minusButton = WishListItem.querySelector('.minus');
    const plusButton = WishListItem.querySelector('.plus');
    const quantityElement = WishListItem.querySelector('.quantity span:nth-child(2)');

    minusButton.addEventListener('click', () => {
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
        }
    });

    plusButton.addEventListener('click', () => {
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
    });
}

// Function to handle adding products to the cart when the cart icon is clicked
function handleAddToWishlist(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Find the closest item container
    const itemElement = this.closest('.item');

    // Extract item details
    const item = {
        imageSrc: itemElement.querySelector('img').src,
        title: itemElement.querySelector('.title-prod').textContent,
        price: itemElement.querySelector('.price span').textContent
    };

    // Add item to the cart
    addToWishlist(item);
}

// Attach event listeners to all cart icons
document.querySelectorAll('.icon-product #hearticon').forEach(hearticon => {
    hearticon.addEventListener('click', handleAddToWishlist);
});
