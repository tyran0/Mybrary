if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const bodyParser = require('body-parser');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
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
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const authorRouter = require('./routes/authors');
app.use('/authors', authorRouter);

const bookRouter = require('./routes/books');
app.use('/books', bookRouter);

app.listen(process.env.PORT || 5500);