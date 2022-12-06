if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {});
const db = mongoose.connection;

db.on('error', err => console.error(err));
db.once('open', () => console.error('Connected to Mongoose!'));

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('client'));
app.use('/', indexRouter);

app.listen(process.env.PORT || 5500);