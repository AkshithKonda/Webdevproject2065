// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartBtn = document.querySelector('.cart-btn');
const cartCountEl = document.querySelector('.cart-count');

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
}

// Add item to cart
function addToCart(product, price) {
    const existingItem = cart.find(item => item.product === product);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ product, price: parseFloat(price), quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    cartBtn.style.animation = 'bounce 0.5s ease';
    setTimeout(() => {
        cartBtn.style.animation = '';
    }, 500);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCartModal();
}

// Update item quantity
function updateQuantity(index, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showCartModal();
    }
}

// Calculate total price
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}

// Show cart modal
function showCartModal() {
    const modal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.product}</span>
                <span>$${item.price}</span>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItems.appendChild(itemElement);
        });
    }
    cartTotal.textContent = `Total: $${calculateTotal()}`;
    modal.style.display = 'block';
}

// Hide cart modal
function hideCartModal() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Checkout
function checkout() {
    alert(`Checkout successful! Total: $${calculateTotal()}`);
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    hideCartModal();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.getAttribute('data-product');
            const price = btn.getAttribute('data-price');
            addToCart(product, price);
        });
    });

    // Cart button click
    cartBtn.addEventListener('click', showCartModal);

    // Create cart modal
    const modalHTML = `
        <div id="cart-modal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="hideCartModal()">&times;</span>
                <h2>Your Cart</h2>
                <div id="cart-items"></div>
                <div id="cart-total"></div>
                <button onclick="checkout()">Checkout</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
});
