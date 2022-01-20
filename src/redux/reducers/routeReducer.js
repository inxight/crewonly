import types from '../actions/types';

const defaultState = {
    routeName: "",
}

export default rconf = (state = defaultState, action) => {
    // For Debugger
    // console.log(state);

    switch (action.type) {
        case types.UPDATE_ROUTE:
            return {
                routeName : action.routeName,
            };
        default:
          return state;
    }
};
