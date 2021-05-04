import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';

import { logout } from '../../actions/auth';

const Navbar = () => {

    // Access the redux dispatch function
    const dispatch = useDispatch();

    // retrieve state from redux store
    const isAuthenticated = useSelector(state => 
        state.auth.isAuthenticated
    );
    const loading = useSelector(state => 
        state.auth.loading
    );

    // const { isAuthenticated, loading } = useSelector(state => 
    //     state.auth
    // );

    const logoutHandler = () => {
        dispatch(logout());
    };

    const authLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li>
                <Link to="/dashbaord">
                <i className="fas fa-user"></i>
                &nbsp;<span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li><a onClick={logoutHandler} href="#!">
                <i className="fas fa-sign-out-alt"></i>
                &nbsp; <span className="hide-sm">Logout</span> 
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/" className="text-light">
                    <i className="fas fa-code"></i>
                    &nbsp; Social Dev
                </Link>
            </h1>
            { !loading && 
            (<Fragment>
                { isAuthenticated ? authLinks : guestLinks}
            </Fragment>)}
        </nav>
    );
};

export default Navbar;
