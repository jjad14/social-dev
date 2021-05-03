import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector  } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Education from './Education';
import Experience from './Experience';

const Dashboard = () => {
    // Access the redux dispatch function
    const dispatch = useDispatch();

    // retrieve state from redux store
    const user = useSelector(state => state.auth.user);
    const profile = useSelector(state => state.profile.profile);
    const loading = useSelector(state => state.profile.loading);

    useEffect(() => {
        dispatch(getCurrentProfile());
        // eslint-disable-next-line
    }, [getCurrentProfile]);

    return loading && profile === null 
        ? <Spinner />
        : (
        <Fragment>
            <h1 className="large text-primary text-center">Dashboard</h1>
            <p className="lead text-center">
                <i className="fas fa-user"></i>
                &nbsp; Welcome to Social Dev { user && user.name}
            </p> 
            { 
                profile !== null 
                ? (<Fragment>
                    <DashboardActions />
                    <Education />
                    <Experience />
                    <br />
                    <div className="my-2">
                        <button className="btn btn-danger"
                            onClick={() => dispatch(deleteAccount())}>
                                <i className="fas fa-trash"></i>
                                &nbsp;Delete Account
                        </button>
                        <small>
                            This action is irreversible.
                        </small>
                    </div>
                </Fragment>)
                : (<Fragment>
                    <p className="text-center">Currently, you do not have a profile, click the button below to get started!</p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>)
            }
        </Fragment>
        )
};

export default Dashboard;
