const express = require('express');
const CommentsControllers = require('../controllers/comments.controller');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// create comment

router.post('/', authMiddleware, CommentsControllers.createComment);

// get comments item

router.get('/items/:id', CommentsControllers.getCommentsByItemId);

module.exports = router;
