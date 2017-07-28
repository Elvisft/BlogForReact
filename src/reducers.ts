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
//登录窗口
export const signCtrl: any = (state = {isSign: false}, action: any) => {

    switch (action.type) {
        case 'signShow':
            return Object.assign({}, state, {isSign: true});
        case 'signHide':
            return Object.assign({}, state, {isSign: false});
        default:
            return state;
    }
}

const stores = combineReducers({
    signCtrl: signCtrl,
    userInfo: isLogin

});
export default stores;
