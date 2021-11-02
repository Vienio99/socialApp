import React from "react";


function Loading() {
    return (
        <div className="flex justify-center items-center">
            <div
                className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-600">
            </div>
        </div>
    );
}


export default Loading;
