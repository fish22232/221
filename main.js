// --- Firebase: подключение и инициализация ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDoHdSILGIuwEKKhGBqakW6FCnq3d_a25g",
    authDomain: "tehnolife-28881.firebaseapp.com",
    projectId: "tehnolife-28881",
    storageBucket: "tehnolife-28881.appspot.com",
    messagingSenderId: "1066453028101",
    appId: "1:1066453028101:web:18f612a71cde8462a23b6c",
    measurementId: "G-Y10QNEVDV9"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import products from './products.js';

// Отображение товаров
function displayProducts(productsToShow = products) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price.toLocaleString('ru-RU')} ₸</div>
                <div class="product-actions">
                    <button class="details-btn" onclick="showDetails(${product.id})">
                        <i class="fas fa-info-circle"></i> Подробнее
                    </button>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}); animateAddToCart(this);">
                        <i class="fas fa-shopping-cart"></i> В корзину
                    </button>
                    <button class="add-to-wishlist-btn" onclick="addToWishlist(${product.id})">
                        <i class="fas fa-heart"></i> В избранное
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// --- Добавление "ничего не найдено" при пустом поиске ---
function renderProducts(products) {
    const container = document.getElementById('productsContainer');
    if (!products || products.length === 0) {
        container.innerHTML = `
            <div class="not-found">
                <i class="fas fa-search-minus" style="font-size:48px;color:#2196F3"></i>
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить параметры поиска или выберите другую категорию.</p>
            </div>
        `;
        return;
    }
    displayProducts(products);
}

