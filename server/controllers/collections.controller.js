const { validationResult } = require('express-validator');
const CollectionsServices = require('../services/collectionsServices.js');
const constants = require('../constants/const.js');
const path = require('path');
const ItemsServices = require('../services/itemsServices.js');

class CollectionsControllers {
    async getAllCollections(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 10;

            const collections = await CollectionsServices.getAllCollections(
                page,
                pageSize
            );

            if (!collections || collections.length === 0) {
                return res
                    .status(200)
                    .json({ message: constants.CREATE_COLLECTION_MSG });
            }

            return res.status(200).json({ collections });
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }

    async getTopCollections(req, res) {
        try {
            const collections = await CollectionsServices.getTopCollections();

            if (!collections || collections.length === 0) {
                return res
                    .status(200)
                    .json({ message: constants.CREATE_COLLECTION_MSG });
            }

            return res.status(200).json({ collections });
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }

    async createCollection(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ message: errors.array()[0].msg });
            }

            const { name, description, topic } = req.body;
            const __dirname = path.resolve();

            let fileName;
            if (req.files) {
                fileName = Date.now().toString() + req.files.image.name;
                req.files.image.mv(path.join(__dirname, 'uploads', fileName));
            }
            const imageSrc = fileName || null;

            const collection =
                await CollectionsServices.getCollectionCheckByUser(
                    name,
                    topic,
                    req.user.id
                );

            if (collection) {
                return res.status(409).json({
                    message: constants.ADD_COLLECTION_CREATE_MSG,
                });
            }

            const newCollection = await CollectionsServices.createCollection(
                name,
                description,
                topic,
                imageSrc,
                req.user.id
            );

            return res.status(201).json({
                newCollection,
                message: constants.COLLECTION_CREATE_SUCCESS,
            });
        } catch (err) {
            return res
                .status(409)
                .json({ message: constants.NAME_COLLECTION_USED_MSG });
        }
    }

    async getCollectionsByUserId(req, res) {
        try {
            const collections =
                await CollectionsServices.getCollectionsByUserId(req.user.id);

            if (!collections || collections.length === 0) {
                return res
                    .status(200)
                    .json({ message: constants.CREATE_COLLECTION_MSG });
            }

            return res.status(200).json({ collections });
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }

    async getCollectionById(req, res) {
        try {
            const id = req.params.id;
            const { sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;
            const collection = await CollectionsServices.getCollectionById(
                id,
                sortBy,
                sortOrder
            );

            return res.status(200).json({ collection });
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }

    async updateCollection(req, res) {
        try {
            const id = req.params.id;
            const { name, description, topic } = req.body;
            const collection = await CollectionsServices.updateCollection(
                id,
                name,
                description,
                topic
            );
            if (!collection) {
                return res
                    .status(200)
                    .json({ message: constants.COLLECTION_NOT_FOUND });
            }

            return res
                .status(200)
                .json({ message: constants.COLLECTION_UPDATE_SUCCESS });
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }

    async removeCollection(req, res) {
        try {
            const id = req.params.id;
            await ItemsServices.removeItemsByCollectionId(id);
            const collection = await CollectionsServices.removeCollection(id);
            if (!collection) {
                return res
                    .status(200)
                    .json({ message: constants.COLLECTION_NOT_FOUND });
            }

            return res
                .status(200)
                .json({ id, message: constants.COLLECTION_DELETE_SUCCESS });
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }
}

module.exports = new CollectionsControllers();
