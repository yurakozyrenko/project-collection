const express = require('express');
const LikesControllers = require('../controllers/likes.controller');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// create like

router.post('/items/:id', authMiddleware, LikesControllers.createLike);

// get likes item

router.get('/items/:id', LikesControllers.getLikesByItemId);

module.exports = router;
