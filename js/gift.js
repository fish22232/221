// Данные о картах
const cardDetails = {
    'standard': {
        title: 'Стандартная карта',
        amount: '100 000 ₸',
        validity: '6 месяцев',
        features: [
            'Базовая скидка 3% на все товары',
            'Участие в сезонных распродажах',
            'Бесплатная доставка при заказе от 50 000 ₸',
            'Накопление бонусных баллов (1% от покупок)',
            'Доступ к базовым акциям магазина'
        ],
        benefits: [
            { icon: 'fa-gift', title: 'Приветственный бонус', desc: '1000 бонусных баллов' },
            { icon: 'fa-truck', title: 'Доставка', desc: 'Стандартная доставка' },
            { icon: 'fa-clock', title: 'Поддержка', desc: 'В рабочие часы' }
        ]
    },
    'silver': {
        title: 'Серебряная карта',
        amount: '250 000 ₸',
        validity: '12 месяцев',
        features: [
            'Скидка 5% на все товары',
            'Приоритетное обслуживание',
            'Бесплатная доставка при заказе от 30 000 ₸',
            'Увеличенное накопление бонусов (2% от покупок)',
            'Доступ к эксклюзивным акциям',
            'Расширенная гарантия +6 месяцев'
        ],
        benefits: [
            { icon: 'fa-gift', title: 'Приветственный бонус', desc: '3000 бонусных баллов' },
            { icon: 'fa-truck', title: 'Доставка', desc: 'Приоритетная доставка' },
            { icon: 'fa-clock', title: 'Поддержка', desc: 'Расширенная поддержка' }
        ]
    },
    'gold': {
        title: 'Золотая карта',
        amount: '500 000 ₸',
        validity: '24 месяца',
        features: [
            'Скидка 7% на все товары',
            'VIP-обслуживание',
            'Бесплатная доставка на все заказы',
            'Двойные бонусные баллы (3% от покупок)',
            'Эксклюзивный предварительный доступ к новинкам',
            'Расширенная гарантия +12 месяцев',
            'Персональный менеджер'
        ],
        benefits: [
            { icon: 'fa-gift', title: 'Приветственный бонус', desc: '5000 бонусных баллов' },
            { icon: 'fa-truck', title: 'Доставка', desc: 'Экспресс-доставка' },
            { icon: 'fa-clock', title: 'Поддержка', desc: '24/7 поддержка' }
        ]
    },
    'platinum': {
        title: 'Платиновая карта',
        amount: '1 000 000 ₸',
        validity: '36 месяцев',
        features: [
            'Скидка 10% на все товары',
            'Премиум VIP-обслуживание',
            'Бесплатная экспресс-доставка',
            'Максимальные бонусы (4% от покупок)',
            'Приоритетный доступ к новинкам и предзаказам',
            'Пожизненная расширенная гарантия',
            'Персональный VIP-менеджер',
            'Специальные мероприятия для премиум-клиентов'
        ],
        benefits: [
            { icon: 'fa-gift', title: 'Приветственный бонус', desc: '10000 бонусных баллов' },
            { icon: 'fa-truck', title: 'Доставка', desc: 'VIP экспресс-доставка' },
            { icon: 'fa-clock', title: 'Поддержка', desc: 'Приоритетная 24/7' }
        ]
    },
    'diamond': {
        title: 'Бриллиантовая карта',
        amount: '1 500 000 ₸',
        validity: 'Бессрочно',
        features: [
            'Скидка 12% на все товары',
            'Элитное VIP-обслуживание',
            'Персональная служба доставки',
            'Максимальные бонусы (5% от покупок)',
            'Эксклюзивный доступ к лимитированным коллекциям',
            'Пожизненная гарантия на все покупки',
            'Персональный консьерж-сервис',
            'Участие в закрытых мероприятиях'
        ],
        benefits: [
            { icon: 'fa-gift', title: 'Приветственный бонус', desc: '15000 бонусных баллов' },
            { icon: 'fa-truck', title: 'Доставка', desc: 'Премиум-доставка' },
            { icon: 'fa-clock', title: 'Поддержка', desc: 'Персональная линия' }
        ]
    },
    'elite': {
        title: 'Elite карта',
        amount: '2 000 000 ₸',
        validity: 'Бессрочно',
        features: [
            'Скидка 15% на все товары',
            'Индивидуальное VIP-обслуживание',
            'Личный водитель для доставки',
            'Элитные бонусы (6% от покупок)',
            'Ранний доступ к новым коллекциям',
            'Пожизненное обслуживание премиум-класса',
            'Закрепленный персональный менеджер',
            'Приглашения на закрытые презентации'
        ],
        benefits: [
            { icon: 'fa-gift', title: 'Приветственный бонус', desc: '20000 бонусных баллов' },
            { icon: 'fa-truck', title: 'Доставка', desc: 'Elite доставка' },
            { icon: 'fa-clock', title: 'Поддержка', desc: 'Персональный помощник' }
        ]
    },
    'vip': {
        title: 'VIP карта',
        amount: '5 000 000 ₸',
        validity: 'Бессрочно',
        features: [
            'Скидка 20% на все товары',
            'Абсолютный приоритет обслуживания',
            'Персональная логистическая служба',
            'VIP бонусы (8% от покупок)',
            'Эксклюзивные предложения',
            'Пожизненная премиальная поддержка',
            'Команда персональных менеджеров',
            'Организация частных показов'
        ],
        benefits: [
            { icon: 'fa-gift', title: 'Приветственный бонус', desc: '50000 бонусных баллов' },
            { icon: 'fa-truck', title: 'Доставка', desc: 'VIP-флот' },
            { icon: 'fa-clock', title: 'Поддержка', desc: 'Личная команда' }
        ]
    },
    'supreme': {
        title: 'Supreme карта',
        amount: '10 000 000 ₸',
        validity: 'Пожизненно',
        features: [
            'Индивидуальная система скидок до 25%',
            'Безлимитные привилегии',
            'Персональный консьерж 24/7',
            'Максимальные бонусы (10% от покупок)',
            'Доступ к коллекционным моделям',
            'Пожизненное премиум-обслуживание',
            'Выделенная команда специалистов',
            'Эксклюзивные мероприятия'
        ],
        benefits: [
            { icon: 'fa-gift', title: 'Приветственный бонус', desc: '100000 бонусных баллов' },
            { icon: 'fa-truck', title: 'Доставка', desc: 'Supreme доставка' },
            { icon: 'fa-clock', title: 'Поддержка', desc: 'Персональный офис' }
        ]
    }
};

