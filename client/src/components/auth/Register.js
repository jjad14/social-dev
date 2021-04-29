import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    // pull values out
    const { name, email, password, password2 } = formData;

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // passwords match
        if (password !== password2) {
            console.log('Passwords do not match');
        }
        else {
            console.log(formData);
        }

    };

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
                            onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            name="email"
                            value={email}
                            required
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
