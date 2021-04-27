const express = require('express');
const { body, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

// @route   POST api/posts
// @desc    Create a post
// @access  Public
router.post(
    '/', 
    [
        auth,
        [
            body('text', 'Text is required').not().isEmpty()
        ]
    ], 
    async (req, res) => {
    
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // get user
        const user = await User.findById(req.user.id).select('-password');

        // create post object
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();

        res.json(post);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;