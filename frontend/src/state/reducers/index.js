import { combineReducers } from "redux";
import auth from "./auth";
import posts from "./posts";
import errors from "./errors";
import users from "./users";
import messages from "./messages";

const rootReducer = combineReducers({
    auth,
    posts,
    errors,
    messages,
    users,
});

export default rootReducer;
