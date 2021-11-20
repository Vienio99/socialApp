import React from "react";

export default function Button(props) {

    return (
        <button className="px-4 py-2 text-yellow-900 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 transition duration-300">
            {/* eslint-disable-next-line react/prop-types */}
            {props.text}
        </button>
    );
}
