import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector  } from 'react-redux';

const Landing = () => {
    // retrieve state from redux store
    const isAuthenticated = useSelector(state => 
      state.auth.isAuthenticated
    );

    if (isAuthenticated) {
      return <Redirect to="/dashboard" />
    }

    return (
        <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Social Dev</h1>
            <p className="lead">
              Connect with other developers!<br />
              Create, share, inspire and build with other developers.
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-light">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Landing;

