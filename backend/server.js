import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Import Routes
import authRoutes from './routes/auth.routes.js';
import menuRoutes from './routes/menu.routes.js';
import orderRoutes from './routes/order.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import adminRoutes from './routes/admin.routes.js';
import qrCodeRoutes from './routes/qrCode.routes.js';

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/qr', qrCodeRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'AJ Chicken Backend is running' });
});

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AJ Chicken Restaurant QR Menu API',
    version: '1.0.0',
    status: 'running',
    documentation: '/api/docs'
  });
});

// Socket.io Connection Handling
io.on('connection', (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);

  // Join room based on branch or role
  socket.on('join_kitchen', (data) => {
    const { branchId } = data;
    socket.join(`kitchen_${branchId}`);
    console.log(`👨‍🍳 Kitchen staff joined room: kitchen_${branchId}`);
  });

  socket.on('join_customer', (data) => {
    const { tableId } = data;
    socket.join(`table_${tableId}`);
    console.log(`👤 Customer joined room: table_${tableId}`);
  });

  socket.on('join_admin', (data) => {
    socket.join('admin_dashboard');
    console.log(`👨‍💼 Admin joined dashboard`);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Export io for use in routes
export { io };

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 Handling
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🚀 AJ Chicken Backend Server Running on Port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}\n`);
});
