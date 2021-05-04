import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import { getProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = () => {
    // Access the redux dispatch function
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProfiles());
    // eslint-disable-next-line
    }, [getProfiles]);
    
    // retrieve state from redux store
    const profiles = useSelector(state => state.profile.profiles);
    const loading = useSelector(state => state.profile.loading);

    
    return (
        <Fragment>
            {
                loading 
                ? <Spinner />
                : (
                    <Fragment>
                        <h1 className="large text-primary text-center">
                            Developers
                        </h1>
                        <p className="lead text-center">
                            <i className="fab fa-connectdevelop"></i>
                            &nbsp; Browse and connect with other developers
                        </p>
                        <div className="profiles">
                            { 
                                profiles.length > 0 
                                ? (
                                    profiles.map(profile => (
                                        <ProfileItem 
                                            key={profile._id}
                                            profile={profile}/>
                                    ))
                                ) 
                                : (<h4 className="text-center">No Profiles found</h4>)
                            }
                        </div>
                    </Fragment>
                ) 
            }
        </Fragment>
    );
};

export default Profiles;
