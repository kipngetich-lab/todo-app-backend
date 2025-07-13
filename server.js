require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
//const cors = require('cors');
//const path = require('path');  // Add this line
const connectDB = require('./config/db');
const errorHandler = require('./utils/errorHandler');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

  
// ========== CORS CONFIGURATION ========== //
const corsOptions = {
  origin: [
    'https://todo-app-gold-two-yvs53q5aka.vercel.app/', // Production frontend
    'http://localhost:3000', // Local development
    'https://www.yourdomain.com' // If using custom domain
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions)); // 2. Place CORS before all other middleware
// ======================================== //

// Middleware
//app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Serve static files in production
//if (process.env.NODE_ENV === 'production') {
  // Set static folder
  //app.use(express.static(path.join(__dirname, '../client/dist')));

  // Handle SPA (Single Page Application)
  //app.get('*', (req, res) => {
   // res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
 // });
//}

// Error handler (must be after routes)
app.use(errorHandler);

// Database Connection
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});