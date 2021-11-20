import React, {useEffect} from "react";
import HomeScreen from "../Screens/HomeScreen";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import PostScreen from "../Screens/PostScreen";
import UserScreen from "../Screens/UserScreen";
import LoginScreen from "../Screens/LoginScreen";
import '../index.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignupScreen from "../Screens/SignupScreen";
import {useDispatch, useSelector} from "react-redux";
import {loadUser, refreshAccessToken} from "../state/actions/auth";

//TO-DO - make routes to every user and display his info and posts on the page
//TO-DO - make routes to every tag with appropriate posts that contain this tag

function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const refreshToken = useSelector((state) => state.auth.refreshToken);

    useEffect(() => {
        // Load user only in case if he refreshed the page
        if (refreshToken && !isAuthenticated) {
            dispatch(loadUser());
        }
        // Move it to axios interceptors
        const interval = setInterval(() => {
            if (isAuthenticated) {
                dispatch(refreshAccessToken());
            }
        }, 240000);
        return () => clearInterval(interval);

    }, [dispatch, isAuthenticated, refreshToken]);

    return (
        <div className="flex flex-col h-screen">
            <Router>
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={HomeScreen}/>
                    <Route path="/post/:id" component={PostScreen}/>
                    <Route path="/user/:username" component={UserScreen}/>
                    <Route path="/login" component={LoginScreen}/>
                    <Route path="/signup" component={SignupScreen}/>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
