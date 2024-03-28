const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    comment: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { Comment };
