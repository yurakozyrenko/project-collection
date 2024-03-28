const { Item, User, Collection, Comment, Like } = require('../models/index.js');
const constants = require('../constants/const.js');

class ItemsServices {
    async getAllItems(
        page = 1,
        pageSize = 10,
        sortBy = 'createdAt',
        sortOrder = 'DESC'
    ) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const items = await Item.findAll({
            offset,
            limit,
            order: [[sortBy, sortOrder]],
            include: [User, Collection],
        });
        return items;
    }

    async createItem(name, tags, collectionId, userId) {
        const item = await Item.create({ name, tags, collectionId, userId });
        return item;
    }

    async getItemById(id) {
        const item = await Item.findOne({
            where: { id },
            include: [User, Collection, Comment, Like],
        });
        return item;
    }

    async getItemsByUserId(
        id,
        page = 1,
        pageSize = 10,
        sortBy = 'createdAt',
        sortOrder = 'DESC'
    ) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const items = await Item.findAll({
            offset,
            limit,
            where: { userId: id },
            order: [[sortBy, sortOrder]],
            include: [User, Collection],
        });
        return items;
    }

    async updateItem(id, name, tags, collectionId) {
        const item = await Item.update(
            { name, tags, collectionId },
            { where: { id } }
        );
        return item;
    }

    async removeItem(id) {
        const item = await Item.destroy({
            where: { id },
        });
        return item;
    }

    async removeItemsByCollectionId(collectionId) {
        await Item.destroy({
            where: { collectionId },
        });
    }
}

module.exports = new ItemsServices();
