import React from 'react';

// eslint-disable-next-line react/prop-types
export default function PaginationBar({postsPerPage, totalPosts, paginate, currentPage}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="bg-white px-4 py-6 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                {/*<div>*/}
                {/*    <p className="text-sm text-gray-700">*/}
                {/*        Showing <span className="font-medium">1</span> to <span*/}
                {/*        className="font-medium">10</span> of{' '}*/}
                {/*        <span className="font-medium">97</span> results*/}
                {/*    </p>*/}
                {/*</div>*/}
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a
                            href="#"
                            onClick={ currentPage > 1 ? () => paginate(currentPage - 1) : null}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
                            </svg>
                        </a>
                        {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                        {pageNumbers.map(number => {
                            if (number === currentPage) {
                                return <a
                                    href="#"
                                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                    key={number}
                                    onClick={() => paginate(number)}
                                >
                                    {number}
                                </a>;
                            } else {
                                return <a
                                    href="#"
                                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                    key={number}
                                    onClick={() => paginate(number)}
                                >
                                    {number}
                                </a>;
                            }

                        })}
                        <a
                            href="#"
                            onClick={ currentPage < pageNumbers.length ? () => paginate(currentPage - 1) : null}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Next</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
}