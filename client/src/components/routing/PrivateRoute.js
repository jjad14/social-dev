import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector  } from 'react-redux';

const PrivateRoute = (props) => {

    // retrieve state from redux store
    const isAuthenticated = useSelector(state => 
        state.auth.isAuthenticated
    );

    const loading = useSelector(state => 
        state.auth.loading
    );

    // if user is not authenticated and not loading, redirect to login
    if (!isAuthenticated && !loading) {
        return <Redirect to="/login" />;
    }
    else {
        // else, display component (i.e. dashboard)
        return <Route exact path={props.path} component={props.component} />;
    }

};

export default PrivateRoute;
