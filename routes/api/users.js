const express = require('express');
const { body, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const normalize = require('normalize-url');

require('dotenv').config();

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
            const avatar = normalize(
                gravatar.url(email, {
                    s: '200', // size
                    r: 'pg', // rating: censorship 
                    d: 'mm' // default: mm is for mystery man
                }),
                { forceHttps: true }
            );

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

            // Create payload   
            const payload = {
                user: {
                    id: user.id
                }
            };

            // Create token
            jwt.sign(
                payload, 
                process.env.JWT_TOKEN_SECRET, 
                { expiresIn: 3600},
                (err, token) => {
                    if (err) throw err;
                    // return token
                    res.json({ token });
                }
            );

        } catch (error) {
            res.status(500).send('Server Error');
        }
});

module.exports = router;