require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 8000;

//DB CONNECTION
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`DB CONNECTED`);
  });

//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//Routes
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
