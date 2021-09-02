import './App.css';
import React from "react";
import Post from './Components/Post.js';
import Header from './Components/Header.js';
import Content from './Components/Content.js';

function App() {
  return (
    <div className="App">
        <body className="fixed-header horizontal-menu horizontal-app-menu  pace-done">
            <Header />
            <Content />
            <Post />
        </body>
    </div>
  );
}

export default App;
