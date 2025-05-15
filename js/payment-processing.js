class PaymentProcessor {
    constructor() {
        this.API_URL = 'https://api.your-payment-gateway.com'; // Замените на реальный платежный шлюз
        this.initializeListeners();
    }

    initializeListeners() {
        // Обновление превью карты в реальном времени
        document.getElementById('cardNumber').addEventListener('input', (e) => {
            const value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
            e.target.value = value;
            document.getElementById('numberPreview').textContent = value || '**** **** **** ****';
        });

        document.getElementById('cardHolder').addEventListener('input', (e) => {
            const value = e.target.value.toUpperCase();
            e.target.value = value;
            document.getElementById('holderPreview').textContent = value || 'ИМЯ ФАМИЛИЯ';
        });

        document.getElementById('expiryDate').addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.substr(0, 2) + '/' + value.substr(2);
            }
            e.target.value = value;
            document.getElementById('expiryPreview').textContent = value || 'MM/ГГ';
        });
    }

    // Валидация данных карты
    validateCard(cardData) {
        const validations = {
            number: this.validateCardNumber(cardData.number),
            expiry: this.validateExpiry(cardData.expiry),
            cvv: this.validateCVV(cardData.cvv),
            holder: this.validateHolder(cardData.holder)
        };

        return Object.values(validations).every(v => v === true);
    }

    // Алгоритм Луна для проверки номера карты
    validateCardNumber(number) {
        number = number.replace(/\s/g, '');
        if (!/^\d{16}$/.test(number)) return false;

        let sum = 0;
        let isEven = false;

        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number[i]);

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 === 0;
    }

    validateExpiry(expiry) {
        const [month, year] = expiry.split('/');
        const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
        return expDate > new Date();
    }

    validateCVV(cvv) {
        return /^\d{3}$/.test(cvv);
    }

    validateHolder(holder) {
        return /^[A-Z\s]{3,}$/.test(holder);
    }

    // Токенизация данных карты
    async tokenizeCard(cardData) {
        try {
            // В реальном проекте здесь должен быть запрос к платежному шлюзу
            const token = await this.mockTokenization(cardData);
            return token;
        } catch (error) {
            console.error('Ошибка токенизации:', error);
            throw new Error('Не удалось защитить данные карты');
        }
    }

    // Имитация токенизации (замените на реальную)
    async mockTokenization(cardData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const token = btoa(JSON.stringify({
                    lastFour: cardData.number.slice(-4),
                    expiry: cardData.expiry,
                    timestamp: Date.now()
                }));
                resolve(token);
            }, 1000);
        });
    }

    // Сохранение карты в профиле пользователя
    async saveCard(token) {
        try {
            // Здесь должен быть запрос к вашему бэкенду
            const response = await fetch('/api/save-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({ token })
            });

            if (!response.ok) throw new Error('Ошибка сохранения карты');
            return await response.json();
        } catch (error) {
            console.error('Ошибка сохранения карты:', error);
            throw error;
        }
    }

    // Показ уведомления
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
}

// Инициализация обработчика платежей
const paymentProcessor = new PaymentProcessor();

// Обработка отправки формы
document.getElementById('cardForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const cardData = {
        number: document.getElementById('cardNumber').value.replace(/\s/g, ''),
        expiry: document.getElementById('expiryDate').value,
        cvv: document.getElementById('cvv').value,
        holder: document.getElementById('cardHolder').value
    };

    try {
        if (!paymentProcessor.validateCard(cardData)) {
            throw new Error('Проверьте правильность введенных данных');
        }

        const token = await paymentProcessor.tokenizeCard(cardData);
        await paymentProcessor.saveCard(token);

        paymentProcessor.showNotification('Карта успешно привязана!');
        setTimeout(() => {
            window.location.href = '/personal-account.html';
        }, 2000);
    } catch (error) {
        paymentProcessor.showNotification(error.message, 'error');
    }
});