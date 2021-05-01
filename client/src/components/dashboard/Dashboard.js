import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import { getCurrentProfile } from '../../actions/profile';

const Dashboard = () => {
    // Access the redux dispatch function
    const dispatch = useDispatch();

    // retrieve state from redux store
    const auth = useSelector(state => state.auth);
    const profile = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, [getCurrentProfile]);

    return (
        <div>
            Dashboard
        </div>
    );
};

export default Dashboard;
