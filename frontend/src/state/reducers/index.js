import { combineReducers } from "redux";
import auth from "./auth";
import posts from "./posts";
import errors from "./errors";
import users from "./users";

const rootReducer = combineReducers({
    auth,
    posts,
    errors,
    users
});

export default rootReducer;
