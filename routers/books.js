'use strict'
const express = require('express');
const router = express.Router();
const {getBooks, createBook, getBook, updateBook, deleteBook} = require('../controllers/books');

router.get('/', getBooks);
router.post('/new', createBook);
router.get('/:id', getBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router