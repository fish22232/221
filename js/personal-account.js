// Отображение профиля текущего пользователя
function showCurrentUserProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    document.getElementById('profileName').textContent = currentUser.name || '';
    document.getElementById('profileEmail').textContent = currentUser.email || '';
}

// --- История заказов ---
function getCurrentUserEmail() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user && user.email ? user.email : null;
}

function getOrders() {
    const email = getCurrentUserEmail();
    if (!email) return [];
    return JSON.parse(localStorage.getItem('orders_' + email) || '[]');
}
function saveOrders(orders) {
    const email = getCurrentUserEmail();
    if (!email) return;
    localStorage.setItem('orders_' + email, JSON.stringify(orders));
}

function renderOrdersHistory() {
    const container = document.getElementById('ordersHistory');
    const orders = getOrders();
    if (!orders.length) {
        container.innerHTML = '<div style="color:#888;">Нет заказов</div>';
        return;
    }
    container.innerHTML = `<table style="width:100%;font-size:15px;border-collapse:collapse;">
        <tr style='background:#f5f7fa;'><th>Дата</th><th>Товары</th><th>Адрес</th><th>Статус</th><th></th></tr>
        ${orders.map((o,i) => `
            <tr style='border-bottom:1px solid #eee;'>
                <td>${new Date(o.date).toLocaleString()}</td>
                <td>${o.items.map(it => `${it.name} (${it.quantity} шт.)`).join('<br>')}</td>
                <td>${o.address ? `${o.address.city}, ${o.address.street}, д.${o.address.house}, кв.${o.address.apartment}` : '-'}</td>
                <td>${o.status || 'Выполнен'}</td>
                <td><button onclick="repeatOrder(${i})" style='background:#2196F3;color:#fff;border:none;padding:6px 12px;border-radius:5px;cursor:pointer;'>Повторить</button></td>
            </tr>
        `).join('')}</table>`;
}

window.repeatOrder = function(idx) {
    const orders = getOrders();
    const order = orders[idx];
    if (!order) return;
    // Кладём товары в корзину
    localStorage.setItem('cartItems', JSON.stringify(order.items));
    window.location.href = 'cart.html';
}

// --- История бонусов и прогресс ---
function getBonusesHistory() {
    const email = getCurrentUserEmail();
    if (!email) return [];
    return JSON.parse(localStorage.getItem('bonusesHistory_' + email) || '[]');
}
function saveBonusesHistory(history) {
    const email = getCurrentUserEmail();
    if (!email) return;
    localStorage.setItem('bonusesHistory_' + email, JSON.stringify(history));
}
function renderBonusesHistory() {
    const container = document.getElementById('bonusesHistory');
    const history = getBonusesHistory();
    if (!history.length) {
        container.innerHTML = '<div style="color:#888;">Нет операций</div>';
        return;
    }
    container.innerHTML = `<ul style='list-style:none;padding:0;'>${history.map(h =>
        `<li style='margin-bottom:7px;'>
            <span style='color:${h.amount>0?'#2196F3':'#e74c3c'};font-weight:bold;'>${h.amount>0?'+':''}${h.amount}</span>
            <span style='color:#555;'>${h.desc||''}</span>
            <span style='float:right;color:#aaa;font-size:12px;'>${new Date(h.date).toLocaleDateString()}</span>
        </li>`).join('')}</ul>`;
}
function renderBonusesProgress() {
    const email = getCurrentUserEmail();
    if (!email) return;
    const amount = parseInt(localStorage.getItem('bonuses_' + email) || '0', 10);
    const max = 10000;
    const percent = Math.min(100, Math.round(amount/max*100));
    document.getElementById('bonusesProgress').innerHTML = `
        <div style='background:#e3eafc;border-radius:8px;height:18px;overflow:hidden;margin-bottom:6px;'>
            <div style='background:#2196F3;width:${percent}%;height:100%;transition:width 0.5s;'></div>
        </div>
        <div style='font-size:14px;color:#555;'>${amount} / ${max} бонусов</div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    showCurrentUserProfile();
    renderOrdersHistory();
    renderBonusesHistory();
    renderBonusesProgress();
});