const jwt = require('jsonwebtoken');
const constants = require('../constants/const.js');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: constants.ERROR_UNREG_MSG });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        next();
    } catch (e) {
        res.status(401).json({ message: constants.ERROR_UNREG_MSG });
    }
};
