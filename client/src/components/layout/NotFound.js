import React, { Fragment } from 'react';

const NotFound = () => {
    return (
        <Fragment>
            <h1 className="x-large text-primary text-center">
                <i className="fas fa-exclamation-triagnle"></i>
                &nbsp;404 Page Not Found
            </h1>
            <p className="large text-center">Sorry, this page does not exist</p>    
        </Fragment>
    );
};

export default NotFound;
