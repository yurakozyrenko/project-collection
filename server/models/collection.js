const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const constants = require('../constants/const.js');

const Collection = sequelize.define('collection', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    topic: {
        type: DataTypes.ENUM(constants.TOPICS),
        allowNull: false,
    },
    imageSrc: { type: DataTypes.STRING, allowNull: true },
});

module.exports = { Collection };
