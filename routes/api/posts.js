const express = require('express');
const { body, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

// @route   POST api/posts
// @desc    Create a post
// @access  Private
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

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get(
    '/', 
     auth,
    async (req, res) => {
    
    try {
        // get posts by most recent
        const posts = await Post.find().sort({ date: -1 });

        res.json(posts);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get(
    '/:id', 
     auth,
    async (req, res) => {
    
    try {
        // get posts by most recent
        const post = await Post.findById(req.params.id);

        // check if post was found
        if (!post) {
            return res.status(404).json({msg: 'Post was not found'});
        }

        res.json(post);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post was not found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete(
    '/:id', 
     auth,
    async (req, res) => {
    
    try {
        // get posts by most recent
        const post = await Post.findById(req.params.id);

        // check if post was found
        if (!post) {
            return res.status(404).json({msg: 'Post was not found'});
        }

        // Check if user owns post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'You are not authorized'}); 
        }

        await post.remove();

        res.json({msg: 'The post has been removed'});
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post was not found'});
        }
        res.status(500).send('Server Error');
    }
    });




module.exports = router;