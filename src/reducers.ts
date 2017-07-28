import { combineReducers } from 'redux';

// const loginState: {} = {type: 'login', flag: false};
const isLogin: any = (state = {isLogin: false, data: {}}, action: any) => {

    switch (action.type) {
        case 1:
            return Object.assign({}, state, {isLogin: true, info: action.data});
        default:
            return {};
    }
}
export const showSign: any = (state = {isSign: false}, action: any) => {

    switch (action.type) {
        case 'Sign':
            return Object.assign({}, state, {isSign: true});
        default:
            return state;
    }
}

const stores = combineReducers({
    userInfo: isLogin,
    showSign: showSign
});
export default stores;
