import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import indexReducer from './indexReducer';
import sconfReducer from './sconfReducer';
import routeReducer from './routeReducer';

export default combineReducers({
    login: loginReducer,
    index: indexReducer,
    sconf: sconfReducer,
    rconf: routeReducer,
});
