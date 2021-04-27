const express = require('express');
require('dotenv').config();
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const normalize = require('normalize-url');

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
            .findOne({ user: req.user.id });

        // no profile found
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile associated for this user'});
        }

        // only populate from user document if profile exists
        res.json(profile.populate('user', ['name', 'avatar']));
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    Upsert user profile
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            body('status', 'Status is required').not().isEmpty(),
            body('skills', 'Skills is required').not().isEmpty()
        ]
    ],
    async (req, res) => {

    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Pull fields out
    const {
        company,
        website,
        location, 
        bio,
        status,
        githubusername,
        skills
    } = req.body;

    // build profile object
    const profileFields = {
        user: req.user.id,
        company,
        location,
        website: website === '' ? '' : normalize(website, { forceHttps: true }),
        bio,
        skills: Array.isArray(skills)
          ? skills
          : skills.split(',').map(skill => '' + skill.trim()),
        status,
        githubusername
    };

      // Build social array
    const socialFields = [ 
        'youtube', 
        'twitter', 
        'instagram', 
        'linkedin', 
        'facebook', 
        'github' 
    ];

    // init social field as an object
    profileFields.social = {};

    // if the field exists in req.body, add it to object
    socialFields.forEach(field => {
        if (req.body[field]) {
            profileFields.social[field] = req.body[field];
        } 
    });

    try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
    );

    res.json(profile);
    } catch (err) {
    res.status(500).send('Server Error');
    }
});

// @route  GET api/profile
// @desc   Get all user profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);

        res.json(profiles);
    } catch (error) {
        res.status(500).send('Server Error');        
    }

});

// @route  GET api/profile/user/:userid
// @desc   Get profile by user id
// @access  Public
router.get('/user/:userid', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.userid}).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({msg: 'Profile not found'});
        }

        res.json(profile);
    } catch (error) {
        // check if param is a valid object Id
        if (error.kind === 'ObjectId') {
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send('Server Error');        
    }

});

// @route  DELETE api/profile
// @desc   Delete user, profile and posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // TODO: remove users posts

        // remove profile
        await Profile.findOneAndRemove({ user: req.user.id});

        // remove user
        await User.findOneAndRemove({ _id: req.user.id});

        res.json({msg: 'User has been deleted'});
    } catch (error) {
        res.status(500).send('Server Error');        
    }
});

// @route  PUT api/profile/experience
// @desc   Add experience to profile
// @access  Private
router.put(
    '/experience', 
    [
        auth, 
        [
            body('title', 'A Title is required').not().isEmpty(),
            body('company', 'A Company is required').not().isEmpty(),
            body('from', 'A From Date is required').not().isEmpty()
        ]
    ], 
    async (req, res) => {
        
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // pull fields from request body
    const {title, company, location, from, to, current, description} = req.body;

    // create a new experience object
    const newExperience = {title, company, location, from, to, current, description};

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // unshift pushes to begining rather than end (push)
        profile.experience.unshift(newExperience);

        await profile.save();

        res.json(profile);

    } catch (error) {
        res.status(500).send('Server Error');        
    }
});

// @route  PUT api/profile/experience/:expId
// @desc   Update experience from profile
// @access  Private
router.put(
    '/experience/:expId', 
    [
        auth, 
        [
            body('title', 'A Title is required').not().isEmpty(),
            body('company', 'A Company is required').not().isEmpty(),
            body('from', 'A From Date is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
 
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

   // pull fields from request body
    const {title, company, location, from, to, current, description} = req.body;

    // experience must have a title, company and from
    const exp = { title, company, from };

    // check if optional fields are valid
    if (location) exp.location = location;
    if (to) exp.to = to;
    if (current) exp.current = current;
    if (description) exp.description = description;

    try {
        // find profile by user id and param expId,
        // update experience while keeping original id
        const profileToUpdate = await Profile
            .findOneAndUpdate(
               {user: req.user.id, 'experience._id': req.params.expId},
               {$set: { 'experience.$': {_id: req.params.expId, ...exp}}},
               {new: true}
            );

        res.json({profileToUpdate});
    } catch (error) {
        res.status(500).send('Server Error');  
    }
});




module.exports = router;