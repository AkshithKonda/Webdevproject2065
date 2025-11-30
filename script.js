// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat, .category-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    contactForm.reset();
});

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (email) {
            alert('Thank you for subscribing! You\'ll receive our latest updates.');
            newsletterForm.querySelector('input').value = '';
        }
    });
}



// Event listeners
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

    // Login button click
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        // Hide login button if user is logged in
        if (localStorage.getItem('loggedIn') === 'true') {
            loginBtn.style.display = 'none';
        } else {
            loginBtn.addEventListener('click', () => {
                window.location.href = 'login.html';
            });
        }
    }

    // Login button click
    const loginFormBtn = document.getElementById('login-btn');
    if (loginFormBtn) {
        loginFormBtn.addEventListener('click', () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username === 'admin' && password === 'password') {
                alert('Login successful!');
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'index.html';
            } else {
                alert('Invalid credentials. Try username: admin, password: password');
            }
        });
    }

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

// Add bounce animation for cart
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
`;
document.head.appendChild(style);

// Search functionality (dummy)
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        alert(`Searching for: ${query}`);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
