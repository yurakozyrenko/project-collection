const constants = require('../constants/const.js');

const loginSchema = {
    email: { isEmail: true, errorMessage: constants.EMAIL_ERR_MSG },
    password: {
        isLength: {
            options: constants.PASSWORD_MINLENGTH,
            errorMessage: constants.PASSWORD_ERR_MSG,
        },
    },
};

const collectionSchema = {
    name: {
        isLength: {
            options: constants.NAME_MINLENGTH,
            errorMessage: constants.NAME_ERR_MSG,
        },
    },
    description: {
        isLength: {
            options: constants.NAME_MINLENGTH,
            errorMessage: constants.DESCRIPTION_ERR_MSG,
        },
    },
    topic: {
        isIn: {
            options: [['Books', 'Signs', 'Silverware']],
            errorMessage: constants.TOPIC_ERR_MSG,
        },
    },
    imageSrc: { optional: true },
};

const itemSchema = {
    name: {
        isLength: {
            options: constants.NAME_MINLENGTH,
            errorMessage: constants.NAME_ERR_MSG,
        },
    },
    tags: {
        isLength: {
            options: constants.NAME_MINLENGTH,
            errorMessage: constants.TAGS_ERR_MSG,
        },
    },
};

module.exports = { loginSchema, collectionSchema, itemSchema };
