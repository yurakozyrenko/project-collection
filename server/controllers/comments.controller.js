const { validationResult } = require('express-validator');
const CommentsServices = require('../services/commentsServices.js');
const constants = require('../constants/const.js');

class CommentsControllers {
    async createComment(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ message: errors.array()[0].msg });
            }

            const { comment, itemId } = req.body;

            if (!comment) {
                return res.json({ message: constants.COMMENT_NOT_EMPTY });
            }

            const newComment = await CommentsServices.createComment(
                comment,
                itemId,
                req.user.id
            );

            return res.status(201).json({ newComment });
        } catch (err) {
            return res
                .status(409)
                .json({ message: constants.NAME_COLLECTION_USED_MSG });
        }
    }

    async getCommentsByItemId(req, res) {
        try {
            const id = req.params.id;
            const comments = await CommentsServices.getCommentsByItemId(id);
            return res.status(200).json({ comments });
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }
}

module.exports = new CommentsControllers();
