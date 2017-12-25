import { AsyncStorage } from 'react-native';
import * as types from './actionTypes';
import config from '../common/config';
import request from '../common/request';

export const popAlert = (title, content) => {
    return dispatch => {
        dispatch({
            type: types.SHOW_ALERT,
            payload: {
                title: title,
                content: content
            }
        });

        setTimeout(function() {
            dispatch({
                type: types.HIDE_ALERT
            });
        }, 1500);
    };
};

export const logout = () => {
    return dispatch => {
        AsyncStorage.multiRemove(['user', 'logined', 'booted', 'entered']).then(
            () => {
                dispatch({
                    type: types.USER_LOGOUT
                });
            }
        );
    };
};

export const checkUserStatus = () => {
    return dispatch => {
        AsyncStorage.getItem('user').then(function(data) {
            data = JSON.parse(data);

            if (data && data.accessToken) {
                dispatch({
                    type: types.USER_LOGINED,
                    payload: {
                        user: data
                    }
                });
            } else {
                dispatch({
                    type: types.USER_LOGOUT
                });
            }
        });
    };
};

export const updateUserInfo = userInfo => {
    return dispatch => {
        const url = config.api.update;
        console.log(userInfo);
        return request.post(url, userInfo).then(data => {
            if (data && data.success) {
                AsyncStorage.setItem('user', JSON.stringify(data.data));

                dispatch({
                    type: types.USER_UPDATED,
                    payload: {
                        user: data.data
                    }
                });
            }
        });
    };
};

export const afterLogin = user => {
    return dispatch => {
        AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
            dispatch({
                type: types.USER_LOGINED,
                payload: {
                    user: user
                }
            });
        });
    };
};

export const appBooted = () => {
    return {
        type: types.APP_BOOTED
    };
};

export const enteredSlide = () => {
    return dispatch => {
        AsyncStorage.setItem('entered', 'yes').then(() => {
            dispatch({
                type: types.ENTER_SLIDE
            });
        });
    };
};

export const willEnterApp = () => {
    return dispatch => {
        AsyncStorage.multiGet(['user', 'entered']).then(data => {
            let user = data[0];
            let entered = data[1];

            dispatch({
                type: types.WILL_ENTER_APP,
                payload: {
                    user: user,
                    entered: entered
                }
            });
        });
    };
};
