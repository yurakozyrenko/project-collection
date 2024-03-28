const express = require('express');
const ItemsControllers = require('../controllers/items.controller');
const router = express.Router();
const { checkSchema } = require('express-validator');
const { itemSchema } = require('../helpers/valid');
const authMiddleware = require('../middleware/authMiddleware');

//get All items

router.get('/', ItemsControllers.getAllItems);

//create item

router.post(
    '/',
    authMiddleware,
    checkSchema(itemSchema),
    ItemsControllers.createItem
);

// get All items current user

router.get('/user', authMiddleware, ItemsControllers.getItemsByUserId);

//get item by id

router.get('/:id', ItemsControllers.getItemById);

//get item comments

router.get('/comments/:id', ItemsControllers.getItemComments);

//update item by id

router.put(
    '/:id',
    authMiddleware,
    checkSchema(itemSchema),
    ItemsControllers.updateItem
);

//delete item by id

router.delete('/:id', authMiddleware, ItemsControllers.removeItem);

module.exports = router;
