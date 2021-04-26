const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    // Get Token from header
    // x-auth-token is basically the key to the token inside the header
    const token = req.header('x-auth-token');

    // Check if there is no token
    if (!token) {
        return res.status(401).json({msg: 'No token found, authorization denied'});
    } 

    try {
        // verify token, token payload goes in decoded
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        // assign id to request object
        // will have access to this in route
        req.user = decoded.user;

        // move on to next middleware
        next();
    }
    catch(err) {
        res.status(401).json({msg: 'Token is not valid'});
    }
};


