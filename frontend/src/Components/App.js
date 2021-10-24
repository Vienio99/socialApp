import React from "react";
import Header from "./Header";
import HomeScreen from "../Screens/HomeScreen";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import PostScreen from "../Screens/PostScreen";
import UserScreen from "../Screens/UserScreen";
import LoginScreen from "../Screens/LoginScreen";
import '../styles/output.css';

//TO-DO - make routes to every post and display it on the page
//TO-DO - make routes to every user and display his info and posts on the page
//TO-DO - make routes to every tag with appropriate posts that contain this tag
//TO-DO - move footer here from Main.js component

function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                <Switch>
                    <Route path="/" exact component={HomeScreen} />
                    <Route path="/post/:id" component={PostScreen} />
                    <Route path="/user/:username" component={UserScreen} />
                    <Route path="/login/" component={LoginScreen} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
