import './App.css';
import React from "react";
import Post from './Components/Post.js';
import Header from './Components/Header.js';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <Header />
        </header>
        <Post />
    </div>
  );
}

export default App;
