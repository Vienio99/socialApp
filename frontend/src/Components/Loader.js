import React from "react";


function Loader() {
    return (
        <div className="spinner" data-testid="spinner">
            <div className="rect1"/>
            <div className="rect2"/>
            <div className="rect3"/>
            <div className="rect4"/>
            <div className="rect5"/>
        </div>
    );
}


export default Loader;
