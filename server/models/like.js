const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Like = sequelize.define('like', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = { Like };
