import { USER_INPUT_LOGIN_CHANGED, USER_INPUT_PASSWORD_CHANGED, USER_ON_LOGIN, USER_ON_LOGOUT, USER_GET_NAME_ID } from "../constants";

const initialState = {
    userLogin: "",
    userPassword: "",
    userName: "",
    userId: "",
    userToken: "",
    isLoggedIn: false,
};

export default function userReducer(state = initialState, action) {
    //console.log("user reducer payload:", action);
    switch (action.type) {
        case USER_INPUT_LOGIN_CHANGED:
            return {
                ...state,
                userLogin: action.payload,
            };
        case USER_INPUT_PASSWORD_CHANGED:
            return {
                ...state,
                userPassword: action.payload,
            };
        case USER_ON_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                userToken: action.payload,
            };
        case USER_ON_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userLogin: "",
                userPassword: "",
                userName: "",
                userId: "",
                userToken: "",
            };
        case USER_GET_NAME_ID:
            return {
                ...state,
                userName: action.payload.name,
                userId: action.payload.id,
            };
        
        default:
            return state;
    }
};