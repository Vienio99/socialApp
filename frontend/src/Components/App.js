import React from "react";
import Header from "./Header";
import HomeScreen from "../Screens/HomeScreen";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import PostScreen from "../Screens/PostScreen";
import UserScreen from "../Screens/UserScreen";
import LoginScreen from "../Screens/LoginScreen";
import '../styles/output.css';
import Navbar from "./Navbar";

//TO-DO - make routes to every post and display it on the page
//TO-DO - make routes to every user and display his info and posts on the page
//TO-DO - make routes to every tag with appropriate posts that contain this tag
//TO-DO - move footer here from Main.js component

function App() {
    return (
        <div className="App">
            <Navbar/>
            {/*<Router>*/}
                {/*<Switch>*/}
                {/*    <Route path="/" exact component={HomeScreen} />*/}
                {/*    <Route path="/post/:id" component={PostScreen} />*/}
                {/*    <Route path="/user/:username" component={UserScreen} />*/}
                {/*    <Route path="/login/" component={LoginScreen} />*/}
                {/*</Switch>*/}
            {/*</Router>*/}
            <div className="bg-gray-900 p-20 h-screen flex justify-center items-start flex-col">
                <h1 className="text-5xl text-white">Hello Tailwind 👋</h1>
                <p className="text-gray-400 mt-5 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                    consequuntur odio aut nobis ab quis? Reiciendis doloremque ut quo fugiat
                    eveniet tempora, atque alias earum ullam inventore itaque sapiente iste?
                </p>
                <button className="p-4 bg-green-600 rounded-lg font-bold text-white mt-5 hover:bg-gray-600">
                    Hello Friends 🚀
                </button>
            </div>
        </div>
    );
}

export default App;
