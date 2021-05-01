import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import profile from './profile';

// export all reducers
export default combineReducers({
    alert,
    auth,
    profile
});