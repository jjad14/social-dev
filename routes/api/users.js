const express = require('express');
const { body, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

const router = express.Router();

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
    '/',
    [
        body('name', 'A Name is required').not().isEmpty(), 
        body('email', 'A valid email is required').isEmail(),
        body('password', 'A valid password with a min of 6 characters is required').isLength({min: 6})
    ],
    async (req, res) => {
        // check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password} = req.body;

        try {
            // check if the email is in use
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [ {msg: 'User already exists'} ] });
            }

            // Get Users Gravitar
            const avatar = gravatar.url(email, {
                s: '200', // size
                r: 'pg', // rating: censorship 
                d: 'mm' // default: mm is for mystery man
            });

            // user instance
            user = new User({
                name,
                email,
                avatar,
                password
            });

            // Hash Password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            // save user to db
            await user.save();

            // Return token   
            res.send('User registered');

        } catch (error) {
            res.status(500).send('Server Error');
        }

});

module.exports = router;