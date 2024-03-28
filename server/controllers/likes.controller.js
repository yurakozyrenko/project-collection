const { validationResult } = require('express-validator');
const LikesServices = require('../services/likesServices.js');
const constants = require('../constants/const.js');

class LikesControllers {
    async createLike(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ message: errors.array()[0].msg });
            }
            const id = req.params.id;
            const like = await LikesServices.checkLike(id, req.user.id);
            if (like) {
                await LikesServices.removeLike(id, req.user.id)
                return res.status(201).json({ message: 'unlike' });
            }

            const newLike = await LikesServices.createLike(id, req.user.id);
            return res.status(201).json({ message: 'like' });
        } catch (err) {
            return res
                .status(409)
                .json({ message: constants.NAME_COLLECTION_USED_MSG });
        }
    }

    async getLikesByItemId(req, res) {
        try {
            const id = req.params.id;
            const likes = await LikesServices.getLikesByItemId(id);
            return res.status(200).json({ likes });
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }
}

module.exports = new LikesControllers();
