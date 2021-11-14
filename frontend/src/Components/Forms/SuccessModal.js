import React from "react";


function SuccessModal() {

    return (
        <div className="p-2 mx-auto bg-white border shadow-lg top-20 w-96 rounded-md">
            <div className="mt-3 text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                    <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 leading-6">Successful!</h3>
                <div className="py-3 mt-2 px-7">
                    <p className="text-sm text-gray-500">
                        Account has been successfully registered!
                    </p>
                </div>
                <div className="items-center px-4 py-3">
                    <button
                        id="ok-btn"
                        className="w-full px-4 py-2 text-base font-medium text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SuccessModal;
