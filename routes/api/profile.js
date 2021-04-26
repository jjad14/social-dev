const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();


// @route   GET api/profile/me
// @desc    Get Current Users Profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        // find users profile
        // populate user's name and avatar fields
        const profile = await Profile
            .findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);

        // no profile found
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile associated for this user'});
        }

        res.json(profile);

    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;