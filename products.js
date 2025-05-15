const products = [
    {
        id: 1,
        name: "Холодильник Samsung RF50",
        description: "Двухкамерный холодильник с системой No Frost, инверторный компрессор, зона свежести, LED освещение",
        price: 494994,
        image: "images/download.jpg",
        category: "Холодильники",
        brand: "Samsung",
        specs: {
            height: "178 см",
            width: "90 см", 
            volume: "500 л",
            energyClass: "A++",
        }
    },
    {
        id: 2,
        name: "Стиральная машина LG F2J3NS0W",
        description: "Автоматическая стиральная машина с прямым приводом, 6.5 кг загрузки, 1200 об/мин",
        price: 181494,
        image: "images/str.jpg",
        category: "Стиральные машины", 
        brand: "LG",
        specs: {
            capacity: "6.5 кг",
            speed: "1200 об/мин",
            programs: "14",
            energyClass: "A++",
        }
    },
    {
        id: 3,
        name: "Микроволновая печь Panasonic NN-GT261W",
        description: "Микроволновка с грилем, 800 Вт, объем 20 л, электронное управление",
        price: 71494,
        image: "images/mkr.jpg",
        category: "Микроволновки",
        brand: "Panasonic", 
        specs: {
            power: "800 Вт",
            volume: "20 л",
            programs: "8",
            grill: "Есть",
        }
    },
    {
        id: 4,
        name: "Посудомоечная машина Bosch SMS44DW00R",
        description: "На 12 комплектов посуды, класс А++, 5 программ мойки, тихий инверторный мотор",
        price: 241994,
        image: "images/st.jpg",
        category: "Посудомоечные машины",
        brand: "Bosch",
        specs: {
            capacity: "12 комплектов",
            programs: "5",
            noise: "46 дБ",
            energyClass: "A++",
        }
    },
    {
        id: 5,
        name: "Пылесос Dyson V8 Absolute",
        description: "Беспроводной пылесос, до 40 минут работы, мощный циклонный фильтр",
        price: 164994,
        image: "images/1.jpg",
        category: "Пылесосы",
        brand: "Dyson",
        specs: {
            power: "115 AW",
            battery: "40 мин",
            weight: "2.6 кг",
            filtration: "HEPA",
        }
    },
    {
        id: 6,
        name: "Кофемашина DeLonghi ECAM 22.110.B",
        description: "Автоматическая кофемашина с капучинатором, встроенная кофемолка",
        price: 192494,
        image: "images/2.jpg",
        category: "Кофемашины",
        brand: "DeLonghi",
        specs: {
            pressure: "15 бар",
            capacity: "1.8 л",
            power: "1450 Вт",
            grinder: "Встроенный",
        }
    },
    {
        id: 7,
        name: "Холодильник LG DoorCooling+ GA-B459CLWL",
        description: "Двухкамерный холодильник с технологией DoorCooling+, линейный инвертор",
        price: 302494,
        image: "images/3.jpg",
        category: "Холодильники",
        brand: "LG",
        specs: {
            height: "186 см",
            width: "59.5 см",
            volume: "341 л",
            energyClass: "A+",
        }
    },
    {
        id: 8,
        name: "Стиральная машина Bosch WAN24260OE",
        description: "Узкая стиральная машина с технологией ActiveWater, 8 кг загрузки",
        price: 219994,
        image: "images/4.jpg",
        category: "Стиральные машины",
        brand: "Bosch",
        specs: {
            capacity: "8 кг", 
            speed: "1200 об/мин",
            programs: "16",
            energyClass: "A+++",
        }
    },
    {
        id: 9,
        name: "Духовой шкаф Electrolux EOE7P31X",
        description: "Электрический духовой шкаф с паром, сенсорное управление",
        price: 274994,
        image: "images/5.jpg",
        category: "Духовые шкафы",
        brand: "Electrolux",
        specs: {
            volume: "72 л",
            programs: "9",
            power: "3000 Вт",
            energyClass: "A+",
        }
    },
    {
        id: 10,
        name: "Варочная панель Gorenje ECT641BSC",
        description: "Электрическая варочная панель, стеклокерамика, сенсорное управление",
        price: 109994,
        image: "images/6.jpg",
        category: "Варочные панели",
        brand: "Gorenje",
        specs: {
            type: "Электрическая",
            zones: "4",
            power: "6500 Вт",
            width: "60 см",
        }
    },
    {
        id: 11,
        name: "Блендер Philips HR3652/00",
        description: "Стационарный блендер с технологией ProBlend 6 3D, 1400 Вт",
        price: 49494,
        image: "images/7.jpg",
        category: "Мелкая техника",
        brand: "Philips",
        specs: {
            power: "1400 Вт",
            volume: "2 л",
            speeds: "Variable",
            material: "Tritan",
        }
    },
    {
        id: 12,
        name: "Мультиварка Redmond RMC-M90",
        description: "Мультиварка с 45 программами, LED дисплей, 5 л",
        price: 43994,
        image: "images/8.jpg",
        category: "Мелкая техника",
        brand: "Redmond",
        specs: {
            volume: "5 л",
            programs: "45",
            power: "860 Вт",
            display: "LED",
        }
    },
    {
        id: 13,
        name: "Робот-пылесос Xiaomi Mi Robot Vacuum-Mop 2",
        description: "Умный робот-пылесос с влажной уборкой, построение карты помещения",
        price: 137494,
        image: "images/9.jpg",
        category: "Пылесосы",
        brand: "Xiaomi",
        specs: {
            suction: "2500 Па",
            battery: "2600 мАч",
            volume: "0.6 л",
            mapping: "LDS",
        }
    },
    {
        id: 14,
        name: "Утюг Tefal FV5648",
        description: "Паровой утюг с функцией автоотключения, мощность 2600 Вт",
        price: 27494,
        image: "images/10.jpg",
        category: "Мелкая техника",
        brand: "Tefal",
        specs: {
            power: "2600 Вт",
            steam: "50 г/мин",
            soleplate: "Durilium AirGlide",
        }
    },
    {
        id: 15,
        name: "Мясорубка Moulinex ME688832",
        description: "Электрическая мясорубка, мощность 2200 Вт, 3 решетки",
        price: 43994,
        image: "images/11.jpg",
        category: "Мелкая техника",
        brand: "Moulinex",
        specs: {
            power: "2200 Вт",
            capacity: "4.5 кг/мин",
            accessories: "3 решетки",
        }
    },
    {
        id: 16,
        name: "Пылесос Samsung VC18M21C0VN",
        description: "Пылесос с циклонным фильтром, мощность 1800 Вт",
        price: 38494,
        image: "images/12.jpg",
        category: "Пылесосы",
        brand: "Samsung",
        specs: {
            power: "1800 Вт",
            filtration: "Циклон",
            volume: "1.5 л",
        }
    },
    {
        id: 17,
        name: "Миксер Bosch MFQ36460",
        description: "Ручной миксер, 5 скоростей, мощность 450 Вт",
        price: 19244,
        image: "images/13.jpg",
        category: "Мелкая техника",
        brand: "Bosch",
        specs: {
            power: "450 Вт",
            speeds: "5",
            attachments: "венчик, крюк",
        }
    },
    {
        id: 18,
        name: "Тостер Philips HD2582/90",
        description: "Тостер на 2 ломтика, 8 режимов обжарки",
        price: 16494,
        image: "images/14.jpg",
        category: "Мелкая техника",
        brand: "Philips",
        specs: {
            slots: "2",
            power: "830 Вт",
            modes: "8",
        }
    },
    {
        id: 19,
        name: "Мультиварка Polaris PMC 0517AD",
        description: "Мультиварка с 16 программами, объем 5 л",
        price: 32994,
        image: "images/15.jpg",
        category: "Мелкая техника",
        brand: "Polaris",
        specs: {
            volume: "5 л",
            programs: "16",
            power: "860 Вт",
        }
    },
    {
        id: 20,
        name: "Соковыжималка Scarlett SC-JE50S35",
        description: "Центрифужная соковыжималка, мощность 1200 Вт",
        price: 21994,
        image: "images/16.jpg",
        category: "Мелкая техника",
        brand: "Scarlett",
        specs: {
            power: "1200 Вт",
            volume: "1 л",
            speed: "2",
        }
    },
    {
        id: 21,
        name: "Электрочайник Bosch TWK8611P",
        description: "Электрочайник с регулировкой температуры, объем 1.5 л",
        price: 27494,
        image: "images/17.jpg",
        category: "Мелкая техника",
        brand: "Bosch",
        specs: {
            power: "2400 Вт",
            volume: "1.5 л",
            temperature: "4 режима",
        }
    },
    {
        id: 22,
        name: "Микроволновка LG MS-2042DB",
        description: "Микроволновая печь, объем 20 л, механическое управление",
        price: 43994,
        image: "images/18.jpg",
        category: "Микроволновки",
        brand: "LG",
        specs: {
            power: "700 Вт",
            volume: "20 л",
            control: "Механическое",
        }
    },
    {
        id: 23,
        name: "Пылесос Philips FC9350/01",
        description: "Пылесос с циклонной технологией, мощность 1800 Вт",
        price: 49494,
        image: "images/19.jpg",
        category: "Пылесосы",
        brand: "Philips",
        specs: {
            power: "1800 Вт",
            filtration: "Циклон",
            volume: "1.5 л",
        }
    },
    {
                id: 25,
        name: "Блендер Braun MQ 5200",
        description: "Погружной блендер, мощность 1000 Вт, 21 скорость",
        price: 32994,
        image: "images/20.jpg",
        category: "Мелкая техника",
        brand: "Braun",
        specs: {
            power: "1000 Вт",
            speeds: "21",
            attachments: "венчик, измельчитель",
        }
    },
    {
        id: 26,
        name: "Соковыжималка Philips HR1832/02",
        description: "Компактная соковыжималка, мощность 500 Вт",
        price: 27494,
        image: "images/21.jpg",
        category: "Мелкая техника",
        brand: "Philips",
        specs: {
            power: "500 Вт",
            volume: "1.5 л",
            speed: "1",
        }
    },
    {
        id: 27,
        name: "Мультиварка Moulinex MK707832",
        description: "Мультиварка с 45 программами, объем 5 л",
        price: 49494,
        image: "images/22.jpg",
        category: "Мелкая техника",
        brand: "Moulinex",
        specs: {
            volume: "5 л",
            programs: "45",
            power: "750 Вт",
        }
    },
    {
        id: 28,
        name: "Тостер Redmond RT-M403",
        description: "Тостер на 2 ломтика, 7 режимов обжарки",
        price: 16494,
        image: "images/23jpg",
        category: "Мелкая техника",
        brand: "Redmond",
        specs: {
            slots: "2",
            power: "900 Вт",
            modes: "7",
        }
    },
    {
        id: 29,
        name: "Посудомоечная машина Hansa ZIM 476 H",
        description: "Встраиваемая, на 10 комплектов, 6 программ",
        price: 164994,
        image: "images/24.jpg",
        category: "Посудомоечные машины",
        brand: "Hansa",
        specs: {
            capacity: "10 комплектов",
            programs: "6",
            noise: "47 дБ",
            energyClass: "A++",
        }
    },
    {
        id: 30,
        name: "Варочная панель Bosch PKE611D17E",
        description: "Стеклокерамика, 4 зоны, сенсорное управление",
        price: 142994,
        image: "images/25.jpg",
        category: "Варочные панели",
        brand: "Bosch",
        specs: {
            type: "Электрическая",
            zones: "4",
            power: "6600 Вт",
            width: "60 см",
        }
    },
    {
        id: 31,
        name: "Духовой шкаф Gorenje BO6727E03X",
        description: "Электрический, объем 77 л, 11 режимов",
        price: 219994,
        image: "images/26.jpg",
        category: "Духовые шкафы",
        brand: "Gorenje",
        specs: {
            volume: "77 л",
            programs: "11",
            power: "3500 Вт",
            energyClass: "A",
        }
    },
    {
        id: 32,
        name: "Стиральная машина Indesit BWUA 51051",
        description: "5 кг, 1000 об/мин, 16 программ",
        price: 126494,
        image: "images/27.jpg",
        category: "Стиральные машины",
        brand: "Indesit",
        specs: {
            capacity: "5 кг",
            speed: "1000 об/мин",
            programs: "16",
            energyClass: "A+",
        }
    },
    {
        id: 33,
        name: "Пылесос LG VK76A02NTL",
        description: "Пылесос с циклонным фильтром, мощность 2000 Вт",
        price: 43994,
        image: "images/28.jpg",
        category: "Пылесосы",
        brand: "LG",
        specs: {
            power: "2000 Вт",
            filtration: "Циклон",
            volume: "1.5 л",
        }
    },
    {
        id: 34,
        name: "Кофемашина Philips EP1220/00",
        description: "Автоматическая кофемашина, 15 бар, капучинатор",
        price: 192494,
        image: "images/29.jpg",
        category: "Кофемашины",
        brand: "Philips",
        specs: {
            pressure: "15 бар",
            capacity: "1.8 л",
            power: "1500 Вт",
            grinder: "Встроенный",
        }
    },
    {
        id: 35,
        name: "Мясорубка Scarlett SC-MG45S55",
        description: "Электрическая мясорубка, мощность 2000 Вт, 2 решетки",
        price: 27494,
        image: "images/30.jpg",
        category: "Мелкая техника",
        brand: "Scarlett",
        specs: {
            power: "2000 Вт",
            capacity: "2 кг/мин",
            accessories: "2 решетки",
        }
    },
    {
        id: 36,
        name: "Блендер Kitfort KT-1361",
        description: "Погружной блендер, мощность 800 Вт, 2 скорости",
        price: 16494,
        image: "images/31.jpg",
        category: "Мелкая техника",
        brand: "Kitfort",
        specs: {
            power: "800 Вт",
            speeds: "2",
            attachments: "венчик, измельчитель",
        }
    },
    {
        id: 37,
        name: "Тостер Moulinex Subito LT260830",
        description: "Тостер на 2 ломтика, 7 режимов обжарки",
        price: 19244,
        image: "images/32.jpg",
        category: "Мелкая техника",
        brand: "Moulinex",
        specs: {
            slots: "2",
            power: "850 Вт",
            modes: "7",
        }
    },
    {
        id: 38,
        name: "Мультиварка REDMOND RMC-M25",
        description: "Мультиварка с 16 программами, объем 5 л",
        price: 32994,
        image: "images/33.jpg",
        category: "Мелкая техника",
        brand: "Redmond",
        specs: {
            volume: "5 л",
            programs: "16",
            power: "860 Вт",
        }
    },
    {
        id: 39,
        name: "Посудомоечная машина Beko DIS 25010",
        description: "Встраиваемая, на 10 комплектов, 5 программ",
        price: 164994,
        image: "images/34.jpg",
        category: "Посудомоечные машины",
        brand: "Beko",
        specs: {
            capacity: "10 комплектов",
            programs: "5",
            noise: "49 дБ",
            energyClass: "A+",
        }
    },
    {
        id: 40,
        name: "Варочная панель Hansa BHCI65123030",
        description: "Стеклокерамика, 4 зоны, механическое управление",
        price: 98994,
        image: "images/35.jpg",
        category: "Варочные панели",
        brand: "Hansa",
        specs: {
            type: "Электрическая",
            zones: "4",
            power: "6500 Вт",
            width: "60 см",
        }
    }
];

export default products;

// В main.js или в вашем коде вывода товаров используйте:
// product.price + ' ₸'
// Например:
// <span class="product-price">' + product.price + ' ₸</span>


