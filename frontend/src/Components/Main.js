import React from 'react';
import Footer from "./Footer";

//TO-DO - move feed class only to PostList container instead of wrapping f. e. LoginScreen

// eslint-disable-next-line react/prop-types
function Main({ content }) {

    return (
        <div className="page-container ">
            {/*START PAGE CONTENT WRAPPER*/}
            <div className="page-content-wrapper ">
                {/*START PAGE CONTENT*/}
                <div className="content ">
                    <div className="social-wrapper">
                        <div className="social " data-pages="social">
                            {/*START JUMBOTRON*/}
                            <div className="jumbotron" data-social="cover" data-pages="parallax"
                                 data-scroll-element=".page-container">
                                <div className="cover-photo">
                                    <img alt="Cover photo" src=""/>
                                </div>
                                <div className="container container-fixed-lg sm-p-l-0 sm-p-r-0">
                                    <div className="inner">
                                        <div className="pull-bottom bottom-left m-b-40 sm-p-l-15">
                                            <h1 className="text-white no-margin"><span
                                                className="semi-bold">social</span> app</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*END JUMBOTRON*/}
                            <div className=" container    container-fixed-lg sm-p-l-0 sm-p-r-0">
                                <div className="feed">
                                    {/*START DAY*/}
                                    <div className="day" data-social="day">
                                        {content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Main;