const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/auth');

// @route   POST api/auth/login
// @desc    Đăng nhập người dùng
// @access  Public
router.post('/login', authController.login);

// @route   GET api/auth/me
// @desc    Lấy thông tin người dùng hiện tại
// @access  Private
router.get('/me', auth, authController.getCurrentUser);

module.exports = router;