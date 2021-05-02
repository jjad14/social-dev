import React, { Fragment, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';

import { createProfile, getCurrentProfile } from '../../actions/profile';

const initalState = {
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '', 
    github: '', 
};

const ProfileForm = () => {
    // local state
    const [formData, setFormData] = useState(initalState);
    const [showSocialInputs, setSocialInputs] = useState(false);

    // Access the redux dispatch function
    const dispatch = useDispatch();

    // retrieve state from redux store
    const profile = useSelector(state => state.profile.profile);
    const loading = useSelector(state => state.profile.loading);

    // gives access to the history instance 
    const history = useHistory();

    useEffect(() => {
        // get the current profile
        if (!profile) {
            dispatch(getCurrentProfile());
        } 

        // not loading and profile exists
        if (!loading && profile) {
            const profileData = { ...initalState };    

            // map profile data to form
            for (const key in profile) {
                if (key in profileData) {
                    profileData[key] = profile[key];
                }
            }
            for (const key in profile.social) {
                if (key in profileData) {
                    profileData[key] = profile.social[key];
                } 
            }
              if (Array.isArray(profileData.skills)) {
                  profileData.skills = profileData.skills.join(', ');
              }

              setFormData(profileData);
        }
        // eslint-disable-next-line
    }, [loading, getCurrentProfile, profile]);

    // pull out fields
    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
        github
      } = formData;

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(createProfile(
            formData, history, profile ? true : false
        ));
    };

    return (
        <Fragment>
            <h1 className="large text-primary">Edit Your Profile</h1>
            <p className="lead">
                <i className="fas fa-user"></i>&nbsp;
                Tell the world about you
            </p>
            <small><span className="text-danger">*</span> required fields</small>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <select name="status" value={status} onChange={onChangeHandler}>
                        <option value="" disabled>
                            Select Professional Status
                        </option>
                        <option value="Developer">Software Developer</option>
                        <option value="Junior Developer">Junior Software Developer</option>
                        <option value="Senior Developer">Senior Software Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        <span className="text-danger">*</span>&nbsp;
                        What is your job title?
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={company}
                        onChange={onChangeHandler}/>
                    <small className="form-text">
                        What is the name of the company you are currently employed at?
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Website or Portfolio"
                        name="website"
                        value={website}
                        onChange={onChangeHandler}/>
                    <small className="form-text">
                        Do you have a company website or a Portfolio?
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={onChangeHandler}/>
                    <small className="form-text">
                        City and State/Province
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Your Skills"
                        name="skills"
                        value={skills}
                        onChange={onChangeHandler}/>
                    <small className="form-text">
                        <span className="text-danger">*</span>&nbsp;
                        Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername}
                        onChange={onChangeHandler}/>
                    <small className="form-text">
                        We will post your latest repositories using this
                    </small>
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="A short bio of yourself"
                        name="bio"
                        value={bio}
                        onChange={onChangeHandler}/>
                    <small className="form-text">
                        Tell us a little bit about yourself
                    </small>
                </div>

                <div className="my-2">
                    <button
                        onClick={() => setSocialInputs(!showSocialInputs)}
                        type="button"
                        className="btn btn-primary">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                {showSocialInputs && (
                <Fragment>
                        {/* Facebook */}
                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x" />
                            <input
                                type="text"
                                placeholder="Facebook URL"
                                name="facebook"
                                value={facebook}
                                onChange={onChangeHandler}/>
                        </div>
                        {/* Twitter */}
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x" />
                            <input
                                type="text"
                                placeholder="Twitter URL"
                                name="twitter"
                                value={twitter}
                                onChange={onChangeHandler}/>
                        </div>
                        {/* Youtube */}
                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x" />
                            <input
                                type="text"
                                placeholder="YouTube URL"
                                name="youtube"
                                value={youtube}
                                onChange={onChangeHandler}/>
                        </div>
                        {/* Linkedin */}
                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x" />
                            <input
                                type="text"
                                placeholder="Linkedin URL"
                                name="linkedin"
                                value={linkedin}
                                onChange={onChangeHandler}/>
                        </div>
                        {/* Instagram */}
                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x" />
                            <input
                                type="text"
                                placeholder="Instagram URL"
                                name="instagram"
                                value={instagram}
                                onChange={onChangeHandler}/>
                        </div>
                        {/* Github */}
                        <div className="form-group social-input">
                            <i className="fab fa-github fa-2x" />
                            <input
                                type="text"
                                placeholder="Github URL"
                                name="github"
                                value={github}
                                onChange={onChangeHandler}/>
                        </div>
                    </Fragment>
                )}

                <input type="submit" className="btn btn-success my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};

export default ProfileForm;
