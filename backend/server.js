const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const blogsRouter = require('./routes/blogs');
const authRouter = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI)
  .then(()=> app.listen(PORT, ()=> console.log('Grella backend running on', PORT)))
  .catch(err => console.error(err));
