class CardSecurity {
    constructor() {
        this.API_URL = 'https://api.your-domain.com'; // Заменить на реальный URL API
    }

    // Валидация номера карты по алгоритму Луна
    validateCardNumber(number) {
        let sum = 0;
        let isEven = false;

        // Удаляем все пробелы из номера карты
        number = number.replace(/\s/g, '');

        // Проверяем длину номера карты
        if (number.length !== 16) {
            return false;
        }

        // Проверяем, что номер состоит только из цифр
        if (!/^\d+$/.test(number)) {
            return false;
        }

        // Алгоритм Луна
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

    // Валидация срока действия карты
    validateExpiryDate(expiry) {
        const [month, year] = expiry.split('/');
        const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const now = new Date();
        return expDate > now;
    }

    // Валидация CVV
    validateCVV(cvv) {
        return /^\d{3}$/.test(cvv);
    }

    // Валидация имени держателя карты
    validateCardHolder(name) {
        return /^[A-Z\s]+$/.test(name) && name.length >= 3;
    }

    // Отправка данных карты на сервер
    async sendCardData(cardData) {
        try {
            // В реальном проекте здесь должна быть отправка на защищенный сервер
            // через HTTPS с использованием токенизации
            console.log('Отправка данных карты...');

            // Эмуляция ответа сервера
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        success: true,
                        message: 'Карта успешно привязана'
                    });
                }, 1000);
            });

        } catch (error) {
            console.error('Ошибка при отправке данных карты:', error);
            throw new Error('Ошибка при привязке карты');
        }
    }

    // Форматирование номера карты
    formatCardNumber(value) {
        return value.replace(/\D/g, '')
                   .replace(/(.{4})/g, '$1 ')
                   .trim();
    }

    // Форматирование срока действия
    formatExpiryDate(value) {
        return value.replace(/\D/g, '')
                   .replace(/^(\d{2})(\d)/, '$1/$2');
    }
}

// Добавляем в глобальную область видимости
window.CardSecurity = CardSecurity;