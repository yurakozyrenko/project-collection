const express = require('express');
const CollectionsControllers = require('../controllers/collections.controller');
const router = express.Router();
const { checkSchema } = require('express-validator');
const { collectionSchema } = require('../helpers/valid');
const authMiddleware = require('../middleware/authMiddleware');

// get All collections
router.get('/', CollectionsControllers.getAllCollections);

// get 5 top collections
router.get('/top', CollectionsControllers.getTopCollections);

// create collection

router.post(
    '/',
    authMiddleware,
    checkSchema(collectionSchema),
    CollectionsControllers.createCollection
);

// get collectons by current user
router.get(
    '/user',
    authMiddleware,
    CollectionsControllers.getCollectionsByUserId
);

//get collection by id

router.get('/:id', CollectionsControllers.getCollectionById);

//update collection by id

router.put('/:id', authMiddleware, CollectionsControllers.updateCollection);

//delete collection by id

router.delete('/:id', authMiddleware, CollectionsControllers.removeCollection);

module.exports = router;

// router.patch('/block', UsersControllers.blockUsers);

// router.patch('/unblock', UsersControllers.unblockUsers);