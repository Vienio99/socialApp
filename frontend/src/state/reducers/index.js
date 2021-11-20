import { combineReducers } from "redux";
import auth from "./auth";
import posts from "./posts";
import errors from "./errors";

const rootReducer = combineReducers({
    auth,
    posts,
    errors,
});

export default rootReducer;
