// --- Вход через localStorage ---
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const icon = document.querySelector('.toggle-password i');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}
window.togglePassword = togglePassword;

function showNotification(message, type = 'success') {
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    notification.textContent = message;
    notification.style.background = type === 'error' ? '#e74c3c' : '#2ecc71';
    notification.style.color = '#fff';
    notification.style.position = 'fixed';
    notification.style.left = '50%';
    notification.style.top = '30px';
    notification.style.transform = 'translateX(-50%)';
    notification.style.zIndex = '9999';
    notification.style.padding = '16px 32px';
    notification.style.borderRadius = '10px';
    notification.style.fontSize = '17px';
    notification.style.boxShadow = '0 4px 16px rgba(44,62,80,0.15)';
    notification.style.opacity = '0.98';
    notification.style.display = 'block';
    setTimeout(() => notification.remove(), 3000);
}
window.showNotification = showNotification;

function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        // Создаем токен авторизации
        const token = btoa(JSON.stringify({
            userId: user.email,
            name: user.name,
            exp: Date.now() + (7 * 24 * 60 * 60 * 1000)
        }));
        localStorage.setItem('auth_token', token);
        localStorage.setItem('currentUser', JSON.stringify({
            name: user.name,
            email: user.email
        }));
        showNotification('Вход выполнен успешно!');
        setTimeout(() => {
            window.location.href = 'personal-account.html';
        }, 1000);
    } else {
        showNotification('Неверный email или пароль', 'error');
    }
}
window.handleLogin = handleLogin;

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        try {
            const tokenData = JSON.parse(atob(token));
            if (tokenData.exp > Date.now()) {
                window.location.href = 'personal-account.html';
            }
        } catch (e) {
            localStorage.removeItem('auth_token');
        }
    }
});

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
}
['email', 'password'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                loginForm.requestSubmit();
            }
        });
    }
});