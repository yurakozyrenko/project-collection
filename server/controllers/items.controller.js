const { validationResult } = require('express-validator');
const ItemsServices = require('../services/itemsServices');
const CommentsServices = require('../services/commentsServices');
const constants = require('../constants/const.js');

class ItemControllers {
    async getAllItems(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;

            const items = await ItemsServices.getAllItems(page, pageSize);
            if (!items || items.length === 0) {
                return res
                    .status(200)
                    .json({ message: constants.CREATE_ITEM_MSG });
            }
            return res.status(200).json({ items });
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }

    async createItem(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ message: errors.array()[0].msg });
            }

            const { name, tags, collectionId } = req.body;
            const item = await ItemsServices.createItem(
                name,
                tags,
                collectionId,
                req.user.id
            );

            return res
                .status(201)
                .json({ item, message: constants.ITEM_CREATE_SUCCESS });
        } catch (err) {
            return res.status(409).json({ message: err.message });
        }
    }

    async getItemById(req, res) {
        try {
            const id = req.params.id;
            if (isNaN(id) || id <= 0) {
                return res.status(404).json({ message: 'Invalid item ID' });
            }
            const item = await ItemsServices.getItemById(id);
            if (!item) {
                return res
                    .status(200)
                    .json({ message: constants.ITEM_NOT_FOUND });
            }

            return res.status(200).json({ item });
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }

    async getItemsByUserId(req, res) {
        try {
            const items = await ItemsServices.getItemsByUserId(req.user.id);
            if (!items) {
                return res
                    .status(200)
                    .json({ message: constants.CREATE_ITEM_MSG });
            }
            return res.status(200).json({ items });
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }

    async updateItem(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ message: errors.array()[0].msg });
            }

            const id = req.params.id;
            const { name, tags, collectionId } = req.body;
            const item = await ItemsServices.updateItem(
                id,
                name,
                tags,
                collectionId
            );
            if (!item) {
                return res
                    .status(200)
                    .json({ message: constants.ITEM_NOT_FOUND });
            }
            return res
                .status(200)
                .json({ item, message: constants.ITEM_UPDATE_SUCCESS });
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }

    async removeItem(req, res) {
        try {
            const id = req.params.id;
            await CommentsServices.removeCommentsByItemId(id);
            const item = await ItemsServices.removeItem(id);
            if (!item) {
                return res
                    .status(200)
                    .json({ message: constants.ITEM_NOT_FOUND });
            }
            return res
                .status(200)
                .json({ message: constants.ITEM_DELETE_SUCCESS });
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }

    async getItemComments(req, res) {
        try {
            const id = req.params.id;
            const item = await ItemsServices.getItemById(id);
            if (!item) {
                return res
                    .status(200)
                    .json({ message: constants.ITEM_NOT_FOUND });
            }
            const list = item.comments;
            return res.json({ list });
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }
}

module.exports = new ItemControllers();
