import * as loginAction from './loginAction';
import * as idxAction from './idxAction';
import * as sconfAction from './sconfAction';
import * as routeAction from './routeAction';

const ActionCreators = Object.assign({},
    loginAction, idxAction, sconfAction, routeAction
);


export default ActionCreators;
