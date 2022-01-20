import types from './types';

export function updateRoute(routeName) {
    return {
        type: types.UPDATE_ROUTE,
        routeName: routeName,
    };
}
