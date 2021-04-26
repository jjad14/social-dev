const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const router = express.Router();

// @route   GET api/auth
// @desc    get user data using token
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await (await User.findById(req.user.id)).isSelected('-password');

        res.json(user);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;