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
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
        github
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
  
      // Optional: Not Checking if social links are undefined,
      // therefore we have to specifiy them in body with empty string
      // youtube: youtube ? youtube : ''
      // youtube: youtube && ''

      // Build social object and add them to profileFields
      const socialfields = { 
          youtube, 
          twitter, 
          instagram, 
          linkedin, 
          facebook, 
          github 
        };
  
      for (const [key, value] of Object.entries(socialfields)) {
        if (value.length > 0) {
            socialfields[key] = normalize(value, { forceHttps: true });
        }
      }

      profileFields.social = socialfields;

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


module.exports = router;