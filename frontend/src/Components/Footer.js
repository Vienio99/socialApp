import React from "react";


function Footer() {
  return (
      <div className="container container-fixed-lg footer">
          <div className="copyright sm-text-center">
              <p className="small no-margin pull-left sm-pull-reset"><span className="hint-text">Copyright © 2021</span>
                  <span className="font-montserrat"> Social app</span>. <span
                      className="hint-text">All rights reserved.</span> <span className="sm-block"><a
                      className="m-l-10 m-r-10" href="javascript:void(0)">Terms of use</a> | <a className="m-l-10"
                                                                                                href="javascript:void(0)">Privacy Policy</a></span>
              </p>
              <p className="small no-margin pull-right sm-pull-reset"><a href="javascript:void(0)">Hand-crafted </a>
                  <span className="hint-text">&amp; Made with Love ®</span></p>
              <div className="clearfix"/>
          </div>
      </div>
  );
}

export default Footer;