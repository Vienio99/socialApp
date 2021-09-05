import './App.css';
import React from "react";
import Header from './Components/Header.js';
import Content from './Components/Content.js';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
        <body className="fixed-header horizontal-menu horizontal-app-menu  pace-done">
            <Header />
            <Content />
        </body>
        <Footer />
    </div>
  );
}

export default App;
