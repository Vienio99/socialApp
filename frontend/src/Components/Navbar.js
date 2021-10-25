import React from "react";
import {
    Link
} from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-gray-100">
            <div className="container mx-auto text-center border max-w-6-xl">
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        <div>
                            <a href="#" className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>HobbyHub</span>
                            </a>
                        </div>
                        <div>primary nav</div>
                    </div>
                    <div>secondary nav</div>
                </div>

            </div>
        </nav>
    );
}



// export default function Navbar() {
//     return (
//         <div className="menu-bar header-sm-height" data-pages-init='horizontal-menu' data-hide-extra-li="4">
//             <a href="#" className="btn-link header-icon toggle-sidebar d-lg-none" data-toggle="horizontal-menu">
//                 <i className="pg-icon">close</i>
//             </a>
//             <ul>
//                 <li>
//                     <Link to="/">Dashboard</Link>
//                 </li>
//                 <li className=" active">
//                     <Link to="/" href="social.html">
//                         <span className="title">Newest</span>
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/" href="javascript:">
//                         <span className="title">Hottest</span>
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/" href="javascript:">
//                         <span className="title">Favorites</span>
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/">
//                         <span className="title">Settings</span>
//                     </Link>
//                 </li>
//                 <li>
//                     <a href="javascript:"><span className="title">Extra</span>
//                         <span className=" arrow"/></a>
//                     <ul className="">
//                         <li className="">
//                             <Link to="/" href="invoice.html">Invoice</Link>
//                         </li>
//                         <li className="">
//                             <Link to="/" href="404.html">404 Page</Link>
//                         </li>
//                         <li className="">
//                             <Link to="/" href="500.html">500 Page</Link>
//                         </li>
//                         <li className="">
//                             <Link to="/" href="blank_template.html">Blank Page</Link>
//                         </li>
//                         <li className="">
//                             <Link to="/login">Login</Link>
//                         </li>
//                         <li className="">
//                             <Link to="/" href="register.html">Register</Link>
//                         </li>
//                         <li className="">
//                             <Link to="/" href="lock_screen.html">Lockscreen</Link>
//                         </li>
//                         <li className="">
//                             <Link to="/" href="gallery.html">Gallery</Link>
//                         </li>
//                         <li className="">
//                             <Link to="/" href="timeline.html">Timeline</Link>
//                         </li>
//                     </ul>
//                 </li>
//             </ul>
//             <a href="#" className="search-link d-flex justify-content-between align-items-center d-lg-none"
//                data-toggle="search">Tap here to search <i className="pg-search float-right"/></a>
//         </div>
//     );
// }