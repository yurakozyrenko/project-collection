const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const UsersServices = require('../services/usersServices');
const { generateJwt } = require('../helpers/generateJwt');
const { generateHash } = require('../helpers/generateHash');
const constants = require('../constants/const.js');

class UserControllers {
    async registrationUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ message: errors.array()[0].msg });
            }

            const { email, password } = req.body;

            const hashPassword = generateHash(password);
            const user = await UsersServices.registrationUser(
                email,
                hashPassword
            );

            const token = generateJwt(user.id, user.email, user.status);

            return res.status(201).json({
                user,
                token,
                message: constants.REGISTER_SUCCESS,
            });
        } catch (err) {
            return res
                .status(409)
                .json({ message: constants.USER_REGISTER_USED_MSG });
        }
    }

    async loginUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ message: errors.array()[0].msg });
            }
            const { email, password } = req.body;

            const user = await UsersServices.getUser(email);

            if (!user) {
                return res
                    .status(401)
                    .json({ message: constants.USER_UNREGISTER_MSG });
            }

            if (user.status === constants.STATUS_BLOCK) {
                return res
                    .status(404)
                    .json({ message: constants.STATUS_BLOCK });
            }

            const success = await bcrypt.compare(
                password,
                user.dataValues.hashPassword
            );

            if (!success) {
                return res
                    .status(401)
                    .json({ message: constants.PASSWORD_FAILED_MSG });
            }

            const token = generateJwt(user.id, user.email, user.status);
            return res
                .status(200)
                .json({
                    token,
                    user,
                    message: constants.AUTHORIZATION_SUCCESS,
                });
        } catch (err) {
            return res.status(409).json({ message: err.message });
        }
    }

    async check(req, res) {
        try {
            const user = await UsersServices.getUser(req.user.email);

            const token = generateJwt(
                req.user.id,
                req.user.email,
                req.user.status
            );

            return res.json({ user, token });
        } catch (err) {
            return res
                .status(404)
                .json({ message: constants.USER_UNREGISTER_MSG });
        }
    }

    async getAllUsers(req, res) {
        try {
            const usersData = await UsersServices.getAllUsers();
            return res.status(200).json(usersData);
        } catch (err) {
            return res
                .status(500)
                .json({ message: constants.UNCONNECT_INFORMATION });
        }
    }

    async getUser(req, res) {
        try {
            const email = req.user.email;
            const userData = await UsersServices.getUser(email);
            return res.json(userData);
        } catch (err) {
            return res
                .status(404)
                .json({ message: constants.USER_UNREGISTER_MSG });
        }
    }

    async deleteUsers(req, res) {
        try {
            const userEmails = req.body.selectedRows;
            const usersData = await UsersServices.deleteUsers(userEmails);
            if (!usersData) {
                return res.json({ message: constants.UNCONNECT_INFORMATION });
            }
            return res.json(usersData);
        } catch (error) {
            return res.json({ message: err.message });
        }
    }

    async blockUsers(req, res) {
        try {
            const userEmails = req.body.selectedRows;
            const usersData = await UsersServices.blockUsers(userEmails);
            if (!usersData) {
                return res.json({ message: constants.UNCONNECT_INFORMATION });
            }
            return res.json(usersData);
        } catch (error) {
            return res.json({ message: err.message });
        }
    }

    async unblockUsers(req, res) {
        try {
            const userEmails = req.body.selectedRows;
            const usersData = await UsersServices.unblockUsers(userEmails);
            if (!usersData) {
                return res.json({ message: constants.UNCONNECT_INFORMATION });
            }
            return res.json(usersData);
        } catch (error) {
            return res.json({ message: err.message });
        }
    }
}

module.exports = new UserControllers();
