const { Like, User } = require('../models/index.js');
const constants = require('../constants/const.js');

class LikesServices {
    async createLike(itemId, userId) {
        const data = await Like.create({ itemId, userId });
        return data;
    }

    async getLikesByItemId(id) {
        const likes = await Like.findAll({
            where: { itemId: id },
            include: [User],
        });
        return likes;
    }

    async checkLike(itemId, userId) {
        const like = await Like.findOne({ where: { itemId, userId } });
        return like;
    }

    async removeLike(itemId, userId) {
        const like = await Like.destroy({ where: { itemId, userId } });
        return like;
    }
}

module.exports = new LikesServices();
