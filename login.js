// Login functionality
document.addEventListener('DOMContentLoaded', () => {
    // Login button click
    const loginFormBtn = document.getElementById('login-btn');
    if (loginFormBtn) {
        loginFormBtn.addEventListener('click', () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username === 'admin' && password === 'password') {
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'index.html';
            } else {
                alert('Invalid credentials. Try username: admin, password: password');
            }
        });
    }
});
