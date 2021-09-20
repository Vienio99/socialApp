import React from "react";
import Header from "./Header";
import Content from "./Content";
import HomeScreen from "../Screens/HomeScreen";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import PostScreen from "../Screens/PostScreen";

function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                <Switch>
                    <Route path="/" exact component={HomeScreen}/>
                    <Route path="/post/1" component={PostScreen}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
