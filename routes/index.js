const express = require('express');

const Book = require('../models/books');
const router = express.Router();

router.get('/', async (req, res) => {
    let books;
    try {
        books = await Book.find().sort({ createdAt: 'descending' }).limit(10).exec();
        res.render('index', { books: books });        
    } catch {
        books = [];
    }
});

module.exports = router;