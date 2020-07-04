import { combineReducers } from "redux";
import userReducer from "./user";

export default function() {
    return combineReducers({
        user: userReducer
    })
};