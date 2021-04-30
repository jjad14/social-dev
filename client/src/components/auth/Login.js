import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';

import { login } from '../../actions/auth';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // pull values out
    const { email, password } = formData;

    // Access the redux dispatch function
    const dispatch = useDispatch();

    // retrieve state from redux store
    const isAuthenticated = useSelector(state => 
        state.auth.isAuthenticated
    );

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };
    
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // call login dispatch function
        dispatch(login(email, password));
    };

    // Redirect if authenticated
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Fragment>
            <section className="container card">
                <h1 className="large text-primary text-center">
                    Sign In
                </h1>
                <p className="lead text-center">
                    <i className="fas fa-user"></i> 
                    &nbsp;Create Your Account
                </p>
                <form className="form" onSubmit={onSubmitHandler}>
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            name="email"
                            value={email}
                            required
                            autoComplete="off"
                            onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={password}
                            required
                            autoComplete="new-password"
                            onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="text-center">
                        <input type="submit" 
                            className="btn btn-primary" 
                            value="Login" />
                    </div>
                </form>
                    <p className="my-1 text-center">
                        Don't have an account?&nbsp;
                         <Link to="/register">Sign Up</Link>
                    </p>
            </section>
        </Fragment>
    );
};



export default Login;
