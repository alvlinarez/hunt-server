const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// environment variables
const config = require('./config/env');
// DB connection
const connectionDB = require('./config/db');
// routes
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const productRoutes = require('./routes/product');
const commentRoutes = require('./routes/comment');

// Custom middleware
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// Initializing connection to DB
connectionDB();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true
  })
);
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/product', productRoutes);
app.use('/api/comment', commentRoutes);

app.use('/public', express.static('public'));

// 404 middleware
app.use(notFoundHandler);

const port = config.port || 5000;
app.listen({ port }, () => {
  console.log(`Server running on port ${port}`);
});
