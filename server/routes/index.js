const express = require('express');
const router = express.Router();

//users

const usersRoutes = require('./users.routes');
router.use('/users', usersRoutes);

//items

const itemsRoutes = require('./items.routes');
router.use('/items', itemsRoutes);

//collections

const collectionsRoutes = require('./collections.routes');
router.use('/collections', collectionsRoutes);

//comments

const commentsRoutes = require('./comments.routes');
router.use('/comments', commentsRoutes);

//likes

const likesRoutes = require('./likes.routes');
router.use('/likes', likesRoutes);

module.exports = router;
