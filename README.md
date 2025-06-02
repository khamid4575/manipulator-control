# Manipulyator Boshqaruv Tizimi

## Loyiha haqida

Bu loyiha 5x5 o‘lchamdagi gridda manipulyator (ko‘k katakcha) va namuna (yashil katakcha) ni boshqarish uchun mo‘ljallangan veb-ilova hisoblanadi. Foydalanuvchi maxsus buyruqlar (Л, П, В, Н, О, Б) yordamida manipulyatorni harakatlantirishi, namunani olib ko‘chirishi va grid ichida joylashtirishi mumkin.

### Asosiy funksiyalar:
- Manipulyatorni grid bo‘ylab harakatlantirish.
- Namunani olib, boshqa joyga ko‘chirish.
- Buyruqlarni optimallashtirish (masalan, ПППП -> 4П).
- Har bir buyruqning natijasini (namunaning oldingi va keyingi holatini) jadvalda ko‘rsatish.
- Chegaradan chiqishni tekshirish va xatolik haqida ogohlantirish.

## Ishga tushirish bo‘yicha ko‘rsatmalar

### 1. Loyihani klon qilish
Loyihani o‘z kompyuteringizga yuklab olish uchun quyidagi buyruqni ishlatishingiz mumkin:
```bash
git clone <repository-url>
cd manipulator-control
```

### 2. Kerakli paketlarni o‘rnatish
Loyiha TypeScript va React asosida qurilgan bo‘lib, `yarn` yordamida barcha kerakli paketlarni o‘rnatishingiz kerak:
```bash
yarn install
```

### 3. Loyihani ishga tushirish
Loyihani ishga tushirish uchun quyidagi buyruqni kiriting:
```bash
yarn start
```
Bu buyruq loyihani `http://localhost:5173` manzilida ishga tushiradi. Brauzeringizda ushbu manzilni ochishingiz mumkin.

### 4. Foydalanish
- **Buyruqlar kiritish**: "Введите команды (Л, П, В, Н, О, Б)" yozuvi ostidagi maydonchaga buyruqlarni kiriting.
  - Л: Chapga harakat.
  - П: O‘ngga harakat.
  - В: Yuqoriga harakat.
  - Н: Pastga harakat.
  - О: Namunani olish.
  - Б: Namunani qo‘yish.
- **Tezlikni sozlash**: Slider yordamida animatsiya tezligini sozlashingiz mumkin (100 dan 1000 ms gacha).
- **Natijani ko‘rish**: Har bir buyruqdan keyin gridda manipulyator va namunaning yangi holati ko‘rinadi. Shuningdek, jadvalda buyruqlar tarixi, namunaning oldingi va keyingi holati ko‘rsatiladi.

## Ishlatilgan Texnologiyalar

- **React**: Foydalanuvchi interfeysi uchun asosiy kutubxona.
- **TypeScript**: Statik tiplarni qo‘llab-quvvatlash va xavfsiz kod yozish uchun.
- **Redux**: Holatni boshqarish uchun (buyruqlar tarixini saqlash).
- **Material-UI (MUI)**: Komponentlar (TextField, Button, Snackbar, Slider, Table) uchun UI kutubxonasi.
- **React Hook Form**: Forma ma’lumotlarini boshqarish uchun.
- **Node.js va yarn**: Loyihani ishga tushirish va paketlarni boshqarish uchun.

## Loyiha tuzilishi

```plaintext
manipulator-control/
├── src/
│   ├── components/
│   │   ├── AuthForm.tsx
│   │   ├── CommandInput.tsx
│   │   ├── CommandHistory.tsx
│   │   └── GridVisualizer.tsx
│   ├── store/
│   │   ├── authSlice.ts
│   │   ├── commandsSlice.ts
│   │   └── store.ts
│   ├── utils/
│   │   └── optimizeCommands.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── README.md
```