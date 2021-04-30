import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';

// export all reducers
export default combineReducers({
    alert,
    auth
});