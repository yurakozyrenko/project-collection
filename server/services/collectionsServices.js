const { Collection, User, Item } = require('../models/index.js');
const constants = require('../constants/const.js');
const sequelize = require('../config/db.js');

class CollectionsServices {
    async getAllCollections(
        page = 1,
        pageSize = 10,
        sortBy = 'createdAt',
        sortOrder = 'DESC'
    ) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        const collections = await Collection.findAll({
            offset,
            limit,
            order: [[sortBy, sortOrder]],
            include: [User, Item],
        });
        return collections;
    }

    async getTopCollections(limit = 5) {
        const collections = await Collection.findAll({
            attributes: {
                include: [
                    [
                        sequelize.literal(`(
                      SELECT COUNT(*)
                      FROM items
                      WHERE "items"."collectionId" = "collection"."id"
                    )`),
                        'itemscount',
                    ],
                ],
            },
            order: [[sequelize.literal('"itemscount" DESC')]],
            limit,
            include: [Item, User],
        });
        return collections;
    }

    async createCollection(name, description, topic, imageSrc, userId) {
        const collection = await Collection.create({
            name,
            description,
            topic,
            imageSrc,
            userId,
        });
        return collection;
    }

    async getCollectionCheckByUser(name, topic, userId) {
        const collection = await Collection.findOne({
            where: { userId, topic, name },
        });
        return collection;
    }

    async getCollectionsByUserId(
        id,
        page = 1,
        pageSize = 10,
        sortBy = 'createdAt',
        sortOrder = 'DESC'
    ) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const collections = await Collection.findAll({
            offset,
            limit,
            where: { userId: id },
            order: [[sortBy, sortOrder]],
            include: [User, Item],
        });
        return collections;
    }

    async getCollectionById(id, sortBy = 'createdAt', sortOrder = 'DESC') {
        const collection = await Collection.findOne({
            where: { id },
            include: [User, Item],
            order: [[Item, sortBy, sortOrder]],
        });
        return collection;
    }

    async updateCollection(id, name, description, topic) {
        const collection = await Collection.update(
            { name, description, topic },
            {
                where: { id },
            }
        );
        return collection;
    }

    async removeCollection(id) {
        const collection = await Collection.destroy({
            where: { id },
        });
        return collection;
    }
}

module.exports = new CollectionsServices();
