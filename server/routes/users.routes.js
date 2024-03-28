const express = require('express');
const UsersControllers = require('../controllers/users.controller');
const router = express.Router();

const { checkSchema } = require('express-validator');
const { loginSchema } = require('../helpers/valid');
const authMiddleware = require('../middleware/authMiddleware');

//get All users

router.get('/', UsersControllers.getAllUsers);

//registration user

router.post(
    '/registration',
    checkSchema(loginSchema),
    UsersControllers.registrationUser
);

// login user

router.post('/login', checkSchema(loginSchema), UsersControllers.loginUser);

//auth user

router.get('/auth', authMiddleware, UsersControllers.check);


// router.delete('/', UsersControllers.deleteUsers);

// router.patch('/block', UsersControllers.blockUsers);

// router.patch('/unblock', UsersControllers.unblockUsers);

// router.get('/:email', authMiddleware, UsersControllers.getUser);
module.exports = router;
