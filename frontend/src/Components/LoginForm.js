import React, {useEffect, useState} from "react";
import axios from 'axios';

// TO-DO - change form so it looks properly

function LoginForm() {

    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios(
                'http://127.0.0.1:8000/api/v1/user/'
            );
            setUser(response.data);
        };
        fetchUser();
    }, []);

    //send token
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/v1/user/');
    };

    return (
        <div className="login-wrapper ">
            {/*// <!-- START Login Background Pic Wrapper-->*/}
            <div className="bg-pic">
                {/*// <!-- START Background Caption-->*/}
                <div className="bg-caption pull-bottom sm-pull-bottom text-white p-l-20 m-b-20">
                    {/*<h1 className="semi-bold text-white">*/}
                    {/*    Meet pages - The simplest and fastest way to build web UI for your dashboard or app.</h1>*/}
                    {/*<p className="small">*/}
                    {/*    Our beautifully-designed UI Framework come with hundreds of customizable features. Every Layout*/}
                    {/*    is just a starting point. ©2019-2020 All Rights Reserved. Pages® is a registered trademark of*/}
                    {/*    Revox Ltd.*/}
                    {/*</p>*/}
                </div>
                {/*// <!-- END Background Caption-->*/}
            </div>
            {/*// <!-- END Login Background Pic Wrapper-->*/}
            {/*// <!-- START Login Right Container-->*/}
            <div className="login-container bg-white">
                <div className="p-l-50 p-r-50 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
                    <img src="/executive/assets/img/logo-48x48_c.png" alt="logo" data-src="/executive/assets/img/logo-48x48_c.png"
                         data-src-retina="/executive/assets/img/logo-48x48_c@2x.png" width="48" height="48" />
                        <h2 className="p-t-25">Get Started <br/> with your Dashboard</h2>
                        <p className="mw-80 m-t-5">Sign in to your account</p>
                        {/*// <!-- START Login Form -->*/}
                        <form id="form-login" className="p-t-15" role="form" action="index.html">
                            {/*// <!-- START Form Control-->*/}
                            <div className="form-group form-group-default">
                                <label>Login</label>
                                <div className="controls">
                                    <input type="text" name="username" placeholder="User Name" className="form-control"
                                           required />
                                </div>
                            </div>
                            {/*// <!-- END Form Control-->*/}
                            {/*// <!-- START Form Control-->*/}
                            <div className="form-group form-group-default">
                                <label>Password</label>
                                <div className="controls">
                                    <input type="password" className="form-control" name="password"
                                           placeholder="Credentials" required />
                                </div>
                            </div>
                            {/*// <!-- START Form Control-->*/}
                            <div className="row">
                                <div className="col-md-6 no-padding sm-p-l-10">
                                    <div className="form-check">
                                        <input type="checkbox" value="1" id="checkbox1" />
                                            <label htmlFor="checkbox1">Remember me</label>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex align-items-center justify-content-end">
                                    <button aria-label="" className="btn btn-primary btn-lg m-t-10" type="submit">Sign
                                        in
                                    </button>
                                </div>
                            </div>
                            <div className="m-b-5 m-t-30">
                                <a href="#" className="normal">Lost your password?</a>
                            </div>
                            <div>
                                <a href="#" className="normal">Not a member yet? Signup now.</a>
                            </div>
                            {/*// <!-- END Form Control-->*/}
                        </form>
                        {/*// <!--END Login Form-->*/}
                        <div className="pull-bottom sm-pull-bottom">
                            <div className="m-b-30 p-r-80 sm-m-t-20 sm-p-r-15 sm-p-b-20 clearfix">
                                <div className="col-sm-9 no-padding m-t-10">
                                    <p className="small-text normal hint-text">
                                        ©2019-2020 All Rights Reserved. Pages® is a registered trademark of Revox
                                        Ltd. <a href="">Cookie Policy</a>, <a href=""> Privacy and Terms</a>.
                                    </p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            {/*// <!-- END Login Right Container-->*/}
        </div>
    );
}

export default LoginForm;

