import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    // Access the redux dispatch function
    const dispatch = useDispatch();

    // retrieve state from redux store
    const isAuthenticated = useSelector(state => 
        state.auth.isAuthenticated
    );

    // pull values out
    const { name, email, password, password2 } = formData;

    // Input change handler
    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    
    // Submit Registration Form
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // passwords match
        if (password !== password2) {
            dispatch(setAlert('Passwords do not match!', 'danger'))
        }
        else {
            // call register dispatch function
            dispatch(register({ name, email, password }));
        }
    };

    // Redirect if authenticated
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <section className="container card">
                <h1 className="large text-primary text-center">
                    Sign Up
                </h1>
                <p className="lead text-center">
                    <i className="fas fa-user"></i> 
                    &nbsp;Create Your Account
                </p>
                <form className="form" onSubmit={onSubmitHandler}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Name" 
                            name="name" 
                            required
                            value={name}
                            autoComplete="off"
                            onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            name="email"
                            value={email}
                            required
                            autoComplete="off"
                            onChange={e => onChangeHandler(e)}/>

                        <small className="form-text">
                            To show a profile image, it is recommended to use a Gravatar email
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={password}
                            autoComplete="off"
                            required
                            onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            minLength="6"
                            required
                            autoComplete="off"
                            onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="text-center">
                        <input type="submit" 
                            className="btn btn-primary" 
                            value="Register" />
                    </div>
                </form>
                    <p className="my-1 text-center">
                        Already have an account?&nbsp;
                        <Link to="/login">Sign In</Link>
                    </p>
            </section>
        </Fragment>
    );
};

export default Register;
