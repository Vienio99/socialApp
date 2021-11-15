import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import PostScreen from "../Screens/PostScreen";
import UserScreen from "../Screens/UserScreen";
import LoginScreen from "../Screens/LoginScreen";
import '../index.css';
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignupScreen from "../Screens/SignupScreen";
import {useSelector} from "react-redux";

//TO-DO - make routes to every user and display his info and posts on the page
//TO-DO - make routes to every tag with appropriate posts that contain this tag

function App() {
    const state = useSelector((state) => state);
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