// Функции для информационного модального окна
function showCardDetails(cardType) {
    const modal = document.getElementById('cardModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const details = cardDetails[cardType];

    modalTitle.textContent = details.title;

    let content = `
        <div class="card-validity">
            <h3><i class="fas fa-clock"></i> Срок действия: ${details.validity}</h3>
            <p>Номинал карты: ${details.amount}</p>
        </div>

        <h3 style="margin-top: 30px;">Преимущества карты:</h3>
        <ul class="features-list">
            ${details.features.map(feature => `
                <li><i class="fas fa-check-circle"></i> ${feature}</li>
            `).join('')}
        </ul>

        <div class="benefits-grid">
            ${details.benefits.map(benefit => `
                <div class="benefit-item">
                    <i class="fas ${benefit.icon}"></i>
                    <h4>${benefit.title}</h4>
                    <p>${benefit.desc}</p>
                </div>
            `).join('')}
        </div>
    `;

    modalContent.innerHTML = content;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('cardModal').style.display = 'none';
}

// Функции для платежного модального окна
function showPaymentModal(cardType) {
    const modal = document.getElementById('paymentModal');
    const amount = document.getElementById('paymentAmount');
    const details = cardDetails[cardType];

    amount.textContent = details.amount;
    modal.style.display = 'block';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// Форматирование ввода данных карты
document.addEventListener('DOMContentLoaded', function() {
    // Форматирование номера карты
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(.{4})/g, '$1 ').trim();
            e.target.value = value;
        });
    }

    // Форматирование даты
    const expiryDate = document.getElementById('expiryDate');
    if (expiryDate) {
        expiryDate.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0,2) + '/' + value.slice(2,4);
            }
            e.target.value = value;
        });
    }

    // Форматирование CVV
    const cvv = document.getElementById('cvv');
    if (cvv) {
        cvv.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            e.target.value = value;
        });
    }

    // Форматирование имени владельца
    const cardHolder = document.getElementById('cardHolder');
    if (cardHolder) {
        cardHolder.addEventListener('input', function(e) {
            let value = e.target.value.toUpperCase();
            e.target.value = value;
        });
    }

    // Обновление обработчиков кнопок "Купить"
    document.querySelectorAll('.btn-buy').forEach(button => {
        button.onclick = function() {
            const cardType = this.closest('.gift-card').classList[1].replace('card-', '');
            showPaymentModal(cardType);
        };
    });
});

// Обработка отправки формы оплаты
function processPayment(event) {
    event.preventDefault();

    // Базовая валидация
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardHolder = document.getElementById('cardHolder').value;

    if (cardNumber.length !== 16) {
        alert('Пожалуйста, введите корректный номер карты');
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert('Пожалуйста, введите корректную дату');
        return;
    }

    if (cvv.length !== 3) {
        alert('Пожалуйста, введите корректный CVV код');
        return;
    }

    if (cardHolder.length < 3) {
        alert('Пожалуйста, введите имя владельца карты');
        return;
    }

    // Здесь должна быть отправка данных на сервер
    // В демо-версии просто показываем уведомление об успехе

    closePaymentModal();
    const notification = document.getElementById('notification');
    notification.textContent = 'Оплата успешно выполнена!';
    notification.style.display = 'block';

    // Очистка формы
    document.getElementById('paymentForm').reset();

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Закрытие модальных окон при клике вне их
window.onclick = function(event) {
    const cardModal = document.getElementById('cardModal');
    const paymentModal = document.getElementById('paymentModal');

    if (event.target == cardModal) {
        cardModal.style.display = 'none';
    }
    if (event.target == paymentModal) {
        paymentModal.style.display = 'none';
    }
}