const { Comment, User } = require('../models/index.js');
const constants = require('../constants/const.js');

class CommentsServices {
    async createComment(comment, itemId, userId) {
        const data = await Comment.create({ comment, itemId, userId });
        return data;
    }

    async removeCommentsByItemId(itemId) {
        const comment = await Comment.destroy({
            where: { itemId },
        });
        return comment;
    }

    async getCommentsByItemId(id) {
        const comments = await Comment.findAll({
            where: { itemId: id },
            include: [User],
        });
        return comments;
    }
}

module.exports = new CommentsServices();