// Показ деталей товара
function showDetails(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-body">
                <img src="${product.image}" alt="${product.name}">
                <div class="modal-info">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <div class="specs">
                        <h3>Характеристики:</h3>
                        ${Object.entries(product.specs).map(([key, value]) => `
                            <div class="spec-item">
                                <span class="spec-name">${key}:</span>
                                <span class="spec-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="modal-price">${product.price.toLocaleString('ru-RU')} ₸</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}); animateAddToCart(this);">
                        <i class="fas fa-shopping-cart"></i> В корзину
                    </button>
                    <button class="add-to-wishlist-btn" onclick="addToWishlist(${product.id})">
                        <i class="fas fa-heart"></i> В избранное
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// --- Добавление в корзину через Firestore ---
async function addToCart(productId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showAddedToCartAnimation('Войдите в аккаунт, чтобы добавить товар в корзину', true);
        return;
    }
    const email = currentUser.email;
    const cartRef = doc(db, 'carts', email);
    const cartSnap = await getDoc(cartRef);
    let cartItems = cartSnap.exists() ? cartSnap.data().items : [];
    const product = products.find(p => p.id === productId);
    let existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }
    await setDoc(cartRef, { items: cartItems });
    updateCartCount();
    showAddedToCartAnimation();
}

// --- Анимация добавления в корзину ---
window.animateAddToCart = function(btn) {
    const icon = btn.querySelector('i')?.cloneNode(true) || document.createElement('span');
    icon.classList.add('cart-fly');
    btn.appendChild(icon);
    setTimeout(() => icon.remove(), 700);
};

// --- Обновление счетчика корзины через Firestore ---
async function updateCartCount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        document.querySelector('.cart-count').textContent = 0;
        return;
    }
    const email = currentUser.email;
    const cartRef = doc(db, 'carts', email);
    const cartSnap = await getDoc(cartRef);
    let cartItems = cartSnap.exists() ? cartSnap.data().items : [];
    const count = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.querySelector('.cart-count').textContent = count;
}

// Анимация добавления в корзину
function showAddedToCartAnimation(message = 'Товар добавлен в корзину', isError = false) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.background = isError ? '#e74c3c' : '#2ecc71';
    notification.style.position = 'fixed';
    notification.style.left = '50%';
    notification.style.bottom = '60px';
    notification.style.transform = 'translateX(-50%)';
    notification.style.zIndex = '3000';
    notification.style.padding = '18px 32px';
    notification.style.borderRadius = '10px';
    notification.style.fontSize = '17px';
    notification.style.boxShadow = '0 4px 16px rgba(44,62,80,0.15)';
    notification.style.color = '#fff';
    notification.style.opacity = '0.98';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2500);
}

// Фильтрация по категориям
function initCategoryFilters() {
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            const filteredProducts = category === 'all' 
                ? products 
                : products.filter(p => p.category === category);
            renderProducts(filteredProducts);
        });
    });
}

// Сортировка товаров
function sortProducts(type) {
    let sortedProducts = [...products];
    switch(type) {
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'brand':
            sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand));
            break;
        case 'popular':
            sortedProducts.sort((a, b) => (b.popular || 0) - (a.popular || 0));
            break;
        case 'new':
            sortedProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
    }
    renderProducts(sortedProducts);
}

// Поиск товаров
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });
}

// Боковое меню
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// --- Избранное (wishlist) через Firestore ---
async function addToWishlist(productId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        showAddedToCartAnimation('Войдите, чтобы добавить в избранное', true);
        return;
    }
    const email = currentUser.email;
    const wishlistRef = doc(db, 'wishlists', email);
    const wishlistSnap = await getDoc(wishlistRef);
    let wishlist = wishlistSnap.exists() ? wishlistSnap.data().items : [];
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        await setDoc(wishlistRef, { items: wishlist });
        showAddedToCartAnimation('Добавлено в избранное');
    } else {
        showAddedToCartAnimation('Уже в избранном', '#f39c12');
    }
}

async function removeFromWishlist(productId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    const email = currentUser.email;
    const wishlistRef = doc(db, 'wishlists', email);
    const wishlistSnap = await getDoc(wishlistRef);
    let wishlist = wishlistSnap.exists() ? wishlistSnap.data().items : [];
    wishlist = wishlist.filter(id => id !== productId);
    await setDoc(wishlistRef, { items: wishlist });
}

async function getWishlist() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return [];
    const email = currentUser.email;
    const wishlistRef = doc(db, 'wishlists', email);
    const wishlistSnap = await getDoc(wishlistRef);
    return wishlistSnap.exists() ? wishlistSnap.data().items : [];
}

// Отзывы и рейтинги (заглушка, UI и хранение реализовать отдельно)
function addReview(productId, rating, text) {
    let reviews = JSON.parse(localStorage.getItem('reviews_' + productId) || '[]');
    reviews.push({rating, text, date: Date.now()});
    localStorage.setItem('reviews_' + productId, JSON.stringify(reviews));
}

function getReviews(productId) {
    return JSON.parse(localStorage.getItem('reviews_' + productId) || '[]');
}

// --- Чат: бот печатает, emoji, быстрые вопросы ---
function addBotTyping() {
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.innerHTML = 'Бот печатает<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>';
    chatbotMessages.appendChild(typing);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return typing;
}
const quickQuestions = [
    'Как оформить заказ?',
    'Какие способы оплаты?',
    'Где находится магазин?',
    'Как работает доставка?',
    'Как получить бонусы?'
];
function showQuickQuestions() {
    if (chatbotMessages.querySelector('.quick-questions')) return;
    const quick = document.createElement('div');
    quick.className = 'quick-questions';
    quick.innerHTML = quickQuestions.map(q => `<button type="button">${q}</button>`).join('');
    chatbotMessages.appendChild(quick);
    quick.querySelectorAll('button').forEach(btn => {
        btn.onclick = () => {
            addMessage(btn.textContent, 'user');
            chatbotInput.value = '';
            quick.remove();
            handleBotAnswer(btn.textContent);
        };
    });
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
function handleBotAnswer(text) {
    const typing = addBotTyping();
    setTimeout(() => {
        typing.remove();
        const answer = getChatbotAnswer(text);
        addMessage(answer + ' 😊', 'bot');
        showQuickQuestions();
    }, 900);
}
if (typeof chatbotForm !== 'undefined') {
    chatbotForm.addEventListener('submit', e => {
        e.preventDefault();
        const text = chatbotInput.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        chatbotInput.value = '';
        handleBotAnswer(text);
    });
}

// Инициализация страницы
function initPage() {
    displayProducts();
    updateCartCount();
    initCategoryFilters();
    initSearch();
}

// Экспорт функций для глобального использования
window.addToCart = addToCart;
window.showDetails = showDetails;
window.toggleSidebar = toggleSidebar;
window.sortProducts = sortProducts;
window.addToWishlist = addToWishlist;
window.removeFromWishlist = removeFromWishlist;
window.getWishlist = getWishlist;

// Запуск инициализации при загрузке страницы
document.addEventListener('DOMContentLoaded', initPage);