const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const router = express.Router();

// @route   GET api/auth
// @desc    Get logged a user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        res.json(user);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
    '/',
    [ 
        body('email', 'A valid email is required').isEmail(),
        body('password', 'A valid password is required').exists()
    ],
    async (req, res) => {
        // check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { email, password} = req.body;

        try {
            // check if the email is in use
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ errors: [ {msg: 'Invalid Credentials'} ] });
            }

            // Create payload   
            const payload = {
                user: {
                    id: user.id
                }
            };

            // check if passwords match
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [ {msg: 'Invalid Credentials'} ] });    
            }

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