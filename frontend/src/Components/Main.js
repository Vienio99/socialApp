import React from 'react';
import Footer from "./Footer";
import Navbar from "./Navbar";


// eslint-disable-next-line react/prop-types
function Main({content}) {
    return (
        <div className="flex-grow mx-auto">
            {content}
        </div>
    );
}

export default Main;

