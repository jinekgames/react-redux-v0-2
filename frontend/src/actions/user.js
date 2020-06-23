import { USER_INPUT_LOGIN_CHANGED, USER_INPUT_PASSWORD_CHANGED, USER_ON_LOGIN, USER_ON_LOGOUT, USER_GET_NAME_ID } from "../constants";

export default {
    saveUserLoginValue(value) {
        //console.log("user actions login action strt");
        return {
            type: USER_INPUT_LOGIN_CHANGED,
            payload: value,
        };
    },
    saveUserPasswordValue(value) {
        //console.log("user actions passwors action strt");
        return {
            type: USER_INPUT_PASSWORD_CHANGED,
            payload: value,
        };
    },
    userLoggedIn(value) {
        return {
            type: USER_ON_LOGIN,
            payload: value,
        };
    },
    userLoggedOut() {
        return {
            type: USER_ON_LOGOUT,
            payload: {},
        };
    },
    userGetData(value) {
        return {
            type: USER_GET_NAME_ID,
            payload: value,
        };
    },
}