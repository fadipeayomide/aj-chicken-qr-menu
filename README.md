# AJ Chicken Restaurant - QR Menu System

A professional, real-time QR code-based digital menu and ordering system for AJ Chicken Restaurant with two branches (Lekki & Ikeja).

## 🎯 Features

### Phase 1
- ✅ QR Scan Menu with table detection
- ✅ Dynamic menu with categories and filters
- ✅ Add to cart with customizable modifiers
- ✅ Real-time availability management
- ✅ Mobile-responsive UI (Tailwind CSS)
- ✅ Waiter call button
- ✅ Payment integration (Paystack)

### Phase 2
- 📊 Admin Dashboard with analytics
- 📱 Kitchen Display System (KDS) with real-time updates
- 📈 Sales analytics and reporting
- 🏢 Multi-branch management
- 👥 Role-based access control

## 🏗️ Architecture

```
MERN Stack Architecture:
├── Frontend (Next.js + React + Tailwind CSS)
│   ├── Customer Interface (QR Menu)
│   ├── Kitchen Display System
│   └── Admin Dashboard
├── Backend (Node.js + Express + Socket.io)
│   ├── RESTful API
│   ├── WebSocket (Real-time updates)
│   └── Authentication & Authorization
└── Database (MongoDB Atlas)
    ├── Menu Items
    ├── Orders
    ├── Payments
    └── Analytics
```

## 🚀 Tech Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS, Redux Toolkit, Socket.io Client
- **Backend:** Node.js 18+, Express.js, Socket.io, Mongoose, JWT
- **Database:** MongoDB Atlas
- **Payment:** Paystack API
- **Deployment:** Vercel (Frontend), Render.com (Backend)
- **Images:** Cloudinary

## 📦 Project Structure

```
aj-chicken-qr-menu/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── styles/
│   │   └── utils/
│   ├── package.json
│   ├── tailwind.config.js
│   └── vercel.json
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   └── config/
│   ├── package.json
│   ├── .env.example
│   └── server.js
├── docs/
│   ├── DEPLOYMENT.md
│   ├── API_DOCS.md
│   └── DATABASE_SETUP.md
└── .gitignore
```

## 🔐 Security Features

- ✅ Tamper-proof QR codes with digital signatures
- ✅ JWT authentication
- ✅ HTTPS encryption
- ✅ Webhook signature verification (Paystack)
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Input validation & sanitization

## 📱 Branch Information

### AJ Chicken Lekki
- **Address:** Admiralty Way, Lekki Phase 1, Lagos
- **Code:** AJL001
- **Hours:** 8:00 AM – 11:00 PM
- **Tables:** 1–40

### AJ Chicken Ikeja
- **Address:** Toyin Street, Ikeja, Lagos
- **Code:** AJI002
- **Hours:** 9:00 AM – 10:30 PM
- **Tables:** 1–30

## 🎨 Brand Guidelines

- **Primary Red:** #C62828
- **Gold Accent:** #F9A825
- **Dark Background:** #1F1F1F
- **Light Background:** #FFF8E7
- **Fonts:** Poppins (Headings), Inter (Body), Montserrat (UI)

## 📞 Contact Information

- **Manager Email:** manager@ajchicken.com
- **Kitchen Email:** kitchen@ajchicken.com
- **SMS Alert:** 09033212713
- **Support Email:** fadmide0001@gmail.com

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Paystack merchant account
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/fadipeayomide/aj-chicken-qr-menu.git
cd aj-chicken-qr-menu
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Configure your environment variables
npm run dev
```

4. **Access the application**
- Customer Interface: http://localhost:3000/?table=AJL001-T01
- Admin Dashboard: http://localhost:3000/admin
- Kitchen Display: http://localhost:3000/kitchen

## 📊 Performance Targets

- Menu Load Time: < 1.5 seconds
- Uptime: 99.9%
- Max Concurrent Connections: 1,000+
- Real-time Update Latency: < 500ms

## 📚 Documentation

- [Deployment Guide](./docs/DEPLOYMENT.md)
- [API Documentation](./docs/API_DOCS.md)
- [Database Setup](./docs/DATABASE_SETUP.md)

## 🤝 Contributing

Please follow the code style and conventions documented in each module.

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

Fadi Peayomide
- Email: fadmide0001@gmail.com
- Phone: 09033212713

---

**Built with ❤️ for AJ Chicken Restaurant**
