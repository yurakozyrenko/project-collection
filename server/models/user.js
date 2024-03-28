const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const constants = require('../constants/const.js');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    hashPassword: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
    status: { type: DataTypes.STRING, defaultValue: constants.STATUS_ACTIVE },
});

module.exports = { User };
