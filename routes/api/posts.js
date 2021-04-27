const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
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
router.get('/:id', auth, async (req, res) => {
    
    try {
        // check if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'Post was not found' });
        }

        // get posts by most recent
        const post = await Post.findById(req.params.id);

        // check if post was found
        if (!post) {
            return res.status(404).json({msg: 'Post was not found'});
        }

        res.json(post);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    
    try {
        // check if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'Post was not found' });
        }

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
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        // check if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'Post was not found' });
        }

        // find post
        const post = await Post.findById(req.params.id);

        // check if post was found
        if (!post) {
            return res.status(404).json({msg: 'Post was not found'});
        }

        // Check if the post has already been liked by current user
        if (post.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Post has already been liked' });
        }

        // add like to post
        post.likes.unshift({ user: req.user.id });

        await post.save();
  
        res.json(post.likes);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        // check if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'Post was not found' });
        }

        // Find post by id
        const post = await Post.findById(req.params.id);

        // check if post was found
        if (!post) {
            return res.status(404).json({msg: 'Post was not found'});
        }

        // Check if the post has not yet been liked by user
        if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        // remove the like from current user
        post.likes = post.likes.filter(({user}) => 
            user.toString() !== req.user.id
        );

        await post.save();

        res.json(post.likes);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route  POST api/posts/comment/:id
// @desc   Add a comment to post
// @access Private
router.post(
    '/comment/:id', 
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
        // check if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'Post was not found' });
        }

        // get user
        const user = await User
            .findById(req.user.id)
            .select('-password');

        // get post
        const post = await Post.findById(req.params.id);

        // create comment object
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        // add comment to post
        post.comments.unshift(newComment);

        await post.save();

        // return all comments
        res.json(post.comments);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// @route    DELETE api/posts/comment/:id/:commentId
// @desc     Delete comment from post
// @access   Private
router.delete(
    '/comment/:id/:commentId', 
    auth, 
    async (req, res) => {

    try {

      // check if ids are valid object Ids
      if (!mongoose.Types.ObjectId.isValid(req.params.id) || 
          !mongoose.Types.ObjectId.isValid(req.params.commentId)) 
      {
        return res.status(404).json({ msg: 'Record was not found' });
      }

      // Get Post by Id
      const post = await Post.findById(req.params.id);
  
      // Get comment from Post by commentId
      const comment = post.comments.find(comment => 
        comment.id === req.params.commentId
      );

      // Check if comment exists
      if (!comment) {
        return res.status(404).json({ msg: 'The Comment does not exist' });
      }

      // Check if current user has ownership of the comment
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User is not authorized' });
      }
  
      // filter out comment in post
      post.comments = post.comments.filter(({id}) => 
        id !== req.params.commentId
      );
  
      await post.save();
  
      // return posts
      res.json(post.comments);
    } catch (err) {
       res.status(500).send('Server Error');
    }
  });


module.exports = router;