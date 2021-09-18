import React from 'react';
import PostForm from './PostForm';
import Post from './Post.js';
import Footer from "./Footer";

function Content() {
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
                                            <h5 className="text-white no-margin">welcome to social app</h5>
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
                                        <PostForm />
                                        <Post/>
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

export default Content;