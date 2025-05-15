function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cartContainer');

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Корзина пуста</h2>
                <p>Добавьте товары для оформления заказа</p>
                <a href="index.html" class="continue-shopping">Продолжить покупки</a>
            </div>
        `;
        return;
    }

    let cartHTML = `
        <div class="cart-items">
            ${cartItems.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div class="item-price">${(item.price * item.quantity).toLocaleString()} ₸</div>
                    <button class="remove-btn" onclick="removeItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('')}
        </div>
        <div class="cart-summary">
            <div class="summary-row">
                <span>Подытог:</span>
                <span>${calculateSubtotal(cartItems).toLocaleString()} ₸</span>
            </div>
            <div class="summary-row">
                <span>Доставка:</span>
                <span>${calculateDelivery(cartItems).toLocaleString()} ₸</span>
            </div>
            <div class="summary-row">
                <span>Итого:</span>
                <span>${(calculateSubtotal(cartItems) + calculateDelivery(cartItems)).toLocaleString()} ₸</span>
            </div>
            <button class="checkout-btn" onclick="checkout()">Оформить заказ</button>
        </div>
    `;

    cartContainer.innerHTML = cartHTML;
    showAddressSection();
}

function calculateSubtotal(cartItems) {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function calculateDelivery(cartItems) {
    const subtotal = calculateSubtotal(cartItems);
    return subtotal > 50000 ? 0 : 500; // Бесплатная доставка при заказе от 50000₸
}

// Показать индикатор загрузки
function showLoader() {
    document.getElementById('loader').style.display = 'block';
}
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

// Toast уведомления
function showToast(message, color = '#2ecc71') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.background = color;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function updateQuantity(productId, change) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity += change;

        if (cartItems[itemIndex].quantity <= 0) {
            cartItems.splice(itemIndex, 1);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCart();
        showToast('Количество изменено', '#3498db');
    }
}

function removeItem(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCart();
    showToast('Товар удалён из корзины', '#e67e22');
}

function openAddressModal() {
    document.getElementById('addressModal').style.display = 'flex';
}

function closeAddressModal() {
    document.getElementById('addressModal').style.display = 'none';
}

function openCardSelectModal() {
    document.getElementById('cardSelectModal').style.display = 'flex';
}

function closeCardSelectModal() {
    document.getElementById('cardSelectModal').style.display = 'none';
}

function checkout() {
    openAddressModal();
}

// --- Управление адресами доставки ---
function getCurrentUserEmail() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user && user.email ? user.email : null;
}

function getAddresses() {
    const email = getCurrentUserEmail();
    if (!email) return [];
    return JSON.parse(localStorage.getItem('addresses_' + email) || '[]');
}
function saveAddresses(addresses) {
    const email = getCurrentUserEmail();
    if (!email) return;
    localStorage.setItem('addresses_' + email, JSON.stringify(addresses));
}
function showAddressSection() {
    const section = document.getElementById('addressSection');
    const list = document.getElementById('addressList');
    const addresses = getAddresses();
    if (!addresses.length) {
        section.style.display = 'none';
        return;
    }
    section.style.display = '';
    list.innerHTML = addresses.map((addr, i) => `
        <div class="address-item${addr.selected ? ' selected' : ''}">
            <div>
                <b>${addr.city}, ${addr.street}, д.${addr.house}, кв.${addr.apartment}</b> (${addr.postcode})
            </div>
            <button onclick="editAddress(${i})">Редактировать</button>
            <button onclick="selectAddress(${i})">Выбрать</button>
            <button onclick="deleteAddress(${i})">Удалить</button>
        </div>
    `).join('');
}
function selectAddress(idx) {
    const addresses = getAddresses();
    addresses.forEach((a, i) => a.selected = i === idx);
    saveAddresses(addresses);
    showAddressSection();
    showToast('Адрес выбран', '#3498db');
}
function editAddress(idx) {
    const addresses = getAddresses();
    const addr = addresses[idx];
    document.getElementById('city').value = addr.city;
    document.getElementById('street').value = addr.street;
    document.getElementById('house').value = addr.house;
    document.getElementById('apartment').value = addr.apartment;
    document.getElementById('postcode').value = addr.postcode;
    document.getElementById('addressModalTitle').textContent = 'Редактировать адрес';
    openAddressModal();
    window._editAddressIdx = idx;
}
function deleteAddress(idx) {
    let addresses = getAddresses();
    addresses.splice(idx, 1);
    saveAddresses(addresses);
    showAddressSection();
    showToast('Адрес удалён', '#e67e22');
}
document.getElementById('addNewAddressBtn').onclick = function() {
    document.getElementById('addressForm').reset();
    document.getElementById('addressModalTitle').textContent = 'Добавить адрес';
    window._editAddressIdx = null;
    openAddressModal();
};

function submitAddress(event) {
    event.preventDefault();
    const city = document.getElementById('city').value.trim();
    const street = document.getElementById('street').value.trim();
    const house = document.getElementById('house').value.trim();
    const apartment = document.getElementById('apartment').value.trim();
    const postcode = document.getElementById('postcode').value.trim();
    if (!city || !street || !house || !apartment || !postcode) return;
    let addresses = getAddresses();
    const addrObj = {city, street, house, apartment, postcode, selected: true};
    addresses.forEach(a => a.selected = false);
    if (window._editAddressIdx != null) {
        addresses[window._editAddressIdx] = addrObj;
    } else {
        addresses.push(addrObj);
    }
    saveAddresses(addresses);
    closeAddressModal();
    showAddressSection();
    showToast('Адрес сохранён', '#2ecc71');
}

// --- Сохранение новых карт после оплаты ---
function processOrder() {
    showLoader();
    setTimeout(() => {
        hideLoader();
        // Сохраняем карту, если пользователь выбрал новую
        const selected = document.querySelector('input[name="cardOption"]:checked');
        if (selected && selected.value === 'new') {
            if (confirm('Сохранить эту карту для будущих покупок?')) {
                saveNewCard();
            }
        }
        showToast('Заказ успешно оформлен! Спасибо за покупку!');
        localStorage.removeItem('cartItems');
        closeCardSelectModal();
        setTimeout(() => window.location.href = 'index.html', 1200);
    }, 1500);
}
function saveNewCard() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const cardHolder = document.getElementById('cardHolder').value;
    const expiry = document.getElementById('expiry').value;
    const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
    savedCards.push({
        last4: cardNumber.slice(-4),
        holder: cardHolder,
        expiry: expiry,
        token: Math.random().toString(36).slice(2) // псевдотокен
    });
    localStorage.setItem('savedCards', JSON.stringify(savedCards));
}

// --- Удаление сохранённых карт ---
function loadSavedCards() {
    const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
    const container = document.getElementById('savedCardsContainer');
    container.innerHTML = '';
    if (savedCards.length > 0) {
        savedCards.forEach((card, idx) => {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'cardOption';
            radio.value = card.token;
            radio.id = 'card_' + idx;
            radio.onclick = () => document.getElementById('newCardFields').style.display = 'none';
            const label = document.createElement('label');
            label.htmlFor = radio.id;
            label.innerHTML = `Сохранённая карта •••• ${card.last4} (${card.holder}) <button type='button' onclick='deleteCard(${idx});event.stopPropagation();' style='margin-left:10px;color:#e74c3c;background:none;border:none;cursor:pointer;'>Удалить</button>`;
            container.appendChild(radio);
            container.appendChild(label);
            container.appendChild(document.createElement('br'));
        });
        const newCardRadio = document.querySelector('input[name="cardOption"][value="new"]');
        if (newCardRadio) newCardRadio.onclick = () => document.getElementById('newCardFields').style.display = '';
    }
}
function deleteCard(idx) {
    let savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
    savedCards.splice(idx, 1);
    localStorage.setItem('savedCards', JSON.stringify(savedCards));
    loadSavedCards();
    showToast('Карта удалена', '#e67e22');
}

document.getElementById('cardSelectForm').addEventListener('change', function(e) {
    if (e.target.name === 'cardOption') {
        if (e.target.value === 'new') {
            document.getElementById('newCardFields').style.display = '';
        } else {
            document.getElementById('newCardFields').style.display = 'none';
        }
    }
});

function submitCardSelect(event) {
    event.preventDefault();
    const selected = document.querySelector('input[name="cardOption"]:checked');
    if (!selected) return;
    if (selected.value === 'new') {
        if (!validateCard()) return;
    }
    processOrder();
}

function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    let formattedValue = '';

    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }

    input.value = formattedValue;

    const cardType = document.getElementById('cardType');
    if (value.startsWith('4')) {
        cardType.className = 'fab fa-cc-visa';
    } else if (value.startsWith('5')) {
        cardType.className = 'fab fa-cc-mastercard';
    } else {
        cardType.className = 'fas fa-credit-card';
    }
}

function formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0,2) + '/' + value.slice(2);
    }
    input.value = value;
}

function validateCard() {
    let isValid = true;
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const cardHolder = document.getElementById('cardHolder').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

    if (!/^\d{16}$/.test(cardNumber)) {
        showError('cardError', 'Неверный номер карты');
        isValid = false;
    }

    if (!/^[A-Z\s]{2,}$/.test(cardHolder)) {
        showError('holderError', 'Введите имя держателя');
        isValid = false;
    }

    const [month, year] = expiry.split('/');
    const now = new Date();
    const cardDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    if (!month || !year || cardDate < now) {
        showError('expiryError', 'Неверный срок действия');
        isValid = false;
    }

    if (!/^\d{3}$/.test(cvv)) {
        showError('cvvError', 'Неверный CVV');
        isValid = false;
    }

    return isValid;
}

function showError(elementId, message) {
    const error = document.getElementById(elementId);
    error.textContent = message;
    error.style.display = 'block';
}

function processPayment(event) {
    event.preventDefault();

    if (validateCard()) {
        const submitButton = event.target.querySelector('.submit-payment');
        submitButton.disabled = true;
        submitButton.textContent = 'Обработка...';

        setTimeout(() => {
            alert('Оплата прошла успешно! Спасибо за покупку!');
            localStorage.removeItem('cartItems');
            window.location.href = 'index.html';
        }, 2000);
    }
}

// Закрытие модальных окон при клике вне формы
window.onclick = function(event) {
    const addressModal = document.getElementById('addressModal');
    const cardModal = document.getElementById('cardSelectModal');
    if (event.target === addressModal) {
        closeAddressModal();
    }
    if (event.target === cardModal) {
        closeCardSelectModal();
    }
}

// Инициализация страницы
window.onload = displayCart;